<script lang="ts" setup>
interface Props {
  loading: boolean
  visionMissionLoading: boolean
  aboutUsLoading: boolean
  portfolioLoading: boolean
}

defineProps<Props>()
</script>

<template>
  <v-container
    class="d-flex justify-center align-center"
    style="min-height: 50vh"
  >
    <v-progress-circular color="primary" indeterminate size="64" />
    <div class="text-h6 ml-4">Loading Thunder Stack Studio...</div>
  </v-container>
</template>
