import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

export const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  // console.log(req.body);
  const { fullName, email, username, password } = req.body;

  //checking empty is or not
  const emptyVal = [fullName, email, username, password].some(
    // val => console.log(typeof(val))
    (val) => val.trim() === ""
    // (key , val) => console.log(key ,val)
  );
  if (emptyVal) {
    // console.log("hey");
    throw new ApiError(400, "All feilds are required");
  }

  // console.log(User);
  const existUser = User.findOne({
    $or: [{ fullName }, { email }],
  });

  if (existUser) {
    throw new ApiError(400 , "User already exit please login")    
  }

  return res.status(201).json({
    message: "ey",
  });
});
