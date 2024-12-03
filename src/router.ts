import { Router } from "express";
import middleWare from "./middleware/middleware";
import adminController from "./controller";



const router = Router()

const adminAuth = new middleWare().adminAuth

const controller = new adminController()

router.post('/add-admin', adminAuth, controller.addAdmin)

router.get('/get-all-admins' , adminAuth , controller.getAllAdmins)

router.post('/login', controller.login)

router.delete('/delete-admin/:adminId', adminAuth, controller.deleteAdmin)

router.put('/suspend-admin/:adminId', adminAuth, controller.suspendAdmin)

router.post('/update-admin', adminAuth, controller.updateAdmin)

router.get('/check-token' , adminAuth , controller.checkToken)

export default router;