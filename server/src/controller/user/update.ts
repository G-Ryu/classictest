import { User } from "../../entity/User";
import crypto from "crypto";
import { getRepository } from "typeorm";
import("dotenv/config");

export = async (req, res) => {
  const nickName = req.nickName;
  const { changeNick, password } = req.body;

  if (!nickName) {
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
      .where("user.nickName = :nickName", { nickName })
      .leftJoinAndSelect("user.musics", "music")
      .getOne();

    user.nickName = changeNick || user.nickName;
    user.password = hashPW || user.password;
    if (req.file) {
      user.profileImage = req.file.location;
    }
    await user.save();

    res.send({
      data: { nickName: user.nickName, profileImage: user.profileImage },
    });
  } catch (err) {
    console.log("user-update\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
