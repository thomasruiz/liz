import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import SinonStub = Sinon.SinonStub
import SinonSpy = Sinon.SinonSpy
import { MessageListener } from '../src/MessageListener'
import { Throttler } from '../src/Throttler'
import { Message } from '../src/Message'
import { Bot } from '../src/Bot'

chai.use(sinonChai)

const expect = chai.expect

describe('MessageListener', () => {
    describe('factories', () => {
        it('shouldBuildWithAnInstanceOfRtmClient', () => {
            const listener = MessageListener.withBot(<Bot> <any> 'bot', <any> 'throttler')
            expect(listener).to.eql(new MessageListener(<Bot> <any> 'bot', <any> 'throttler'))
        })
    })

    describe('handle', () => {
        let listener: MessageListener, bot: Bot, throttler: Throttler
        let sendMessage: SinonSpy, sendDirectMessage: SinonSpy, throttle: SinonStub

        beforeEach(() => {
            sendMessage = sinon.spy()
            sendDirectMessage = sinon.spy()
            throttle = sinon.stub()

            bot = <Bot> <any> {sendMessage, sendDirectMessage, refId: '@liz'}
            throttler = <Throttler> <any> {throttle}

            listener = new MessageListener(bot, throttler)
        })

        it('should pass the message through the pipeline', (done) => {
            const rawMessage: any = {text: 'ping @liz', channel: 'me'}
            const parsedMessage: Message = new Message(rawMessage)

            throttle.withArgs(parsedMessage).returns(parsedMessage)

            listener.handle(rawMessage).then(() => {
                expect(sendMessage).to.have.been.calledWith('Pong!', 'me')
                done()
            }, (err) => done(err))
        })

        describe('when an error happens', () => {
            it('should send an error message to the user', (done) => {
                const rawMessage: any = {user: 'a'}

                throttle.withArgs(rawMessage).throws(new Error('foo'))

                listener.handle(rawMessage).then(() => {
                    expect(bot.sendDirectMessage).to.have.been.calledWith('foo', 'a')
                    done()
                }, (err) => done(err))
            })

            it('should not do anything if the error starts with __silent__', (done) => {
                const rawMessage: any = {user: 'a'}

                throttle.withArgs(rawMessage).throws(new Error('__silent__ foo'))

                listener.handle(rawMessage).then(() => {
                    expect(bot.sendDirectMessage).to.not.have.been.called
                    done()
                }, (err) => done(err))
            })
        })
    })
})
