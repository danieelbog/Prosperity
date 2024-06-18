import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { GetAmenities } from './amenityService';

export const useAmenitiesStore = defineStore('amenities', () => {
    const amenities = ref<string[]>([]);

    const fetchAmenities = async () => {
        const response = await GetAmenities();
        if (!response.data) {
            throw Error('Amenities data is empty');
        }

        console.log(response.data.data);
        amenities.value = response.data.data;

        console.log(amenities.value);
    };

    const getAmenities = computed(() => {
        return amenities.value;
    });

    return {
        getAmenities,
        fetchAmenities,
    };
});
