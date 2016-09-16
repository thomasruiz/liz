import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { Bot } from '../../src/Bot'
import { Message } from '../../src/Message'
import SinonSpy = Sinon.SinonSpy
import { Handler } from '../../src/Handlers/Handler'

chai.use(sinonChai)
const expect = chai.expect

describe('Handler', () => {
    it('should throttle users correctly', () => {
        const handler: StubHandler = new StubHandler(<Bot> <any> {})
        expect(handler.throttled('user')).to.equal(false)
        handler.throttle('user', .03)
        expect(handler.throttled('user')).to.equal(true)
        setTimeout(() => expect(handler.throttled('user')).to.equal(false), 30)
    })
})

class StubHandler extends Handler {
    understands(message: Message): boolean {
        return true
    }

    handle(message: Message): void {
    }
}
