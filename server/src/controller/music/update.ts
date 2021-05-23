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
      .select(["music", "user.nickName"])
      .leftJoin("music.uploader", "user")
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

    await music.save();
    console.log(music);
    res.send({ data: music });
  } catch (err) {
    console.log("music-update\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
