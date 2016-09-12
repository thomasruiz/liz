import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import SinonStub = Sinon.SinonStub
import SinonSpy = Sinon.SinonSpy
import { MessageListener } from '../src/MessageListener'
import { MessageParser } from '../src/MessageParser'
import { Throttler } from '../src/Throttler'
import { Message } from '../src/Message'
import { HandlerType } from '../src/Handlers/HandlerType'
import { Bot } from '../src/Bot';

chai.use(sinonChai)

const expect = chai.expect

describe('MessageListener', () => {
    describe('factories', () => {
        it('shouldBuildWithAnInstanceOfRtmClient', () => {
            const listener = MessageListener.withBot(<Bot> <any> 'bot', <any> 'parser', <any> 'throttler')
            expect(listener).to.eql(new MessageListener(<Bot> <any> 'bot', <any> 'parser', <any> 'throttler'))
        })
    })

    describe('handle', () => {
        let listener: MessageListener, bot: Bot, messageParser: MessageParser, throttler: Throttler
        let sendMessage: SinonSpy, sendDirectMessage: SinonSpy, parse: SinonStub, throttle: SinonStub

        beforeEach(() => {
            sendMessage = sinon.spy()
            sendDirectMessage = sinon.spy()
            parse = sinon.stub()
            throttle = sinon.stub()

            bot = <Bot> <any> {sendMessage, sendDirectMessage}
            messageParser = <MessageParser> <any> {parse}
            throttler = <Throttler> <any> {throttle}

            listener = new MessageListener(bot, messageParser, throttler)
        })

        it('should pass the message through the pipeline', (done) => {
            const rawMessage: any = {}
            const parsedMessage: Message = new Message(HandlerType.NOOP, rawMessage)

            parse.withArgs(rawMessage).returns(parsedMessage)
            throttle.withArgs(parsedMessage).returns(parsedMessage)

            listener.handle(rawMessage).then((result) => {
                expect(result).to.be.true
                done()
            }, (err) => done(err))
        })

        describe('when an error happens', () => {
            it('should send an error message to the user', (done) => {
                const rawMessage: any = {user: 'a'}

                parse.withArgs(rawMessage).throws(new Error('foo'))

                listener.handle(rawMessage).then(() => {
                    expect(bot.sendDirectMessage).to.have.been.calledWith('foo', 'a')
                    done()
                }, (err) => done(err))
            })

            it('should not do anything if the error starts with __silent__', (done) => {
                const rawMessage: any = {user: 'a'}

                parse.withArgs(rawMessage).throws(new Error('__silent__ foo'))

                listener.handle(rawMessage).then(() => {
                    expect(bot.sendDirectMessage).to.not.have.been.called
                    done()
                }, (err) => done(err))
            })
        })
    })
})
