import { Handler } from './Handler'
import { Bot } from '../Bot'
import { Message } from '../Message'

export class SimplePingHandler implements Handler {
    constructor(private bot: Bot) {
    }

    understands(message: Message): boolean {
        return !!message.content.match(new RegExp(`^((ping ${this.bot.refId})|(${this.bot.refId} ping))`))
    }

    handle(message: Message): void {
        this.bot.sendMessage('Pong!', message.channel)
    }
}
