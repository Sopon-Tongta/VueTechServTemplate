import type { IGetAuthToken_Response } from "@/interfaces/hooks/IAuth";
import { useConfigStore } from "@/stores/ConfigStore";
import { storeToRefs } from "pinia";
import { useQuasar, QSpinnerGears } from "quasar";

const useAuth = () => {
  const { env } = storeToRefs(useConfigStore());
  const $q = useQuasar();

  const getToken = () => {
    const params = {
      username: "admin",
      password: "password",
    };
    return new Promise((resolve: (value: IGetAuthToken_Response) => void) => {
      fetch(`${env.value.inventory_api}/api/v1/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`${res.status}: ${res.statusText}`);
        })
        .then((resJson: IGetAuthToken_Response) => {
          resolve(resJson);
        })
        .catch((error) => {
          alertFetchError(error.message);
        });
    });
  };

  const alertFetchError = (message: string) => {
    $q.loading.show({
      spinner: QSpinnerGears,
      spinnerSize: 50,
      spinnerColor: "theme-color",
      messageColor: "black",
      backgroundColor: "white",
      customClass: "templete_web",
    });

    $q.notify({
      type: "negative",
      message: message,
      position: "top",
      timeout: 1000 * 60 * 60 * 24,
      actions: [
        {
          icon: "close",
          color: "white",
          round: true,
          size: "sm",
          "aria-label": "Dismiss",
        },
      ],
    });
  };

  return {
    getToken,
  };
};

export default useAuth;
