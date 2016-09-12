declare namespace Slack {
    import EventEmitter = NodeJS.EventEmitter
    import Ipromise = Promise.Ipromise

    interface Client {
        CLIENT_EVENTS: ClientEvents
        RtmClient: RtmClientConstructor
        RTM_EVENTS: RtmEvents
    }

    interface ClientEvents {
        RTM: {AUTHENTICATED: string}
    }

    interface RtmEvents {
        MESSAGE: string
    }

    interface RtmClient {
        dataStore: DataStore
        start (): Ipromise
        on (event: string, listener: Function): this
        sendMessage (message: string, receiverId: string, callback?: Function): Ipromise
    }

    interface DataStore {
        getUserById(id: string): User
        getDMByName(name: string): Channel
    }

    interface User {
        id: string
        name: string
    }

    interface Channel {
        id: string
    }

    interface RtmClientConstructor {
        new (token: string, config: any): RtmClient
    }
}

declare const slack: Slack.Client

declare module '@slack/client' {
    export = slack
}
