import type { IAssetTypeData, IAssetTypeItem } from '@/contracts/IAssetType';

export const mapAssetTypeServerDataToClientItem = (
    dataFromServer: IAssetTypeData,
): IAssetTypeItem[] => {
    return dataFromServer.data.map((item, index) => ({
        name: item.name,
        uuid: item.uuid,
        value: index + 1,
    }));
};
