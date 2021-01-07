"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const ccq_1 = __importDefault(require("./routes/ccq"));
let result = dotenv_1.default.config();
if (result.error) {
    console.log(result.error);
}
const app = express_1.default();
const PORT = process.env.PORT || 3000;
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, "access.log"), { flags: "a" });
app.use(helmet_1.default()); // Security Headers
app.use(compression_1.default()); // Performance Impovement
app.use(morgan_1.default("combined", { stream: accessLogStream })); //Logging
app.use(cors_1.default({ origin: "ccq.francescobarranca.dev", optionsSuccessStatus: 200 }));
app.use(body_parser_1.default.json());
app.use('/ccq', ccq_1.default);
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
