import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IFeedback, VARIANT } from '../contracts/IFeedback';

export const useFeedbackStore = defineStore('feedback', () => {
    const feedbacks = ref<IFeedback[]>([]);
    const theSizeOfFeedbackSnackbar = 80;
    let nextId = 1;

    const showFeedback = (feedbackMessage: string, feedbackVariant: VARIANT) => {
        const feedback: IFeedback = {
            id: nextId++,
            message: feedbackMessage,
            variant: feedbackVariant,
            isShown: true,
            position: theSizeOfFeedbackSnackbar * feedbacks.value.length,
        };

        feedbacks.value.push(feedback);
    };

    const hideFeedback = (id: number) => {
        let index = -1;
        index = feedbacks.value.findIndex((feedback) => {
            return feedback.id === id;
        });

        if (index === -1) return;
        feedbacks.value.splice(index, 1);

        feedbacks.value.forEach(
            (feedback, index) => (feedback.position = theSizeOfFeedbackSnackbar * index),
        );
    };

    return { feedbacks, showFeedback, hideFeedback };
});
