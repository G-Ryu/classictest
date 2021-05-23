import axios from "axios";

export const refresh = async () => {
  try {
    const accessToken = await axios({
      url: `${process.env.REACT_APP_SERVER}`,
      withCredentials: true,
    });
    console.log(accessToken);
    return accessToken.data.accessToken;
  } catch {
    return false;
  }
};
