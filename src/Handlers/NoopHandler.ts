import { Handler } from './Handler'
import { Message } from '../Message'

export class NoopHandler implements Handler {
    handle(message: Message): boolean {
        return true
    }
}
