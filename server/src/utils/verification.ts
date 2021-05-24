import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { Refresh } from "../entity/Refresh";
import { User } from "../entity/User";
import { decodedAT, decodedRT } from "../types";
import("dotenv/config");

export = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const accessToken = req.headers.authorization.slice(7);

      jwt.verify(
        accessToken,
        process.env.SHA_AT,
        async (err, decoded: decodedAT) => {
          if (err || decoded.exp - decoded.iat < 600) {
            const refreshObj = await refresh(req.cookies.refreshToken);
            if (!refreshObj) {
              res.status(403).send({ message: "token expired" });
            } else {
              req.userId = refreshObj.userId;
              req.accessToken = refreshObj.accessToken;
              next();
            }
          } else {
            req.userId = decoded.userId;
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

const refresh = async (cookieRT) => {
  const refreshToken = await getRepository(Refresh)
    .createQueryBuilder("refresh")
    .where("refresh.hashedIdx = :hashedIdx", {
      hashedIdx: cookieRT,
    })
    .getOne();

  let userIdx: number;
  jwt.verify(
    refreshToken.token,
    process.env.SHA_RT,
    (err, decoded: decodedRT) => {
      if (!err) {
        userIdx = decoded.id;
      }
    }
  );

  if (userIdx) {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id: userIdx })
      .getOne();

    const accessToken = jwt.sign({ userId: user.userId }, process.env.SHA_AT, {
      expiresIn: 3600,
    });

    return { userId: user.userId, accessToken };
  } else {
    return false;
  }
};
