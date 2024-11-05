<template>
  <div class="flex flex-center column h-full">
    <img
      alt="Inventory logo"
      :src="srcLogo"
      className="App-logo"
      style="width: 200px; height: 200px"
    />
    <div className="logo-text">Inventory</div>
  </div>
</template>

<script lang="ts">
import { useConfigStore } from "@/stores/ConfigStore";
import { storeToRefs } from "pinia";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "home-index",
  emits: ["onRedirect", "showLoading", "hideLoading", "alert", "confirm", "confirmInput"],
  setup() {
    const { env } = storeToRefs(useConfigStore());
    const srcLogo = ref<string>("");
    switch (env.value.environment) {
      case "DEV":
        srcLogo.value = "https://inventorydev.thaibevapp.com/assets/images/inventory-icon.png";
        break;
      case "UAT":
        srcLogo.value = "https://inventoryuat.thaibevapp.com/assets/images/inventory-icon.png";
        break;
      case "PROD":
        srcLogo.value = "https://inventory.thaibevapp.com/assets/images/inventory-icon.png";
        break;
      default:
        srcLogo.value = "https://localhost:4200/src/assets/inventory-icon.png";
        break;
    }

    return {
      srcLogo,
    };
  },
});
</script>
