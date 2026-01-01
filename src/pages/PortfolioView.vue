<script lang="ts" setup>
  import { computed, onMounted } from 'vue'
  import { useDisplay } from 'vuetify'
  import { usePortfolioController } from '@/controller/portfolioController'

  // Display utilities
  const { mobile, mdAndUp } = useDisplay()

  // Portfolio data
  const {
    data: portfolioData,
    loading,
    error,
    fetchPortfolioData
  } = usePortfolioController()

  // Computed properties
  const featuredGames = computed(() => portfolioData.value?.featuredGames || [])
  const achievements = computed(() => portfolioData.value?.achievements || [])
  const statistics = computed(() => portfolioData.value?.statistics || {
    totalDownloads: 0,
    activeProjects: 0,
    averageRating: 0,
    communityMembers: 0,
    culturalElementsPreserved: 0,
    educationalPartnerships: 0
  })
  const gameCategories = computed(() => portfolioData.value?.categories || [])

  // Load data on component mount
  onMounted(async () => {
    await fetchPortfolioData()
  })

  // Helper methods
  function getTechColor(tech: string): string {
    const techColors: Record<string, string> = {
      'Unity 3D': 'purple',
      'Unity': 'purple',
      'C#': 'blue',
      'Photoshop': 'cyan',
      'Blender': 'orange',
      'JavaScript': 'yellow',
      'HTML5': 'red',
      'CSS3': 'blue-darken-2',
      'Vue.js': 'green',
      'Node.js': 'green-darken-2',
      'Firebase': 'orange',
      'Unreal Engine': 'indigo',
      'Blueprint': 'indigo-darken-2',
      'Multiplayer': 'purple-darken-2',
    }
    return techColors[tech] || 'grey'
  }

  function getAchievementColor(category: string): string {
    const categoryColors: Record<string, string> = {
      'Award': 'amber',
      'Recognition': 'blue',
      'Milestone': 'green',
      'Partnership': 'purple',
      'Community': 'green',
      'Innovation': 'cyan',
    }
    return categoryColors[category] || 'primary'
  }
</script>

<template>
  <div class="portfolio-page">
    <!-- Loading State -->
    <v-container v-if="loading" class="d-flex justify-center align-center" style="min-height: 70vh">
      <div class="text-center">
        <v-progress-circular color="primary" indeterminate size="64" />
        <div class="text-h6 mt-4">Loading Portfolio...</div>
      </div>
    </v-container>

    <!-- Error State -->
    <v-container v-else-if="error" class="d-flex justify-center align-center" style="min-height: 70vh">
      <v-alert color="error" icon="mdi-alert-circle" type="error" variant="tonal">
        <v-alert-title>Failed to load portfolio</v-alert-title>
        {{ error }}
      </v-alert>
    </v-container>

    <!-- Portfolio Content -->
    <div v-else>
      <!-- Hero Section -->
      <v-container class="py-16">
        <v-row justify="center" class="text-center">
          <v-col cols="12" md="8">
            <v-icon
              icon="mdi-briefcase-variant"
              size="64"
              color="primary"
              class="mb-4"
            />
            <h1 class="text-h2 font-weight-bold text-primary mb-4">
              Our Portfolio
            </h1>
            <p class="text-h6 text-medium-emphasis mb-8">
              Showcasing Thunder Stack Studio's cultural gaming excellence and achievements
            </p>

            <!-- Statistics Overview -->
            <v-row class="mb-8" justify="center">
              <v-col cols="6" sm="3">
                <div class="text-center">
                  <div class="text-h3 font-weight-bold text-primary">{{ statistics.totalDownloads }}</div>
                  <div class="text-caption text-uppercase text-medium-emphasis">Total Downloads</div>
                </div>
              </v-col>
              <v-col cols="6" sm="3">
                <div class="text-center">
                  <div class="text-h3 font-weight-bold text-primary">{{ statistics.activeProjects }}</div>
                  <div class="text-caption text-uppercase text-medium-emphasis">Active Projects</div>
                </div>
              </v-col>
              <v-col cols="6" sm="3">
                <div class="text-center">
                  <div class="text-h3 font-weight-bold text-primary">{{ statistics.averageRating }}</div>
                  <div class="text-caption text-uppercase text-medium-emphasis">Average Rating</div>
                </div>
              </v-col>
              <v-col cols="6" sm="3">
                <div class="text-center">
                  <div class="text-h3 font-weight-bold text-primary">{{ statistics.communityMembers }}</div>
                  <div class="text-caption text-uppercase text-medium-emphasis">Community Members</div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <!-- Game Categories -->
      <v-container class="py-12">
        <v-row justify="center" class="mb-8">
          <v-col cols="12" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4">Game Categories</h2>
            <p class="text-h6 text-medium-emphasis">
              Exploring diverse gaming experiences rooted in Filipino culture
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="category in gameCategories"
            :key="category.name"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              class="h-100 hover-card"
              elevation="4"
              rounded="lg"
            >
              <v-card-text class="text-center pa-6">
                <v-icon
                  :icon="category.icon"
                  size="48"
                  color="primary"
                  class="mb-4"
                />
                <h3 class="text-h5 font-weight-bold mb-2">{{ category.name }}</h3>
                <p class="text-medium-emphasis">{{ category.description }}</p>
                <v-chip
                  :color="category.color"
                  variant="outlined"
                  size="small"
                  class="mt-2"
                >
                  Category
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Featured Games -->
      <v-container class="py-12">
        <v-row justify="center" class="mb-8">
          <v-col cols="12" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4">Featured Games</h2>
            <p class="text-h6 text-medium-emphasis">
              Our flagship titles celebrating Philippine culture and heritage
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="game in featuredGames"
            :key="game.title"
            cols="12"
            md="6"
            lg="6"
            class="mb-6"
          >
            <v-card
              class="h-100 hover-card game-card"
              elevation="8"
              rounded="xl"
            >
              <!-- Game Image -->
              <div class="position-relative">
                <v-img
                  :src="game.images.thumbnail"
                  height="250"
                  cover
                  class="rounded-t-xl"
                >
                  <template #error>
                    <div class="d-flex align-center justify-center h-100 bg-grey-lighten-2">
                      <v-icon :icon="game.fallbackIcon" size="64" color="grey" />
                    </div>
                  </template>
                </v-img>

                <!-- Game Status Badge -->
                <v-chip
                  :color="game.status === 'Released' ? 'success' : game.status === 'In Development' ? 'warning' : 'info'"
                  size="small"
                  class="position-absolute ma-2"
                  style="top: 0; right: 0;"
                >
                  {{ game.status }}
                </v-chip>
              </div>

              <v-card-text class="pa-6">
                <h3 class="text-h5 font-weight-bold mb-2">{{ game.title }}</h3>
                <p class="text-medium-emphasis mb-4">{{ game.description }}</p>

                <!-- Technology Tags -->
                <div class="mb-4">
                  <v-chip
                    v-for="tech in game.technologies"
                    :key="tech"
                    size="small"
                    variant="outlined"
                    class="me-2 mb-2"
                    :color="getTechColor(tech)"
                  >
                    {{ tech }}
                  </v-chip>
                </div>

                <!-- Cultural Elements -->
                <div class="mb-4">
                  <h4 class="text-subtitle-1 font-weight-bold mb-2">Cultural Elements:</h4>
                  <ul class="text-body-2 text-medium-emphasis">
                    <li v-for="element in game.culturalElements" :key="element">{{ element }}</li>
                  </ul>
                </div>
              </v-card-text>

              <v-card-actions class="pa-6 pt-0">
                <div class="d-flex align-center">
                  <v-chip
                    v-for="platform in game.platforms"
                    :key="platform"
                    size="small"
                    variant="outlined"
                    color="primary"
                    class="me-2"
                  >
                    {{ platform }}
                  </v-chip>
                </div>
                <v-spacer />
                <div class="text-caption text-medium-emphasis">
                  {{ game.releaseDate }}
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Achievements -->
      <v-container class="py-12">
        <v-row justify="center" class="mb-8">
          <v-col cols="12" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4">Achievements & Recognition</h2>
            <p class="text-h6 text-medium-emphasis">
              Awards and milestones that define our journey
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            v-for="achievement in achievements"
            :key="achievement.title"
            cols="12"
            sm="6"
            md="4"
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
                  :color="getAchievementColor(achievement.category)"
                  class="mb-4"
                />
                <h3 class="text-h6 font-weight-bold mb-2">{{ achievement.title }}</h3>
                <p class="text-body-2 text-medium-emphasis mb-3">{{ achievement.description }}</p>
                <v-chip
                  :color="getAchievementColor(achievement.category)"
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
      </v-container>

      <!-- Call to Action -->
      <v-container class="py-16">
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <v-card
              class="pa-8"
              color="primary"
              variant="elevated"
              rounded="xl"
            >
              <h2 class="text-h4 font-weight-bold text-white mb-4">
                Ready to Play Our Games?
              </h2>
              <p class="text-h6 text-white mb-6 opacity-90">
                Experience Filipino culture through our immersive gaming experiences
              </p>
              <v-btn
                color="white"
                variant="elevated"
                size="large"
                rounded="pill"
                prepend-icon="mdi-gamepad-variant"
                class="px-8"
                @click="$router.push('/')"
              >
                Explore Games
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style scoped>
.portfolio-page {
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.05) 0%, rgba(var(--v-theme-secondary), 0.05) 100%);
  min-height: 100vh;
}

.hover-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.game-card {
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.game-card:hover {
  border-color: rgb(var(--v-theme-primary));
  transform: translateY(-8px);
}

.achievement-card:hover {
  background: rgba(var(--v-theme-primary), 0.05);
}

/* Custom scrollbar */
.portfolio-page ::-webkit-scrollbar {
  width: 8px;
}

.portfolio-page ::-webkit-scrollbar-track {
  background: rgba(var(--v-theme-surface-variant), 0.3);
  border-radius: 4px;
}

.portfolio-page ::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-primary), 0.5);
  border-radius: 4px;
}

.portfolio-page ::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-primary), 0.7);
}
</style>
