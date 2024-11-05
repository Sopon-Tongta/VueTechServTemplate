<template>
  <q-card class="popup-form goods-receipt-edit-oder">
    <q-card-section class="section-header">
      <div class="popup-title">Edit Order</div>
    </q-card-section>
    <q-card-section class="section-body bg-white">
      <div class="form-component">
        <div class="popup-label">Reference No<span class="text-red-14">*</span></div>
        <q-input outlined dense clearable v-model="referenceNoEdit" placeholder="กรอกข้อมูล" />
      </div>
      <div class="form-component">
        <div class="popup-label">Owner<span class="text-red-14">*</span></div>
        <SelectField
          :list="ownerList"
          :value="ownerCodeEdit"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (ownerCodeEdit = val)"
          disable
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Supplier<span class="text-red-14">*</span></div>
        <SelectField
          :list="supplierList"
          :value="supplierCodeEdit"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (supplierCodeEdit = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Order Type<span class="text-red-14">*</span></div>
        <SelectField
          :list="orderTypeGaneralList"
          :value="orderTypeEdit"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (orderTypeEdit = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Warehouse<span class="text-red-14">*</span></div>
        <SelectField
          :list="wareHouseList"
          :value="warehouseEdit"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (warehouseEdit = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Doc Date<span class="text-red-14">*</span></div>
        <DateField :value="docDateEdit" @onUpdate="(value: string) => (docDateEdit = value)" />
      </div>
      <div class="form-component">
        <div class="popup-label">Receiving Date<span class="text-red-14">*</span></div>
        <DateField
          :value="receiveDateEdit"
          @onUpdate="(value: string) => (receiveDateEdit = value)"
        />
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
        @click="confirmEditReceiveOrder"
        no-caps
      >
        <div class="px-2 flex flex-row items-center">
          <q-icon name="save_as" color="white" size="20px" />
          <p class="pl-1 font-thaibev-medium text-white">Save</p>
        </div>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, type Ref } from "vue";
import { storeToRefs } from "pinia";
import { useMasterDataStore } from "@/stores/MasterDataStore";
import type { IEditReceiptOrder_Params } from "@/interfaces/hooks/IGoodsReceipt";
import type { IQSelectField_Group } from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  props: [
    "receiptNo",
    "referenceNo",
    "ownerCode",
    "supplierCode",
    "orderType",
    "warehouse",
    "docDate",
    "receiveDate",
  ],
  emits: ["onEdit"],
  setup(props, { emit }) {
    const masterStore = useMasterDataStore();
    const { ownerList, orderTypeList, supplierList, wareHouseList } = storeToRefs(masterStore);

    const referenceNoEdit = ref<string>(props.referenceNo);
    const ownerCodeEdit = ref<string>(props.ownerCode);
    const supplierCodeEdit = ref<string>(props.supplierCode);
    const orderTypeEdit = ref<string>(props.orderType);
    const warehouseEdit = ref<string>(props.warehouse);
    const docDateEdit = ref<string>(props.docDate);
    const receiveDateEdit = ref<string>(props.receiveDate);

    const confirmEditReceiveOrder = () => {
      const params: IEditReceiptOrder_Params = {
        receiptNo: props.receiptNo,
        referenceNo: referenceNoEdit.value,
        ownerCode: ownerCodeEdit.value,
        supplierCode: supplierCodeEdit.value,
        orderType: orderTypeEdit.value,
        warehouse: warehouseEdit.value,
        docDate: docDateEdit.value,
        receiveDate: receiveDateEdit.value,
      };

      emit("onEdit", params);
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
      referenceNoEdit,
      ownerCodeEdit,
      supplierCodeEdit,
      orderTypeEdit,
      warehouseEdit,
      docDateEdit,
      receiveDateEdit,
      confirmEditReceiveOrder,
    };
  },
});
</script>

<style lang="scss">
.templete_web .goods-receipt-edit-oder {
  .form-component {
    margin-bottom: 10px;
    width: 300px;
  }
}
</style>
