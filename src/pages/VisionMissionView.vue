<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTheme } from "vuetify";
import { createDynamicThemeConfigFromExternal } from "@/themes/index";
import { useVisionMissionController } from "@/controller/visionMissionController";

// Reactive state
const themeLoading = ref(true);
const themeError = ref<string | null>(null);

// Composables
const theme = useTheme();
const { data: visionMissionData, loading: visionMissionLoading, error: visionMissionError, fetchVisionMissionData } = useVisionMissionController();// Load dynamic theme configuration
const loadDynamicTheme = async () => {
  try {
    themeLoading.value = true;
    themeError.value = null;

    const themeConfig = await createDynamicThemeConfigFromExternal();

    // Apply the theme configuration to Vuetify
    theme.themes.value.light = themeConfig.themes.light;
    theme.themes.value.dark = themeConfig.themes.dark;

    console.log('Dynamic theme loaded successfully');
  } catch (error) {
    console.error('Failed to load dynamic theme:', error);
    themeError.value = error instanceof Error ? error.message : 'Failed to load theme';
  } finally {
    themeLoading.value = false;
  }
};

// Lifecycle
onMounted(async () => {
  await Promise.all([
    loadDynamicTheme(),
    fetchVisionMissionData()
  ]);
});
</script>

<template>
  <!-- Loading State -->
  <v-overlay v-if="themeLoading || visionMissionLoading" class="d-flex align-center justify-center">
    <v-progress-circular
      indeterminate
      size="64"
      color="primary"
    />
    <div class="text-h6 ml-4">Loading content...</div>
  </v-overlay>

  <!-- Error States -->
  <v-alert
    v-if="(themeError || visionMissionError) && !themeLoading && !visionMissionLoading"
    type="error"
    class="ma-4"
    closable
    @click:close="() => { themeError = null; visionMissionError = null; }"
  >
    <v-alert-title>Loading Error</v-alert-title>
    {{ themeError || visionMissionError }}
  </v-alert>

  <!-- Main Content -->
  <v-container v-if="!themeLoading && !visionMissionLoading && visionMissionData" fluid class="pa-0">
    <!-- Hero Section -->
    <v-sheet
      class="py-16"
      :style="{
        background: 'linear-gradient(135deg, rgba(63, 81, 181, 0.1) 0%, rgba(118, 136, 224, 0.05) 100%)',
        position: 'relative'
      }"
    >
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <v-icon
              size="80"
              color="primary"
              class="mb-6"
            >
              mdi-compass-outline
            </v-icon>

            <h1 class="text-h2 font-weight-bold mb-4 text-primary">
              Our Vision & Mission
            </h1>

            <p class="text-h6 text-medium-emphasis mb-6">
              Guided by purpose, driven by passion for Filipino cultural gaming
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Vision & Mission Cards -->
    <v-container class="py-12">
      <v-row>
        <!-- Vision Card -->
        <v-col cols="12" md="6" class="mb-8">
          <v-card
            elevation="12"
            rounded="xl"
            class="fill-height"
            :color="visionMissionData.vision.color"
            variant="tonal"
          >
            <v-card-text class="pa-8">
              <div class="d-flex align-center mb-6">
                <v-avatar
                  size="64"
                  :color="visionMissionData.vision.color"
                  class="me-4"
                >
                  <v-icon
                    :icon="visionMissionData.vision.icon"
                    size="32"
                    color="white"
                  />
                </v-avatar>
                <h2 class="text-h3 font-weight-bold">
                  {{ visionMissionData.vision.title }}
                </h2>
              </div>

              <p class="text-h6 text-medium-emphasis line-height-lg">
                {{ visionMissionData.vision.statement }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Mission Card -->
        <v-col cols="12" md="6" class="mb-8">
          <v-card
            elevation="12"
            rounded="xl"
            class="fill-height"
            :color="visionMissionData.mission.color"
            variant="tonal"
          >
            <v-card-text class="pa-8">
              <div class="d-flex align-center mb-6">
                <v-avatar
                  size="64"
                  :color="visionMissionData.mission.color"
                  class="me-4"
                >
                  <v-icon
                    :icon="visionMissionData.mission.icon"
                    size="32"
                    color="white"
                  />
                </v-avatar>
                <h2 class="text-h3 font-weight-bold">
                  {{ visionMissionData.mission.title }}
                </h2>
              </div>

              <p class="text-h6 text-medium-emphasis line-height-lg">
                {{ visionMissionData.mission.statement }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Core Values Section -->
    <v-sheet class="py-16" color="surface-variant">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h2 font-weight-bold mb-4">Our Core Values</h2>
          <p class="text-h6 text-medium-emphasis">
            The principles that guide Thunder Stack Studio
          </p>
        </div>

        <v-row>
          <v-col
            v-for="(value, index) in visionMissionData.values"
            :key="value.title"
            cols="12"
            sm="6"
            lg="4"
            class="mb-6"
          >
            <v-card
              elevation="8"
              rounded="xl"
              class="fill-height hover-card"
              variant="elevated"
            >
              <v-card-text class="pa-6 text-center">
                <v-avatar
                  size="72"
                  :color="value.color"
                  class="mb-4"
                >
                  <v-icon
                    :icon="value.icon"
                    size="36"
                    color="white"
                  />
                </v-avatar>

                <h3 class="text-h5 font-weight-bold mb-3">
                  {{ value.title }}
                </h3>

                <p class="text-body-1 text-medium-emphasis">
                  {{ value.description }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Call to Action Section -->
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <v-card
            elevation="16"
            rounded="xl"
            class="pa-8"
            color="primary"
            variant="flat"
          >
            <v-card-text>
              <v-icon
                size="64"
                color="white"
                class="mb-4"
              >
                mdi-rocket-launch
              </v-icon>

              <h3 class="text-h3 font-weight-bold text-white mb-4">
                {{ visionMissionData.callToAction.title }}
              </h3>

              <p class="text-h6 text-white mb-6 opacity-90">
                {{ visionMissionData.callToAction.subtitle }}
              </p>

              <v-btn
                size="large"
                variant="elevated"
                color="white"
                class="px-8"
                :prepend-icon="visionMissionData.callToAction.buttonIcon"
                rounded="pill"
              >
                <span class="text-primary font-weight-bold">{{ visionMissionData.callToAction.buttonText }}</span>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<style scoped>
.line-height-lg {
  line-height: 1.8;
}

.hover-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15) !important;
}
</style>
