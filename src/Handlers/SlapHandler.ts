import { Handler } from './Handler'
import { Message } from '../Message'
import { Bot } from '../Bot'

export class SlapHandler implements Handler {
    constructor(private bot: Bot) {
    }

    understands(message: Message): boolean {
        return !!message.content.match(new RegExp(`^${this.bot.refId} slap .+`))
    }

    handle(message: Message): void {
        this.bot.sendMessage(`_slaps ${this.receiver(message)} around a bit with a large trout._`, message.channel)
    }

    private receiver(message: Message): string {
        const regex = /^[^ ]+ [^ ]+ ([^ ]+)/

        // e.g "@liz slaps user" catches "user"
        return this.bot.getRealUserName(regex.exec(message.content)[1])
    }
}
