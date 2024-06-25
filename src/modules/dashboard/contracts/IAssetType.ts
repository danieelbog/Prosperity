export interface IAssetTypeItem {
    uuid: string;
    name: string;
    value?: number;
}

export interface IAssetTypeData {
    data: IAssetTypeItem[];
}
