import { Handler } from './Handler'
import { Message } from '../Message'

export class SandwichHandler extends Handler {
    understands(message: Message): boolean {
        return !!message.content.match(new RegExp(`^${this.bot.refId} (sudo )?make me a sandwich$`))
    }

    handle(message: Message): void {
        if (message.content.match('sudo')) {
            this.bot.sendMessage('User is not in the sudoers file. This incident will be reported.', message.channel)
            this.throttle(message.user, 60)
        } else {
            this.bot.sendMessage('No, make your own sandwich.', message.channel)
            this.throttle(message.user, 3)
        }
    }
}
