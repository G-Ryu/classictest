import { Music } from "../../entity/Music";
import { getRepository, ILike } from "typeorm";

export = async (req, res) => {
  const { track, singer } = req.query;
  const key = track ? "track" : "singer";
  const value = track || singer;

  try {
    const music = await getRepository(Music)
      .createQueryBuilder("music")
      .where({
        [key]: ILike(`%${value}%`),
      })
      .select(["music", "user.userId", "user.nickName"])
      .leftJoin("music.uploader", "user")
      .getMany();

    res.send({ data: music });
  } catch (err) {
    console.log("music-search\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
