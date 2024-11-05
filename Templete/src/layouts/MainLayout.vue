<template>
  <q-dialog class="templete_web" v-model="alertShow">
    <q-card style="min-width: 300px">
      <q-card-section v-if="alertCls == 'error'" class="bg-red-600">
        <div class="flex flex-row items-center">
          <q-icon class="icon" name="block_flipped" color="white" size="35px" />
          <div class="pl-2 font-thaibev-bold text-white text-lg truncate">ระบบผิดพลาด</div>
        </div>
      </q-card-section>
      <q-card-section v-else-if="alertCls == 'warning'" class="bg-yellow-600">
        <div class="flex flex-row items-center">
          <q-icon class="icon" name="report_problem" color="white" size="35px" />
          <div class="pl-2 font-thaibev-bold text-white text-lg truncate">โปรดพิจารณา</div>
        </div>
      </q-card-section>
      <q-card-section v-else-if="alertCls == 'success'" class="bg-green-600">
        <div class="flex flex-row items-center">
          <q-icon name="check_circle_outline" color="white" size="35px" />
          <div class="pl-2 font-thaibev-bold text-white text-lg truncate">เสร็จสิ้น</div>
        </div>
      </q-card-section>
      <q-card-section v-else class="bg-blue-600">
        <div class="flex flex-row items-center">
          <q-icon name="info" color="white" size="36px" />
          <div class="pl-2 font-thaibev-bold text-white text-lg truncate">ข้อความจากระบบ</div>
        </div>
      </q-card-section>
      <q-card-section class="pb-0">
        <div v-if="alertCls == 'error'" class="font-thaibev-semibold text-red text-center">
          {{ alertContant }}
        </div>
        <div
          v-else-if="alertCls == 'warning'"
          class="font-thaibev-semibold text-orange text-center"
        >
          {{ alertContant }}
        </div>
        <div v-else-if="alertCls == 'success'" class="font-thaibev-semibold text-green text-center">
          {{ alertContant }}
        </div>
        <div v-else class="font-thaibev-semibold text-blue text-center">
          {{ alertContant }}
        </div>
      </q-card-section>
      <q-card-actions class="flex justify-center">
        <q-btn
          v-if="alertCls == 'error'"
          dense
          size="md"
          class="font-thaibev-medium bg-red-800 text-white"
          label="ตกลง"
          @click="alertOnSubmit"
          no-caps
        />
        <q-btn
          v-else-if="alertCls == 'warning'"
          dense
          size="md"
          class="font-thaibev-medium bg-yellow-800 text-white"
          label="ตกลง"
          @click="alertOnSubmit"
          no-caps
        />
        <q-btn
          v-else-if="alertCls == 'success'"
          dense
          size="md"
          class="font-thaibev-medium bg-green-800 text-white"
          label="ตกลง"
          @click="alertOnSubmit"
          no-caps
        />
        <q-btn
          v-else
          dense
          size="md"
          class="font-thaibev-medium bg-blue-800 text-white"
          label="ตกลง"
          @click="alertOnSubmit"
          no-caps
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog class="templete_web" v-model="confirmShow">
    <q-card style="width: 300px">
      <q-card-section class="bg-theme-color">
        <div class="font-thaibev-bold text-lg text-white">{{ confirmTitle }}</div>
      </q-card-section>
      <q-card-section class="pb-0">
        <div class="flex flex-row justify-center font-thaibev-semibold text-theme-color">
          {{ confirmContant }}
        </div>
      </q-card-section>
      <q-card-actions class="flex justify-center">
        <q-btn
          dense
          size="md"
          class="font-thaibev-medium bg-red-800 text-white"
          label="ยกเลิก"
          v-close-popup
          no-caps
        />
        <q-btn
          dense
          size="md"
          class="font-thaibev-medium bg-green-800 text-white"
          label="ตกลง"
          @click="confirmOnSubmit"
          no-caps
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog class="templete_web" v-model="confirmInputShow">
    <q-card style="width: 350px">
      <q-card-section class="bg-theme-color">
        <div class="font-thaibev-bold text-lg text-white">{{ confirmInputTitle }}</div>
      </q-card-section>
      <q-card-section class="pb-0">
        <div class="flex flex-row justify-center font-thaibev-semibold text-theme-color">
          {{ confirmInputText }}
        </div>
        <div>
          <q-input
            outlined
            rows="4"
            dense
            type="textarea"
            class="form-input"
            v-model="confirmInputForm"
          />
        </div>
      </q-card-section>
      <q-card-actions class="flex justify-center">
        <q-btn
          dense
          size="md"
          class="font-thaibev-medium bg-red-800 text-white"
          label="ยกเลิก"
          v-close-popup
          no-caps
        />
        <q-btn
          dense
          size="md"
          class="font-thaibev-medium bg-green-800 text-white"
          label="ตกลง"
          @click="confirmInputOnSubmit"
          no-caps
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-layout view="hhh LpR fFf" container class="layout-app">
    <q-header class="bg-gradient-to-r from-green-100 to-[#1c6758]">
      <q-toolbar class="min-h-[40px]">
        <q-btn dense flat round icon="menu" class="text-theme-color" @click="toggleLeftDrawer" />
        <q-toolbar-title class="flex flex-row items-center">
          <q-breadcrumbs
            v-if="$q.screen.gt.sm"
            gutter="xs"
            class="font-thaibev-light text-[14px]"
            separator-color="theme-color"
            active-color="black"
          >
            <template v-for="(row, _index) in menuDisplay" :key="_index">
              <q-breadcrumbs-el
                v-if="row.isClickGoto"
                :label="row.label"
                :class="`text-theme-color font-thaibev-bold cursor-pointer`"
                v-on:click="onRedirect(row.name)"
              />
              <q-breadcrumbs-el
                v-else
                :label="row.label"
                :class="`text-theme-color font-thaibev-medium`"
              />
            </template>
          </q-breadcrumbs>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      class="drop-shadow-sm bg-gradient-to-br from-green-100 to-gray-200"
      side="left"
    >
      <q-item-section class="p-4 bg-theme-color">
        <q-btn
          flat
          round
          class="absolute top-1 right-3 text-white text-[10px]"
          icon="close"
          @click="toggleLeftDrawer"
        />
        <div class="cursor-pointer">
          <p class="font-thaibev-bold text-2xl text-white">Inventory</p>
        </div>
        <div class="cursor-pointer">
          <p class="font-thaibev-light text-sm text-white">Version 1.0.1</p>
        </div>
      </q-item-section>
      <q-separator />
      <q-scroll-area
        class="h-[calc(100vh-180px)] md:h-[calc(100vh-260px)] 2xl:md:h-[calc(100vh-300px)]"
      >
        <template v-for="(menu, _imenu) in menuBuilding" :key="_imenu">
          <template v-for="(main, _imain) in menu.childItem" :key="_imain">
            <q-expansion-item
              v-if="main.childMenu"
              header-class="text-green-900"
              expand-icon-class="text-green-900"
              expand-separator
            >
              <template v-slot:header>
                <q-item-section avatar class="min-w-0 pr-0" v-if="main.icon.length > 0">
                  <q-avatar :icon="main.icon" />
                </q-item-section>
                <q-item-section class="flex-none" v-else />
                <q-item-section class="font-thaibev-regular text-xl hover:font-thaibev-semibold">
                  {{ main.label }}
                </q-item-section>
              </template>

              <template v-for="(child_1, _ichild_1) in main.childItem" :key="_ichild_1">
                <q-expansion-item
                  v-if="child_1.childMenu"
                  header-class="text-green-900"
                  expand-icon-class="text-green-900"
                  expand-separator
                >
                  <template v-slot:header>
                    <q-item-section avatar class="min-w-0 pr-0" v-if="main.icon.length > 0">
                      <q-avatar :icon="child_1.icon" />
                    </q-item-section>
                    <q-item-section class="flex-none" v-else />
                    <q-item-section
                      class="font-thaibev-regular text-xl hover:font-thaibev-semibold"
                    >
                      {{ child_1.label }}
                    </q-item-section>
                  </template>
                  <template v-for="(child_2, _ichild_2) in child_1.childItem" :key="_ichild_2">
                    <q-item
                      :clickable="child_2.clickable"
                      :disable="child_2.disable"
                      class="text-green-900"
                      v-on:click="onRedirect(child_2.name)"
                    >
                      <q-item-section avatar class="min-w-0 pr-0" v-if="main.icon.length > 0">
                        <q-avatar :icon="child_2.icon" />
                      </q-item-section>
                      <q-item-section class="flex-none" v-else />
                      <q-item-section
                        class="font-thaibev-regular text-xl hover:font-thaibev-semibold"
                      >
                        {{ child_2.label }}
                      </q-item-section>
                    </q-item>
                  </template>
                </q-expansion-item>
                <q-item
                  v-else
                  :clickable="child_1.clickable"
                  :disable="child_1.disable"
                  class="text-green-900"
                  v-on:click="onRedirect(child_1.name)"
                >
                  <q-item-section avatar class="min-w-0 pr-0" v-if="main.icon.length > 0">
                    <q-avatar :icon="child_1.icon" />
                  </q-item-section>
                  <q-item-section class="flex-none" v-else />
                  <q-item-section class="font-thaibev-regular text-xl hover:font-thaibev-semibold">
                    {{ child_1.label }}
                  </q-item-section>
                </q-item>
              </template>
            </q-expansion-item>
            <q-item
              v-else
              :clickable="main.clickable"
              :disable="main.disable"
              class="text-green-900"
              v-on:click="onRedirect(main.name)"
            >
              <q-item-section avatar class="min-w-0 pr-0" v-if="main.icon.length > 0">
                <q-avatar :icon="main.icon" />
              </q-item-section>
              <q-item-section class="flex-none" v-else />
              <q-item-section class="font-thaibev-regular text-xl hover:font-thaibev-semibold">
                {{ main.label }}
              </q-item-section>
            </q-item>
          </template>
        </template>
      </q-scroll-area>
      <q-separator />
    </q-drawer>
    <q-page-container class="page-container">
      <router-view
        v-on:onRedirect="onRedirect"
        v-on:showLoading="showLoading"
        v-on:hideLoading="hideLoading"
        v-on:alert="childUseAlert"
        v-on:confirm="childUseConfirm"
        v-on:confirmInput="childUseConfirmInput"
      />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { onBeforeMount, onMounted, ref, watch, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar, QSpinnerGears } from "quasar";
import { useMasterDataStore } from "@/stores/MasterDataStore";
import { storeToRefs } from "pinia";
import { useRouterStore } from "@/stores/RouterStore";
import { useConfigStore } from "@/stores/ConfigStore";
import type { IViewMenuAccess } from "@/interfaces/hooks/IUtil";

export default {
  setup() {
    const { env } = storeToRefs(useConfigStore());
    const masterStore = useMasterDataStore();
    const { menuBuilding } = storeToRefs(masterStore);
    const { getMaster } = masterStore;
    const routerStore = useRouterStore();
    const { router_params } = storeToRefs(routerStore);
    const { getRouterParams } = routerStore;
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();

    const leftDrawerOpen = ref<boolean>(false);
    const currentMenuId = ref<number>(0);
    const labelDisplay: Ref<Array<IViewMenuAccess>> = ref([]);

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const findMenu = (
      findNode: Array<IViewMenuAccess>,
      name: string
    ): IViewMenuAccess | undefined => {
      for (let i = 0; i < findNode.length; i++) {
        if (findNode[i].name == name) {
          return findNode[i];
        } else if (findNode[i].childItem !== undefined && findNode[i].childItem.length > 0) {
          let result = findMenu(findNode[i].childItem, name);
          if (result !== undefined) {
            return result;
          }
        }
      }
    };

    const saveParent = (
      saveList: Array<IViewMenuAccess>,
      findNode: Array<IViewMenuAccess>,
      parentId: number
    ): Array<IViewMenuAccess> => {
      for (let i = 0; i < findNode.length; i++) {
        if (findNode[i].menuId == parentId) {
          saveList.push(findNode[i]);
          if (findNode[i].parentId > 0) {
            saveList = saveParent(saveList, menuBuilding.value, findNode[i].parentId);
          }
          break;
        } else if (findNode[i].childItem !== undefined && findNode[i].childItem.length > 0) {
          saveList = saveParent(saveList, findNode[i].childItem, parentId);
        }
      }
      return saveList;
    };

    const getToolbarMenu = (name: string): boolean => {
      const all: Array<IViewMenuAccess> = menuBuilding.value;
      const currentRow: IViewMenuAccess | undefined = findMenu(all, name);
      if (currentRow === undefined) {
        // console.log("menu", menuBuilding.value);
        // console.log("name:", name);
        // childUseAlert("Page redirect not found.", "error");
        return false;
      }

      currentMenuId.value = currentRow.menuId;
      const findId: number = currentRow.parentId;
      let saveList: Array<IViewMenuAccess> = [];
      saveList.push(currentRow);
      saveList = saveParent(saveList, all, findId);
      labelDisplay.value = []; //clear

      while (saveList.length > 0) {
        let popRow: IViewMenuAccess = saveList.pop()!;
        if (popRow.menuId == 1) {
          popRow.cls = "font-thaibev-bold cursor-pointer text-theme-color";
          popRow.isClickGoto = true;
        } else if (saveList.length > 0 && popRow.childMenu && popRow.childItem.length > 0) {
          popRow.cls = "font-thaibev-regular";
          popRow.isClickGoto = false;
        } else if (saveList.length > 0 && !popRow.childMenu && popRow.childItem.length > 0) {
          popRow.cls = "font-thaibev-regular cursor-pointer";
          popRow.isClickGoto = true;
        } else {
          popRow.cls = "font-thaibev-bold cursor-pointer";
          popRow.isClickGoto = false;
        }
        labelDisplay.value.push(popRow);
      }

      return true;
    };

    const onRedirect = (name: string, params?: any) => {
      showLoading();
      const isValid: boolean = getToolbarMenu(name);
      if (isValid) {
        if (params == undefined) {
          params = { currentMenuId: currentMenuId.value };
        } else {
          params.currentMenuId = currentMenuId.value;
        }
        sessionStorage.setItem("templete_params", JSON.stringify(params));
        router.push({ name: name }).then(() => {
          hideLoading();
        });
      } else {
        hideLoading();
      }
    };

    const showLoading = (): void => {
      $q.loading.show({
        spinner: QSpinnerGears,
        spinnerSize: 50,
        spinnerColor: "theme-color",
        messageColor: "black",
        backgroundColor: "white",
        customClass: "templete_web",
      });
    };

    const hideLoading = (): void => {
      $q.loading.hide();
    };

    const onInitPage = async () => {
      showLoading();
      $q.screen.setSizes({ sm: 640, md: 768, lg: 1024, xl: 1280 });
      await getMaster();
      hideLoading();
    };

    watch(menuBuilding, (): void => {
      getToolbarMenu(String(route.name));
    });

    watch(route, async (): Promise<void> => {
      getRouterParams();
      if (route.name?.toString() == "index" && menuBuilding.value.length > 0) {
        getToolbarMenu(String(route.name));
      }
    });

    onBeforeMount(getRouterParams);

    onMounted(onInitPage);

    //=== Alert ===
    const alertShow = ref(false);
    const alertContant = ref("");
    const alertCls = ref("");
    const alertOnSubmit = ref(() => {});
    const childUseAlert = (message: string, cls: string, onFunc?: () => void) => {
      alertContant.value = message;
      alertCls.value = cls;
      alertOnSubmit.value = () => {
        if (typeof onFunc === "function") {
          onFunc();
        }
        alertShow.value = false;
      };
      alertShow.value = true;
    };
    //=== Confirm ===
    const confirmTitle = ref<string>("");
    const confirmContant = ref<string>("");
    const confirmShow = ref<boolean>(false);
    const confirmOnSubmit = ref<() => void>(() => {});
    const childUseConfirm = (title: string, contant: string, onFunc?: () => void) => {
      confirmTitle.value = title;
      confirmContant.value = contant;
      confirmOnSubmit.value = () => {
        if (typeof onFunc === "function") {
          onFunc();
        }
        confirmShow.value = false;
      };
      confirmShow.value = true;
    };
    //=== Confirm Input===
    const confirmInputTitle = ref<string>("");
    const confirmInputText = ref<string>("");
    const confirmInputForm = ref<string>("");
    const confirmInputShow = ref<boolean>(false);
    const confirmInputOnSubmit = ref<() => void>(() => {});
    const childUseConfirmInput = (
      title: string,
      textInput: string,
      onFunc?: (arg: string) => void
    ) => {
      confirmInputTitle.value = title;
      confirmInputText.value = textInput;
      confirmInputForm.value = "";
      confirmInputOnSubmit.value = () => {
        if (typeof onFunc === "function") {
          onFunc(confirmInputForm.value);
        }
        confirmInputShow.value = false;
      };
      confirmInputShow.value = true;
    };

    return {
      leftDrawerOpen,
      menuBuilding,
      menuDisplay: labelDisplay,
      toggleLeftDrawer,
      onRedirect,
      showLoading,
      hideLoading,
      alertShow,
      alertCls,
      alertContant,
      alertOnSubmit,
      childUseAlert,
      confirmShow,
      confirmTitle,
      confirmContant,
      confirmOnSubmit,
      childUseConfirm,
      confirmInputShow,
      confirmInputTitle,
      confirmInputText,
      confirmInputForm,
      confirmInputOnSubmit,
      childUseConfirmInput,
    };
  },
};
</script>
