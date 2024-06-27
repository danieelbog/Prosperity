<template>
    <v-skeleton-loader
        :width="skeletonWidths"
        :height="skeletonHeights"
        class="me-6"
        type="card, article, article" />
    <v-skeleton-loader :height="skeletonHeights" type="table" />
</template>

<script setup lang="ts">
const skeletonHeights = 500;
const skeletonWidths = 300;
</script>
