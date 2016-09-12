import * as chai from 'chai'
import { Message } from '../src/Message'

const expect = chai.expect

describe('Message', () => {
    let message: Message

    beforeEach(() => {
        message = new Message({
            text: 'foo bar baz',
            user: 'USR_ID'
        })
    })

    it('should have some content', () => {
        expect(message.content).to.equal('foo bar baz')
    })

    it('should have an author', () => {
        expect(message.user).to.equal('USR_ID')
    })
})
