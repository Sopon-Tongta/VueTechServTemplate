<template>
  <q-card class="popup-form edit-receive-item-new">
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
        <q-input outlined clearable v-model="palletNoRef" placeholder="กรอกข้อมูล" />
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
        <div class="popup-label">Total</div>
        <div class="row items-start q-gutter-x-md">
          <q-input
            standout
            disable
            class="qty-confirm"
            input-class="text-center"
            v-model="qty1Ref"
          />
          <q-input
            v-if="qty2Ref > 0"
            standout
            disable
            class="qty-confirm"
            input-class="text-center"
            v-model="qty2Ref"
          />
        </div>
      </div>

      <div class="form-component">
        <div class="popup-label">Received</div>
        <div class="row items-start q-gutter-x-md">
          <q-input
            outlined
            mask="######"
            class="qty-confirm"
            input-class="text-center"
            v-model="receiveQty1Ref"
            :placeholder="uomDisplay1"
            @update:model-value="onReceiveQty('receiveQty1')"
          />
          <q-input
            v-if="qty2Ref > 0"
            outlined
            mask="######"
            class="qty-confirm"
            input-class="text-center"
            v-model="receiveQty2Ref"
            :placeholder="uomDisplay2"
            @update:model-value="onReceiveQty('receiveQty2')"
          />
        </div>
        <div v-if="!isValidIssue" class="font-thaibev-semibold text-[14px] text-red-500">**จำนวนเกินค่าที่มี !!</div>
      </div>
      <div class="form-component">
        <div class="popup-label text-red">Remaining</div>
        <div class="row items-start q-gutter-x-md">
          <q-input
            standout
            disable
            class="qty-confirm"
            input-class="text-center text-red"
            v-model="remain1Ref"
          />
          <q-input
            v-if="qty2Ref > 0"
            standout
            disable
            class="qty-confirm"
            input-class="text-center text-red"
            v-model="remain2Ref"
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
        @click="onConfirmClick"
        :disable="!isValidIssue"
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
import type { IGoodsReceipt_PopupEditItemNew_Saving } from "@/interfaces/pages/IGoodsReceipt";
import type { IQSelectField_ZoneCode } from "@/interfaces/quasar/IQuasar";
import { defineComponent, onMounted, ref } from "vue";
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
  emits: ["onAlert", "onSave"],
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
    const qty1Ref = ref<number>(props.qty1);
    const uom1Ref = ref<string>(props.uom1);
    const qty2Ref = ref<number>(props.qty2);
    const uom2Ref = ref<string>(props.uom2);
    const receiveQty1Ref = ref<number>(props.receiveQty1 || 0);
    const receiveUom1Ref = ref<string>(props.receiveUom1);
    const receiveQty2Ref = ref<number>(props.receiveQty2 || 0);
    const receiveUom2Ref = ref<string>(props.receiveUom2);
    const remain1Ref = ref<number>(props.qty1);
    const remain2Ref = ref<number>(props.qty2);
    const sumQtyBase = ref<number>(0);
    const isValidIssue = ref(true);

    const calQtyRemainFn = (typeReceive?: string) => {
      isValidIssue.value = true;
      const receive1 = Number(receiveQty1Ref.value);
      const receive2 = Number(receiveQty2Ref.value);
      let sumReceive = 0;
      if (receive1 > 0) {
        let convertUomReceive1 =
          receiveUom1Ref.value == props.saleUomCode ? props.saleConvertQty : props.baseConvertQty;
        sumReceive += receive1 * convertUomReceive1;
      }
      if (receive2 > 0) {
        let convertUomReceive2 =
          receiveUom2Ref.value == props.saleUomCode ? props.saleConvertQty : props.baseConvertQty;
        sumReceive += receive2 * convertUomReceive2;
      }
      let sumRemain = sumQtyBase.value - sumReceive;
      if (sumRemain > 0) {
        if (props.saleConvertQty > 1) {
          let remainQty = Math.floor(sumRemain / props.saleConvertQty);
          let remainUnit = sumRemain % props.saleConvertQty;
          if (remainQty > 0) {
            remain1Ref.value = remainQty;
            if (remainUnit > 0) {
              remain2Ref.value = remainUnit;
            } else {
              remain2Ref.value = 0;
            }
          } else if (remainUnit > 0) {
            remain1Ref.value = 0;
            remain2Ref.value = remainUnit;
          } else {
            remain1Ref.value = 0;
            remain2Ref.value = 0;
          }
        } else {
          remain1Ref.value = sumRemain;
          remain2Ref.value = 0;
        }
      } else {
        if (sumRemain < 0) {
          switch (typeReceive) {
            case "receiveQty1":
              remain1Ref.value = 0;
              break;
            case "receiveQty2":
              remain2Ref.value = 0;
              break;
          }
          isValidIssue.value = false;
        } else {
          remain1Ref.value = 0;
          remain2Ref.value = 0;
        }
      }
    };

    let timeout_receiveQty: number = 0;
    const onReceiveQty = (typeReceive: string) => {
      window.clearTimeout(timeout_receiveQty);
      timeout_receiveQty = window.setTimeout(() => {
        calQtyRemainFn(typeReceive);
      }, 200);
    };

    onMounted(() => {
      let qty1 = isNaN(qty1Ref.value) ? 0 : qty1Ref.value;
      let convertQty1 =
        uom1Ref.value == props.saleUomCode ? props.saleConvertQty : props.baseConvertQty;

      sumQtyBase.value += qty1 * convertQty1;

      let qty2 = isNaN(qty2Ref.value) ? 0 : qty2Ref.value;
      let convertQty2 =
        uom2Ref.value == props.saleUomCode ? props.saleConvertQty : props.baseConvertQty;

      sumQtyBase.value += qty2 * convertQty2;

      calQtyRemainFn();
    });

    const onConfirmClick = () => {
      const receive1 = receiveQty1Ref.value;
      const receive2 = receiveQty2Ref.value;
      if (receive1 == 0 && receive2 == 0) {
        emit("onAlert", "โปรดระบุ Received", "warning");
        return;
      }
      const params: IGoodsReceipt_PopupEditItemNew_Saving = {
        lineNo: props.lineNo,
        loc: locRef.value,
        zoneCode: zoneCodeRef.value,
        palletNo: palletNoRef.value,
        receiveQty1: Number(receiveQty1Ref.value),
        receiveUom1: receiveUom1Ref.value,
        receiveQty2: Number(receiveQty2Ref.value),
        receiveUom2: receiveUom2Ref.value,
        remainQty1: Number(remain1Ref.value),
        remainQty2: Number(remain2Ref.value),
        reasonNotFull: "",
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
      zoneCodeRef,
      palletNoRef,
      batchRef,
      lotRef,
      mfgRef,
      expRef,
      qty1Ref,
      uom1Ref,
      qty2Ref,
      uom2Ref,
      receiveQty1Ref,
      receiveUom1Ref,
      receiveQty2Ref,
      receiveUom2Ref,
      remain1Ref,
      remain2Ref,
      isValidIssue,
      onReceiveQty,
      onChangeLocation,
      onConfirmClick,
    };
  },
});
</script>

<style lang="scss">
.templete_web .edit-receive-item-new {
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
