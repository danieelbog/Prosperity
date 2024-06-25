import type { IAssetTypeItem } from './IAssetType';

export interface IAssetItem {
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
    available_from: Date;
    created_at: Date;
    updated_at: Date;
}

export interface IAssetLinks {
    first: string;
    last: string;
    prev?: string;
    next?: string;
}

export interface IAssetMetaLinks {
    url: string | null;
    label: string;
    active: boolean;
}

export interface IAssetMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: IAssetMetaLinks[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface IAssetData {
    data: IAssetItem;
    links: IAssetLinks;
    meta: IAssetMeta;
}

export interface IAssetDataList {
    data: IAssetItem[];
    links: IAssetLinks;
    meta: IAssetMeta;
}
