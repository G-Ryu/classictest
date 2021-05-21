import { User } from "../../entity/User";
import { Music } from "../../entity/Music";
import { getRepository } from "typeorm";

export = async (req, res) => {
  const nickName = req.nickName;
  const { singer, track, album, musicId } = req.body;

  if (!nickName) {
    res.status(403).send({ message: "invalid user" });
    return;
  }

  try {
    const music = await getRepository(Music)
      .createQueryBuilder("music")
      .where("music.id = :id", { id: musicId })
      .getOne();

    music.singer = singer;
    music.track = track;
    music.album = album;
    if (req.file["filePath"]) {
      music.filePath = req.files["filePath"][0].location;
    }
    if (req.file["poster"]) {
      music.poster = req.files["poster"][0].location;
    }

    await music.save();

    res.send({ message: "update" });
  } catch (err) {
    console.log("music-update\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
