import { Handler } from './Handler'
import { Bot } from '../Bot'
import { Message } from '../Message'

export class InteractionHandler implements Handler {
    constructor(private bot: Bot) {
    }

    handle(message: Message): boolean {
        throw new Error(`Err.. What are you saying?
If you want some help on how to use me, you can check my source code: https://github.com/thomasruiz/liz`)
    }
}
