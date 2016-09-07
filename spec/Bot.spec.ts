import { Bot } from '../src/Bot'
import * as slackClient from '@slack/client'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import RtmClient = Slack.RtmClient
import RtmClientConstructor = Slack.RtmClientConstructor
import SinonMock = Sinon.SinonMock

chai.use(sinonChai)

const expect = chai.expect

describe('Liz Bot', () => {
    let bot: Bot, rtmClient: RtmClient, listener: any

    beforeEach(() => {
        rtmClient = <RtmClient> <any> {start: sinon.spy(), on: sinon.spy()}
        listener = {withRtm: () => ({handle: sinon.spy()})}

        bot = new Bot(<RtmClientConstructor> <any> (() => rtmClient), slackClient.RTM_EVENTS, listener)
    })

    describe('start', () => {
        it('should listen to slack events', () => {
            bot.start('foo', {})
            expect(rtmClient.start).to.have.been.called
            expect(rtmClient.on).to.have.been.calledWithMatch(slackClient.RTM_EVENTS.MESSAGE, sinon.match.func)
        })
    })
})
