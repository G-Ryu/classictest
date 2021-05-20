import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import("dotenv/config");

export = async (req, res) => {
  const nickName = req.nickName;

  if (!nickName) {
    res.status(403).send({ message: "invalid user" });
    return;
  }

  try {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.nickName = :nickName", { nickName })
      .getOne();

    await user.remove();

    res
      .clearCookie("refreshToken", {
        domain: "localhost",
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
