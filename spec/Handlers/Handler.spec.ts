import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import { Bot } from '../../src/Bot'
import { Message } from '../../src/Message'
import { Handler } from '../../src/Handlers/Handler'
import SinonSpy = Sinon.SinonSpy

chai.use(sinonChai)
const expect = chai.expect

describe('Handler', () => {
    it('should throttle users correctly', (done) => {
        const handler: StubHandler = new StubHandler(<Bot> <any> {})
        expect(handler.throttled('user')).to.equal(false)
        handler.throttle('user', .03)
        expect(handler.throttled('user')).to.equal(true)
        setTimeout(() => {
            expect(handler.throttled('user')).to.equal(false)
            done()
        }, 40)
    })
})

class StubHandler extends Handler {
    understands(message: Message): boolean {
        return true
    }

    handle(message: Message): void {
    }
}
