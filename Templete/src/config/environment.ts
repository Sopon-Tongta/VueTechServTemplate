import type { IEnvConfig } from "@/interfaces/hooks/IEnv";

const el = document.getElementById("inventory-config");
const config: any = el?.innerText.trim();
const environment: IEnvConfig = config ? setENV() : setDefault();
function setENV(): IEnvConfig {
  const env = JSON.parse(config);
  return {
    environment: env.ENVIRONMENT,
    inventory_api: env.INVENTORY_API,
    inventory_workflow_api: env.INVENTORY_WORKFLOW_API,
    portal_path: env.PORTAL_PATH,
    portal_sub_path: env.PORTAL_SUB_PATH,
    sub_path: env.SUB_PATH,
    render_qiankun: true,
  };
}
function setDefault(): IEnvConfig {
  return {
    environment: import.meta.env.VITE_ENVIRONMENT,
    inventory_api: import.meta.env.VITE_INVENTORY_API,
    inventory_workflow_api: import.meta.env.VITE_INVENTORY_WORKFLOW_API,
    portal_path: import.meta.env.VITE_PORTAL_PATH,
    portal_sub_path: import.meta.env.VITE_PORTAL_SUB_PATH,
    sub_path: import.meta.env.VITE_SUB_PATH,
    render_qiankun: import.meta.env.VITE_RENDER_QIANKUN === "true",
  };
}
function removeConfigHTML() {
  el?.remove();
}
export default { environment, removeConfigHTML };
