export interface IUserAuth {
  domainId: number;
  domainTH: string;
  domainEN: string;
  adUserId: string;
  contactId: number;
  employeeId: string;
  employeeTag: string;
  firstNameEN: string;
  lastNameEN: string;
  firstNameTH: string;
  lastNameTH: string;
  roleId: number;
  roleName: string;
  email: string;
  language: string;
  isLoggedIn: boolean;
}

export interface IUserAccessControl {
  menuId: number;
  roleId: number;
  roleName: string;
  isView: boolean;
  isAdd: boolean;
  isEdit: boolean;
  isApprove: boolean;
}

export interface IDomain {
  domainId: number;
  domainCode: string;
  domainEN: string;
  domainTH: string;
  activeFlag: boolean;
}

export interface IUserRole_Data {
  id: number;
  userId: number;
  roleId: number;
  roleName: string;
}

export interface IGetDomain_Response {
  data: Array<IDomain>;
}

export interface IGetUserRole_Response {
  code: number;
  data: Array<IUserRole_Data>;
}
