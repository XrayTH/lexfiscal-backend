import {Router} from "express"
import {getFramework} from "../controllers/framework.controller.js"

const router=Router()

router.get("/framework",getFramework)

export default router
