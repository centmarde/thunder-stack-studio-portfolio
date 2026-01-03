<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'

// Props
interface Props {
  modelValue?: boolean
  autoOpen?: boolean
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  autoOpen: true,
  delay: 1000
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Local state
const isOpen = ref(props.modelValue)

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
  isOpen.value = newValue
})

// Watch for local changes and emit
watch(isOpen, (newValue) => {
  emit('update:modelValue', newValue)
})

// Auto-open on mount if enabled
onMounted(() => {
  if (props.autoOpen) {
    setTimeout(() => {
      isOpen.value = true
    }, props.delay)
  }
})

// Methods
const closeDialog = () => {
  isOpen.value = false
}

const handleUnderstand = () => {
  // Store in localStorage to prevent showing again in this session
  localStorage.setItem('wipDialogShown', 'true')
  closeDialog()
}

// Check if dialog was already shown in this session
const hasShownDialog = () => {
  return localStorage.getItem('wipDialogShown') === 'true'
}

// Override auto-open if already shown
onMounted(() => {
  if (hasShownDialog()) {
    return
  }

  if (props.autoOpen) {
    setTimeout(() => {
      isOpen.value = true
    }, props.delay)
  }
})
</script>

<template>
  <v-dialog
    v-model="isOpen"
    max-width="600"
    persistent
    :overlay="true"
    class="work-in-progress-dialog"
    :style="{ zIndex: 10000 }"
  >
    <v-card class="pa-6">
      <!-- Icon and Title -->
      <div class="text-center mb-4">
        <v-icon
          size="64"
          color="warning"
          class="mb-3"
        >
          mdi-construction
        </v-icon>

        <h2 class="text-h4 font-weight-bold mb-2">
          🚧 Work in Progress
        </h2>
      </div>

      <!-- Content -->
      <v-card-text class="text-center px-4">
        <p class="text-h6 mb-4">
          Welcome to Thunder Stack Studio!
        </p>

        <p class="text-body-1 mb-4 text-medium-emphasis">
          We're currently building something amazing for you. This website is still under active development,
          so you might encounter some incomplete features or temporary content.
        </p>

        <v-divider class="my-4" />

        <div class="text-left">
          <h3 class="text-h6 mb-3 font-weight-medium">What to expect:</h3>
          <ul class="text-body-2 mb-4">
            <li class="mb-2">🎨 Design improvements and refinements</li>
            <li class="mb-2">⚡ New features and functionality</li>
            <li class="mb-2">📱 Enhanced mobile experience</li>
            <li class="mb-2">🔧 Bug fixes and optimizations</li>
          </ul>
        </div>

        <v-alert
          type="info"
          variant="tonal"
          class="text-left mb-4"
        >
          <template #prepend>
            <v-icon>mdi-information</v-icon>
          </template>
          <strong>Thank you for your patience!</strong>
          We're working hard to deliver the best experience possible.
        </v-alert>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions class="justify-center pt-0">
        <v-btn
          color="primary"
          size="large"
          variant="flat"
          @click="handleUnderstand"
          class="px-8"
        >
          <v-icon start>mdi-check</v-icon>
          I Understand
        </v-btn>

        <v-btn
          color="grey"
          variant="text"
          @click="closeDialog"
          class="ml-3"
        >
          Remind Me Later
        </v-btn>
      </v-card-actions>

      <!-- Footer Note -->
      <div class="text-center mt-3">
        <small class="text-caption text-medium-emphasis">
          Last updated: {{ new Date().toLocaleDateString() }}
        </small>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.work-in-progress-dialog {
  z-index: 10000 !important;
}

.work-in-progress-dialog .v-card {
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10001 !important;
}

.work-in-progress-dialog ul {
  list-style-type: none;
  padding-left: 0;
}

.work-in-progress-dialog li {
  position: relative;
  padding-left: 1.2em;
}

.work-in-progress-dialog li::before {
  content: "•";
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  position: absolute;
  left: 0;
}

@media (max-width: 600px) {
  .work-in-progress-dialog .v-card {
    margin: 16px;
    max-height: calc(100vh - 32px);
    overflow-y: auto;
  }
}
</style>

<style>
/* Global styles to ensure dialog appears above navbar */
.v-overlay--active {
  z-index: 9999 !important;
}

.work-in-progress-dialog .v-overlay__content {
  z-index: 10001 !important;
}
</style>
