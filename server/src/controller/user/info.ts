import { getRepository } from "typeorm";
import { User } from "../../entity/User";

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
      .leftJoinAndSelect("user.musics", "music")
      .getOne();

    res.send({
      data: {
        userId: user.userId,
        nickName: user.nickName,
        profileImage: user.profileImage,
        upload: user.musics,
      },
    });
  } catch (err) {
    console.log("user-info\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
