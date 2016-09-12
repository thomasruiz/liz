import { Message } from '../Message'
import RtmClient = Slack.RtmClient

export interface Handler {
    handle (message: Message): boolean
}
