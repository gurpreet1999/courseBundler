import express from "express"

import { buySubscription,getRazorpaykey,paymentVerification,cancelSubscription } from "../controller/paymentController.js"
import { isAuthenticatedUser } from "../middleware/auth.js"
const router=express.Router()


// buy subscription


router.route("/subscribe").get(isAuthenticatedUser,buySubscription)

router.route("/paymentverfication").post(isAuthenticatedUser,paymentVerification)


// razorpay key
router.route("/razorpaykey").get(getRazorpaykey)

router.route("/cancelsubscription").delete(isAuthenticatedUser,cancelSubscription)

export default router