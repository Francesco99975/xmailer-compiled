"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ccq_1 = require("../controllers/ccq");
const router = express_1.Router();
router.post("/mail-dev", ccq_1.onMailDev).post("/mail", ccq_1.onMail);
exports.default = router;
