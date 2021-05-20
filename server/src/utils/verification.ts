import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Refresh } from "../entity/Refresh";
import { User } from "../entity/User";
import { decodedAT, decodedRT } from "../types";
import("dotenv/config");

export = async (req, res, next) => {
  try {
    if (req.cookies && req.cookies.refreshToken) {
      const refreshToken = await getRepository(Refresh)
        .createQueryBuilder("refresh")
        .where("refresh.hashedIdx = :hashedIdx", {
          hashedIdx: req.cookies.refreshToken,
        })
        .getOne();

      let userId: number;
      jwt.verify(
        refreshToken.token,
        process.env.SHA_RT,
        (err, decoded: decodedRT) => {
          userId = decoded.id;
        }
      );

      const user = await getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: userId })
        .getOne();

      const accessToken = jwt.sign(
        { nickName: user.nickName },
        process.env.SHA_AT,
        { expiresIn: 3600 }
      );

      res.send({ data: { accessToken } });
    } else if (req.headers.authorization) {
      const accessToken = req.headers.authorization.slice(7);

      jwt.verify(
        accessToken,
        process.env.SHA_AT,
        (err, decoded: decodedAT) => {
          if (err || decoded.exp - decoded.iat < 600) {
            res.status(401).send({ message: "token expired" });
          } else {
            req.nickName = decoded.nickName;
            next();
          }
        }
      );
    } else {
      next();
    }
  } catch (err) {
    console.log("토큰 검사", err);
    res.status(400).send({ message: "someting wrong" });
  }
};
