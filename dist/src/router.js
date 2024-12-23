"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("./middleware/middleware"));
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
const adminAuth = new middleware_1.default().adminAuth;
const controller = new controller_1.default();
router.post('/add-admin', adminAuth, controller.addAdmin);
router.get('/get-all-admins', adminAuth, controller.getAllAdmins);
router.post('/login', controller.login);
router.delete('/delete-admin/:adminId', adminAuth, controller.deleteAdmin);
router.put('/suspend-admin/:adminId', adminAuth, controller.suspendAdmin);
router.post('/update-admin', adminAuth, controller.updateAdmin);
router.get('/check-token', adminAuth, controller.checkToken);
exports.default = router;
