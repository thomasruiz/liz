import { Message } from '../Message'
import { Bot } from '../Bot'
import RtmClient = Slack.RtmClient

export abstract class Handler {
    private throttledUsers: {[id: string]: number} = {}

    constructor(protected bot: Bot) {
    }

    abstract understands(message: Message): boolean

    abstract handle(message: Message): void

    throttled(user: string): boolean {
        const now = (new Date()).getTime()
        return typeof this.throttledUsers[user] !== 'undefined' && this.throttledUsers[user] >= now
    }

    throttle(user: string, seconds: number): void {
        this.throttledUsers[user] = (new Date()).getTime() + seconds * 1000
    }
}
