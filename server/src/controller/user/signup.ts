import { User } from "../../entity/User";
import crypto from "crypto";
import("dotenv/config");

export = async (req, res) => {
  const { userId, nickName, password } = req.body;

  try {
    const hashPW = crypto
      .createHmac("sha256", process.env.SHA_PW)
      .update(password)
      .digest("hex");

    const user = new User();
    user.userId = userId;
    user.nickName = nickName;
    user.password = hashPW;
    if (req.file) {
      user.profileImage = req.file.location;
    } else {
      user.profileImage =
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcyOIpg%2Fbtqx7JTDRTq%2F1fs7MnKMK7nSbrM9QTIbE1%2Fimg.jpg";
    }
    await user.save();

    res.send({ message: "signUp" });
  } catch (err) {
    console.log("user-signup\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
