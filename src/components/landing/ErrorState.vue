<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  error: string | null
  visionMissionError: string | null
  aboutUsError: string | null
  portfolioError: string | null
}

const props = defineProps<Props>()

const errorMessage = computed(() => {
  return props.error || props.visionMissionError || props.aboutUsError || props.portfolioError
})
</script>

<template>
  <v-container
    class="d-flex justify-center align-center"
    style="min-height: 50vh"
  >
    <v-alert
      color="error"
      icon="mdi-alert-circle"
      type="error"
      variant="tonal"
    >
      <v-alert-title>Failed to load content</v-alert-title>
      {{ errorMessage }}
    </v-alert>
  </v-container>
</template>
