import { HandlerType } from './Handlers/HandlerType';
import { Message } from './Message';
import { Bot } from './Bot';

export class MessageParser {
    constructor(private bot: Bot) {
    }

    parse(message: any): any {
        if (this.talkingToMe(message.text)) {
            return new Message(HandlerType.INTERACTION, message)
        }

        throw new Error('__silent__ unknown message')
    }

    private talkingToMe(text: any) {
        return text.match(new RegExp(`^<@${this.bot.id}>`))
    }
}
