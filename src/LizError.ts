export class LizError extends Error {
    constructor(public message: string, public user: string) {
        super(message)
    }
}
