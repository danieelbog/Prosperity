<template>
    <v-sheet>
        <v-form :model-value="formIsValid" @update:modelValue="onFormValidation">
            <v-container>
                <h3 class="text-grey mb-3">General Info</h3>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="localAsset.title" label="Title" :rules="titleRules">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="localAsset.description" label="Description" required>
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
                            label="Price" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-number-input
                            prefix="㎡"
                            control-variant="stacked"
                            v-model="localAsset.size"
                            :min="0"
                            label="Size" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-number-input
                            control-variant="stacked"
                            v-model="localAsset.bathrooms"
                            :min="0"
                            label="Bathrooms" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-number-input
                            control-variant="stacked"
                            v-model="localAsset.bedrooms"
                            :min="0"
                            label="Bedrooms" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-number-input
                            control-variant="stacked"
                            v-model="localAsset.floor"
                            label="Floor" />
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
                            multiple>
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
                        <v-text-field
                            v-model="localAsset.latitude"
                            label="Latitude"
                            :rules="latitudeValidationRules">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="localAsset.longitude"
                            label="Longitude"
                            :rules="longitudeValidationRules">
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<script setup lang="ts">
import { ref, type PropType, watch } from 'vue';
import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { VDateInput } from 'vuetify/labs/VDateInput';
import * as stringValidator from '@/utils/validation-rules/stringValidations';
import type { IAssetTypeItem } from '@/modules/dashboard/contracts/IAssetType';
import type { IAssetItem } from '@/modules/dashboard/contracts/IAsset';

const emit = defineEmits(['form-is-valid']);
const props = defineProps({
    asset: {
        type: Object as PropType<IAssetItem>,
        required: true,
    },
    amenities: {
        type: Array as PropType<string[]>,
        required: true,
    },
    assetTypes: {
        type: Array as PropType<IAssetTypeItem[]>,
        required: true,
    },
});

const localAsset = ref(props.asset);
const formIsValid = ref(false);

const titleRules = stringValidator.requiredField('Title');
const latitudeValidationRules = stringValidator.latitudeRules();
const longitudeValidationRules = stringValidator.longitudeRules();

const onFormValidation = (event: any) => {
    formIsValid.value = event;
    emit('form-is-valid', formIsValid.value ? localAsset.value : null);
};

watch(
    localAsset,
    (newLocalAsset) => {
        console.log(newLocalAsset);

        emit('form-is-valid', formIsValid.value ? newLocalAsset : null);
    },
    { deep: true },
);
</script>
