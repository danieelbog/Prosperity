<template>
    <v-dialog @update:modelValue="hideEditDialog" :model-value="showEditDialog" max-width="980">
        <v-card title="Edit Asset">
            <div class="px-3">
                <AssetEditForm
                    :asset="assetToUpdate"
                    :amenities="amenities ?? []"
                    :asset-types="assetTypes ?? []"
                    @form-is-valid="onFormIsValid" />
            </div>
            <v-card-actions>
                <v-btn text="Cancel" variant="text" @click="hideEditDialog" />
                <v-btn
                    text="Save"
                    :disabled="saveIsDisabled"
                    @click="onUpdateAsset"
                    color="primary"
                    variant="text" />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';
import { useAssetsStore } from '@/modules/dashboard/stores/asset/asset_store';
import { useFeedbackStore } from '@/modules/app/stores/feedback-store/feedback_store';
import { storeToRefs } from 'pinia';
import { useAmenitiesStore } from '@/modules/dashboard/stores/amenity/amenity_store';
import { useAssetTypesStore } from '@/modules/dashboard/stores/asset-type/asset_type_store';
import { hasChanges } from '@/utils/objects/objectComparer';
import type { IAssetItem } from '@/modules/dashboard/contracts/IAsset';

import AssetEditForm from './edit-form/AssetEditForm.vue';

const emit = defineEmits(['hide-edit-dialog']);
const props = defineProps({
    showEditDialog: {
        type: Boolean,
        required: true,
    },
    asset: {
        type: Object as PropType<IAssetItem>,
        required: true,
    },
});

const { updateAsset } = useAssetsStore();
const { showFeedback } = useFeedbackStore();
const { amenities } = storeToRefs(useAmenitiesStore());
const { assetTypes } = storeToRefs(useAssetTypesStore());

const getInitialAsset = (): IAssetItem => {
    const assetType = assetTypes.value?.find((type) => type.uuid === props.asset.type.uuid);
    return {
        ...props.asset,
        type: {
            ...props.asset.type,
            value: assetType?.value,
        },
    };
};

const saveIsDisabled = ref(true);
const assetToUpdate = ref<IAssetItem>(getInitialAsset());
const initialAsset = ref<IAssetItem>(JSON.parse(JSON.stringify(getInitialAsset())));

const onUpdateAsset = async () => {
    if (!assetToUpdate.value) return;

    try {
        await updateAsset(assetToUpdate.value);
        showFeedback('Asset updated successfully!', 'green');
        emit('hide-edit-dialog');
    } catch (error) {
        showFeedback('Error updating asset, please try again!', 'red');
    }
};

const onFormIsValid = (asset?: IAssetItem) => {
    saveIsDisabled.value = !asset || !hasChanges(asset, initialAsset.value);
};

const hideEditDialog = () => {
    emit('hide-edit-dialog');
};

watch(
    () => props.asset,
    () => {
        assetToUpdate.value = getInitialAsset();
        initialAsset.value = JSON.parse(JSON.stringify(getInitialAsset()));
    },
);
</script>
