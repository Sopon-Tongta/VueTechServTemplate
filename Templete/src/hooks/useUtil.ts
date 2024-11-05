import { ref } from "vue";
import { useQuasar, QSpinnerGears } from "quasar";
import { useConfigStore } from "@/stores/ConfigStore";
import { useAuthStore } from "@/stores/AuthStore";
import { storeToRefs } from "pinia";
import type {
  IViewMenuAccess,
  IGetOwnerMaster_Response,
  IGetOrderTypeMaster_Response_Data,
  IGetSupplierMaster_Response_Data,
  IGetWHMaster_Response_Data,
  IGetProductByOwner_Response_Data,
  IGetProductByCode_Response_UOM,
  IGetLocationByWH_Response_Data,
  IGetOrderTypeMaster_Response,
  IGetSupplierMaster_Response,
  IGetWHMaster_Response,
  IGetMenuMaster_Response,
  IGetMenuMaster_Response_Data,
  IGetMenuAccess_Response_Data,
  IGetMenuAccess_Response,
  IGetProductByOwner_Response,
  IGetProductByCode_Response,
  IGetLocationByWH_Response,
  IGetFilterUOMConvertByProduct,
  IGetProduct_Response,
  IProductData,
  IUOMConvertData,
} from "@/interfaces/hooks/IUtil";

const { env } = storeToRefs(useConfigStore());

const { userAuth } = storeToRefs(useAuthStore());

const useUtil = () => {
  const $q = useQuasar();
  const menuBuilding = ref<Array<IViewMenuAccess>>([]);
  const menuMaster = ref<Array<IGetMenuMaster_Response_Data>>([]);
  const menuAccess = ref<Array<IGetMenuAccess_Response_Data>>([]);
  const ownerMaster = ref<Array<IGetOwnerMaster_Response>>([]);
  const orderTypeMaster = ref<Array<IGetOrderTypeMaster_Response_Data>>([]);
  const supplierMaster = ref<Array<IGetSupplierMaster_Response_Data>>([]);
  const whMaster = ref<Array<IGetWHMaster_Response_Data>>([]);
  const productOwner = ref<Array<IGetProductByOwner_Response_Data>>([]);
  const uomProduct = ref<Array<IGetProductByCode_Response_UOM>>([]);
  const locationWH = ref<Array<IGetLocationByWH_Response_Data>>([]);
  const productOwnerV2 = ref<Array<IProductData>>([]);
  const uomProductV2 = ref<Array<IUOMConvertData>>([]);

  const uid = () => {
    const a = new Uint32Array(3);
    window.crypto.getRandomValues(a);
    return (
      performance.now().toString(36) +
      Array.from(a)
        .map((A) => A.toString(36))
        .join("")
    ).replace(/\./g, "");
  };

  const getOwnerMaster = async (callBackFn?: (arg: Array<IGetOwnerMaster_Response>) => void) => {
    if (typeof callBackFn === "function") {
      callBackFn(ownerMaster.value);
    }
    // await fetch(`${env.value.inventory_api}/api/v1/owner`)
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     throw new Error(`${res.status}: ${res.statusText}`);
    //   })
    //   .then((resJson) => {
    //     if (resJson.Ok == null) {
    //       throw new Error(`ไม่พบข้อมูล Owner ใน Database`);
    //     }
    //     ownerMaster.value = resJson.Ok.map((data: IGetOwnerMaster_Response) => {
    //       return {
    //         ownercode: data.ownercode,
    //         ownername: data.ownername,
    //         address: data.address,
    //         tambon: data.tambon,
    //         district: data.district,
    //         province: data.province,
    //         country: data.country,
    //         postcode: data.postcode,
    //       };
    //     });
    //     if (typeof callBackFn === "function") {
    //       callBackFn(ownerMaster.value);
    //     }
    //   })
    //   .catch((error) => {
    //     alertFetchError(error.message);
    //   });
  };

  const getOrderTypeMaster = async (
    callBackFn?: (arg: Array<IGetOrderTypeMaster_Response_Data>) => void
  ) => {
    if (typeof callBackFn === "function") {
      callBackFn(orderTypeMaster.value);
    }
    // await fetch(`${env.value.inventory_api}/api/v1/system/ordertype`)
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     throw new Error(`${res.status}: ${res.statusText}`);
    //   })
    //   .then((resJson: IGetOrderTypeMaster_Response) => {
    //     orderTypeMaster.value = resJson.data.map((data: IGetOrderTypeMaster_Response_Data) => {
    //       return {
    //         key: data.key,
    //         value: data.value,
    //         group: data.group,
    //       };
    //     });

    //     if (typeof callBackFn === "function") {
    //       callBackFn(orderTypeMaster.value);
    //     }
    //   })
    //   .catch((error) => {
    //     alertFetchError(error.message);
    //   });
  };

  const getSupplierMaster = async (
    callBackFn?: (arg: Array<IGetSupplierMaster_Response_Data>) => void
  ) => {
    if (typeof callBackFn === "function") {
      callBackFn(supplierMaster.value);
    }
    // await fetch(`${env.value.inventory_api}/api/v1/Supplier/supCode/ALL`)
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     throw new Error(`${res.status}: ${res.statusText}`);
    //   })
    //   .then((resJson: IGetSupplierMaster_Response) => {
    //     supplierMaster.value = resJson.Result.map((data: IGetSupplierMaster_Response_Data) => {
    //       return {
    //         SupCode: data.SupCode,
    //         SupName: data.SupName,
    //         Address: data.Address,
    //         Tambon: data.Tambon,
    //         District: data.District,
    //         Province: data.Province,
    //         Country: data.Country,
    //         PostCode: data.PostCode,
    //         Contact: data.Contact,
    //         Tel: data.Tel,
    //         Email: data.Email,
    //         Fax: data.Fax,
    //       };
    //     });
    //     if (typeof callBackFn === "function") {
    //       callBackFn(supplierMaster.value);
    //     }
    //   })
    //   .catch((error) => {
    //     alertFetchError(error.message);
    //   });
  };

  const getWHMaster = async (callBackFn?: (arg: Array<IGetWHMaster_Response_Data>) => void) => {
    if (typeof callBackFn === "function") {
      callBackFn(whMaster.value);
    }
    // await fetch(`${env.value.inventory_api}/api/v1/warehouse`)
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     throw new Error(`${res.status}: ${res.statusText}`);
    //   })
    //   .then((resJson: IGetWHMaster_Response) => {
    //     whMaster.value = resJson.dataWhBuilding.map((data: IGetWHMaster_Response_Data) => {
    //       return {
    //         WhCode: data.WhCode,
    //         WhName: data.WhName,
    //         WhType: data.WhType,
    //         WhTypeName: data.WhTypeName,
    //         WhTypeCode: data.WhTypeCode,
    //         PlantCode: data.PlantCode,
    //         PlantName: data.PlantName,
    //         Sloc: data.Sloc,
    //         Address: data.Address,
    //         TamBon: data.TamBon,
    //         District: data.District,
    //         Province: data.Province,
    //         Country: data.Country,
    //         PostCode: data.PostCode,
    //       };
    //     });
    //     if (typeof callBackFn === "function") {
    //       callBackFn(whMaster.value);
    //     }
    //   })
    //   .catch((error) => {
    //     alertFetchError(error.message);
    //   });
  };

  const getMenuMaster = async (callBackFn?: () => void) => {
    if (typeof callBackFn === "function") {
      callBackFn();
    }
    // await fetch(`${env.value.inventory_api}/api/v1/system/menu`)
    //   .then((res_raw) => {
    //     if (res_raw.ok) {
    //       return res_raw.json();
    //     }
    //     throw new Error(`${res_raw.status}: ${res_raw.statusText}`);
    //   })
    //   .then((res_json: IGetMenuMaster_Response) => {
    //     menuMaster.value = res_json.list;
    //     if (typeof callBackFn === "function") {
    //       callBackFn();
    //     }
    //   })
    //   .catch((error) => {
    //     alertFetchError(error.message);
    //   });
  };

  const getMenuAccess = async (callBackFn?: () => void) => {
    const childMenuFn = (id: number) => {
      const saveMenu: Array<IViewMenuAccess> = [];
      const findMenu = menuAccess.value.filter((f) => f.parentId == id);
      findMenu.forEach((menu) => {
        const childItem = childMenuFn(menu.Id);
        saveMenu.push({
          menuId: menu.Id,
          icon: menu.icon,
          parentId: menu.parentId,
          label: menu.labelName,
          name: menu.pageName,
          path: menu.pathName,
          clickable: true,
          disable: env.value.environment.toLowerCase() === "local" ? false : menu.disableMenu,
          childMenu: menu.childMenu,
          childItem: childItem,
        });
      });
      return saveMenu;
    };

    menuAccess.value = [];

    menuAccess.value.push({
      Id: 1,
      labelName: "หน้าหลัก",
      parentId: 0,
      pageName: "index",
      pathName: "/",
      disableMenu: false,
      childMenu: true,
      icon: "",
    });

    menuAccess.value.push({
      Id: 2,
      labelName: "Goods Receipt",
      parentId: 1,
      pageName: "goodsReceipt",
      pathName: "/goodsReceipt",
      disableMenu: false,
      childMenu: false,
      icon: "task",
    });

    menuAccess.value.push({
      Id: 3,
      labelName: "Goods Issue",
      parentId: 1,
      pageName: "goodsIssue",
      pathName: "/goodsIssue",
      disableMenu: false,
      childMenu: false,
      icon: "receipt_long",
    });

    menuAccess.value.push({
      Id: 4,
      labelName: "Edit Goods Receipt",
      parentId: 2,
      pageName: "editGoodsReceipt",
      pathName: "/editGoodsReceipt",
      disableMenu: false,
      childMenu: false,
      icon: "",
    });

    menuAccess.value.push({
      Id: 15,
      labelName: "GI Order Detail",
      parentId: 3,
      pageName: "editGoodsIssue",
      pathName: "/editGoodsIssue",
      disableMenu: false,
      childMenu: false,
      icon: "",
    });

    menuAccess.value.push({
      Id: 16,
      labelName: "Confirm Issue",
      parentId: 3,
      pageName: "confirmGoodsIssue",
      pathName: "/confirmGoodsIssue",
      disableMenu: false,
      childMenu: false,
      icon: "",
    });

    menuBuilding.value = childMenuFn(0);

    if (typeof callBackFn === "function") {
      callBackFn();
    }
  };

  const getProductByOwnerCode = (
    ownerCode: string,
    callBackFn?: (arg: Array<IGetProductByOwner_Response_Data>) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/product/filter/owner/${ownerCode}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((resJson: IGetProductByOwner_Response) => {
        productOwner.value = resJson.list.map((data: IGetProductByOwner_Response_Data) => {
          return {
            skuCode: data.skuCode,
            nameTH: data.nameTH,
            nameEN: data.nameEN,
            batchCtrl: data.batchCtrl,
            expCtrl: data.expCtrl,
            lotCtrl: data.lotCtrl,
            mfgCtrl: data.mfgCtrl,
          };
        });
        if (typeof callBackFn === "function") {
          callBackFn(productOwner.value);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const getProductByOwnerCodeV2 = (
    ownerCode: string,
    callBackFn?: (arg: Array<IProductData>) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v2/product/filter/owner/${ownerCode}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((resJson: IGetProduct_Response) => {
        if (resJson.list != undefined) {
          productOwnerV2.value = resJson.list;
        }
        if (typeof callBackFn === "function") {
          callBackFn(productOwnerV2.value);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const GetFilterUOMConvertByProduct = (
    productCode: string,
    callBackFn?: (arg: Array<IUOMConvertData>) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/product/uom/filter/product/${productCode}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((resJson: IGetFilterUOMConvertByProduct) => {
        uomProductV2.value = resJson.list;

        if (typeof callBackFn === "function") {
          callBackFn(uomProductV2.value);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const getUOMByProductCode = (
    productCode: string,
    callBackFn?: (arg: Array<IGetProductByCode_Response_UOM>) => void
  ) => {
    fetch(`${env.value.inventory_api}/api/v1/product/${productCode}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`${res.status}: ${res.statusText}`);
      })
      .then((resJson: IGetProductByCode_Response) => {
        uomProduct.value = resJson.Ok.UOM.map((data: IGetProductByCode_Response_UOM) => {
          return {
            unitId: data.unitId,
            baseQuantity: data.baseQuantity,
            orderQuantity: data.orderQuantity,
            unitCode: data.unitCode,
            nameTH: data.nameTH,
            namEN: data.namEN,
          };
        });
        if (typeof callBackFn === "function") {
          callBackFn(uomProduct.value);
        }
      })
      .catch((error) => {
        alertFetchError(error.message);
      });
  };

  const getLocationFromWH = (
    WHCode: string,
    callBackFn?: (arg: Array<IGetLocationByWH_Response_Data>) => void
  ) => {
    if (typeof callBackFn === "function") {
      callBackFn(locationWH.value);
    }
    // fetch(`${env.value.inventory_api}/api/v1/location/dropdown/whcode/${WHCode}`)
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //     throw new Error(`${res.status}: ${res.statusText}`);
    //   })
    //   .then((resJson: IGetLocationByWH_Response) => {
    //     locationWH.value = resJson.list.map((data: IGetLocationByWH_Response_Data) => {
    //       return {
    //         zoneCode: data.zoneCode,
    //         locationCode: data.locationCode,
    //       };
    //     });
    //     if (typeof callBackFn === "function") {
    //       callBackFn(locationWH.value);
    //     }
    //   })
    //   .catch((error) => {
    //     alertFetchError(error.message);
    //   });
  };

  const formatDate_DDMMYYYY = (date: number) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formatDate_DB = (date_str: string) => {
    if (date_str.replaceAll(" ", "").length == 0) {
      return "";
    }
    const split_date: Array<string> = date_str.replaceAll("-", "/").split("/");
    if (split_date.length != 3) {
      return "";
    }
    return [split_date[2], split_date[1], split_date[0]].join("-");
  };

  const alertFetchError = (message: string) => {
    $q.loading.show({
      spinner: QSpinnerGears,
      spinnerSize: 50,
      spinnerColor: "theme-color",
      messageColor: "black",
      backgroundColor: "white",
      // message: "Please wait..",
      customClass: "templete_web",
    });

    $q.notify({
      type: "negative",
      message: message,
      position: "top",
      timeout: 1000 * 60 * 60 * 24,
      actions: [
        {
          icon: "close",
          color: "white",
          round: true,
          size: "sm",
          "aria-label": "Dismiss",
        },
      ],
    });
  };

  const addComma = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getRangeYearsFromCurrent = (positive: number, negative: number) => {
    const yearNow: number = new Date().getFullYear();
    const yearStart: number = yearNow - negative;
    const yearEnd: number = yearNow + positive;
    const listYears: Array<number> = [];
    for (let i = yearStart; i <= yearEnd; i++) {
      listYears.push(i);
    }
    return listYears;
  };

  const getAllMonths = () => {
    return [
      { month: 1, name: "มกราคม" },
      { month: 2, name: "กุมภาพันธ์" },
      { month: 3, name: "มีนาคม" },
      { month: 4, name: "เมษายน" },
      { month: 5, name: "พฤษภาคม" },
      { month: 6, name: "มิถุนายน" },
      { month: 7, name: "กรกฎาคม" },
      { month: 8, name: "สิงหาคม" },
      { month: 9, name: "กันยายน" },
      { month: 10, name: "ตุลาคม" },
      { month: 11, name: "พฤศจิกายน" },
      { month: 12, name: "ธันวาคม" },
    ];
  };

  return {
    menuMaster,
    menuAccess,
    menuBuilding,
    ownerMaster,
    orderTypeMaster,
    supplierMaster,
    whMaster,
    productOwner,
    uomProduct,
    productOwnerV2,
    uomProductV2,
    uid,
    getMenuMaster,
    getMenuAccess,
    getOwnerMaster,
    getOrderTypeMaster,
    getSupplierMaster,
    getWHMaster,
    getProductByOwnerCode,
    getUOMByProductCode,
    getLocationFromWH,
    formatDate_DDMMYYYY,
    formatDate_DB,
    alertFetchError,
    addComma,
    getRangeYearsFromCurrent,
    getAllMonths,
    getProductByOwnerCodeV2,
    GetFilterUOMConvertByProduct,
  };
};

export default { useUtil };
