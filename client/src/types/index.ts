export interface userInfo {
  userId: string;
  nickName: string;
  profileImage: string;
  accessToken: string;
  isLogin: boolean;
}

export interface music {
  id: number;
  singer: string;
  track: string;
  album: string;
  poster: string;
  filePath: string;
  uploader: uploader;
}

interface uploader {
  userId: string;
}
