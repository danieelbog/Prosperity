<template>
    <v-sheet>
        <v-form>
            <v-container>
                <h3 class="text-grey mb-3">General Info</h3>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="localAsset.title"
                            :counter="10"
                            label="Title"
                            required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="localAsset.description"
                            :counter="10"
                            label="Description"
                            required>
                        </v-text-field>
                    </v-col>
                </v-row>
                <h3 class="text-grey mb-3 mt-5">Asset Info</h3>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            control-variant="stacked"
                            prefix="€"
                            v-model="localAsset.price"
                            :min="0"
                            label="Price"
                            required />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-number-input
                            prefix="㎡"
                            control-variant="stacked"
                            v-model="localAsset.size"
                            :min="0"
                            label="Size"
                            required />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-number-input
                            control-variant="stacked"
                            v-model="localAsset.bathrooms"
                            :min="0"
                            label="Bathrooms"
                            required />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-number-input
                            control-variant="stacked"
                            v-model="localAsset.bedrooms"
                            :min="0"
                            label="Bedrooms"
                            required />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-number-input
                            control-variant="stacked"
                            v-model="localAsset.floor"
                            label="Floor"
                            required />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            label="Asset Type"
                            item-title="name"
                            item-value="value"
                            return-object
                            :items="assetTypes"
                            single-line
                            v-model="localAsset.type">
                        </v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            v-model="localAsset.amenities"
                            :items="amenities"
                            label="Amenities"
                            multiple
                            required>
                        </v-select>
                    </v-col>
                </v-row>
                <h3 class="text-grey mb-3 mt-5">Address Info</h3>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="localAsset.postal_code" label="Postal Code" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="localAsset.street" label="Street" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="localAsset.street_number"
                            label="Street Number"
                            required>
                        </v-text-field>
                    </v-col>
                </v-row>
                <h3 class="text-grey mb-3 mt-5">Extra</h3>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-date-input
                            label="Available from"
                            v-model="localAsset.available_from"
                            prepend-icon=""
                            prepend-inner-icon="$calendar">
                        </v-date-input>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="localAsset.latitude" label="Latitude" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="localAsset.longitude" label="Longitude" required>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script setup lang="ts">
import type { IAssetItem } from '@/modules/dashboard/contracts/IAsset';
import { hasChanges } from '@/utils/objects/objectComparer';
import { defineProps, defineEmits, ref, watch } from 'vue';
import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { storeToRefs } from 'pinia';
import { useAmenitiesStore } from '@/modules/dashboard/stores/amenity/amenity_store';
import { useAssetTypesStore } from '@/modules/dashboard/stores/asset-type/asset_type_store';

const emit = defineEmits(['form-is-valid']);
const props = defineProps({
    asset: {
        type: Object as () => IAssetItem,
        required: true,
    },
});

const { amenities } = storeToRefs(useAmenitiesStore());
const { assetTypes } = storeToRefs(useAssetTypesStore());

const getInitialAsset = (): IAssetItem => {
    if (!assetTypes.value) return props.asset;

    const assetType = assetTypes.value.find(
        (assetType) => assetType.uuid === props.asset.type.uuid,
    );

    return {
        ...props.asset,
        type: {
            ...props.asset.type,
            value: assetType?.value,
        },
    };
};

const localInitialAsset = getInitialAsset();
const localAsset = ref({ ...localInitialAsset });
const initialAsset = JSON.parse(JSON.stringify(getInitialAsset()));

watch(
    localAsset,
    (newLocalAsset) => {
        emit('form-is-valid', hasChanges(newLocalAsset, initialAsset) ? newLocalAsset : null);
    },
    { deep: true },
);
</script>
