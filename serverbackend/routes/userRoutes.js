import express from "express"

import { deleteUser,changeRole,getAlluser,removeFromPlaylist,
    addToPlaylist ,getAlluserforadmin,registerUser,loginUser,logoutUser,resetPassword,getMyprofile,changePassword,updateProfile,updateProfilePic,forgetPassword} from "../controller/userController.js"
import { authorizeAdmin, isAuthenticatedUser } from "../middleware/auth.js"
import singleUpload from "../middleware/multer.js"
const router=express.Router()

router.route("/user").get(getAlluser)
router.route("/registeruser").post(singleUpload,registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/me").get(isAuthenticatedUser,getMyprofile)
router.route("/changepassword").put(isAuthenticatedUser,changePassword)
router.route("/updateprofile").put(isAuthenticatedUser,updateProfile)
router.route("/updateprofilepic").put(isAuthenticatedUser,singleUpload,updateProfilePic)
router.route("/forgetpassword").post(forgetPassword)
router.route("/resetpassword/:token").put(resetPassword)
router.route("/addtoplaylist").post(isAuthenticatedUser,addToPlaylist)
router.route("/removefromplaylist").delete(isAuthenticatedUser,removeFromPlaylist)
// admin routes
router.route("/admin/users").get(isAuthenticatedUser,authorizeAdmin,getAlluserforadmin)
router.route("/admin/user/:id").put(isAuthenticatedUser,authorizeAdmin,changeRole).delete(isAuthenticatedUser,authorizeAdmin,deleteUser)

export default router