import { Music } from "../../entity/Music";
import { getConnection } from "typeorm";

export = async (req, res) => {
  const nickName = req.nickName;
  const { musicId } = req.query;

  if (!nickName) {
    res.status(403).send({ message: "invalid user" });
    return;
  }

  try {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Music)
      .where("id = :id", { id: musicId })
      .execute();

    res.send({ message: "delete" });
  } catch (err) {
    console.log("music-delete\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
