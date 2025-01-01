import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinery } from "../utils/cloudinary.js";
import { ApiResponse } from "..//utils/ApiResponse.js";

// refresh and access token generate
const gnerateAccessAndRefreshToken = async (userId) => {
  const user = User.findById(userId);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// registering user
const registerUser = asyncHandler(async (req, res) => {
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

// login user
const loginUser = asyncHandler(async (req, res) => {
  // gt the data from req body
  // chk that req filed is empty or not
  // chkc that user exit or not
  // check password is correct or not
  // gnerate access and refresh token
  // send cookies
  const { username, email, password, confPassword } = req.body;
  if (!(username || email)) {
    throw new ApiError(401, "user credentials required");
  }
  if (!(password || confPassword)) {
    throw new ApiError(401, "user password and confirm password required");
  }
  if (password !== confPassword) {
    throw new ApiError(401, "user password and confirm password not matched");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not registered");
  }

  const passwordMatch = await user.isPasswordCorrect(password);
  if (!passwordMatch) {
    throw new ApiError(401, "password does not matched");
  }

  const { accessToken, refreshToken } = await gnerateAccessAndRefreshToken(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  const logedInUser = User.findById(user._id).select("-password -refreshToken");

  res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          logedInUser,
          accessToken,
          refreshToken,
        },
        "user logged in successfully"
      )
    );
});

export { registerUser };
