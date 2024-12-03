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
const adminServices_1 = __importDefault(require("./adminServices"));
const admin_1 = __importDefault(require("./DB/models/admin"));
const responseService_1 = require("./service/responseService");
const bcrypt_1 = __importDefault(require("bcrypt"));
const service = new adminServices_1.default();
class adminController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield admin_1.default.findOne({ userName: req.body.userName });
            if (!admin) {
                return next(new responseService_1.response(req, res, 'login admin', 204, 'userName is incorrect!', null));
            }
            const password = admin.password;
            const compare = yield bcrypt_1.default.compare(req.body.password, password);
            if (!compare) {
                return next(new responseService_1.response(req, res, 'login', 403, 'password is incorrect!', null));
            }
            const data = {
                userName: admin.userName,
                firstName: admin.firstName,
                lastName: admin.lastName,
                role: admin.role,
            };
            const token = yield service.tokenize(data);
            return next(new responseService_1.response(req, res, 'login', 200, null, Object.assign(Object.assign({}, data), { token: token })));
        });
    }
    addAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = req.user.role;
            if (admin != 1) {
                return next(new responseService_1.response(req, res, 'add admin', 403, 'you can not add new admin! just super admin can add new admin', null));
            }
            req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
            yield admin_1.default.create(req.body);
            return next(new responseService_1.response(req, res, 'add admin', 200, null, 'new admin created successfully'));
        });
    }
    deleteAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const admindRole = req.user.role;
            if (admindRole != 1) {
                return next(new responseService_1.response(req, res, 'add admin', 403, 'you can not add new admin! just super admin can add new admin', null));
            }
            const admin = yield admin_1.default.findById(req.params.adminId);
            if (!admin) {
                return next(new responseService_1.response(req, res, 'add admin', 204, 'this admin is not exist on database', null));
            }
            yield admin.deleteOne();
            return next(new responseService_1.response(req, res, 'add admin', 200, null, 'admin deleted successfull'));
        });
    }
    suspendAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const admindRole = req.user.role;
            if (admindRole != 1) {
                return next(new responseService_1.response(req, res, 'add admin', 403, 'you can not add new admin! just super admin can add new admin', null));
            }
            const admin = yield admin_1.default.findById(req.params.adminId);
            if (!admin) {
                return next(new responseService_1.response(req, res, 'add admin', 204, 'this admin is not exist on database', null));
            }
            if ((admin._id).toString() == req.user.id) {
                return next(new responseService_1.response(req, res, 'add admin', 204, 'you cant suspend yourself . . .', null));
            }
            if (admin.suspended) {
                yield admin.updateOne({ suspended: false });
                yield admin.save();
                return next(new responseService_1.response(req, res, 'unSuspend admin', 200, null, 'admin unSuspended successfull'));
            }
            else {
                yield admin.updateOne({ suspended: true });
                yield admin.save();
                return next(new responseService_1.response(req, res, 'Suspend admin', 200, null, 'admin Suspended successfull'));
            }
        });
    }
    getAllAdmins(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const admins = yield admin_1.default.find();
            return next(new responseService_1.response(req, res, 'get all admins', 200, null, admins));
        });
    }
    updateAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = req.user.role;
            if (admin != 1) {
                return next(new responseService_1.response(req, res, 'add admin', 403, 'you can not add new admin! just super admin can add new admin', null));
            }
        });
    }
    checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.user.id;
            const admin = yield admin_1.default.findById(id);
            return next(new responseService_1.response(req, res, 'check token', 200, null, { admin }));
        });
    }
}
exports.default = adminController;
