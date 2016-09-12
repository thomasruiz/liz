import * as chai from 'chai'
import { MessageParser } from '../src/MessageParser'
import { Bot } from '../src/Bot'
import { Message } from '../src/Message'
import { HandlerType } from '../src/Handlers/HandlerType'

const expect = chai.expect

describe('MessageParser', () => {
    let messageParser: MessageParser

    beforeEach(() => messageParser = new MessageParser(<Bot> <any> {id: 'U123'}))

    describe('parse', () => {
        it('should throw an error when the message is not known', () => {
            expect(messageParser.parse.bind(messageParser, {text: 'hellow'})).to.throw(Error, /^__silent__/)
        })

        it('should find interactions', () => {
            const rawMessage = {text: '<@U123> do something'}
            expect(messageParser.parse(rawMessage)).to.eql(new Message(HandlerType.INTERACTION, rawMessage))
        })
    })
})
