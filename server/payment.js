const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
require("dotenv").config();
const express = require("express");
const app = express();

const payment = () => {
  app.post("/create-payment-intent", async (req, res) => {
    const item = req.body;
    console.log("item", item);
    const { price } = item;
    const amount = price * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
};
module.exports = { payment };
