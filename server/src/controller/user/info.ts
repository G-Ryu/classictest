import { getRepository } from "typeorm";
import { User } from "../../entity/User";

export = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    res.status(403).send({ message: "invalid user" });
    return;
  }

  try {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.userId = :userId", { userId })
      .leftJoinAndSelect("user.musics", "music")
      .getOne();

    res.send({
      data: {
        userId: user.userId,
        nickName: user.nickName,
        profileImage: user.profileImage,
        upload: user.musics,
      },
      accessToken: req.accessToken,
    });
  } catch (err) {
    console.log("user-info\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
