import { User } from "../../entity/User";
import crypto from "crypto";
import { getRepository } from "typeorm";
import("dotenv/config");

export = async (req, res) => {
  const userId = req.userId;
  const { nickName, password } = req.body;

  if (!userId) {
    res.status(403).send({ message: "invalid user" });
    return;
  }

  try {
    const hashPW = password
      ? crypto
          .createHmac("sha256", process.env.SHA_PW)
          .update(password)
          .digest("hex")
      : null;

    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.userId = :userId", { userId })
      .getOne();

    user.nickName = nickName || user.nickName;
    user.password = hashPW || user.password;
    if (req.file) {
      user.profileImage = req.file.location;
    }
    await user.save();

    res.send({
      data: { nickName: user.nickName, profileImage: user.profileImage },
      accessToken: req.accessToken,
    });
  } catch (err) {
    console.log("user-update\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
