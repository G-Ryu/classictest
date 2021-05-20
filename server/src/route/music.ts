import express from "express";
import { musicController } from "../controller";
const router = express.Router();
import upload from "../utils/multer";

// router.post(
//   "/create",
//   upload.fields([
//     { name: "filePath", maxCount: 1 },
//     { name: "poster", maxCount: 1 },
//   ]),
//   musicController.create
// );
// router.get("/read", musicController.read);
// router.patch(
//   "/update",
//   upload.fields([
//     { name: "filePath", maxCount: 1 },
//     { name: "poster", maxCount: 1 },
//   ]),
//   musicController.update
// );
// router.delete("/delete", musicController.delete);
// router.get("/list", musicController.list);

export = router;
