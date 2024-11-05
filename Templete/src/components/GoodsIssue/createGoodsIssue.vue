<template>
  <q-card class="popup-form goods-issue-popup-create">
    <q-card-section class="section-header">
      <div class="popup-title">Create GI Order</div>
    </q-card-section>
    <q-card-section class="section-body bg-white">
      <div class="form-component">
        <div class="popup-label">Reference No.</div>
        <q-input outlined dense clearable v-model="createReferenceNo" placeholder="กรอกข้อมูล" />
      </div>
      <div class="form-component">
        <div class="popup-label">Owner<span class="text-red-14">*</span></div>
        <SelectField
          :list="ownerList"
          :value="createOwner"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (createOwner = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">W/H<span class="text-red-14">*</span></div>
        <SelectField
          :list="wareHouseList"
          :value="createWHCode"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (createWHCode = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Customer<span class="text-red-14">*</span></div>
        <SelectField
          :list="masterCustomer"
          :value="createCustomerCode"
          placeholder="เลือกข้อมูล"
          @onSelect="onSelectCustomer"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Order Type<span class="text-red-14">*</span></div>
        <SelectField
          :list="orderTypeGeneralList"
          :value="createOrderType"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (createOrderType = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Bill To<span class="text-red-14">*</span></div>
        <SelectField
          :list="masterBillTo"
          :value="createBillTo"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (createBillTo = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Delivery To<span class="text-red-14">*</span></div>
        <SelectField
          :list="masterDeliveryTo"
          :value="createDeliveryTo"
          placeholder="เลือกข้อมูล"
          @onSelect="(_label: string, val: string) => (createDeliveryTo = val)"
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Doc. Date<span class="text-red-14">*</span></div>
        <DateField
          :value="createDocDate"
          @onUpdate="
            (value: string) => {
              createDocDate = value;
            }
          "
        />
      </div>
      <div class="form-component">
        <div class="popup-label">Delivery Date<span class="text-red-14">*</span></div>
        <DateField
          :value="createDeliveryDate"
          @onUpdate="
            (value: string) => {
              createDeliveryDate = value;
            }
          "
        />
      </div>
    </q-card-section>
    <q-card-actions class="section-action">
      <q-btn
        dense
        outline
        size="md"
        color="red"
        no-caps
        v-close-popup
      >
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
        @click="confirmCreateGoodsIssue"
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
import { defineComponent, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useMasterDataStore } from "@/stores/MasterDataStore";
import useUtilHook from "@/hooks/useUtil";
import useGoodsIssueHook from "@/hooks/useGoodsIssue";
import { useAuthStore } from "@/stores/AuthStore";
import type {
  ICreateGoodsIssue_Request,
  ICreateGoodsIssue_Response,
} from "@/interfaces/hooks/IGoodsIssue";
import type { IQSelectField } from "@/interfaces/quasar/IQuasar";

export default defineComponent({
  emits: ["onAlert", "onShowLoading", "onHideLoading", "onSave"],
  setup(props, { emit }) {
    const { ownerList, wareHouseList, orderTypeList } = storeToRefs(useMasterDataStore());
    const { userAuth } = useAuthStore();
    const { formatDate_DDMMYYYY, formatDate_DB } = useUtilHook.useUtil();
    const {
      masterCustomer,
      masterBillTo,
      masterDeliveryTo,
      getMasterCustomer,
      getMasterBillTo,
      getMasterDeliveryTo,
      saveCreateGoodsIssue,
    } = useGoodsIssueHook.useGoodsIssue();

    const createReferenceNo = ref("");
    const createOwner = ref("");
    const createWHCode = ref("");
    const createCustomerCode = ref("");
    const createCustomerName = ref("");
    const createOrderType = ref("");
    const createBillTo = ref("");
    const createDeliveryTo = ref("");
    const createDocDate = ref(formatDate_DDMMYYYY(Date.now()));
    const createDeliveryDate = ref(formatDate_DDMMYYYY(Date.now()));
    const orderTypeGeneralList = ref<Array<IQSelectField>>([]);
    const mapOrderType = () => {
      orderTypeGeneralList.value = orderTypeList.value.filter((x) => x.group == "GENERAL");
    };

    const onSelectCustomer = (label: string, val: string) => {
      let wait_1 = false;
      let wait_2 = false;
      createCustomerCode.value = val;
      createCustomerName.value = label;
      createBillTo.value = "";
      createDeliveryTo.value = "";
      if (val == "") {
        masterBillTo.value = [];
        masterDeliveryTo.value = [];
      } else {
        emit("onShowLoading");
        getMasterBillTo(createCustomerCode.value, () => {
          wait_1 = true;
          if (wait_2 == true) {
            emit("onHideLoading");
          }
        });
        getMasterDeliveryTo(createCustomerCode.value, () => {
          wait_2 = true;
          if (wait_1 == true) {
            emit("onHideLoading");
          }
        });
      }
    };

    const confirmCreateGoodsIssue = () => {
      if (
        createOwner.value == "" ||
        createCustomerCode.value == "" ||
        createOrderType.value == "" ||
        createBillTo.value == "" ||
        createDeliveryTo.value == "" ||
        createDocDate.value == "" ||
        createDeliveryDate.value == "" ||
        createWHCode.value == ""
      ) {
        emit("onAlert", "Please. Input All field !!", "warning");
      } else {
        emit("onShowLoading");
        var createData: ICreateGoodsIssue_Request = {
          goodIssue: {
            billto: createBillTo.value,
            cuscode: createCustomerCode.value,
            cusname: createCustomerName.value,
            deliverydate: formatDate_DB(createDeliveryDate.value),
            deliveryto: createDeliveryTo.value,
            docdate: formatDate_DB(createDocDate.value),
            orderType: createOrderType.value,
            ownercode: createOwner.value,
            referenceno: createReferenceNo.value,
            whcodesource: createWHCode.value,
          },
          userid: userAuth.contactId,
          usercode: userAuth.contactId.toString(),
        };
        saveCreateGoodsIssue(createData, (result: ICreateGoodsIssue_Response) => {
          emit("onSave", result);
        });
      }
    };

    onMounted(() => {
      getMasterCustomer(() => {
        emit("onHideLoading");
      });
      mapOrderType();
    });

    return {
      masterCustomer,
      masterBillTo,
      masterDeliveryTo,
      orderTypeGeneralList,
      createReferenceNo,
      createOwner,
      createWHCode,
      createCustomerCode,
      createOrderType,
      createBillTo,
      createDeliveryTo,
      createDocDate,
      createDeliveryDate,
      onSelectCustomer,
      confirmCreateGoodsIssue,
      ownerList,
      wareHouseList,
    };
  },
});
</script>

<style lang="scss">
.templete_web .goods-issue-popup-create {
  .form-component {
    margin-bottom: 10px;
    width: 300px;
  }
}
</style>
