import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { Bot } from '../../src/Bot'
import { Message } from '../../src/Message'
import { SimplePingHandler } from '../../src/Handlers/SimplePingHandler'
import SinonSpy = Sinon.SinonSpy

chai.use(sinonChai)
const expect = chai.expect

describe('SimplePingHandler', () => {
    describe('understand', () => {
        it('should understand both "@liz ping" and "ping @liz"', () => {
            const handler: SimplePingHandler = new SimplePingHandler(<Bot> <any> {refId: '@liz'})
            expect(handler.understands(new Message({text: '@liz ping'}))).to.be.true
            expect(handler.understands(new Message({text: '@liz ping blah blah'}))).to.be.true
            expect(handler.understands(new Message({text: '@liz @liz ping'}))).to.be.false
            expect(handler.understands(new Message({text: 'ping @liz'}))).to.be.true
            expect(handler.understands(new Message({text: 'I ping @liz'}))).to.be.false
            expect(handler.understands(new Message({text: '@liz yo'}))).to.be.false
        })
    })

    describe('handle', () => {
        it('should answer the sender with a pong reply', () => {
            const sendMessage: SinonSpy = sinon.spy()
            const handler: SimplePingHandler = new SimplePingHandler(<Bot> <any> {sendMessage})

            handler.handle(new Message({user: 'me'}))
            expect(sendMessage).to.have.been.calledWith('Pong!')
        })
    })
})
