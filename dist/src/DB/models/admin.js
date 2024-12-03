"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    userName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    suspended: { type: Boolean, default: false },
    phoneNumber: { type: String, default: '' },
    role: { type: Number }, // 0 : admin    1 : superAdmin
});
const adminModel = (0, mongoose_1.model)('admin', adminSchema);
exports.default = adminModel;
