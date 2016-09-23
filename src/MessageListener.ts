import { Bot } from './Bot'
import { Message } from './Message'
import { Handler } from './Handlers/Handler'
import { SimplePingHandler } from './Handlers/SimplePingHandler'
import { SlapHandler } from './Handlers/SlapHandler'
import { LizError } from './LizError'
import IThenable = Promise.IThenable
import { SandwichHandler } from './Handlers/SandwichHandler'

export class MessageListener {
    private handlers: Handler[]

    constructor(private bot: Bot) {
        this.handlers = [
            new SimplePingHandler(bot),
            new SlapHandler(bot),
            new SandwichHandler(bot)
        ]
    }

    static withBot(bot: Bot): MessageListener {
        return new MessageListener(bot)
    }

    handle(message: any): IThenable<void> {
        return (new Promise((resolve) => resolve(new Message(message))))
            .then((message: Message) => {
                for (const handler of this.handlers) {
                    if (handler.understands(message)) {
                        if (!handler.throttled(message.user)) {
                            return handler.handle(message)
                        } else {
                            throw new LizError('Please be gentle, don\'t abuse me.', message.user)
                        }
                    }
                }
            })
            .catch((error: LizError) => {
                if (error.user) {
                    if (!error.message.match(/^__silent__/)) {
                        this.bot.sendDirectMessage(error.message, error.user)
                    }
                } else {
                    // system error, we don't want those silent
                    throw error
                }
            })
    }

    public addHandler(handler: Handler): void {
        this.handlers.push(handler)
    }
}
