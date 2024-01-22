import express from "express"
import { login, addUser} from "../controllers/userController.js"

const route = express.Router()


route.post('/login',login)
route.post('/register',addUser)

export default route