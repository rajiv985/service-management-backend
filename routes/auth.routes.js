import { register,login,getProfile} from "../controllers/auth.controllers.js";  
import { verifyUser } from "../middleware/auth.middleware.js";
import { Router } from "express"; 

const router= Router();

router.route("/register").post(register)
router.route("/login").post(login)  
router.route("/profile").get(verifyUser,getProfile)


export default router;