import { Music } from "../../entity/Music";
import { getRepository } from "typeorm";

export = async (req, res) => {
  const nickName = req.nickName;
  const { musicId } = req.query;

  if (!nickName) {
    res.status(403).send({ message: "invalid user" });
    return;
  }

  try {
    const music = await getRepository(Music)
      .createQueryBuilder("music")
      .where("music.id = :id", { musicId })
      .getOne();

    await music.remove();

    res.send({ message: "delete" });
  } catch (err) {
    console.log("music-delete\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
