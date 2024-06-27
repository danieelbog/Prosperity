<template>
    <span>
        {{ $d(props.date) }}
    </span>
</template>

<script setup lang="ts">
const props = defineProps({
    date: { type: Date, required: true },
});
</script>
