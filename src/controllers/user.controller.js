import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinery } from "../utils/cloudinary.js";
import { ApiResponse } from "..//utils/ApiResponse.js";

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
    (val) => val?.trim() === ""
    // (key , val) => console.log(key ,val)
  );
  if (emptyVal) {
    // console.log("hey");
    throw new ApiError(400, "All feilds are required");
  }

  // console.log(User);
  const existUser = await User.findOne({
    $or: [{ fullName }, { email }],
  });
  // console.log(existUser);

  if (existUser) {
    throw new ApiError(400, "User already exit please login");
  }

  // console.log(req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  console.log("hey", req.files);
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(401, "Avatar is required");
  }

  const avatar = await uploadOnCloudinery(avatarLocalPath);
  const coverImage = await uploadOnCloudinery(coverImageLocalPath);

  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
  });
  console.log(user);

  const responsUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!responsUser) {
    throw new ApiError(201, "something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, responsUser, "user registered successfully"));
});

