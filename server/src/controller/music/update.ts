import { User } from "../../entity/User";
import { Music } from "../../entity/Music";
import { getRepository } from "typeorm";

export = async (req, res) => {
  const userId = req.userId;
  const { singer, track, album, musicId } = req.body;

  if (!userId) {
    res.status(403).send({ message: "invalid user" });
    return;
  }

  try {
    const music = await getRepository(Music)
      .createQueryBuilder("music")
      .where("music.id = :id", { id: musicId })
      .getOne();

    singer ? (music.singer = singer) : null;
    track ? (music.track = track) : null;
    album ? (music.album = album) : null;
    if (req.files["filePath"]) {
      music.filePath = req.files["filePath"][0].location;
    }
    if (req.files["poster"]) {
      music.poster = req.files["poster"][0].location;
    }
    console.log(music);
    await music.save();

    res.send({ data: music, accessToken: req.accessToken });
  } catch (err) {
    console.log("music-update\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
