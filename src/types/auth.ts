import { type TCustomFile } from "./types";

export type TUserLoginInfo = {
  email: string;
  password: string;
};

export type TLogin = {
  id: number;
  email: string;
  imgPath: string;
  userName: string;
  token: string;
};

export type TUserProfile = {
  id: number;
  email: string;
  imgPath: string;
  userName: string;
};

export type TUserImageFile = {
  userImage?: TCustomFile;
};

export type TUpdatedUserProfile = TUserProfile & TUserImageFile;
