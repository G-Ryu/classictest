import express from "express";
import { userController } from "../controller";
const router = express.Router();
import upload from "../utils/multer";

router.post("/signup", upload.single("profileImage"), userController.signup);
router.post("/signout", userController.signout);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/exist", userController.exist);
router.get("/info", userController.info);
router.post("/update", upload.single("profileImage"), userController.update);

export = router;
