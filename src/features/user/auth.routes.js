// signUp, login, logout, logOut all devices;

import { userRegistration, userLogin, userLogOut, logoutAllDevices } from "./user.controller.js";
import express from "express";

const router = express.Router();

router.post("/users/signup", (req, res) => {
    userRegistration(req, res);
});

router.post("/users/signin", (req, res) => {
    userLogin(req, res);
});

router.post("/users/logout", (req, res) => {
    userLogOut(req, res);
});

router.post("/users/logout-all-devices", (req, res) => {
    logoutAllDevices(req, res);
});