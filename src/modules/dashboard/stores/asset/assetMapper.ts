import { formatDate } from '@/utils/formatters/dateFormat';
import type {
    IAssetData,
    IAssetDataList,
    IAssetItem,
    IAssetItemUpdate,
} from '../../contracts/IAsset';

export const mapAssetListServerDataToClientItem = (
    dataFromServer: IAssetDataList,
): IAssetItem[] => {
    return dataFromServer.data.map((item) => ({
        uuid: item.uuid,
        amenities: item.amenities,
        bathrooms: item.bathrooms,
        bedrooms: item.bedrooms,
        description: item.description,
        floor: item.floor,
        latitude: item.latitude,
        longitude: item.longitude,
        postal_code: item.postal_code,
        price: item.price,
        size: item.size,
        street: item.street,
        street_number: item.street_number,
        title: item.title,
        type: item.type,
        available_from: new Date(item.available_from),
        created_at: new Date(item.created_at),
        updated_at: new Date(item.updated_at),
    }));
};

export const mapAssetServerDataToClientItem = (dataFromServer: IAssetData): IAssetItem => {
    const asset: IAssetItem = {
        uuid: dataFromServer.data.uuid,
        amenities: dataFromServer.data.amenities,
        bathrooms: dataFromServer.data.bathrooms,
        bedrooms: dataFromServer.data.bedrooms,
        description: dataFromServer.data.description,
        floor: dataFromServer.data.floor,
        latitude: dataFromServer.data.latitude,
        longitude: dataFromServer.data.longitude,
        postal_code: dataFromServer.data.postal_code,
        price: dataFromServer.data.price,
        size: dataFromServer.data.size,
        street: dataFromServer.data.street,
        street_number: dataFromServer.data.street_number,
        title: dataFromServer.data.title,
        type: dataFromServer.data.type,
        available_from: new Date(dataFromServer.data.available_from),
        created_at: new Date(dataFromServer.data.created_at),
        updated_at: new Date(dataFromServer.data.updated_at),
    };

    return asset;
};

export const mapAssetItemToUpdateAssetItem = (originalAsset: IAssetItem): IAssetItemUpdate => {
    const assetItemUpdate: IAssetItemUpdate = {
        amenities: originalAsset.amenities,
        bathrooms: originalAsset.bathrooms,
        bedrooms: originalAsset.bedrooms,
        description: originalAsset.description,
        floor: originalAsset.floor,
        latitude: originalAsset.latitude,
        longitude: originalAsset.longitude,
        postal_code: originalAsset.postal_code,
        price: originalAsset.price,
        size: originalAsset.size,
        street: originalAsset.street,
        street_number: originalAsset.street_number,
        title: originalAsset.title,
        type_id: originalAsset.type.uuid,
        available_from: formatDate(originalAsset.available_from),
    };

    return assetItemUpdate;
};
