// signUp, login, logout, logOut all devices;

import { userRegistration, userLogin, userLogOut, logoutAllDevices } from "./user.controller.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/users/signup", (req, res) => {
    userRegistration(req, res);
});

authRouter.post("/users/signin", (req, res) => {
    userLogin(req, res);
});

authRouter.post("/users/logout", (req, res) => {
    userLogOut(req, res);
});

authRouter.post("/users/logout-all-devices", (req, res) => {
    logoutAllDevices(req, res);
});

export default authRouter;