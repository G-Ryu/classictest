import { Music } from "../../entity/Music";
import { getRepository } from "typeorm";

export = async (req, res) => {
  try {
    const music = await getRepository(Music)
      .createQueryBuilder("music")
      .getMany();

    res.send({ data: music });
  } catch (err) {
    console.log("music-list\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
