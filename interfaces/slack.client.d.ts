declare namespace Slack {
    import EventEmitter = NodeJS.EventEmitter
    import Ipromise = Promise.Ipromise

    interface Client {
        RtmClient: RtmClientConstructor
        RTM_EVENTS: any
    }

    interface RtmClient {
        start (): Ipromise
        on (event: string, listener: Function): this
        sendMessage (message: string, receiverId: string, callback?: Function): Ipromise
    }

    interface RtmClientConstructor {
        new (token: string, config: any): RtmClient
    }
}

declare var slack: Slack.Client

declare module "@slack/client" {
    export = slack
}
