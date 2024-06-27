<template>
    <div style="position: relative" v-for="feedback in feedbacks" :key="feedback.id">
        <v-snackbar
            :color="feedback.variant"
            :model-value="feedback.isShown"
            :timeout="timeout"
            :location="'end top'"
            :position="'absolute'"
            :style="{ top: `${feedback.position}px` }"
            @update:model-value="hideFeedback(feedback.id)"
            multi-line>
            <h3>{{ feedback.message }}</h3>
        </v-snackbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFeedbackStore } from '../stores/feedback_store';
import { storeToRefs } from 'pinia';

const { hideFeedback } = useFeedbackStore();
const { feedbacks } = storeToRefs(useFeedbackStore());
const timeout = ref(3000);
</script>
