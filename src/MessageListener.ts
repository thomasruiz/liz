import { Bot } from './Bot';
import { Message } from './Message'
import { MessageParser } from './MessageParser'
import { Throttler } from './Throttler'
import { Handler } from './Handlers/Handler'
import { HandlerType } from './Handlers/HandlerType'
import { NoopHandler } from './Handlers/NoopHandler'
import { InteractionHandler } from './Handlers/InteractionHandler'
import IThenable = Promise.IThenable

export class MessageListener {
    private handlers: {[index: number]: Handler}

    constructor(private bot: Bot, private messageParser: MessageParser, private throttler: Throttler) {
        this.handlers = {
            [HandlerType.NOOP]: new NoopHandler,
            [HandlerType.INTERACTION]: new InteractionHandler(bot)
        }
    }

    static withBot(bot: Bot, messageParser: MessageParser, throttler: Throttler): MessageListener {
        return new MessageListener(bot, messageParser, throttler)
    }

    handle(message: any): IThenable<void> {
        return (new Promise((resolve) => resolve(message)))
            .then(this.messageParser.parse.bind(this.messageParser))
            .then(this.throttler.throttle.bind(this.throttler))
            .then((message: Message) => this.handlers[message.type].handle(message))
            .catch((error: Error) => {
                if (!error.message.match(/^__silent__/)) {
                    this.bot.sendDirectMessage(error.message, message.user)
                }
            })
    }
}
