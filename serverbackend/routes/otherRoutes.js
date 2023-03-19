import express from "express"
import { contact, courseRequest, dashboardStats } from "../controller/otherController.js"
import { authorizeAdmin, isAuthenticatedUser } from "../middleware/auth.js"


const router=express.Router()


// conatct form 
router.route("/contact").post(contact)

router.route("/courserequest").post(courseRequest)

// grt admin dashboard stats
router.route("/admin/stats").get(isAuthenticatedUser,authorizeAdmin,dashboardStats)
export default router