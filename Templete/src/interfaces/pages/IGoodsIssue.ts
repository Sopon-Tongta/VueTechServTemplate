import type { IQSelectField } from "@/interfaces/quasar/IQuasar";
import type { IGetPallet_Response_Data, IUom, IUomItemMaster } from "@/interfaces/hooks/IUtil";

export interface IGoodsIssue_PopupEditOrder_Params {
  giOrder?: string;
  referenceNo?: string;
  ownerCode?: string;
  whCode?: string;
  customerCode?: string;
  customerName?: string;
  orderType?: string;
  billTo?: string;
  deliveryTo?: string;
  docDate?: string;
  deliveryDate?: string;
}

export interface IGoodsIssue_PopupEditItem_Params {
  itemNo?: string;
  itemName?: string;
  locationCode?: string;
  zoneCode?: string;
  palletNo?: string;
  batch?: string;
  lot?: string;
  MFG?: string;
  EXP?: string;
  lineNo?: number;
  uomBase?: IUom;
  uomOrder?: IUom;
  UOMItemMaster?: Array<IUom>;
  UOMList?: Array<IQSelectField>;
  qty1?: string;
  qty2?: string;
  unit1?: string;
  unit2?: string;
  zoneList?: Array<IQSelectField>;
  masterPalletList?: Array<IGetPallet_Response_Data>;
}

export interface IGoodsIssue_PopupCreateItem_Params {
  itemNoList?: Array<IQSelectField>;
  zoneList?: Array<IQSelectField>;
}

export interface IGoodsIssue_PopupConfirmItem_Params {
  getRecord: {
    giOrder?: string;
    ownerCode?: string;
    whCode?: string;
    lineNo?: number;
    status?: string;
    itemNo?: string;
    itemName?: string;
    locationCode?: string;
    zoneCode?: string;
    palletNo?: string;
    lot?: string;
    batch?: string;
    MFG?: string;
    EXP?: string;
    qtyDisplay?: string;
    uomDispaly?: string;
    uomBase?: IUom;
    uomOrder?: IUom;
    uom?: string;
    uomConfirm?: IUom;
    uomBackOrder?: IUom;
    uomItemMaster?: Array<IUomItemMaster>;
    grade?: string;
    qtyConfirmBase?: string;
    qtyConfirmOrder?: string;
    tranOrder?: string;
    recNum?: number;
  };
}

export interface IGoodsIssue_SearchOrder_Params {
  searchOwner: string;
  searchReferenceNo: string;
  searchGINo: string;
  searchDocDate: string;
  searchOrderType: string;
}
