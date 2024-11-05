import { ref } from "vue";
import { defineStore } from "pinia";
import environment from "@/config/environment";
import type { IEnvConfig } from "@/interfaces/hooks/IEnv";

const useConfigStore = defineStore("Config", () => {
  const env = ref<IEnvConfig>(environment.environment);
  environment.removeConfigHTML();
  return { env };
});

export { useConfigStore };
