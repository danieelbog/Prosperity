<template>
    <v-dialog
        @update:modelValue="hideEditDialog"
        :model-value="props.showEditDialog"
        max-width="480">
        <v-card title="Edit Asset">
            <div class="pa-4 text-center">{{ props.asset.title }}</div>
            <v-card-actions>
                <v-btn text="Cancel" variant="text" @click="hideEditDialog"></v-btn>
                <v-btn text="Save" :disabled="true" color="primary" variant="text"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, type PropType } from 'vue';
import type { IAssetItem } from '@/contracts/IAsset';
const emit = defineEmits(['editItem', 'hideEditDialog']);

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

const hideEditDialog = () => {
    emit('hideEditDialog');
};

onMounted(() => {
    console.log(props.asset);
});
</script>
