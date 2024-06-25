<template>
    <v-card class="me-6" elevation="4" min-width="300" max-height="600">
        <v-card-item>
            <v-card-title>Filter Assets</v-card-title>
            <v-card-subtitle>Filter assets by asset type</v-card-subtitle>
        </v-card-item>
        <v-card-text>
            <v-select
                label="Select Asset Type"
                variant="outlined"
                item-title="name"
                item-value="value"
                return-object
                :items="props.assetTypes"
                single-line
                v-model="selectedAssetType">
            </v-select>
            <div class="overflow-auto" style="max-height: 400px">
                <v-checkbox
                    v-for="amenity in props.amenities"
                    :key="amenity"
                    :label="amenity"
                    :value="amenity"
                    v-model="selectedAmmenities" />
            </div>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';
import type { IAssetTypeItem } from '../../contracts/IAssetType';
import type { IEntityFilter } from '../../contracts/IEntityFilter';

const emit = defineEmits(['on-filter-change']);
const props = defineProps({
    assetTypes: {
        type: Array as PropType<IAssetTypeItem[]>,
        required: true,
    },
    amenities: {
        type: Array as PropType<string[]>,
        required: true,
    },
});

const filters = ref<IEntityFilter>({});
const selectedAmmenities = ref<string[]>([]);
const selectedAssetType = ref<IAssetTypeItem>();

watch(selectedAssetType, (newVal) => {
    filters.value['type_id'] = newVal?.value;
});

watch(selectedAmmenities, (newVal) => {
    filters.value['amenities'] = newVal;
});

watch(
    filters,
    (newFilter) => {
        emit('on-filter-change', newFilter);
    },
    { deep: true },
);
</script>
