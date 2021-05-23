export interface userInfo {
  userId: string;
  nickName: string;
  profileImage: string;
  accessToken: string;
  isLogin: boolean;
}

export interface music {
  singer: string;
  track: string;
  album: string;
  poster: string;
  uploader: uploader;
  id: number;
}

interface uploader {
  nickName: string;
}
