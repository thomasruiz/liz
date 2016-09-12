export class Message {
    constructor (private _message: any) {
    }

    get content() {
        return this._message.text
    }

    get user() {
        return this._message.user
    }

    get channel() {
        return this._message.channel
    }
}
