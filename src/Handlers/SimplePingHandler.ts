import { Handler } from './Handler'
import { Message } from '../Message'

export class SimplePingHandler extends Handler {
    understands(message: Message): boolean {
        return !!message.content.match(new RegExp(`^((ping ${this.bot.refId})|(${this.bot.refId} ping))`))
    }

    handle(message: Message): void {
        this.bot.sendMessage('Pong!', message.channel)
        this.throttle(message.user, 5)
    }
}
