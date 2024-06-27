<template>
    <div v-if="props.isLoading" class="d-flex justify-center my-6 mx-6">
        <ListWithFilterSkeletonLoader></ListWithFilterSkeletonLoader>
    </div>
    <div v-else class="d-flex justify-center my-6 mx-6">
        <slot name="filter"></slot>
        <slot name="list"></slot>
    </div>
    <slot name="dialog"></slot>
</template>

<script setup lang="ts">
import ListWithFilterSkeletonLoader from '../loaders/ListWithFilterSkeletonLoader.vue';

const props = defineProps({
    isLoading: {
        type: Boolean,
        required: true,
    },
});
</script>
