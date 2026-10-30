import { Router } from "express";
import {
  addToHistory,
  getUserHistory,
  login,
  register,
  getUserCount,
  getAllUsers,
  deleteruser
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity").post(addToHistory);
router.route("/get_all_activity").get(getUserHistory);
router.route("/count").get(getUserCount);
router.route("/all").get(getAllUsers);
router.route("/delete_all").delete(deleteUser);


export default router;
