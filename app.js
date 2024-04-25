require("dotenv").config();
const {gaslessTransaction, relayerServicePrivateKeyy} = require("./gaslessTransaction");

const express = require('express');
const app = express()

app.get("/first", function(req, res) {
    res.send("learning is fun and interesting...");
});

app.post('/gasless-transaction', async (req, res) => {
    const {functionName, toAddress, value} = req.body;
    try {
        const receipt = await gaslessTransaction(functionName, toAddress, value);
        res.status(200).json(receipt);
    } catch (error) {
        res.status(500).json(error);
    }
});



console.log(process.env.RPC_SEPOLIA);
// console.log("loaded", relayerServicePrivateKeyy());
app.listen(3001, () => {
    console.log('Server listening on port 3000');
});