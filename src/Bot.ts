import RtmClient = Slack.RtmClient
import RtmClientConstructor = Slack.RtmClientConstructor
import { MessageListener } from './MessageListener'

export class Bot {
    constructor(private rtmClient: RtmClientConstructor, private rtmEvents: any, private listener: typeof MessageListener) {
    }

    start(token: string, config: any) {
        const rtm: RtmClient = new this.rtmClient(token, config)
        const listener = this.listener.withRtm(rtm);

        rtm.start()
        rtm.on(this.rtmEvents.MESSAGE, listener.handle.bind(listener))
    }
}
