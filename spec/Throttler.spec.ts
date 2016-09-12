import * as chai from 'chai'
import { Throttler } from '../src/Throttler'
import { Message } from '../src/Message'

const expect = chai.expect

describe('Throttler', () => {
    it('should just return message for now', () => {
        const throttler: Throttler = new Throttler
        const message = new Message({})

        expect(throttler.throttle(message)).to.eql(message)
    })
})
