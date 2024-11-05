export interface IGlobalAuth {
  employeeId: string;
  adUserId: string;
  contactId: string;
  firstNameTh: string;
  lastNameTh: string;
  firstNameEn: string;
  lastNameEn: string;
  email: string;
  idToken: string;
  accessToken: string;
  refreshToken: string;
  expiredAt: string;
  isLoggedIn: boolean;
  profileImg: string;
  bevLifeLocale: string;
  currentCompany: string;
}

export interface IGlobalMessage {
  messageFrom: string | null;
  messageTo: string | null;
  messageAction: string | null;
  messagePayload: any | null;
  messageRedirect: string | null;
}

export interface IGlobaclHeader {
  color: string | null;
  title: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
}

export interface IGlobalAccessToken_Data {
  client_id: string;
  sub: string;
  auth_time: number;
  idp: string;
  name: string;
  employeeid: string;
  employeetag: string;
  sid: string;
  iat: number;
}

export interface IGlobalState {
  globalAuth: IGlobalAuth;
  globalMessage: IGlobalMessage;
  globalLocale: string;
  globalHeader: IGlobaclHeader;
}

export interface IGlobalProps {
  getGlobalState(key: string): Promise<any>;
  onGlobalStateChange(callback: (state: IGlobalState) => void): void;
}
