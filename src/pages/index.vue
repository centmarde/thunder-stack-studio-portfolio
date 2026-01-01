<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useLandingController } from '@/controller/landingController'
  import { useVisionMissionController } from '@/controller/visionMissionController'
  import { useAboutUsController } from '@/controller/aboutUsController'
  import { usePortfolioController } from '@/controller/portfolioController'
  import OuterLayoutWrapper from '@/layouts/OuterLayoutWrapper.vue'

  const { data, loading, error, fetchLandingData } = useLandingController()
  const { data: visionMissionData, loading: visionMissionLoading, error: visionMissionError, fetchVisionMissionData } = useVisionMissionController()
  const { data: aboutUsData, loading: aboutUsLoading, error: aboutUsError, fetchAboutUsData } = useAboutUsController()
  const { data: portfolioData, loading: portfolioLoading, error: portfolioError, fetchPortfolioData } = usePortfolioController()

  onMounted(async () => {
    await Promise.all([
      fetchLandingData(),
      fetchVisionMissionData(),
      fetchAboutUsData(),
      fetchPortfolioData()
    ])
  })

  function scrollToFeatures () {
    const element = document.querySelector('#features')
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  function scrollToVisionMission () {
    const element = document.querySelector('#vision-mission')
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  function scrollToAbout () {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  function scrollToPortfolio () {
    const element = document.querySelector('#portfolio')
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  function openGithub () {
    window.open('https://github.com', '_blank', 'noopener,noreferrer')
  }

  function openDocumentation () {
    window.open('https://vuetifyjs.com/', '_blank', 'noopener,noreferrer')
  }

  function formatDate (dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
</script>

<template>
  <OuterLayoutWrapper>
    <template #content>
      <div class="landing-view">
        <!-- Loading State -->
        <v-container
          v-if="loading || visionMissionLoading || aboutUsLoading || portfolioLoading"
          class="d-flex justify-center align-center"
          style="min-height: 50vh"
        >
          <v-progress-circular color="primary" indeterminate size="64" />
          <div class="text-h6 ml-4">Loading Thunder Stack Studio...</div>
        </v-container>

        <!-- Error State -->
        <v-container
          v-else-if="error || visionMissionError || aboutUsError || portfolioError"
          class="d-flex justify-center align-center"
          style="min-height: 50vh"
        >
          <v-alert
            color="error"
            icon="mdi-alert-circle"
            type="error"
            variant="tonal"
          >
            <v-alert-title>Failed to load content</v-alert-title>
            {{ error || visionMissionError || aboutUsError || portfolioError }}
          </v-alert>
        </v-container>

        <!-- Content -->
        <div v-else-if="data">
          <!-- Hero Section -->
          <section class="hero-section">
            <v-container>
              <v-row align="center" class="min-height-screen" justify="center">
                <v-col cols="12" lg="8" md="10">
                  <div class="text-center">
                    <h1 class="text-h2 text-md-h3 font-weight-bold mb-4">
                      {{ data.title }}
                    </h1>

                    <h2 class="text-h4 text-md-h4 text-grey-darken-1 mb-6">
                      {{ data.subtitle }}
                    </h2>

                    <p class="text-h6 text-md-h6 text-grey-darken-2 mb-8">
                      {{ data.description }}
                    </p>


                  </div>
                </v-col>
              </v-row>
            </v-container>
          </section>

          <!-- Features Section -->
          <section id="features" class="features-section py-16">
            <v-container>
              <v-row>
                <v-col
                  v-for="(feature, index) in data.features"
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

          <!-- Vision & Mission Section -->
          <section v-if="visionMissionData" id="vision-mission" class="vision-mission-section">
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
                      :color="visionMissionData.vision.color"
                      variant="tonal"
                    >
                      <v-card-text class="pa-6">
                        <div class="d-flex align-center mb-4">
                          <v-avatar
                            size="48"
                            :color="visionMissionData.vision.color"
                            class="me-3"
                          >
                            <v-icon
                              :icon="visionMissionData.vision.icon"
                              size="24"
                              color="white"
                            />
                          </v-avatar>
                          <h3 class="text-h4 font-weight-bold">
                            {{ visionMissionData.vision.title }}
                          </h3>
                        </div>

                        <p class="text-body-1 text-medium-emphasis">
                          {{ visionMissionData.vision.statement }}
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
                      :color="visionMissionData.mission.color"
                      variant="tonal"
                    >
                      <v-card-text class="pa-6">
                        <div class="d-flex align-center mb-4">
                          <v-avatar
                            size="48"
                            :color="visionMissionData.mission.color"
                            class="me-3"
                          >
                            <v-icon
                              :icon="visionMissionData.mission.icon"
                              size="24"
                              color="white"
                            />
                          </v-avatar>
                          <h3 class="text-h4 font-weight-bold">
                            {{ visionMissionData.mission.title }}
                          </h3>
                        </div>

                        <p class="text-body-1 text-medium-emphasis">
                          {{ visionMissionData.mission.statement }}
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

          <!-- About Us Section -->
          <section v-if="aboutUsData" id="about" class="about-section py-16">
            <v-container>
              <div class="text-center mb-12">
                <h2 class="text-h2 font-weight-bold mb-4">About Thunder Stack Studio</h2>
                <p class="text-h6 text-medium-emphasis">
                  Pioneering Filipino cultural gaming from the heart of Caraga
                </p>
              </div>

              <!-- Studio Info -->
              <v-row justify="center" class="mb-12">
                <v-col cols="12" md="8">
                  <v-card elevation="8" rounded="xl" class="pa-6">
                    <v-row align="center">
                      <v-col cols="12" md="8">
                        <h3 class="text-h4 font-weight-bold mb-4 text-primary">
                          Our Foundation
                        </h3>
                        <v-list lines="two">
                          <v-list-item prepend-icon="mdi-calendar">
                            <v-list-item-title>Founded</v-list-item-title>
                            <v-list-item-subtitle>{{ aboutUsData.studioInfo.foundedYear }}</v-list-item-subtitle>
                          </v-list-item>
                          <v-list-item prepend-icon="mdi-map-marker">
                            <v-list-item-title>Location</v-list-item-title>
                            <v-list-item-subtitle>{{ aboutUsData.studioInfo.location }}</v-list-item-subtitle>
                          </v-list-item>
                          <v-list-item prepend-icon="mdi-gamepad-variant">
                            <v-list-item-title>Focus</v-list-item-title>
                            <v-list-item-subtitle>{{ aboutUsData.studioInfo.focus }}</v-list-item-subtitle>
                          </v-list-item>
                        </v-list>
                      </v-col>
                      <v-col cols="12" md="4" class="text-center">
                        <v-icon size="120" color="primary" class="mb-4">
                          mdi-gamepad-variant-outline
                        </v-icon>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Team Preview -->
              <div class="text-center mb-8">
                <h3 class="text-h3 font-weight-bold mb-4">Meet Our Team</h3>
                <p class="text-h6 text-medium-emphasis">
                  The passionate individuals behind Thunder Stack Studio
                </p>
              </div>

              <v-row justify="center">
                <v-col
                  v-for="(member, index) in aboutUsData.teamMembers.slice(0, 4)"
                  :key="member.name"
                  cols="12"
                  sm="6"
                  lg="3"
                  class="mb-4"
                >
                  <v-card
                    elevation="4"
                    rounded="xl"
                    class="text-center pa-4 team-card-preview"
                    hover
                  >
                    <v-avatar
                      size="80"
                      class="mb-3"
                      color="primary"
                    >
                      <v-icon size="40" color="white">{{ member.fallbackIcon }}</v-icon>
                    </v-avatar>

                    <h4 class="text-h6 font-weight-bold mb-2">
                      {{ member.name }}
                    </h4>

                    <p class="text-subtitle-2 text-primary font-weight-medium mb-2">
                      {{ member.role }}
                    </p>

                    <p class="text-caption text-medium-emphasis">
                      {{ member.description.slice(0, 80) }}...
                    </p>
                  </v-card>
                </v-col>
              </v-row>

              <!-- About Us CTA -->
              <div class="text-center mt-8">
                <v-btn
                  size="large"
                  variant="elevated"
                  color="primary"
                  prepend-icon="mdi-account-group"
                  rounded="pill"
                  :to="{ path: '/about-us' }"
                >
                  Learn More About Us
                </v-btn>
              </div>
            </v-container>
          </section>

          <!-- Portfolio Section -->
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
                    <div class="text-h3 font-weight-bold text-primary">{{ portfolioData?.statistics?.totalDownloads || 0 }}</div>
                    <div class="text-caption text-uppercase text-medium-emphasis">Total Downloads</div>
                  </div>
                </v-col>
                <v-col cols="6" sm="3">
                  <div class="text-center">
                    <div class="text-h3 font-weight-bold text-primary">{{ portfolioData?.statistics?.activeProjects || 0 }}</div>
                    <div class="text-caption text-uppercase text-medium-emphasis">Active Projects</div>
                  </div>
                </v-col>
                <v-col cols="6" sm="3">
                  <div class="text-center">
                    <div class="text-h3 font-weight-bold text-primary">{{ portfolioData?.statistics?.averageRating || 0 }}</div>
                    <div class="text-caption text-uppercase text-medium-emphasis">Average Rating</div>
                  </div>
                </v-col>
                <v-col cols="6" sm="3">
                  <div class="text-center">
                    <div class="text-h3 font-weight-bold text-primary">{{ portfolioData?.statistics?.communityMembers || 0 }}</div>
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

              <v-row>
                <v-col
                  v-for="game in portfolioData?.featuredGames?.slice(0, 4)"
                  :key="game.title"
                  cols="12"
                  sm="6"
                  lg="3"
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

              <v-row>
                <v-col
                  v-for="achievement in portfolioData?.achievements?.slice(0, 3)"
                  :key="achievement.title"
                  cols="12"
                  sm="6"
                  lg="4"
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

        </div>
      </div>
    </template>
  </OuterLayoutWrapper>
</template>

<style scoped>
.min-height-screen {
  min-height: calc(100vh - 64px);
}

.features-section {
  background: linear-gradient(135deg, rgba(63, 81, 181, 0.05) 0%, rgba(118, 136, 224, 0.02) 100%);
}

.vision-mission-section {
  position: relative;
}

.about-section {
  background: linear-gradient(135deg, rgba(63, 81, 181, 0.02) 0%, rgba(118, 136, 224, 0.05) 100%);
}

.portfolio-section {
  background: linear-gradient(135deg, rgba(118, 136, 224, 0.05) 0%, rgba(63, 81, 181, 0.02) 100%);
}

.team-card-preview {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.team-card-preview:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12) !important;
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

.gap-4 {
  gap: 1rem;
}

.landing-view {
  min-height: 100vh;
}
</style>
