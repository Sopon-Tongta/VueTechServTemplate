import { ref } from "vue";
import { defineStore } from "pinia";
import useUtilHook from "@/hooks/useUtil";
import type {
  IGetOwnerMaster_Response,
  IGetOrderTypeMaster_Response_Data,
  IGetSupplierMaster_Response_Data,
  IGetWHMaster_Response_Data,
} from "@/interfaces/hooks/IUtil";
import type {
  IQSelectField,
  IQSelectField_Group,
  IQSelectField_ItemName,
} from "@/interfaces/quasar/IQuasar";

const useMasterDataStore = defineStore("MasterData", () => {
  const {
    menuMaster,
    menuAccess,
    menuBuilding,
    ownerMaster,
    orderTypeMaster,
    supplierMaster,
    whMaster,
    getMenuMaster,
    getMenuAccess,
    getOwnerMaster,
    getOrderTypeMaster,
    getSupplierMaster,
    getWHMaster,
  } = useUtilHook.useUtil();

  const ownerList = ref<Array<IQSelectField>>([]);
  const orderTypeList = ref<Array<IQSelectField_Group>>([]);
  const supplierList = ref<Array<IQSelectField_ItemName>>([]);
  const wareHouseList = ref<Array<IQSelectField>>([]);

  const getMaster = async () => {
    await getMenuMaster();
    await getMenuAccess();
    await getOwnerMaster();
    await getOrderTypeMaster();
    await getSupplierMaster();
    await getWHMaster();

    ownerList.value = ownerMaster.value.map((data: IGetOwnerMaster_Response) => {
      return {
        label: data.ownername,
        value: data.ownercode,
      };
    });
    orderTypeList.value = orderTypeMaster.value.map((data: IGetOrderTypeMaster_Response_Data) => {
      return {
        label: data.value,
        value: data.value,
        group: data.group,
      };
    });
    supplierList.value = supplierMaster.value.map((data: IGetSupplierMaster_Response_Data) => {
      return {
        label: "".concat("[", data.SupCode, "]", " ", data.SupName),
        value: data.SupCode,
        itemName: data.SupName,
      };
    });
    wareHouseList.value = whMaster.value.map((data: IGetWHMaster_Response_Data) => {
      return {
        label: data.WhName,
        value: data.WhCode,
      };
    });
  };
  return {
    menuMaster,
    menuAccess,
    menuBuilding,
    ownerList,
    orderTypeList,
    supplierList,
    wareHouseList,
    getMaster,
  };
});

export { useMasterDataStore };
