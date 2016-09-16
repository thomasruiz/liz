import { Handler } from './Handler'
import { Message } from '../Message'
import { Bot } from '../Bot'

export class SlapHandler extends Handler {
    understands(message: Message): boolean {
        return !!message.content.match(new RegExp(`^${this.bot.refId} slap .+`))
    }

    handle(message: Message): void {
        let receiver = this.receiver(message)
        let slap = ''

        if (receiver.match(new RegExp(`^<@${this.bot.id}>$`)) || receiver === this.bot.name) {
            receiver = `<@${message.user}>`
            slap = 'Nice try.\n'
        }

        slap += `_slaps ${receiver} around a bit with a large trout._`

        this.bot.sendMessage(slap, message.channel)

        this.throttle(message.user, 10)
    }

    private receiver(message: Message): string {
        const regex = /^[^ ]+ [^ ]+ ([^ ]+)/

        // e.g "@liz slaps user" catches "user"
        return regex.exec(message.content)[1]
    }
}
