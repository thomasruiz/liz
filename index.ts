/// <reference path="interfaces/slack.client.d.ts"/>
import { Bot } from './src/Bot'
import * as slackClient from '@slack/client'
import { MessageListener } from './src/MessageListener'

const bot = new Bot(slackClient.RtmClient, slackClient.RTM_EVENTS, slackClient.CLIENT_EVENTS, MessageListener)

bot.start(process.env.SLACK_API_TOKEN, {logLevel: 'debug'})
