export interface IGetAuthToken_Response {
  token: string;
  expires: string;
}

export interface IAuthToken_Data {
  userId: number;
  username: string;
  role: string;
  domain: string;
  exp: number;
}
