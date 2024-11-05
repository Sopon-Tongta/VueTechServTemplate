import type { IGlobalProps, IGlobalAuth, IGlobalState } from "@/interfaces/bevportal/IGlobalState";
import { useAuthStore } from "@/stores/AuthStore";

class BevPortalService {
  globalService: IGlobalProps | undefined;
  currenState?: IGlobalState;

  async setGlobalService(service: any) {
    const { setBevPortalAuth } = useAuthStore();
    this.globalService = service;
    const globalAuth: IGlobalAuth = await this.globalService?.getGlobalState("globalAuth");
    const language: string = await this.globalService?.getGlobalState("globalLocale");
    await setBevPortalAuth(globalAuth, language);
  }

  async subscribeGlobalStateChange() {
    const { setDomain, setLanguage } = useAuthStore();
    return this.globalService!.onGlobalStateChange(async (newState: IGlobalState) => {
      const {
        globalAuth: { currentCompany },
        globalLocale: locale,
      } = newState;

      //watch current company
      if (this.currenState?.globalAuth.currentCompany !== currentCompany) {
        setDomain(currentCompany);
      }

      //watch language
      if (this.currenState?.globalLocale !== locale) {
        setLanguage(locale);
      }

      this.currenState = newState;
    });
  }
}

export default new BevPortalService();
