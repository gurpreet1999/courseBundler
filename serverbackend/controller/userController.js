import { USER } from "../models/User.js";
import errorHandler from "../utils/errorHandler.js";
import { CatchasyncError } from "../middleware/CatchasyncError.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { COURSE } from "../models/Course.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "cloudinary";
import { STATS } from "../models/Stats.js";

export const getAlluser = async (req, res, next) => {
  const users = await USER.find().select("-password");
  res.status(200).json({
    success: true,
    users,
  });
};

export const registerUser = CatchasyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const file = req.file;

  console.log(name, email, password, file);

  if (!name || !email || !password || !file) {
    return next(new errorHandler("please add all the filed ", 400));
  }
  let singleuser = await USER.findOne({ email });
  if (singleuser) return next(new errorHandler("User alrady exist ", 409));

  const fileuri = getDataUri(file);
  console.log(fileuri);
  const myCloud = await cloudinary.v2.uploader.upload(fileuri.content);

  const user = await USER.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.url,
    },
  });

  // const token=user.getJWTtoken()

  sendToken(res, user, "registered Successfully", 201);
});

// login

export const loginUser = CatchasyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given password and email both

  if (!email || !password) {
    return next(new errorHandler("please enter password or email", 400));
  }

  const user = await USER.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new errorHandler("Invalid email or password", 401));
  }

  const ispasswordMatched = await user.comparePassword(password); //user hume specifically choose krna hoga..hume pure collction par thodi na ye function dena he .. hume sirf each modal(document)  par aply krna he

  if (!ispasswordMatched) {
    return next(new errorHandler("Invalid email or password", 401));
  }

  sendToken(res, user, "logined Successfully", 201);
});

// logout

export const logoutUser = CatchasyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out Successfully",
    });
});

// me

export const getMyprofile = CatchasyncError(async (req, res, next) => {
  const user = await USER.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

export const changePassword = CatchasyncError(async (req, res, next) => {
  const { oldpassword, newpassword } = req.body;

  if (!oldpassword || !newpassword) {
    return next(new errorHandler("please enter all Field", 400));
  }
  const user = await USER.findById(req.user._id).select("+password");

  const ispasswordMatched = await user.comparePassword(oldpassword); //user hume specifically choose krna hoga..hume pure collction par thodi na ye function dena he .. hume sirf each modal(document)  par aply krna he
  if (!ispasswordMatched) {
    return next(new errorHandler("incorrect old password", 401));
  }
  user.password = newpassword;
  await user.save(); // dubara hash krne ki jarurat nai he because jab jb user save hoga tab tab presave kr rakha he humne ki pasword ko hash kr dena

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

// update profile

export const updateProfile = CatchasyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await USER.findById(req.user._id);

  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }

  await user.save(); // dubara hash krne ki jarurat nai he because jab jb user save hoga tab tab presave kr rakha he humne ki pasword ko hash kr dena

  res.status(200).json({
    success: true,
    message: "Profile updated Successfully",
  });
});

//update profile pic

export const updateProfilePic = CatchasyncError(async (req, res, next) => {
  const user = await USER.findById(req.user._id);

  const file = req.file;
  const fileuri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileuri.content);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile picture  changed Successfully",
  });
});

/////////////////////// //////// forgrt password

export const forgetPassword = CatchasyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await USER.findOne({ email });

  if (!user) {
    return next(new errorHandler("user not found ", 404));
  }
  //
  const resettoken = await user.getResetToken();

  await user.save();
  // send token via email
  const resetpasswordurl = `${process.env.FRONTEND_URL}/resetpassword/${resettoken}`;
  const messages = `click on the link to reset your password :- \n\n ${resetpasswordurl}`;
  await sendEmail(user.email, "Reset password ", messages);

  res.status(200).json({
    success: true,
    message: `Reset Token has been sent to ${user.email}`,
  });
});

// reset password

export const resetPassword = CatchasyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await USER.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    return next(new errorHandler("Token is invalid or has been expired ", 401));
  }

  user.password = req.body.password;

  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  await user.save();

  res.status(200).json({
    success: true,
    message: `password changed successfully`,
    token,
  });
});

// ADD TO PLAYLIST

export const addToPlaylist = CatchasyncError(async (req, res, next) => {
  const user = await USER.findById(req.user._id);

  if (!user) {
    return next(new errorHandler("loggin to access the resource ", 401));
  }

  const course = await COURSE.findById(req.body.id);

  if (!course) {
    return next(new errorHandler("invalid course id ", 404));
  }
  const itemexist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) {
      return true;
    }
  });

  if (itemexist) {
    return next(new errorHandler("already added to playlist ", 409));
  }

  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });
  await user.save();
  res.status(200).json({
    success: true,
    message: `Added to playlist`,
  });
});

// remove from playlist

export const removeFromPlaylist = CatchasyncError(async (req, res, next) => {
  const user = await USER.findById(req.user._id);

  if (!user) {
    return next(new errorHandler("loggin to access the resource ", 401));
  }

  const course = await COURSE.findById(req.query.id);

  if (!course) {
    return next(new errorHandler("invalid course id ", 404));
  }

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });

  user.playlist = newPlaylist;
  await user.save();
  res.status(200).json({
    success: true,
    message: `removed from playlist`,
  });
});

// admin route

export const getAlluserforadmin = CatchasyncError(async (req, res, next) => {
  const users = await USER.find({});

  res.status(200).json({
    success: true,

    users,
  });
});

export const changeRole = CatchasyncError(async (req, res, next) => {
  const user = await USER.findById(req.params.id);
  if (!user) {
    return next(new errorHandler("user not found ", 404));
  }
  if (user.role === "user") {
    user.role = "admin";
  } else {
    user.role = "user";
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "role updated successfully ",
  });
});

export const deleteUser = CatchasyncError(async (req, res, next) => {
  const user = await USER.findById(req.params.id);
  if (!user) {
    return next(new errorHandler("user not found ", 404));
  }

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  await user.remove();

  // cancel subscription
  res.status(200).json({
    success: true,
    message: "user deleted successfully ",
  });
});

USER.watch().on("change", async () => {
  const stats = await STATS.find({}).sort({ createdAt: "desc" }).limit(1);

  const Usersubscription = await USER.find({ "subscription.status": "active" });
  stats[0].subscriptions = Usersubscription.length;
  stats[0].users = await USER.countDocuments();
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save();
});
