import { defineStore } from "pinia";
import { reactive } from "vue";
import jwtDecode from "jwt-decode";
import type { IGlobalAccessToken_Data, IGlobalAuth } from "@/interfaces/bevportal/IGlobalState";
import type { IUserAuth } from "@/interfaces/stores/IAuthStore";
export const useAuthStore = defineStore("Auth", () => {
  const userAuth = reactive<IUserAuth>({
    domainId: 0,
    domainTH: "",
    domainEN: "",
    adUserId: "",
    contactId: 0,
    employeeId: "",
    employeeTag: "",
    firstNameEN: "",
    lastNameEN: "",
    firstNameTH: "",
    lastNameTH: "",
    roleId: 0,
    roleName: "",
    email: "",
    language: "",
    isLoggedIn: false,
  });

  const setBevPortalAuth = async (bevAuth: IGlobalAuth, language: string) => {
    const d_access_token = jwtDecode<IGlobalAccessToken_Data>(bevAuth.accessToken);
    userAuth.domainId = parseInt(bevAuth.currentCompany);
    userAuth.adUserId = bevAuth.adUserId;
    userAuth.contactId = parseInt(bevAuth.contactId);
    userAuth.employeeId = bevAuth.employeeId;
    userAuth.employeeTag = d_access_token.employeetag;
    userAuth.email = bevAuth.email;
    userAuth.firstNameEN = bevAuth.firstNameTh;
    userAuth.lastNameEN = bevAuth.lastNameTh;
    userAuth.firstNameTH = bevAuth.firstNameEn;
    userAuth.lastNameTH = bevAuth.lastNameEn;
    userAuth.language = language.toUpperCase();
    userAuth.isLoggedIn = bevAuth.isLoggedIn;
  };

  return {
    userAuth,
    setBevPortalAuth,
  };
});
