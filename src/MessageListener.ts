import { Bot } from './Bot'
import { Message } from './Message'
import { Throttler } from './Throttler'
import { Handler } from './Handlers/Handler'
import { SimplePingHandler } from './Handlers/SimplePingHandler'
import IThenable = Promise.IThenable
import { SlapHandler } from './Handlers/SlapHandler'

export class MessageListener {
    private handlers: Handler[]

    constructor(private bot: Bot, private throttler: Throttler) {
        this.handlers = [
            new SimplePingHandler(bot),
            new SlapHandler(bot)
        ]
    }

    static withBot(bot: Bot, throttler: Throttler): MessageListener {
        return new MessageListener(bot, throttler)
    }

    handle(message: any): IThenable<void> {
        return (new Promise((resolve) => resolve(new Message(message))))
            .then(this.throttler.throttle.bind(this.throttler))
            .then((message: Message) => {
                for (const handler of this.handlers) {
                    if (handler.understands(message)) {
                        handler.handle(message)
                    }
                }
            })
            .catch((error: Error) => {
                if (!error.message.match(/^__silent__/)) {
                    this.bot.sendDirectMessage(error.message, message.user)
                }
            })
    }
}
