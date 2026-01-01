<script lang="ts" setup>
import { computed } from 'vue'

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
  }
  technologies: string[]
  platforms: string[]
  releaseDate: string
  fallbackIcon: string
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
      <!-- Portfolio Header -->
      <div class="text-center mb-12">
        <v-icon
          icon="mdi-briefcase-variant"
          size="64"
          color="primary"
          class="mb-4"
        />
        <h2 class="text-h2 font-weight-bold text-primary mb-4">
          Our Portfolio
        </h2>
        <p class="text-h6 text-medium-emphasis">
          Showcasing Thunder Stack Studio's cultural gaming excellence and achievements
        </p>
      </div>

      <!-- Studio Statistics -->
      <v-row class="mb-12" justify="center">
        <v-col cols="6" sm="3">
          <div class="text-center">
            <div class="text-h3 font-weight-bold text-primary">{{ data?.statistics?.totalDownloads || 0 }}</div>
            <div class="text-caption text-uppercase text-medium-emphasis">Total Downloads</div>
          </div>
        </v-col>
        <v-col cols="6" sm="3">
          <div class="text-center">
            <div class="text-h3 font-weight-bold text-primary">{{ data?.statistics?.activeProjects || 0 }}</div>
            <div class="text-caption text-uppercase text-medium-emphasis">Active Projects</div>
          </div>
        </v-col>
        <v-col cols="6" sm="3">
          <div class="text-center">
            <div class="text-h3 font-weight-bold text-primary">{{ data?.statistics?.averageRating || 0 }}</div>
            <div class="text-caption text-uppercase text-medium-emphasis">Average Rating</div>
          </div>
        </v-col>
        <v-col cols="6" sm="3">
          <div class="text-center">
            <div class="text-h3 font-weight-bold text-primary">{{ data?.statistics?.communityMembers || 0 }}</div>
            <div class="text-caption text-uppercase text-medium-emphasis">Community Members</div>
          </div>
        </v-col>
      </v-row>

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
      <div class="text-center mt-8">
        <v-btn
          size="large"
          variant="elevated"
          color="primary"
          prepend-icon="mdi-briefcase-variant"
          rounded="pill"
          :to="{ path: '/portfolio' }"
        >
          View Full Portfolio
        </v-btn>
      </div>
    </v-container>
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
</style>
