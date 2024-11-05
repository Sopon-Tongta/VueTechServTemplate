<template>
  <q-card class="popup-form goods-receipt-create-oder">
    <q-card-section class="section-header">
      <div class="popup-title">Create Order</div>
    </q-card-section>
    <q-card-section class="section-body">
      <div class="form-component">
        <div class="popup-label">Reference No<span class="text-red-14">*</span></div>
        <q-input outlined dense clearable v-model="referenceNo" placeholder="กรอกข้อมูล" />
      </div>
      <div class="form-component">
        <div class="popup-label">Owner<span class="text-red-14">*</span></div>
        <SelectField
          :list="ownerList"
          :value="ownerCode"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (ownerCode = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Supplier<span class="text-red-14">*</span></div>
        <SelectField
          :list="supplierList"
          :value="supplierCode"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (supplierCode = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Order Type<span class="text-red-14">*</span></div>
        <SelectField
          :list="orderTypeGaneralList"
          :value="orderType"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (orderType = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Warehouse<span class="text-red-14">*</span></div>
        <SelectField
          :list="wareHouseList"
          :value="warehouse"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (warehouse = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Doc Date<span class="text-red-14">*</span></div>
        <DateField :value="docDate" @onUpdate="(value: string) => (docDate = value)" />
      </div>
      <div class="form-component">
        <div class="popup-label">Receiving Date<span class="text-red-14">*</span></div>
        <DateField :value="receiveDate" @onUpdate="(value: string) => (receiveDate = value)" />
      </div>
    </q-card-section>
    <q-card-actions class="section-action">
      <q-btn dense outline size="md" color="red" no-caps v-close-popup>
        <div class="px-1 flex flex-row items-center">
          <q-icon name="close" size="20px" />
          <p class="font-thaibev-medium">Cancel</p>
        </div>
      </q-btn>
      <q-btn
        dense
        unelevated
        size="md"
        class="bg-teal-700"
        @click="confirmCreateReceiveOrder"
        no-caps
      >
        <div class="px-1 flex flex-row items-center">
          <q-icon name="post_add" color="white" size="20px" />
          <p class="pl-1 font-thaibev-medium text-white">Create</p>
        </div>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, type Ref } from "vue";
import { storeToRefs } from "pinia";
import useUtilHook from "@/hooks/useUtil";
import { useMasterDataStore } from "@/stores/MasterDataStore";
import type { ICreateReceiptOrderParams } from "@/interfaces/hooks/IGoodsReceipt";
import type { IQSelectField_Group } from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  emits: ["onCreate"],
  setup(props, { emit }) {
    const masterStore = useMasterDataStore();
    const { ownerList, orderTypeList, supplierList, wareHouseList } = storeToRefs(masterStore);
    const { formatDate_DDMMYYYY } = useUtilHook.useUtil();
    const referenceNo = ref<string>("");
    const ownerCode = ref<string>("");
    const supplierCode = ref<string>("");
    const orderType = ref<string>("");
    const warehouse = ref<string>("");
    const docDate = ref<string>(formatDate_DDMMYYYY(Date.now()));
    const receiveDate = ref<string>(formatDate_DDMMYYYY(Date.now()));

    const confirmCreateReceiveOrder = () => {
      const params: ICreateReceiptOrderParams = {
        referenceNo: referenceNo.value,
        ownerCode: ownerCode.value,
        supplierCode: supplierCode.value,
        orderType: orderType.value,
        warehouse: warehouse.value,
        docDate: docDate.value,
        receiveDate: receiveDate.value,
      };
      emit("onCreate", params);
    };

    const orderTypeGaneralList: Ref<Array<IQSelectField_Group>> = ref([]);
    const getOrderTypeGaneral = () => {
      orderTypeGaneralList.value = orderTypeList.value.filter((f) => f.group === "GENERAL");
    };
    onMounted(getOrderTypeGaneral);

    return {
      ownerList,
      orderTypeGaneralList,
      supplierList,
      wareHouseList,
      referenceNo,
      ownerCode,
      supplierCode,
      orderType,
      warehouse,
      docDate,
      receiveDate,
      confirmCreateReceiveOrder,
    };
  },
});
</script>
