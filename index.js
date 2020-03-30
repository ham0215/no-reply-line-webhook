'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

const app = express();


exports.noReplyWebhook = (req, res) => {
  console.log('start webhook');
  res.send('Hello, World');
  console.log('end webhook');
};
