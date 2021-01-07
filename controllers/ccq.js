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
exports.onMailDev = exports.onMail = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_mailgun_transport_1 = __importDefault(require("nodemailer-mailgun-transport"));
const handlebars_1 = __importDefault(require("handlebars"));
const smtpTransport = nodemailer_1.default.createTransport(nodemailer_mailgun_transport_1.default({ auth: { api_key: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN } }));
const onMailDev = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const covidInfo = req.body;
    try {
        const emailTemplateSource = yield promises_1.default.readFile(path_1.default.join(__dirname, "../templates/ccq.hbs"), "utf8");
        const template = handlebars_1.default.compile(emailTemplateSource);
        // console.log(template({covidInfo, color: covidInfo.passed ? 'green' : 'red', result: covidInfo.passed ? 'PASSED' : 'FAILED'}));
        const mailOptions = {
            from: "Cataldi Covid Questionnaire <noreply@ccq.com>",
            to: process.env.DEV_RECEPIENT,
            subject: "Questionnaire COVID-19",
            html: template({ covidInfo, color: covidInfo.passed ? 'green' : 'red', result: covidInfo.passed ? 'PASSED' : 'FAILED' })
        };
        yield smtpTransport.sendMail(mailOptions);
    }
    catch (error) {
        return res.json({ message: "email Error!", error: error.message });
    }
    return res.json({ message: "Email Sent!" });
});
exports.onMailDev = onMailDev;
const onMail = (req, res, next) => {
    console.log("Mail");
    return res.json({ message: "mail" });
};
exports.onMail = onMail;
