<template>
    <v-dialog
        @update:modelValue="hideEditDialog"
        :model-value="props.showEditDialog"
        max-width="980">
        <v-card title="Edit Asset">
            <div class="px-3">
                <AssetEditForm :asset="props.asset" @form-is-valid="onFormIsValid" />
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
import { ref, type PropType } from 'vue';
import type { IAssetItem } from '../../contracts/IAsset';
import { useAssetsStore } from '../../stores/asset/asset_store';
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
const saveIsDisabled = ref(true);
const assetToUpdate = ref<IAssetItem | null>(null);

const onUpdateAsset = async () => {
    if (!assetToUpdate.value) return;

    try {
        await updateAsset(assetToUpdate.value);
        emit('hide-edit-dialog');
    } catch (error) {
        console.error('Error updating asset:', error);
    }
};

const onFormIsValid = (asset?: IAssetItem) => {
    saveIsDisabled.value = !asset;
    assetToUpdate.value = asset || null;
};

const hideEditDialog = () => {
    emit('hide-edit-dialog');
};
</script>
