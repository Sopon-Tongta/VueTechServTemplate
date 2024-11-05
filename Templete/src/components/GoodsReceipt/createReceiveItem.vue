<template>
  <q-card class="popup-form goods-receipt-create-item">
    <q-card-section class="section-header">
      <div class="popup-title">Add Order Item</div>
    </q-card-section>
    <q-card-section class="section-body bg-white">
      <div class="form-component">
        <div class="popup-label">Item<span class="text-red">*</span></div>
        <SelectField
          :list="selectItem"
          :value="itemCode"
          placeholder="เลือกข้อมูล"
          @onSelect="onSelectItem"
          @onClear="onItemClear"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Pallet No.</div>
        <q-input
          outlined
          clearable
          @clear="palletNo = ''"
          v-model="palletNo"
          placeholder="กรอกข้อมูล"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Batch<span :hidden="!batchReq" class="text-red">*</span></div>
        <q-input outlined clearable @clear="batch = ''" v-model="batch" placeholder="กรอกข้อมูล" />
      </div>
      <div class="form-component">
        <div class="popup-label">Lot<span :hidden="!lotReq" class="text-red">*</span></div>
        <q-input outlined clearable @clear="lot = ''" v-model="lot" placeholder="กรอกข้อมูล" />
      </div>
      <div class="row form-component">
        <div class="col">
          <div class="form-half-component">
            <div class="popup-label">MFG<span :hidden="!mfgReq" class="text-red">*</span></div>
            <DateField :value="mfgDate" @onUpdate="(val: string) => (mfgDate = val)" />
          </div>
        </div>
        <div class="col">
          <div class="form-half-component" style="margin-left: 10px">
            <div class="popup-label">EXP<span :hidden="!expReq" class="text-red">*</span></div>
            <DateField :value="expDate" @onUpdate="(val: string) => (expDate = val)" />
          </div>
        </div>
      </div>
      <div class="form-component">
        <div class="popup-label">Qty<span class="text-red">*</span></div>
        <div class="row items-start">
          <q-input outlined dense clearable class="qty-input" mask="######" v-model="qty1" />
          <SelectField
            :list="uomList"
            :value="uom1"
            class="qty-select"
            placeholder="- UoM -"
            @onSelect="(_label: string, value: string) => (uom1 = value)"
          />
        </div>
        <div class="row q-my-xs items-start">
          <q-input outlined dense clearable class="qty-input" mask="######" v-model="qty2" />
          <SelectField
            :list="uomList"
            :value="uom2"
            class="qty-select"
            placeholder="- UoM -"
            @onSelect="(_label: string, value: string) => (uom2 = value)"
          />
        </div>
        <div class="row q-my-xs items-start">
          <q-input outlined dense clearable class="qty-input" mask="######" v-model="qty3" />
          <SelectField
            :list="uomList"
            :value="uom3"
            class="qty-select"
            placeholder="- UoM -"
            @onSelect="(_label: string, value: string) => (uom3 = value)"
          />
        </div>
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
        @click="confirmCreateReceiveItem"
        no-caps
      >
        <div class="px-3 flex flex-row items-center">
          <q-icon name="post_add" color="white" size="20px" />
          <p class="pl-1 font-thaibev-medium text-white">Add</p>
        </div>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useUtilHook from "@/hooks/useUtil";
import type { ICreateReceiptOrderItem_Params } from "@/interfaces/hooks/IGoodsReceipt";
import type { IUOMConvertData } from "@/interfaces/hooks/IUtil";
import type { IQSelectField, IQSelectField_OwnerData } from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  props: ["selectItem"],
  emits: ["alert", "showLoading", "hideLoading", "onSave"],
  setup(props, { emit }) {
    const { formatDate_DDMMYYYY, GetFilterUOMConvertByProduct } = useUtilHook.useUtil();
    const itemCode = ref<string>("");
    const itemName = ref<string>("");
    const palletNo = ref<string>("");
    const batch = ref<string>("");
    const lot = ref<string>("");
    const mfgDate = ref<string>(formatDate_DDMMYYYY(Date.now()));
    const expDate = ref<string>(formatDate_DDMMYYYY(Date.now()));
    const qty1 = ref<string>("");
    const qty2 = ref<string>("");
    const qty3 = ref<string>("");
    const uom1 = ref<string>("");
    const uom2 = ref<string>("");
    const uom3 = ref<string>("");
    const uomList = ref<Array<IQSelectField>>([]);
    const batchReq = ref<boolean>(false);
    const lotReq = ref<boolean>(false);
    const mfgReq = ref<boolean>(false);
    const expReq = ref<boolean>(false);

    const onSelectItem = (label: string, val: string) => {
      debugger;
      itemName.value = label;
      itemCode.value = val;
      qty1.value = "";
      qty2.value = "";
      qty3.value = "";
      uom1.value = "";
      uom2.value = "";
      uom3.value = "";
      uomList.value = [];
      if (itemCode.value.length > 0) {
        emit("showLoading");
        const sel: IQSelectField_OwnerData = props.selectItem.find(
          (f: IQSelectField_OwnerData) => f.value == val
        );
        batchReq.value = sel.batchReq == 1;
        lotReq.value = sel.lotReq == 1;
        mfgReq.value = sel.mfgReq == 1;
        expReq.value = sel.expReq == 1;
        GetFilterUOMConvertByProduct(itemCode.value, (uomResult: Array<IUOMConvertData>) => {
          uomList.value.push({
            label: "",
            value: "",
          });
          for (let i = 0; i < uomResult.length; i++) {
            if (uomResult[i].unitCode != "") {
              uomList.value.push({
                label: uomResult[i].nameTH,
                value: uomResult[i].unitCode,
              });
            }
          }
          emit("hideLoading");
        });
      } else {
        qty1.value = "";
        qty2.value = "";
        qty3.value = "";
        uom1.value = "";
        uom2.value = "";
        uom3.value = "";
        uomList.value = [];
      }
    };

    const onItemClear = () => {
      batchReq.value = false;
      lotReq.value = false;
      mfgReq.value = false;
      expReq.value = false;
    };

    const confirmCreateReceiveItem = () => {
      const selSKU: IQSelectField_OwnerData = props.selectItem.find(
        (f: IQSelectField_OwnerData) => f.value === itemCode.value
      );
      const params: ICreateReceiptOrderItem_Params = {
        itemCode: itemCode.value,
        itemName: selSKU === undefined ? itemName.value : selSKU.itemName,
        mfgDate: mfgDate.value,
        expDate: expDate.value,
        palletNo: palletNo.value,
        lot: lot.value,
        batch: batch.value,
        qty1: isNaN(parseInt(qty1.value)) ? 0 : parseInt(qty1.value),
        uom1: uom1.value,
        qty2: isNaN(parseInt(qty2.value)) ? 0 : parseInt(qty2.value),
        uom2: uom2.value,
        qty3: isNaN(parseInt(qty3.value)) ? 0 : parseInt(qty3.value),
        uom3: uom3.value,
        batchReq: batchReq.value,
        lotReq: lotReq.value,
        mfgReq: mfgReq.value,
        expReq: expReq.value,
        ownerCode: "",
        receiptNo: "",
      };
      emit("onSave", params);
    };

    return {
      itemCode,
      palletNo,
      batch,
      lot,
      mfgDate,
      expDate,
      uomList,
      qty1,
      qty2,
      qty3,
      uom1,
      uom2,
      uom3,
      batchReq,
      lotReq,
      mfgReq,
      expReq,
      onSelectItem,
      onItemClear,
      confirmCreateReceiveItem,
    };
  },
});
</script>

<style lang="scss">
.templete_web .goods-receipt-create-item {
  .form-component {
    margin-bottom: 10px;
    width: 300px;
    .qty-input {
      max-width: 50%;
      .q-field__control {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .qty-select {
      max-width: 50%;
      width: 100%;
      .q-field__control {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
  .form-half-component {
    width: 140px;
  }
}
</style>
