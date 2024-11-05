<template>
  <q-card class="popup-form goods-issue-popup-search" :style="dragProps.dragStyle">
    <q-card-section class="section-header" v-touch-pan.mouse="onPan">
      <div class="popup-title flex justify-between">
        Search GI Order
        <q-btn flat round color="white" size="sm" icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-card-section class="section-body bg-white">
      <div class="form-component">
        <div class="popup-label">Reference No.</div>
        <q-input outlined dense clearable v-model="searchReferenceNo" placeholder="กรอกข้อมูล" />
      </div>
      <div class="form-component">
        <div class="popup-label">GI No.</div>
        <q-input outlined dense clearable v-model="searchGINo" placeholder="กรอกข้อมูล" />
      </div>
      <div class="form-component">
        <div class="popup-label">Owner</div>
        <SelectField
          :list="ownerList"
          :value="searchOwner"
          placeholder="เลือกข้อมูล"
          @onSelect="(label: string, val: string) => (searchOwner = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Order Type</div>
        <SelectField
          :list="orderTypeGeneralList"
          :value="searchOrderType"
          placeholder="เลือกข้อมูล"
          @onSelect="(label: string, val: string) => (searchOrderType = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Doc. Date<span class="text-red-14">*</span></div>
        <DateField
          :value="searchDocDate"
          @onUpdate="
            (value: string) => {
              searchDocDate = value;
            }
          "
        />
      </div>
    </q-card-section>
    <q-card-actions class="section-action">
      <q-btn dense outline size="md" color="red" @click="onClear" no-caps>
        <div class="px-2 flex flex-row items-center">
          <q-icon name="close" size="20px" />
          <p class="font-thaibev-medium">Clear</p>
        </div>
      </q-btn>
      <q-btn dense unelevated size="md" class="bg-teal-700" @click="onSearch" no-caps>
        <div class="px-1 flex flex-row items-center">
          <q-icon name="search" color="white" size="20px" />
          <p class="pl-1 font-thaibev-medium text-white">Search</p>
        </div>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useMasterDataStore } from "@/stores/MasterDataStore";
import type { IGoodsIssue_SearchOrder_Params } from "@/interfaces/pages/IGoodsIssue";
import type { IQSelectField, IQDragProps, IQDragEvent } from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  props: ["referenceNo", "GINo", "orderType", "owner", "docDate"],
  emits: ["onClear", "onSearch"],
  setup(props, { emit }) {
    const masterStore = useMasterDataStore();
    const { ownerList, orderTypeList } = storeToRefs(masterStore);
    const searchReferenceNo = ref<string>(props.referenceNo);
    const searchGINo = ref<string>(props.GINo);
    const searchOrderType = ref<string>(props.orderType);
    const searchOwner = ref<string>(props.owner);
    const searchDocDate = ref<string>(props.docDate);
    const orderTypeGeneralList = ref<Array<IQSelectField>>([]);

    const mapOrderType = () => {
      orderTypeGeneralList.value = orderTypeList.value.filter((x) => x.group == "GENERAL");
    };

    const getSearchDetail = (): IGoodsIssue_SearchOrder_Params => {
      return {
        searchOwner: searchOwner.value,
        searchReferenceNo: searchReferenceNo.value,
        searchGINo: searchGINo.value,
        searchDocDate: searchDocDate.value,
        searchOrderType: searchOrderType.value,
      };
    };

    const onClear = () => {
      searchReferenceNo.value = "";
      searchGINo.value = "";
      searchOrderType.value = "";
      searchOwner.value = "";
      searchDocDate.value = "";
      emit("onClear");
    };

    const onSearch = () => {
      emit("onSearch", getSearchDetail());
    };

    const dragProps = ref<IQDragProps>({
      dialogPosX: 0,
      dialogPosY: 0,
      dragStyle: "",
    });

    const onPan = (evt: IQDragEvent) => {
      dragProps.value.dialogPosX += evt.delta.x;
      dragProps.value.dialogPosY += evt.delta.y;
      dragProps.value.dragStyle = `transform: translate(${dragProps.value.dialogPosX}px, ${dragProps.value.dialogPosY}px)`;
    };

    onMounted(() => {
      mapOrderType();
    });

    return {
      searchReferenceNo,
      searchGINo,
      searchOrderType,
      searchOwner,
      searchDocDate,
      orderTypeGeneralList,

      onClear,
      onSearch,
      onPan,
      dragProps,

      ownerList,
    };
  },
});
</script>
