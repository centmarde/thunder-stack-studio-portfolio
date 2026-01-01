<script lang="ts" setup>
interface LandingData {
  title: string
  subtitle: string
  description: string
  features?: any[]
}

interface Props {
  data: LandingData | null
}

defineProps<Props>()
</script>

<template>
  <section class="hero-section">
    <v-container>
      <v-row align="center" class="min-height-screen" justify="center">
        <v-col cols="12" lg="8" md="10">
          <div class="text-center">
            <h1 class="text-h2 text-md-h3 font-weight-bold mb-4">
              {{ data?.title }}
            </h1>

            <h2 class="text-h4 text-md-h4 text-grey-darken-1 mb-6">
              {{ data?.subtitle }}
            </h2>

            <p class="text-h6 text-md-h6 text-grey-darken-2 mb-8">
              {{ data?.description }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.min-height-screen {
  min-height: calc(100vh - 64px);
}
</style>
