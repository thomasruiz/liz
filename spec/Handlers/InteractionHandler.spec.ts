import * as chai from 'chai'
import { InteractionHandler } from '../../src/Handlers/InteractionHandler'
import { Bot } from '../../src/Bot'
import { Message } from '../../src/Message'
import { HandlerType } from '../../src/Handlers/HandlerType'

const expect = chai.expect

describe('InteractionHandler', () => {
    describe('handle', () => {
        it('should throw an error on unknown interactions', () => {
            const handler = new InteractionHandler(<Bot> <any> {})
            const message = new Message(HandlerType.INTERACTION, {text: '@liz unknown_command'})

            expect(handler.handle.bind(handler, message)).to.throw(Error, /help.*github/)
        })
    })
})
