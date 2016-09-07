import RtmClient = Slack.RtmClient;

export class MessageListener {
    constructor(private rtmClient: RtmClient) {
    }

    static withRtm(rtm: RtmClient): MessageListener {
        return new MessageListener(rtm)
    }

    handle(message: any) {
        if (message.text === 'TOP SECRET: liz, are you here?') {
            this.rtmClient.sendMessage('Typescript suits me, don\'t you think?', message.channel)
        }
    }
}
