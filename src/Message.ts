import { HandlerType } from './Handlers/HandlerType'

export class Message {
    constructor (private _type: HandlerType, private _message: any) {
    }

    get type() {
        return this._type
    }

    get content() {
        return this._message.text
    }

    get authorId() {
        return this._message.user
    }
}
