import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import("dotenv/config");

export = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    res.status(403).send({ message: "invalid user" });
    return;
  }

  try {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("userId = :userId", { userId })
      .execute();

    res
      .clearCookie("refreshToken", {
        domain: "onlygryu.shop",
        path: "/",
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .send({ message: "signOut" });
  } catch (err) {
    console.log("user-signout\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
