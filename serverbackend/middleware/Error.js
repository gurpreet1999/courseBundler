
 const Errormiddleware=(err,req,res,next)=>{

    err.statuscode=err.statuscode|| 500
    err.message=err.message || "internal server error"  // ek baat suno ... error jab mi hum pass krte he ya throw krte he usme.. hum mesage de sakte he lekin status code jaisa kuch nai hota he error me
//iske ke liye hume ek custom error handler wali class banani hogi instead..  of usinf inbuilt Error Class of nodejs
    res.status(err.statuscode).json({
        success:false,
        message:err.message,
    })


}


export default Errormiddleware
 // is ka pehla parameter error he......hume next ko call krte samay error pass krna hoga

// isse kya hoga ki .. jab me next ko call kruga and koi middleware bacha nai hoga to ye wla call ho jayega













