import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { Bot } from '../../src/Bot'
import { Message } from '../../src/Message'
import { SandwichHandler } from '../../src/Handlers/SandwichHandler'
import SinonSpy = Sinon.SinonSpy

chai.use(sinonChai)
const expect = chai.expect

describe('SandwichHandler', () => {
    describe('understand', () => {
        it('should understand both "@liz make me a sandwich" and "@liz sudo make me a sandwich"', () => {
            const handler: SandwichHandler = new SandwichHandler(<Bot> <any> {refId: '@liz'})
            expect(handler.understands(new Message({text: '@liz make me a sandwich'}))).to.be.true
            expect(handler.understands(new Message({text: '@liz sudo make me a sandwich'}))).to.be.true
            expect(handler.understands(new Message({text: '@liz make sandwich'}))).to.be.false
            expect(handler.understands(new Message({text: 'make me a sandwich @liz'}))).to.be.false
        })
    })

    describe('handle', () => {
        describe('when asking for a sandwich', () => {
            it('should answer the sender to do it yourself', () => {
                const sendMessage: SinonSpy = sinon.spy()
                const handler: SandwichHandler = new SandwichHandler(<Bot> <any> {sendMessage})

                handler.handle(new Message({user: 'me', text: '@liz make me a sandwich'}))
                expect(sendMessage).to.have.been.calledWith('No, make your own sandwich.')
            })
        })

        describe('when sudo asking for a sandwich', () => {
            it('should answer that the user is not a sudoer', () => {
                const sendMessage: SinonSpy = sinon.spy()
                const handler: SandwichHandler = new SandwichHandler(<Bot> <any> {sendMessage})

                handler.handle(new Message({user: 'me', text: '@liz sudo make me a sandwich'}))
                expect(sendMessage).to.have.been.calledWith('User is not in the sudoers file. This incident will be reported.')
            })
        })
    })
})
