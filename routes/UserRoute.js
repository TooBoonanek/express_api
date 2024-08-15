import express from "express";
import { UserSignIn, UserSignUp } from "../controllers/UserController.js";

const UserRoute = express.Router();

// User Signup - POST with req.body
UserRoute.post('/signup', UserSignUp);

UserRoute.post('/signin', UserSignIn);

export default UserRoute;