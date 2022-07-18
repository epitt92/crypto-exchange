"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const coinpayments_1 = __importDefault(require("coinpayments"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDB = 'mongodb+srv://Ahb2217:Ahb2217@cluster0.sdsmyft.mongodb.net/?retryWrites=true&w=majority';
mongoose_1.default.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to database');
});
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const client = new coinpayments_1.default({ key: 'dc13ab8730e208bf5d1d11a29f89e8813e181a8b282dbb80f1108111f9c3434b', secret: '15a049e422f383Eb35e0873A71023c2eD3afc3D734F8d1617e9fb7FcbA86fd9C' });
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE']
}));
// app.use(bodyParser.urlencoded({extended : true}));
app.get('/', (req, res) => {
    res.send("Welcome to backend!");
});
app.get('/getCoins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
            'X-CMC_PRO_API_KEY': 'f045fcd8-8304-45a5-8c70-de299dd08f55',
        },
    });
    res.json(response.data);
}));
app.get('/getRates', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.rates({ short: 0, accepted: 2 });
    res.json(response);
}));
app.get('/getBalances', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.balances({ all: 0 });
    res.json(response);
}));
app.post('/createTx/:name/:amount', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, amount } = req.params;
    const response = yield client.createTransaction({ currency1: 'USD', currency2: name, amount: Number(amount), buyer_email: 'skysteerc@gmail.com' });
    return res.json(response);
}));
app.get('/getTx', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = [];
    const response = yield client.getTxList();
    for (var val of response) {
        const result = yield client.getTx({ txid: val });
        data.push(Object.assign(Object.assign({}, result), { txid: val }));
    }
    res.json(data);
}));
app.get('/getInfo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.getBasicInfo();
    res.json(response);
}));
app.get('/final', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield client.createWithdrawal({ amount: 4.03, currency: 'XMR', address: '88LPTtNm6t8EPpoEKdfrNmK8W44uBEJ7FXc5Vdb3P15o65DnfLB4fAAUoAUL41A6Tj9991fQJBdArfXVANyPm6M52LxFa7o', auto_confirm: 1 });
    res.json(response);
}));
app.listen(8080, () => {
    console.log('Server is listening on prot 8080');
});
