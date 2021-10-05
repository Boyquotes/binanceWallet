require('dotenv').config();
const ccxt = require('ccxt');
const axios = require('axios');
const fs = require("fs-extra");

const walletAccount = async(binanceClient) => {
    const wallet = await binanceClient.fetchBalance();
    let obj = {};

    Object.entries(wallet.free).forEach(([key, value]) => {
        if(value > 0 && key != '1INCH'){
            var objC = {};
            objC = {free: value};
            obj[key] = objC;
        }
    })

    fs.writeJSON('portfolio.json',obj, function (err) {
      if (err) return console.log(err);
      console.log('Data write with success in portfolio.json');
    });
}

const run = () => {
	const binanceClient = new ccxt.binance({
		apiKey: process.env.API_KEY,
		secret: process.env.API_SECRET
	});

	walletAccount(binanceClient);
}

run();
