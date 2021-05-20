import { User } from "../../entity/User";
import crypto from "crypto";
import("dotenv/config");

export = async (req, res) => {
  const nickName = req.nickName;
  const { password } = req.body;

  if (!nickName) {
    res.status(403).send({ message: "invalid user" });
    return;
  }

  try {
    const hashPW = crypto
      .createHmac("sha256", process.env.SHA_PW)
      .update(password)
      .digest("hex");

    const user = new User();
    user.nickName = nickName;
    user.password = hashPW;
    if (req.file) {
      user.profileImage = req.file.location;
    }
    await user.save();

    res.send({ message: "update" });
  } catch (err) {
    console.log("user-signup\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
