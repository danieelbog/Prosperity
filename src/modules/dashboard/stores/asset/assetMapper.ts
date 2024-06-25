import type { IAssetDataList, IAssetItem } from '../../contracts/IAsset';

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
