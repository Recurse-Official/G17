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
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const expenseRoute_1 = __importDefault(require("./routes/expenseRoute"));
const promise_1 = __importDefault(require("mysql2/promise"));
const demandController_1 = require("./controller/demandController");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
const port = process.env.port || 3001;
app.use("/", dashboardRoutes_1.default);
app.use("/products", productRoutes_1.default);
app.use("/users", usersRoute_1.default);
app.use("/expenses", expenseRoute_1.default);
// app.use("");
app.use('/priceAnalysis', demandController_1.getDemandData);
const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://inventory:inventory@cluster0.7tx93.mongodb.net/comments?retryWrites=true&w=majority&appName=Cluster0";
const db = promise_1.default.createPool({
    host: "localhost",
    user: "your_username",
    password: "your_password",
    database: "your_database",
});
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log("Connected Successfully"); })
    .catch((err) => console.log(err));
app.get('/hi', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("helo");
}));
app.listen(port, () => {
    console.log("sevrer is started");
});
