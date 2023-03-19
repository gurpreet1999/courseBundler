import express from "express"
import { getallCousrse,createcourse,getCourseLectures ,addLecture,deleteCourse, deleteLecture} from "../controller/courseController.js"
import { authorizeAdmin, authorizeSubscribers } from "../middleware/auth.js"
import singleUpload from "../middleware/multer.js"
import { isAuthenticatedUser } from "../middleware/auth.js"
const router=express.Router()
// get all course without lecture
router.route("/course").get(getallCousrse)

// create course -- admin only 

router.route("/createcourse").post(isAuthenticatedUser,authorizeAdmin,singleUpload,createcourse)
router.route("/course/:id").get(isAuthenticatedUser,authorizeSubscribers,getCourseLectures).
post(isAuthenticatedUser,authorizeAdmin,singleUpload,addLecture).
delete(isAuthenticatedUser,authorizeAdmin,deleteCourse)



router.route("/lecture").delete(isAuthenticatedUser,authorizeAdmin,deleteLecture)


/// add lecture, delete lecture, get course detail
// delete course



export default router