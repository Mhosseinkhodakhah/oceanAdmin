import { tokenizationInterface } from "./interfaces"
import jwt from 'jsonwebtoken'



export default class adminServices {

    async tokenize(data: Partial<tokenizationInterface>): Promise<string> {
        const token = jwt.sign(data, `${process.env.ACCESSKEY}`, { expiresIn: '12H' })
        return token
    }

}