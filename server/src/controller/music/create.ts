import { User } from "../../entity/User";
import { Music } from "../../entity/Music";
import { getRepository } from "typeorm";

export = async (req, res) => {
  const userId = req.userId;
  const { singer, track, album } = req.body;

  if (!userId) {
    res.status(403).send({ message: "invalid user" });
    return;
  }

  try {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.userId = :userId", { userId })
      .getOne();

    const music = new Music();
    music.singer = singer;
    music.track = track;
    music.album = album;
    music.uploader = user;
    music.filePath = req.files["filePath"][0].location;
    if (req.files["poster"]) {
      music.poster = req.files["poster"][0].location;
    } else {
      music.poster =
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80";
    }

    await music.save();

    res.send({ data: music, accessToken: req.accessToken });
  } catch (err) {
    console.log("music-create\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
