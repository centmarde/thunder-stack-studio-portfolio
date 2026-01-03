<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

interface Statistics {
  totalDownloads: number
  activeProjects: number
  averageRating: number
  communityMembers: number
}

interface Game {
  title: string
  description: string
  status: string
  images: {
    thumbnail: string
    screenshots: string[]
  }
  technologies: string[]
  platforms: string[]
  releaseDate: string
  fallbackIcon: string
  subtitle?: string
  category?: string
  culturalElements?: string[]
  primaryColor?: string
  progress?: number
}

interface Achievement {
  title: string
  description: string
  icon: string
  category: string
  year: number | string
}

interface PortfolioData {
  statistics: Statistics
  featuredGames: Game[]
  achievements: Achievement[]
}

interface Props {
  data: PortfolioData | null
}

const props = defineProps<Props>()

// Dialog state
const dialog = ref(false)
const selectedGame = ref<Game | null>(null)
const currentImageIndex = ref(0)

// Open dialog with selected game
const openGameDialog = (game: Game) => {
  selectedGame.value = game
  currentImageIndex.value = 0
  dialog.value = true
}

// Navigate through screenshots
const nextImage = () => {
  if (selectedGame.value?.images?.screenshots) {
    currentImageIndex.value = (currentImageIndex.value + 1) % selectedGame.value.images.screenshots.length
  }
}

const previousImage = () => {
  if (selectedGame.value?.images?.screenshots) {
    const length = selectedGame.value.images.screenshots.length
    currentImageIndex.value = (currentImageIndex.value - 1 + length) % length
  }
}

// Get current screenshot
const currentScreenshot = computed(() => {
  if (selectedGame.value?.images?.screenshots) {
    return selectedGame.value.images.screenshots[currentImageIndex.value]
  }
  return ''
})

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!dialog.value) return

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      previousImage()
      break
    case 'ArrowRight':
      event.preventDefault()
      nextImage()
      break
    case 'Escape':
      event.preventDefault()
      dialog.value = false
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Calculate responsive column sizes based on data count
const featuredGamesCount = computed(() => props.data?.featuredGames?.length || 0)
const achievementsCount = computed(() => props.data?.achievements?.length || 0)

const getGameCardCols = computed(() => {
  const count = Math.min(featuredGamesCount.value, 4) // Max 4 items shown
  switch (count) {
    case 1: return { cols: 12, sm: 12, md: 8, lg: 6 } // Single card, centered
    case 2: return { cols: 12, sm: 12, md: 6, lg: 6 } // Two cards, 50% each
    case 3: return { cols: 12, sm: 6, md: 4, lg: 4 } // Three cards
    case 4:
    default: return { cols: 12, sm: 6, md: 6, lg: 3 } // Four cards (default)
  }
})

const getAchievementCardCols = computed(() => {
  const count = Math.min(achievementsCount.value, 3) // Max 3 items shown
  switch (count) {
    case 1: return { cols: 12, sm: 12, md: 8, lg: 6 } // Single card, centered
    case 2: return { cols: 12, sm: 12, md: 6, lg: 6 } // Two cards, 50% each
    case 3:
    default: return { cols: 12, sm: 6, md: 4, lg: 4 } // Three cards
  }
})
</script>

<template>
  <section id="portfolio" class="portfolio-section py-16">
    <v-container>




      <!-- Featured Games -->
      <div class="text-center mb-8">
        <h3 class="text-h3 font-weight-bold mb-4">Featured Games</h3>
        <p class="text-h6 text-medium-emphasis">
          Our flagship titles celebrating Philippine culture and heritage
        </p>
      </div>

      <v-row justify="center">
        <v-col
          v-for="game in data?.featuredGames?.slice(0, 4)"
          :key="game.title"
          v-bind="getGameCardCols"
          class="mb-4"
        >
          <v-card
            class="h-100 hover-card game-card"
            elevation="6"
            rounded="lg"
            @click="openGameDialog(game)"
            style="cursor: pointer;"
          >
            <!-- Game Image -->
            <div class="position-relative">
              <v-img
                :src="game.images.thumbnail"
                height="180"
                cover
                class="rounded-t-lg"
              >
                <template #error>
                  <div class="d-flex align-center justify-center h-100 bg-grey-lighten-2">
                    <v-icon :icon="game.fallbackIcon" size="48" color="grey" />
                  </div>
                </template>
              </v-img>

              <!-- Status Badge -->
              <v-chip
                :color="game.status === 'Released' ? 'success' : game.status === 'In Development' ? 'warning' : 'info'"
                size="x-small"
                class="position-absolute ma-1"
                style="top: 0; right: 0;"
              >
                {{ game.status }}
              </v-chip>
            </div>

            <v-card-text class="pa-4">
              <h4 class="text-h6 font-weight-bold mb-2">{{ game.title }}</h4>
              <p class="text-body-2 text-medium-emphasis mb-3">
                {{ game.description.slice(0, 80) }}...
              </p>

              <!-- Technology Tags -->
              <div class="mb-3">
                <v-chip
                  v-for="tech in game.technologies.slice(0, 2)"
                  :key="tech"
                  size="x-small"
                  variant="outlined"
                  class="me-1 mb-1"
                >
                  {{ tech }}
                </v-chip>
              </div>
            </v-card-text>

            <v-card-actions class="pa-4 pt-0">
              <v-chip
                v-for="platform in game.platforms"
                :key="platform"
                size="x-small"
                color="primary"
                variant="outlined"
                class="me-1"
              >
                {{ platform }}
              </v-chip>
              <v-spacer />
              <div class="text-caption text-medium-emphasis">
                {{ game.releaseDate }}
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Achievements Preview -->
      <div class="text-center mb-8 mt-12">
        <h3 class="text-h3 font-weight-bold mb-4">Recent Achievements</h3>
        <p class="text-h6 text-medium-emphasis">
          Recognition and milestones that define our journey
        </p>
      </div>

      <v-row justify="center">
        <v-col
          v-for="achievement in data?.achievements?.slice(0, 3)"
          :key="achievement.title"
          v-bind="getAchievementCardCols"
          class="mb-4"
        >
          <v-card
            class="h-100 text-center hover-card achievement-card"
            elevation="4"
            rounded="lg"
          >
            <v-card-text class="pa-6">
              <v-icon
                :icon="achievement.icon"
                size="48"
                color="primary"
                class="mb-3"
              />
              <h4 class="text-h6 font-weight-bold mb-2">{{ achievement.title }}</h4>
              <p class="text-body-2 text-medium-emphasis mb-3">
                {{ achievement.description.slice(0, 100) }}...
              </p>
              <v-chip
                color="primary"
                size="small"
                variant="outlined"
              >
                {{ achievement.category }}
              </v-chip>
              <div class="text-caption text-medium-emphasis mt-2">{{ achievement.year }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Portfolio CTA -->

    </v-container>

    <!-- Fullscreen Game Screenshots Dialog -->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card v-if="selectedGame" class="d-flex flex-column">
        <!-- Dialog Header -->
        <v-toolbar
          color="rgba(0, 0, 0, 0.8)"
          dark
          flat
          class="flex-grow-0"
        >
          <v-btn
            icon="mdi-close"
            @click="dialog = false"
          />
          <v-toolbar-title>{{ selectedGame.title }}</v-toolbar-title>
          <v-spacer />
          <div class="text-caption">
            {{ currentImageIndex + 1 }} / {{ selectedGame.images?.screenshots?.length || 0 }}
          </div>
        </v-toolbar>

        <!-- Main Content Area -->
        <div class="flex-grow-1 d-flex">
          <!-- Image Display Area -->
          <div class="flex-grow-1 position-relative d-flex align-center justify-center bg-black">
            <v-img
              v-if="currentScreenshot"
              :src="currentScreenshot"
              contain
              class="screenshot-image"
              max-height="calc(100vh - 64px)"
            >
              <template #error>
                <div class="d-flex align-center justify-center h-100">
                  <v-icon
                    :icon="selectedGame.fallbackIcon || 'mdi-image-broken'"
                    size="64"
                    color="grey"
                  />
                </div>
              </template>
            </v-img>

            <!-- Navigation Buttons -->
            <v-btn
              v-if="selectedGame.images?.screenshots && selectedGame.images.screenshots.length > 1"
              icon="mdi-chevron-left"
              size="large"
              color="white"
              variant="elevated"
              class="position-absolute navigation-btn left-btn"
              @click="previousImage"
            />

            <v-btn
              v-if="selectedGame.images?.screenshots && selectedGame.images.screenshots.length > 1"
              icon="mdi-chevron-right"
              size="large"
              color="white"
              variant="elevated"
              class="position-absolute navigation-btn right-btn"
              @click="nextImage"
            />
          </div>

          <!-- Game Details Sidebar (Optional - for larger screens) -->
          <div class="game-details-sidebar d-none d-lg-flex flex-column">
            <v-card flat class="pa-4 h-100">
              <div class="mb-4">
                <v-chip
                  :color="selectedGame.status === 'Released' ? 'success' : selectedGame.status === 'In Development' ? 'warning' : 'info'"
                  size="small"
                  class="mb-2"
                >
                  {{ selectedGame.status }}
                </v-chip>
                <h3 class="text-h5 font-weight-bold">{{ selectedGame.title }}</h3>
                <p v-if="selectedGame.subtitle" class="text-subtitle-1 text-medium-emphasis mb-2">
                  {{ selectedGame.subtitle }}
                </p>
                <p class="text-body-2">{{ selectedGame.description }}</p>
              </div>

              <div v-if="selectedGame.platforms?.length" class="mb-4">
                <h4 class="text-subtitle-2 font-weight-bold mb-2">Platforms</h4>
                <v-chip
                  v-for="platform in selectedGame.platforms"
                  :key="platform"
                  size="small"
                  variant="outlined"
                  class="me-1 mb-1"
                >
                  {{ platform }}
                </v-chip>
              </div>

              <div v-if="selectedGame.technologies?.length" class="mb-4">
                <h4 class="text-subtitle-2 font-weight-bold mb-2">Technologies</h4>
                <v-chip
                  v-for="tech in selectedGame.technologies"
                  :key="tech"
                  size="small"
                  color="primary"
                  variant="outlined"
                  class="me-1 mb-1"
                >
                  {{ tech }}
                </v-chip>
              </div>

              <div v-if="selectedGame.culturalElements?.length" class="mb-4">
                <h4 class="text-subtitle-2 font-weight-bold mb-2">Cultural Elements</h4>
                <v-chip
                  v-for="element in selectedGame.culturalElements"
                  :key="element"
                  size="small"
                  color="secondary"
                  variant="outlined"
                  class="me-1 mb-1"
                >
                  {{ element }}
                </v-chip>
              </div>

              <div v-if="selectedGame.releaseDate">
                <h4 class="text-subtitle-2 font-weight-bold mb-2">Release Date</h4>
                <p class="text-body-2">{{ selectedGame.releaseDate }}</p>
              </div>
            </v-card>
          </div>
        </div>

        <!-- Thumbnail Navigation (Bottom) -->
        <div
          v-if="selectedGame.images?.screenshots && selectedGame.images.screenshots.length > 1"
          class="thumbnail-navigation pa-2 bg-grey-darken-4"
        >
          <div class="d-flex justify-center align-center overflow-x-auto">
            <v-btn
              v-for="(screenshot, index) in selectedGame.images.screenshots"
              :key="index"
              :variant="index === currentImageIndex ? 'elevated' : 'outlined'"
              :color="index === currentImageIndex ? 'primary' : 'grey'"
              size="small"
              class="ma-1 flex-shrink-0"
              @click="currentImageIndex = index"
            >
              <v-img
                :src="screenshot"
                width="40"
                height="30"
                cover
                class="rounded"
              >
                <template #error>
                  <v-icon icon="mdi-image" size="20" />
                </template>
              </v-img>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </section>
</template>

<style scoped>
.portfolio-section {
  background: linear-gradient(135deg, rgba(118, 136, 224, 0.05) 0%, rgba(63, 81, 181, 0.02) 100%);
}

.game-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15) !important;
}

.achievement-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.achievement-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12) !important;
  background: rgba(var(--v-theme-primary), 0.05);
}

/* Dialog Styles */
.screenshot-image {
  max-width: 100%;
  height: auto;
}

.navigation-btn {
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
}

.navigation-btn:hover {
  opacity: 1;
}

.left-btn {
  left: 16px;
}

.right-btn {
  right: 16px;
}

.game-details-sidebar {
  width: 300px;
  min-width: 300px;
  max-width: 300px;
  border-left: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgba(var(--v-theme-surface), 0.95);
  backdrop-filter: blur(10px);
}

.thumbnail-navigation {
  max-height: 80px;
  overflow-y: hidden;
}

.thumbnail-navigation .v-btn {
  min-width: 48px !important;
  padding: 4px !important;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .game-details-sidebar {
    display: none !important;
  }

  .navigation-btn {
    opacity: 0.6;
  }
}

@media (max-width: 600px) {
  .left-btn {
    left: 8px;
  }

  .right-btn {
    right: 8px;
  }

  .navigation-btn {
    width: 40px;
    height: 40px;
  }
}
</style>
