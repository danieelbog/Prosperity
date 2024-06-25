<template>
    <span>
        {{ props.street }}
    </span>
    <span class="mx-2"> {{ props.streetNumber }} </span>
    <span>
        {{ props.postalCode }}
    </span>
</template>

<script setup lang="ts">
const props = defineProps({
    street: { type: String, required: true },
    streetNumber: { type: String, required: true },
    postalCode: { type: String, required: true },
});
</script>
