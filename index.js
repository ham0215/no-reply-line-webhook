"use strict";

const line = require("@line/bot-sdk");
const crypto = require("crypto");

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const client = new line.Client(config);

exports.noReplyWebhook = (req, res) => {
  console.log("start webhook");
  console.log(req.body);

  const signature = crypto
    .createHmac("SHA256", config.channelSecret)
    .update(JSON.stringify(req.body))
    .digest("base64");

  if (signature != req.headers["x-line-signature"]) {
    console.log("invalid signature");
    res.status(400).end();
  } else {
    Promise.all(req.body.events.map(handleEvent))
      .then(result => res.json(result))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
  console.log("end webhook");
};

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: "text", text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}
