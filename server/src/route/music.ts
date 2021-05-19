import express from "express";
import { musicController } from "../controller";
const router = express.Router();

router.post("/create", musicController.create);
router.get("/read", musicController.read);
router.post("/update", musicController.update);
router.delete("/delete", musicController.delete);
router.get("/list", musicController.list);

export = router;
