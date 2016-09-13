import { Bot } from '../src/Bot'
import * as slackClient from '@slack/client'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import RtmClient = Slack.RtmClient
import RtmClientConstructor = Slack.RtmClientConstructor
import SinonMock = Sinon.SinonMock
import SinonSpy = Sinon.SinonSpy
import SinonStub = Sinon.SinonStub

chai.use(sinonChai)

const expect = chai.expect

describe('Liz Bot', () => {
    let bot: Bot, rtmClient: RtmClient, listener: any
    let start: SinonSpy, on: SinonStub, sendMessage: SinonSpy, getUserById: SinonStub, getDMByName: SinonStub

    beforeEach(() => {
        const rtm = <RtmClientConstructor> <any> (() => rtmClient)
        start = sinon.spy()
        on = sinon.stub()
        sendMessage = sinon.spy()
        getUserById = sinon.stub()
        getDMByName = sinon.stub()
        rtmClient = <RtmClient> <any> { start, on, sendMessage, dataStore: {getUserById, getDMByName} }
        listener = {withBot: () => ({handle: sinon.spy()})}

        bot = new Bot(rtm, slackClient.RTM_EVENTS, slackClient.CLIENT_EVENTS, listener)
    })

    describe('start', () => {
        it('should listen to slack events', () => {
            bot.start('foo', {})
            expect(rtmClient.start).to.have.been.called
            expect(rtmClient.on).to.have.been.calledWithMatch(slackClient.CLIENT_EVENTS.RTM.AUTHENTICATED, sinon.match.func)
            expect(rtmClient.on).to.have.been.calledWithMatch(slackClient.RTM_EVENTS.MESSAGE, sinon.match.func)
        })
    })

    describe('sendDirectMessage', () => {
        it('should find the user DM channel and send the message to it', () => {
            bot.start('foo', {})
            getUserById.withArgs('UID').returns({name: 'NAME'})
            getDMByName.withArgs('NAME').returns({id: 'CID'})
            bot.sendDirectMessage('message', 'UID')
            expect(sendMessage).to.have.been.calledWith('message', 'CID')
        })
    })

    describe('sendMessage', () => {
        it('should send the message to the channel', () => {
            bot.start('foo', {})
            bot.sendMessage('message', 'CID')
            expect(sendMessage).to.have.been.calledWith('message', 'CID')
        })
    })

    describe('initializer and getters', () => {
        it('should retrieve self data', () => {
            on.withArgs(slackClient.CLIENT_EVENTS.RTM.AUTHENTICATED).yields({self: {id: 'BID', name: 'liz'}})
            bot.start('foo', {})
            expect(bot.id).to.equal('BID')
            expect(bot.name).to.equal('liz')
        })
    })
})
