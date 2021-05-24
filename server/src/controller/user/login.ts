import crypto from "crypto";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import { Refresh } from "../../entity/Refresh";
import("dotenv/config");

export = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const hashPW = crypto
      .createHmac("sha256", process.env.SHA_PW)
      .update(password)
      .digest("hex");

    let userData = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.userId = :userId", { userId })
      .andWhere("user.password = :password", { password: hashPW })
      .leftJoinAndSelect("user.refresh", "refresh")
      .getOne();

    if (!userData) {
      res.status(401).send({ message: "unregistered user" });
      return;
    }

    const nickName = userData.nickName;
    const profileImage = userData.profileImage;

    let refreshData;
    let hashedIdx;
    if (!userData.refresh) {
      refreshData = new Refresh();
    } else {
      hashedIdx = userData.refresh.hashedIdx;

      refreshData = await getRepository(Refresh)
        .createQueryBuilder("refresh")
        .where("refresh.hashedIdx = :hashedIdx", { hashedIdx: hashedIdx })
        .getOne();
    }

    const accessToken = jwt.sign({ userId }, process.env.SHA_AT, {
      expiresIn: 3600,
    });

    const refreshToken = jwt.sign({ id: userData.id }, process.env.SHA_RT, {
      expiresIn: 2419200,
    });

    refreshData.token = refreshToken;
    await refreshData.save();

    if (!hashedIdx) {
      hashedIdx = crypto
        .createHmac("sha256", process.env.SHA_RT)
        .update(String(refreshData.id))
        .digest("hex");

      refreshData.hashedIdx = hashedIdx;
      await refreshData.save();

      userData.refresh = refreshData;
      await userData.save();
    }

    res
      .cookie("refreshToken", hashedIdx, {
        domain: "onlygryu.shop",
        path: "/",
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .send({
        data: {
          userId,
          nickName,
          profileImage,
          accessToken,
        },
      });
  } catch (err) {
    console.log("user-login\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
