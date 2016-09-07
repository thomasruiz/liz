import { MessageListener } from '../src/MessageListener'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import RtmClient = Slack.RtmClient

chai.use(sinonChai)

const expect = chai.expect

describe('MessageListener', () => {
    describe('factories', () => {
        it('shouldBuildWithAnInstanceOfRtmClient', () => {
            const listener = MessageListener.withRtm(<RtmClient> <any> 'client')
            expect(listener).to.eql(new MessageListener(<RtmClient> <any> 'client'))
        })
    })

    describe('handle', () => {
        let listener: MessageListener, rtmClient: RtmClient

        beforeEach(() => {
            rtmClient = <RtmClient> <any> {sendMessage: sinon.spy()}
        })

        it('should handle the top secret message', () => {
            listener = new MessageListener(rtmClient)
            listener.handle({text: 'TOP SECRET: liz, are you here?', channel: 'id'})
            expect(rtmClient.sendMessage).to.have.been.calledWith('Typescript suits me, don\'t you think?', 'id')
        })
    })
})
