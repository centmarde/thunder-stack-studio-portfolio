<script lang="ts" setup>
import { computed } from 'vue'

interface Achievement {
  id: number
  title: string
  organization: string
  year: number
  description: string
  project: string
  icon: string
  color: string
  category: string
  certificateImage?: string // Optional certificate image path
}

interface Props {
  modelValue: boolean
  achievement: Achievement | null
}

interface Emits {
  (event: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const dialog = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const closeDialog = () => {
  dialog.value = false
}

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeDialog()
  }
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @keydown="handleKeydown"
  >
    <v-card v-if="achievement" class="d-flex flex-column">
      <!-- Dialog Header -->
      <v-toolbar
        color="rgba(0, 0, 0, 0.9)"
        dark
        flat
        class="flex-grow-0"
      >
        <v-btn
          icon="mdi-close"
          @click="closeDialog"
        />
        <v-toolbar-title class="d-flex align-center">
          <v-icon
            :icon="achievement.icon"
            :color="achievement.color"
            class="me-2"
          />
          {{ achievement.title }}
        </v-toolbar-title>
        <v-spacer />
        <v-chip
          :color="achievement.color"
          size="small"
          variant="outlined"
        >
          {{ achievement.category }}
        </v-chip>
      </v-toolbar>

      <!-- Main Content Area -->
      <div class="flex-grow-1 d-flex">
        <!-- Certificate Image Display Area -->
        <div class="flex-grow-1 position-relative d-flex align-center justify-center certificate-background">
          <v-img
            v-if="achievement.certificateImage"
            :src="achievement.certificateImage"
            contain
            class="certificate-image"
            max-height="calc(100vh - 64px)"
            max-width="100%"
          >
            <template #error>
              <div class="d-flex flex-column align-center justify-center h-100 pa-8">
                <v-icon
                  icon="mdi-certificate"
                  size="128"
                  color="grey-lighten-1"
                  class="mb-4"
                />
                <h3 class="text-h5 text-grey-lighten-1 mb-2">Certificate Not Available</h3>
                <p class="text-body-1 text-grey-lighten-2 text-center">
                  The certificate image could not be loaded at this time.
                </p>
              </div>
            </template>
          </v-img>

          <!-- No Certificate Available State -->
          <div
            v-else
            class="d-flex flex-column align-center justify-center h-100 pa-8"
          >
            <v-icon
              icon="mdi-certificate"
              size="128"
              :color="achievement.color"
              class="mb-4"
            />
            <h3 class="text-h5 mb-2">{{ achievement.title }}</h3>
            <p class="text-body-1 text-center text-medium-emphasis mb-4">
              Certificate image will be available soon.
            </p>
            <v-chip
              :color="achievement.color"
              variant="tonal"
              size="large"
            >
              {{ achievement.organization }}
            </v-chip>
          </div>
        </div>

        <!-- Achievement Details Sidebar (For larger screens) -->
        <div class="achievement-details-sidebar d-none d-lg-flex flex-column">
          <v-card flat class="pa-6 h-100">
            <div class="mb-6">
              <div class="d-flex align-center mb-4">
                <v-icon
                  :icon="achievement.icon"
                  :color="achievement.color"
                  size="48"
                  class="me-3"
                />
                <div>
                  <h3 class="text-h5 font-weight-bold">{{ achievement.title }}</h3>
                  <p class="text-subtitle-1 text-medium-emphasis">{{ achievement.organization }}</p>
                </div>
              </div>

              <v-chip
                :color="achievement.color"
                size="small"
                variant="tonal"
                class="mb-3"
              >
                {{ achievement.category }} • {{ achievement.year }}
              </v-chip>

              <p class="text-body-1 mb-4">{{ achievement.description }}</p>
            </div>

            <div v-if="achievement.project" class="mb-4">
              <h4 class="text-subtitle-2 font-weight-bold mb-2 text-medium-emphasis">Related Project</h4>
              <v-chip
                color="primary"
                variant="outlined"
                size="small"
              >
                {{ achievement.project }}
              </v-chip>
            </div>

            <div class="mb-4">
              <h4 class="text-subtitle-2 font-weight-bold mb-2 text-medium-emphasis">Recognition Year</h4>
              <p class="text-h6 font-weight-bold">{{ achievement.year }}</p>
            </div>

            <div>
              <h4 class="text-subtitle-2 font-weight-bold mb-2 text-medium-emphasis">Awarding Organization</h4>
              <p class="text-body-1">{{ achievement.organization }}</p>
            </div>

            <!-- Action Buttons -->
            <div class="mt-auto pt-4">
              <v-btn
                variant="outlined"
                color="primary"
                block
                prepend-icon="mdi-share-variant"
                class="mb-2"
              >
                Share Achievement
              </v-btn>
              <v-btn
                variant="tonal"
                color="secondary"
                block
                prepend-icon="mdi-download"
              >
                Download Certificate
              </v-btn>
            </div>
          </v-card>
        </div>
      </div>

      <!-- Mobile Details (Bottom Sheet for smaller screens) -->
      <div class="d-lg-none">
        <v-expansion-panels variant="accordion">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon :icon="achievement.icon" :color="achievement.color" class="me-2" />
                <span class="font-weight-medium">Achievement Details</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="pa-2">
                <p class="text-body-2 mb-3">{{ achievement.description }}</p>
                <div class="mb-3">
                  <strong class="text-caption text-medium-emphasis">Organization:</strong>
                  <p class="text-body-2">{{ achievement.organization }}</p>
                </div>
                <div class="mb-3">
                  <strong class="text-caption text-medium-emphasis">Year:</strong>
                  <p class="text-body-2">{{ achievement.year }}</p>
                </div>
                <div v-if="achievement.project" class="mb-3">
                  <strong class="text-caption text-medium-emphasis">Project:</strong>
                  <v-chip size="x-small" color="primary" variant="outlined">
                    {{ achievement.project }}
                  </v-chip>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.certificate-background {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(33, 33, 33, 0.95) 100%);
  backdrop-filter: blur(10px);
}

.certificate-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.achievement-details-sidebar {
  width: 350px;
  min-width: 350px;
  max-width: 350px;
  border-left: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgba(var(--v-theme-surface), 0.95);
  backdrop-filter: blur(10px);
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .achievement-details-sidebar {
    display: none !important;
  }
}

/* Animation for certificate image */
.certificate-image {
  transition: transform 0.3s ease-in-out;
}

.certificate-image:hover {
  transform: scale(1.02);
}

/* Scrollbar styling for sidebar */
.achievement-details-sidebar .v-card {
  overflow-y: auto;
}

.achievement-details-sidebar .v-card::-webkit-scrollbar {
  width: 4px;
}

.achievement-details-sidebar .v-card::-webkit-scrollbar-track {
  background: transparent;
}

.achievement-details-sidebar .v-card::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.3);
  border-radius: 2px;
}

.achievement-details-sidebar .v-card::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary), 0.5);
}
</style>
