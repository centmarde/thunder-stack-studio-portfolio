<script lang="ts" setup>
interface Feature {
  title: string
  description: string
  icon: string
}

interface LandingData {
  features: Feature[]
}

interface Props {
  data: LandingData | null
}

defineProps<Props>()
</script>

<template>
  <section id="features" class="features-section py-16">
    <v-container>
      <v-row>
        <v-col
          v-for="(feature, index) in data?.features"
          :key="index"
          cols="12"
          lg="3"
          md="6"
        >
          <v-card class="h-100" elevation="2" hover>
            <v-card-text class="text-center pa-6">
              <v-avatar class="mb-4" color="primary" size="64">
                <v-icon color="on-primary" :icon="feature.icon" size="32" />
              </v-avatar>

              <h3 class="text-h5 font-weight-bold mb-3">
                {{ feature.title }}
              </h3>

              <p class="text-body-1">
                {{ feature.description }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.features-section {
  background: linear-gradient(135deg, rgba(63, 81, 181, 0.05) 0%, rgba(118, 136, 224, 0.02) 100%);
}
</style>
