<script lang="ts" setup>
interface VisionMission {
  title: string
  statement: string
  color: string
  icon: string
}

interface VisionMissionData {
  vision: VisionMission
  mission: VisionMission
}

interface Props {
  data: VisionMissionData | null
}

defineProps<Props>()
</script>

<template>
  <section v-if="data" id="vision-mission" class="vision-mission-section">
    <v-sheet class="py-16" color="surface-variant">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h2 font-weight-bold mb-4">Our Vision & Mission</h2>
          <p class="text-h6 text-medium-emphasis">
            Guided by purpose, driven by passion for Filipino cultural gaming
          </p>
        </div>

        <v-row>
          <!-- Vision Card -->
          <v-col cols="12" md="6" class="mb-6">
            <v-card
              elevation="8"
              rounded="xl"
              class="fill-height"
              :color="data.vision.color"
              variant="tonal"
            >
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-4">
                  <v-avatar
                    size="48"
                    :color="data.vision.color"
                    class="me-3"
                  >
                    <v-icon
                      :icon="data.vision.icon"
                      size="24"
                      color="white"
                    />
                  </v-avatar>
                  <h3 class="text-h4 font-weight-bold">
                    {{ data.vision.title }}
                  </h3>
                </div>

                <p class="text-body-1 text-medium-emphasis">
                  {{ data.vision.statement }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Mission Card -->
          <v-col cols="12" md="6" class="mb-6">
            <v-card
              elevation="8"
              rounded="xl"
              class="fill-height"
              :color="data.mission.color"
              variant="tonal"
            >
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-4">
                  <v-avatar
                    size="48"
                    :color="data.mission.color"
                    class="me-3"
                  >
                    <v-icon
                      :icon="data.mission.icon"
                      size="24"
                      color="white"
                    />
                  </v-avatar>
                  <h3 class="text-h4 font-weight-bold">
                    {{ data.mission.title }}
                  </h3>
                </div>

                <p class="text-body-1 text-medium-emphasis">
                  {{ data.mission.statement }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Core Values Preview -->
        <div class="text-center mt-12">
          <v-btn
            size="large"
            variant="elevated"
            color="primary"
            prepend-icon="mdi-compass-outline"
            rounded="pill"
            :to="{ path: '/vision-mission' }"
          >
            View Our Core Values
          </v-btn>
        </div>
      </v-container>
    </v-sheet>
  </section>
</template>

<style scoped>
.vision-mission-section {
  position: relative;
}
</style>
