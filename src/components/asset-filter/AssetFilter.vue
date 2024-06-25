<template>
    <v-card class="me-6" elevation="4" min-width="300" max-height="1200">
        <v-card-item>
            <v-card-title> Filter </v-card-title>
            <v-card-subtitle>Filter assets by asset type and amenities.</v-card-subtitle>
        </v-card-item>

        <v-card-text>
            <v-select
                label="Select"
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                variant="outlined">
            </v-select>
            <v-checkbox label="Checkbox"></v-checkbox>
            <v-checkbox label="Checkbox"></v-checkbox>
            <v-checkbox label="Checkbox"></v-checkbox>
            <v-checkbox label="Checkbox"></v-checkbox>
            <v-checkbox label="Checkbox"></v-checkbox>
            <v-checkbox label="Checkbox"></v-checkbox>
            <v-checkbox label="Checkbox"></v-checkbox>
            <v-checkbox label="Checkbox"></v-checkbox>
            <v-checkbox label="Checkbox"></v-checkbox>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts"></script>
