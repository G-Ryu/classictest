import { Music } from "../../entity/Music";
import { getRepository } from "typeorm";

export = async (req, res) => {
  try {
    const music = await getRepository(Music)
      .createQueryBuilder("music")
      .select(["music", "user.userId", "user.nickName"])
      .leftJoin("music.uploader", "user")
      .getMany();

    res.send({ data: music, accessToken: req.accessToken });
  } catch (err) {
    console.log("music-list\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
