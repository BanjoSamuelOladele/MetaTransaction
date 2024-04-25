require("dotenv").config();
const {gaslessTransaction, relayerServicePrivateKeyy} = require("./gaslessTransaction");

const express = require('express');
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("common"));
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