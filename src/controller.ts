import adminServices from "./adminServices";
import adminModel from "./DB/models/admin";
import { response } from "./service/responseService";
import bcrypt from 'bcrypt'


const service = new adminServices()


export default class adminController {
    async login(req: any, res: any, next: any) {
        const admin = await adminModel.findOne({ userName: req.body.userName })
        if (!admin) {
            return next(new response(req, res, 'login admin', 404, 'userName is incorrect!', null))
        }
        const password = admin.password
        const compare = await bcrypt.compare(req.body.password, password)
        if (!compare) {
            return next(new response(req, res, 'login', 403, 'password is incorrect!', null))
        }

        const data = {
            userName: admin.userName,
            firstName: admin.firstName,
            lastName: admin.lastName,
            role: admin.role,
        }
        const token = await service.tokenize(data)
        return next(new response(req, res, 'login', 200, null, { ...data, token: token }))
    }


    async addAdmin(req: any, res: any, next: any) {
        const admin = req.user.role;
        if (admin != 1) {
            return next(new response(req, res, 'add admin', 403, 'you can not add new admin! just super admin can add new admin', null))
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        await adminModel.create(req.body)
        return next(new response(req, res, 'add admin', 200, null, 'new admin created successfully'))
    }


    async deleteAdmin(req: any, res: any, next: any) {
        const admindRole = req.user.role;
        if (admindRole != 1) {
            return next(new response(req, res, 'add admin', 403, 'you can not add new admin! just super admin can add new admin', null))
        }
        const admin = await adminModel.findById(req.params.adminId)
        if (!admin){
            return next(new response(req, res, 'add admin', 404, 'this admin is not exist on database', null))
        }
        await admin.deleteOne()
        return next(new response(req, res, 'add admin', 200, null, 'admin deleted successfull'))
    }

    
    async updateAdmin(req: any, res: any, next: any) {
        const admin = req.user.role;
        if (admin != 1) {
            return next(new response(req, res, 'add admin', 403, 'you can not add new admin! just super admin can add new admin', null))
        }
    }



}