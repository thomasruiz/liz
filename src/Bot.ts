import RtmClient = Slack.RtmClient
import RtmClientConstructor = Slack.RtmClientConstructor
import { MessageListener } from './MessageListener'
import { Throttler } from './Throttler'

export class Bot {
    private me: any
    private rtm: RtmClient

    constructor(private rtmClient: RtmClientConstructor, private rtmEvents: any, private clientEvents: any, private listener: typeof MessageListener) {
    }

    start(token: string, config: any) {
        const listener = this.listener.withBot(this, new Throttler)
        this.rtm = new this.rtmClient(token, config)

        this.rtm.start()
        this.rtm.on(this.clientEvents.RTM.AUTHENTICATED, this.initialize.bind(this))
        this.rtm.on(this.rtmEvents.MESSAGE, listener.handle.bind(listener))
    }

    sendMessage(message: string, to: string) {
        this.rtm.sendMessage(message, to)
    }

    sendDirectMessage(message: string, to: string) {
        const user = this.rtm.dataStore.getUserById(to)
        const dm = this.rtm.dataStore.getDMByName(user.name)
        this.sendMessage(message, dm.id)
    }

    getRealUserName(receiver: string): string {
        if (this.isId(receiver)) {
            receiver = '@' + this.rtm.dataStore.getUserById(receiver.substring(2, receiver.length - 1)).name
        }

        return receiver
    }

    private isId(value: string): boolean {
        return !!value.match(/<@[^>]+>/)
    }

    private initialize(rtmStartData: any) {
        this.me = rtmStartData.self
    }

    get id(): string {
        return this.me.id
    }

    get refId(): string {
        return `<@${this.id}>`
    }

    get name(): string {
        return this.me.name
    }
}
