<template>
  <q-card class="popup-form edit-receive-item-checkin">
    <q-card-section class="section-header">
      <div class="popup-title">Item Code {{ itemCodeRef }}</div>
    </q-card-section>
    <q-card-section class="section-body bg-white">
      <div class="form-component">
        <div class="popup-label">Item</div>
        <q-input standout disable v-model="itemNameRef" />
      </div>
      <div class="form-component">
        <div class="popup-label">Loc</div>
        <SelectField
          :list="selectLoc"
          :value="locRef"
          placeholder="- เลือก -"
          @onSelect="onChangeLocation"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Pallet No</div>
        <q-input standout disable v-model="palletNoRef" />
      </div>
      <div class="form-component">
        <div class="popup-label">Batch</div>
        <q-input standout disable v-model="batchRef" />
      </div>
      <div class="form-component">
        <div class="popup-label">Lot</div>
        <q-input standout disable v-model="lotRef" />
      </div>
      <div class="row form-component">
        <div class="col">
          <div class="form-half-component">
            <div class="popup-label">MFG</div>
            <q-input standout disable v-model="mfgRef" />
          </div>
        </div>
        <div class="col">
          <div class="form-half-component" style="margin-left: 10px">
            <div class="popup-label">EXP</div>
            <q-input standout disable v-model="expRef" />
          </div>
        </div>
      </div>
      <div class="form-component">
        <div class="popup-label">Received</div>
        <div class="row items-start q-gutter-x-md">
          <q-input
            standout
            disable
            class="qty-confirm"
            input-class="text-center"
            v-model="receiveQty1Ref"
          />
          <q-input
            v-if="receiveQty2Ref > 0"
            standout
            disable
            class="qty-confirm"
            input-class="text-center"
            v-model="receiveQty2Ref"
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
      <q-btn dense unelevated size="md" class="bg-teal-700" @click="onConfirmClick" no-caps>
        <div class="px-2 flex flex-row items-center">
          <q-icon name="save_as" color="white" size="20px" />
          <p class="pl-1 font-thaibev-medium text-white">Save</p>
        </div>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import type { IGoodsReceipt_PopupEditItemCheclIn_Saving } from "@/interfaces/pages/IGoodsReceipt";
import type { IQSelectField_ZoneCode } from "@/interfaces/quasar/IQuasar";
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: [
    "lineNo",
    "skuCode",
    "description",
    "loc",
    "palletNo",
    "batch",
    "lot",
    "mfg",
    "exp",
    "qty1",
    "uom1",
    "uomDisplay1",
    "qty2",
    "uom2",
    "uomDisplay2",
    "receiveQty1",
    "receiveUom1",
    "receiveQty2",
    "receiveUom2",
    "selectLoc",
    "baseConvertQty",
    "baseUomCode",
    "baseUomName",
    "saleConvertQty",
    "saleUomCode",
    "saleUomName",
    "confirmConvertQty",
    "confirmUomCode",
    "confirmUomName",
  ],
  emits: ["onSave"],
  setup(props, { emit }) {
    const lineNoRef = ref<number>(props.lineNo);
    const itemCodeRef = ref<string>(props.skuCode);
    const itemNameRef = ref<string>(props.description);
    const locRef = ref<string>(props.loc);
    const zoneCodeRef = ref<string>("");
    const palletNoRef = ref<string>(props.palletNo);
    const batchRef = ref<string>(props.batch);
    const lotRef = ref<string>(props.lot);
    const mfgRef = ref<string>(props.mfg);
    const expRef = ref<string>(props.exp);
    const receiveQty1Ref = ref<number>(props.receiveQty1);
    const receiveUom1Ref = ref<number>(props.receiveUom1);
    const receiveQty2Ref = ref<number>(props.receiveQty2);
    const receiveUom2Ref = ref<number>(props.receiveUom2);

    const onConfirmClick = () => {
      const params: IGoodsReceipt_PopupEditItemCheclIn_Saving = {
        lineNo: props.lineNo,
        loc: locRef.value,
        zoneCode: zoneCodeRef.value,
      };
      emit("onSave", params);
    };

    const onChangeLocation = (_label: string, val: string) => {
      locRef.value = val;
      const findLoc: IQSelectField_ZoneCode | undefined = props.selectLoc.find(
        (f: IQSelectField_ZoneCode) => f.value == val
      );
      if (findLoc !== undefined) {
        zoneCodeRef.value = findLoc.zoneCode;
      }
    };

    return {
      lineNoRef,
      itemCodeRef,
      itemNameRef,
      locRef,
      palletNoRef,
      batchRef,
      lotRef,
      mfgRef,
      expRef,
      receiveQty1Ref,
      receiveUom1Ref,
      receiveQty2Ref,
      receiveUom2Ref,
      onChangeLocation,
      onConfirmClick,
    };
  },
});
</script>

<style lang="scss">
.templete_web .edit-receive-item-checkin {
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
    .qty-confirm {
      max-width: 30%;
    }
  }
  .form-half-component {
    width: 140px;
  }
}
</style>
