import express from 'express';
import axios from 'axios';
import cors from 'cors';
import Coinpayments from 'coinpayments';
import bodyParser from 'body-parser';
import mongoose, {Schema} from 'mongoose';

const mongoDB = 'mongodb+srv://Ahb2217:Ahb2217@cluster0.sdsmyft.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(mongoDB, {useNewUrlParser : true, useUnifiedTopology : true} as any, () => {
	console.log('connected to database');
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


const client = new Coinpayments({ key : 'dc13ab8730e208bf5d1d11a29f89e8813e181a8b282dbb80f1108111f9c3434b', secret : '15a049e422f383Eb35e0873A71023c2eD3afc3D734F8d1617e9fb7FcbA86fd9C'});

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE']
}));

// app.use(bodyParser.urlencoded({extended : true}));

app.get('/', (req, res) => {
	res.send("Welcome to backend!");
})

app.get('/getCoins', async (req, res) => {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': 'f045fcd8-8304-45a5-8c70-de299dd08f55',
      },
    });
    res.json(response.data)
})

app.get('/getRates', async(req, res) => {
	const response = await client.rates({short : 0, accepted : 2});
	res.json(response);
})

app.get('/getBalances', async(req, res) => {
	const response = await client.balances({all : 0});
	res.json(response);
})


app.post('/createTx/:name/:amount', async(req, res) => {
	const { name, amount} = req.params;
	const response = await client.createTransaction({currency1 : 'USD', currency2 : name, amount : Number(amount), buyer_email : 'skysteerc@gmail.com'});
	return res.json(response);
})

app.get('/getTx', async(req, res) => {
	let data = [];
	const response = await client.getTxList();
	for(var val of response){
		const result = await client.getTx({txid : val});
		data.push({...result, ...{txid: val}});
	}	
	res.json(data);
		
})

app.get('/getInfo', async(req,  res) => {
	const response = await client.getBasicInfo();
	res.json(response);
})

app.get('/final', async(req, res) => {
	const response = await client.createWithdrawal({amount : 4.03, currency : 'XMR', address : '88LPTtNm6t8EPpoEKdfrNmK8W44uBEJ7FXc5Vdb3P15o65DnfLB4fAAUoAUL41A6Tj9991fQJBdArfXVANyPm6M52LxFa7o', auto_confirm : 1});
	res.json(response);
})

app.listen(8080, () => {
    console.log('Server is listening on prot 8080');
});