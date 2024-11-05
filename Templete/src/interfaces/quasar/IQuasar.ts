export interface IQPagination {
  sortBy?: string;
  descending?: boolean;
  page: number;
  rowsPerPage: number;
}

export interface IQTableHeaderCols {
  name: string;
  label: string;
}

export interface IQTableBodyCols {
  name: string;
  value: string;
}


export interface IQSelectField {
  label: string;
  value: string;
}

export interface IQDragProps {
  dialogPosX: number;
  dialogPosY: number;
  dragStyle: string;
}

export interface IQDragEvent {
  delta: IQDragEvent_Delta;
}

export interface IQDragEvent_Delta {
  x: number;
  y: number;
}

//==== Dynamic SelectField ===================================
export interface IQSelectField_Disable extends IQSelectField {
  disable: boolean;
}

export interface IQSelectField_Group extends IQSelectField {
  group: string;
}

export interface IQSelectField_ItemName extends IQSelectField {
  itemName: string;
}

export interface IQSelectField_OwnerData extends IQSelectField {
  itemName: string;
  batchReq: number;
  expReq: number;
  lotReq: number;
  mfgReq: number;
}

export interface IQSelectField_ZoneCode extends IQSelectField {
  zoneCode: string;
}

//============================================================
