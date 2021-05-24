export = (req, res) => {
  const userId = req.userId;

  if (!userId) {
    res.status(403).send({ message: "invalid user" });
    return;
  }

  try {
    res
      .clearCookie("refreshToken", {
        domain: "localhost",
        path: "/",
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .send({ message: "logOut" });
  } catch (err) {
    console.log("user-logout\n", err);
    res.status(400).send({ message: "something wrong" });
  }
};
