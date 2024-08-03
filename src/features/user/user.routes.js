import express from "express";
import { getDetails, getAllDetails, updateDetails } from "./user.controller.js";

const router = express.Router();


router.post("/users/get-details/:userId", (req, res) => {
    getDetails(req, res);
});

router.post("/users/get-all-details/:userId", (req, res) => {
    getAllDetails(req, res);
});

router.put("/users/update-details/:userId", (req, res) => {
    updateDetails(req, res);
});


// router.put("/users/logout", (req, res) => {
//     updateUserPassword(req, res);
// });


// router.put("/users/logout", (req, res) => {
//     updateUserPassword(req, res);
// });

// router.put("/users/get-details/:userId", (req, res) => {
//     getDetails(req, res);
// });

// router.put("/users/get-all-details:", (req, res) => {
//     updateUserPassword(req, res);
// });

// router.put("/users/update-details/:userId", (req, res) => {
//     updateUserPassword(req, res);
// });