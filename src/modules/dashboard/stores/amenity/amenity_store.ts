import { defineStore } from 'pinia';
import { ref } from 'vue';
import { GetAmenities } from './amenityService';

export const useAmenitiesStore = defineStore('amenities', () => {
    const amenities = ref<string[]>();

    const fetchAmenities = async () => {
        const response = await GetAmenities();
        if (!response.data) {
            throw Error('Amenities data is empty');
        }

        amenities.value = response.data.data;
    };

    return {
        amenities,
        fetchAmenities,
    };
});
