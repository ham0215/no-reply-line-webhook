"use strict";

exports.noReplyWebhook = (req, res) => {
  console.log('start webhook');
  res.send('Hello, World');
  console.log('end webhook');
};
