import type { IAssetTypeItem } from './IAssetType';

export interface IAssetitem {
    uuid: string;
    amenities: string[];
    bathrooms: number;
    bedrooms: number;
    description: string;
    floor: number;
    latitude: string;
    longitude: string;
    postal_code: string;
    price: string;
    size: number;
    street: string;
    street_number: string;
    title: string;
    type: IAssetTypeItem;
    available_from: string;
    created_at: string;
    updated_at: string;
}

export interface IAssetData {
    data: IAssetitem;
}

export interface IAssetDataList {
    data: IAssetitem[];
}
