import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { Bot } from '../../src/Bot'
import { Message } from '../../src/Message'
import { SlapHandler } from '../../src/Handlers/SlapHandler'
import SinonSpy = Sinon.SinonSpy
import SinonStub = Sinon.SinonStub

chai.use(sinonChai)
const expect = chai.expect

describe('SlapHandler', () => {
    describe('understand', () => {
        it('should understand only "@liz slap user"', () => {
            const handler: SlapHandler = new SlapHandler(<Bot> <any> {refId: '@liz'})
            expect(handler.understands(new Message({text: '@liz slap @user'}))).to.be.true
            expect(handler.understands(new Message({text: '@liz slap user'}))).to.be.true
            expect(handler.understands(new Message({text: '@liz @liz slap user'}))).to.be.false
            expect(handler.understands(new Message({text: '@liz user'}))).to.be.false
            expect(handler.understands(new Message({text: '@liz user slap'}))).to.be.false
            expect(handler.understands(new Message({text: '@liz slap'}))).to.be.false
            expect(handler.understands(new Message({text: 'slap @liz'}))).to.be.false
        })
    })

    describe('handle', () => {
        it('should answer with the slapping message', () => {
            const sendMessage: SinonSpy = sinon.spy()
            const getRealUserName: SinonStub = sinon.stub()
            const handler: SlapHandler = new SlapHandler(<Bot> <any> {sendMessage, getRealUserName})

            getRealUserName.withArgs('you').returns('you')

            handler.handle(new Message({text: '@liz slap you'}))
            expect(sendMessage).to.have.been.calledWith('_slaps you around a bit with a large trout._')
        })
    })
})
