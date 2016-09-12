import * as chai from 'chai'
import { Message } from '../../src/Message'
import { HandlerType } from '../../src/Handlers/HandlerType'
import { NoopHandler } from '../../src/Handlers/NoopHandler'

const expect = chai.expect

describe('NoopHandler', () => {
    describe('handle', () => {
        it('should do nothing', () => {
            const handler = new NoopHandler

            expect(handler.handle(new Message(HandlerType.NOOP, {}))).to.be.true
        })
    })
})
