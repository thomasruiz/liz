import { Message } from '../Message'
import RtmClient = Slack.RtmClient

export interface Handler {
    understands(message: Message): boolean
    handle (message: Message): void
}
