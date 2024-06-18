<template>
    <div>App</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAssetsStore } from './stores/asset/asset_store';
import { useAssetTypesStore } from './stores/asset-type/asset_type_store';
import { useAmenitiesStore } from './stores/amenity/amenity_store';

const { fetchAssetBy, fetchAssets } = useAssetsStore();
const { fetchAssetTypes } = useAssetTypesStore();
const { fetchAmenities } = useAmenitiesStore();

onMounted(async () => {
    await fetchAssetBy('4e7694ca-84fb-419b-99ae-169fa2944008');
    await fetchAssets();
    await fetchAssetTypes();
    await fetchAmenities();
});
</script>
