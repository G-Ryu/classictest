import { Music } from "../../entity/Music";
import { getConnection } from "typeorm";

export = async (req, res) => {
  const userId = req.userId;
  const { musicId } = req.query;

  if (!userId) {
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

    res.send({ message: "delete", accessToken: req.accessToken });
  } catch (err) {
    console.log("music-delete\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
