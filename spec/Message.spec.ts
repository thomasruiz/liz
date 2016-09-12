import * as chai from 'chai'
import { Message } from '../src/Message'
import { HandlerType } from '../src/Handlers/HandlerType'

const expect = chai.expect

describe('Message', () => {
    let message: Message

    beforeEach(() => {
        message = new Message(HandlerType.NOOP, {
            text: 'foo bar baz',
            user: 'USR_ID'
        })
    })

    it('should have a type', () => {
        expect(message.type).to.equal(HandlerType.NOOP)
    })

    it('should have some content', () => {
        expect(message.content).to.equal('foo bar baz')
    })

    it('should have an author', () => {
        expect(message.authorId).to.equal('USR_ID')
    })
})
