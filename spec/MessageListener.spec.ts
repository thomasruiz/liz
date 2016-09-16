import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { MessageListener } from '../src/MessageListener'
import { Bot } from '../src/Bot'
import SinonStub = Sinon.SinonStub
import SinonSpy = Sinon.SinonSpy
import { Handler } from '../src/Handlers/Handler'
import { LizError } from '../src/LizError'

chai.use(sinonChai)

const expect = chai.expect

describe('MessageListener', () => {
    describe('factories', () => {
        it('shouldBuildWithAnInstanceOfRtmClient', () => {
            const listener = MessageListener.withBot(<Bot> <any> 'bot')
            expect(listener).to.eql(new MessageListener(<Bot> <any> 'bot'))
        })
    })

    describe('handle', () => {
        let listener: MessageListener, bot: Bot
        let sendMessage: SinonSpy, sendDirectMessage: SinonSpy

        beforeEach(() => {
            sendMessage = sinon.spy()
            sendDirectMessage = sinon.spy()

            bot = <Bot> <any> {sendMessage, sendDirectMessage, refId: '@liz'}

            listener = new MessageListener(bot)
        })

        it('should pass the message through the pipeline', (done) => {
            const rawMessage: any = {text: 'ping @liz', channel: 'me'}

            listener.handle(rawMessage).then(() => {
                expect(sendMessage).to.have.been.calledWith('Pong!', 'me')
                done()
            }, (err) => done(err))
        })

        it('should throw an error when throttle happens', (done) => {
            const rawMessage: any = {user: 'a', text: 'bar'}
            listener.addHandler(<Handler> <any> {understands: () => true, throttled: () => true})

            listener.handle(rawMessage).then(() => {
                expect(bot.sendDirectMessage).to.have.been.calledWithMatch(/abuse/, 'a')
                done()
            }, (err) => done(err))
        })

        describe('when an error happens', () => {
            it('should send an error message to the user', (done) => {
                const rawMessage: any = {user: 'a', text: 'bar'}
                listener.addHandler(<Handler> <any> {understands: () => true, throttled: () => false, handle: () => {
                    throw new LizError('foo', 'a')
                }})

                listener.handle(rawMessage).then(() => {
                    expect(bot.sendDirectMessage).to.have.been.calledWith('foo', 'a')
                    done()
                }, (err) => done(err))
            })

            it('should not do anything if the error starts with __silent__', (done) => {
                const rawMessage: any = {user: 'a', text: '__TEST__ throw silence bar'}
                listener.addHandler(<Handler> <any> {understands: () => true, throttled: () => false, handle: () => {
                    throw new LizError('__silent__ foo', 'a')
                }})

                listener.handle(rawMessage).then(() => {
                    expect(bot.sendDirectMessage).to.not.have.been.called
                    done()
                })
            })
        })
    })
})
