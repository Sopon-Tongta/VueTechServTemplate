export interface IErrorResponse {
  error?: string;
  Message?: string;
  Status?: number;
}

export interface IUdf {
  qty: number;
  uom: string;
}

export interface IUom {
  qty: number;
  uomCode: string;
  uomNameTH: string;
  uomNameEN: string;
  convertQty: number;
  orderQty: number;
}

export interface IUomSku {
  id?: number;
  productCode?: string;
  materialId?: number;
  unitId?: number;
  baseQuantity?: number;
  orderQuantity?: number;
  width?: number;
  depth?: number;
  higth?: number;
  volume?: number;
  unitCode?: string;
  nameTH?: string;
  namEN?: string;
}

export interface IUomItemMaster {
  convertQty: number;
  uomCode: string;
  uomLabel: string;
}

//=== Golang Model =================================
export interface IGolang_NullTime {
  Time: string;
  Valid: boolean;
}
//==================================================

//=== Get Zone By Warehouse ========================
export interface IGetZoneByWH_Response {
  list: Array<IGetZoneByWH_Response_Data>;
}
export interface IGetZoneByWH_Response_Data {
  whCode: string;
  zoneCode: string;
  zoneName: string;
  zoneTypeName: string;
  sequence: number;
}
//==================================================

//=== Get Pallet ===================================
export interface IGetPallet_Response {
  list: Array<IGetPallet_Response_Data>;
}
export interface IGetPallet_Response_Data {
  recNum: number;
  whCode: string;
  ownerCode: string;
  zoneCode: string;
  locationCode: string;
  palletNo: string;
  skuCode: string;
  skuName: string;
  Qty: number;
  lot: string;
  batch: string;
  mfgDate: string;
  expDate: string;
  grade: string;
  uom: string;
  status: string;
}
//==================================================

//=== Get Product By ProductCode ===================
export interface IGetProductByCode_Response {
  Ok: {
    Product: IGetProductByCode_Response_Data;
    UOM: Array<IGetProductByCode_Response_UOM>;
  };
}
export interface IGetProductByCode_Response_Data {
  baseunitid: number;
  batchctrl: number;
  brandcode: string;
  code: string;
  expctrl: number;
  grossweight: number;
  id: number;
  imageUrl: string;
  lotctrl: number;
  materialgroup: string;
  materialid: number;
  materialtype: string;
  mfgctrl: number;
  nameen: string;
  nameth: string;
  netweight: number;
  orderunitid: number;
  ownercode: string;
  productcode: string;
  remark: string;
  sapNameth: string;
  sapcode: string;
  sapnameen: string;
  shortnameen: string;
  shortnameth: string;
  status: string;
  tinyNameen: string;
  tinynameth: string;
  volume: number;
  volumeunit: string;
  weightunit: string;
  whcode: string;
}

export interface IGetProductByCode_Response_UOM {
  baseQuantity: number;
  namEN: string;
  nameTH: string;
  orderQuantity: number;
  unitCode: string;
  unitId: number;
}
//==================================================

//=== Get Product By Owner =========================
export interface IGetProductByOwner_Response {
  list: Array<IGetProductByOwner_Response_Data>;
}
export interface IGetProductByOwner_Response_Data {
  skuCode: string;
  nameTH: string;
  nameEN: string;
  UOMSKU?: Array<IUomSku>;
  lotCtrl: number;
  batchCtrl: number;
  mfgCtrl: number;
  expCtrl: number;
}
//==================================================

//=== Get Location ========================
export interface IGetLocation_Response {
  result: Array<IGetLocation_Response_Data>;
}
export interface IGetLocation_Response_Data {
  id: number;
  whcode: string;
  zonecode: string;
  locationcode: string;
  aisle: string;
  bay: number;
  level: number;
  slot: number;
  locationtype: string;
  width: number;
  depth: number;
  heigth: number;
  volume: number;
  maxweigth: number;
  put: number;
  pick: number;
  isreserve: number;
  putawayseq: number;
  pickseq: number;
}
//==================================================

//=== Get Product Group ============================
export interface IGetProductGroup_Response {
  data: Array<IGetProductGroup_Response_Data>;
}
export interface IGetProductGroup_Response_Data {
  key: string;
  value: string;
}
//==================================================

//=== Get Location BY Warehouse ====================
export interface IGetLocationByWH_Response {
  list: Array<IGetLocationByWH_Response_Data>;
}
export interface IGetLocationByWH_Response_Data {
  zoneCode: string;
  locationCode: string;
}
//==================================================

//=== Get Location BY Zone ========================
export interface IGetLocationByZone_Response {
  list: Array<IGetLocationByZone_Response_Data>;
}
export interface IGetLocationByZone_Response_Data {
  key: string;
  value: string;
}
//==================================================

//=== Get PalletLocation  ==========================
export interface IGetPalletLocation_Params {
  locationCode: string;
  skuCode: string;
}
export interface IGetPalletLocation_Response {
  Ok: Array<IGetPalletLocation_Response_Data>;
}
export interface IGetPalletLocation_Response_Data {
  recNum: number;
  whCode: string;
  ownerCode: string;
  zoneCode: string;
  locationCode: string;
  palletNo: string;
  skuCode: string;
  skuName: string;
  Qty: number;
  lot: string;
  batch: string;
  mfgDate: string;
  expDate: string;
  grade: string;
  uom: string;
  status: string;
}
//==================================================

//=== Get PalletLocation By Item By Product  =======
export interface IGetPalletLocationByItemByProduct_Params {
  ownerCode: string;
  whCodeSource: string;
  skucode: string;
}
export interface IGetPalletLocationByItemByProduct_Response {
  list: Array<IGetPalletLocationByItemByProduct_Response_Data>;
}
export interface IGetPalletLocationByItemByProduct_Response_Data {
  recNum: number;
  whCode: string;
  ownerCode: string;
  zoneCode: string;
  locationCode: string;
  palletNo: string;
  skuCode: string;
  skuName: string;
  Qty: number;
  lot: string;
  batch: string;
  mfgDate: string;
  expDate: string;
  grade: string;
  uom: string;
  status: string;
}
//==================================================

//=== Get Owner Master  ============================
export interface IGetOwnerMaster_Response {
  ownercode: string;
  ownername: string;
  address: string;
  tambon: string;
  district: string;
  province: string;
  country: string;
  postcode: string;
}
//==================================================

//=== Get OrderType Master  ========================
export interface IGetOrderTypeMaster_Response {
  data: Array<IGetOrderTypeMaster_Response_Data>;
}
export interface IGetOrderTypeMaster_Response_Data {
  key: number;
  value: string;
  group: string;
}
//==================================================

//=== Get Supplier Master  =========================
export interface IGetSupplierMaster_Response {
  Result: Array<IGetSupplierMaster_Response_Data>;
}
export interface IGetSupplierMaster_Response_Data {
  SupCode: string;
  SupName: string;
  Address: string;
  Tambon: string;
  District: string;
  Province: string;
  Country: string;
  PostCode: string;
  Contact: string;
  Tel: string;
  Email: string;
  Fax: string;
}
//==================================================

//=== Get Warehouse Master  ========================
export interface IGetWHMaster_Response {
  dataWhBuilding: Array<IGetWHMaster_Response_Data>;
  dataWhCar: Array<IGetWHMaster_Response_Car>;
  status: number;
}
export interface IGetWHMaster_Response_Data {
  WhCode: string;
  WhName: string;
  WhType: string;
  WhTypeName: string;
  WhTypeCode: string;
  PlantCode: string;
  PlantName: string;
  Sloc: string;
  Address: string;
  TamBon: string;
  District: string;
  Province: string;
  Country: string;
  PostCode: string;
}
export interface IGetWHMaster_Response_Car {
  WhCode: string;
  WhName: string;
  WhType: string;
  WhTypeName: string;
  WhTypeCode: string;
  CarType: string;
  CarLicent: string;
}
//==================================================

//=== Get Menu Master  =============================
export interface IGetMenuMaster_Response {
  list: Array<IGetMenuMaster_Response_Data>;
}
export interface IGetMenuMaster_Response_Data {
  id: number;
  parentId: number;
  accessTypeId: number;
  labelName: string;
  pageName: string;
  pathName: string;
  disableMenu: boolean;
  childMenu: boolean;
  icon: string;
}
//===================================================

//=== Get Menu Access  =============================
export interface IGetMenuAccess_Response {
  data: Array<IGetMenuAccess_Response_Data>;
}
export interface IGetMenuAccess_Response_Data {
  Id: number;
  parentId: number;
  labelName: string;
  pageName: string;
  pathName: string;
  disableMenu: boolean;
  childMenu: boolean;
  icon: string;
}
export interface IViewMenuAccess {
  menuId: number;
  parentId: number;
  label: string;
  name: string;
  path: string;
  clickable: boolean;
  disable: boolean;
  childMenu: boolean;
  childItem: Array<IViewMenuAccess>;
  icon: string;
  cls?: string;
  isClickGoto?: boolean;
}
//===================================================

export interface IError_Response {
  Status: number;
  Message: string;
  Code: number;
}

//=============== Product V2 ========================

export interface IGetProduct_Response {
  list?: Array<IProductData>
}

export interface IProductData {
  skuCode: string;
  sapCode: string;
  nameTH: string;
  nameEN: string;
  lotCtrl: number;
  batchCtrl: number;
  mfgCtrl: number;
  expCtrl: number;
}

export interface IGetFilterUOMConvertByProduct {
  list: Array<IUOMConvertData>
}

export interface IUOMConvertData {
  id: number;
  productCode: string;
  materialId: number;
  unitId: number;
  baseQuantity: number;
  orderQuantity: number;
  width: number;
  depth: number;
  higth: number;
  volume: number;
  unitCode: string;
  nameTH: string;
  nameEN: string;
}

//===================================================
