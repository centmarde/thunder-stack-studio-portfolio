<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTheme } from "vuetify";
import { createDynamicThemeConfigFromExternal } from "@/themes/index";
import { useAboutUsController } from "@/controller/aboutUsController";

// Reactive state
const themeLoading = ref(true);
const themeError = ref<string | null>(null);

// Composables
const theme = useTheme();
const { data: aboutUsData, loading: aboutUsLoading, error: aboutUsError, fetchAboutUsData } = useAboutUsController();// Load dynamic theme configuration
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
    fetchAboutUsData()
  ]);
});
</script>

<template>
  <!-- Loading State -->
  <v-overlay v-if="themeLoading || aboutUsLoading" class="d-flex align-center justify-center">
    <v-progress-circular
      indeterminate
      size="64"
      color="primary"
    />
    <div class="text-h6 ml-4">Loading content...</div>
  </v-overlay>

  <!-- Error States -->
  <v-alert
    v-if="(themeError || aboutUsError) && !themeLoading && !aboutUsLoading"
    type="error"
    class="ma-4"
    closable
    @click:close="() => { themeError = null; aboutUsError = null; }"
  >
    <v-alert-title>Loading Error</v-alert-title>
    {{ themeError || aboutUsError }}
  </v-alert>

  <!-- Main Content -->
  <v-container v-if="!themeLoading && !aboutUsLoading && aboutUsData" fluid class="pa-0">
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
              mdi-account-group-outline
            </v-icon>

            <h1 class="text-h2 font-weight-bold mb-4 text-primary">
              About Thunder Stack Studio
            </h1>

            <p class="text-h6 text-medium-emphasis mb-6">
              Pioneering Filipino cultural gaming from the heart of Caraga
            </p>

            <!-- Quick Stats -->
            <v-row justify="center" class="mt-8">
              <v-col cols="6" sm="3" class="text-center">
                <div class="text-h4 font-weight-bold text-primary">{{ aboutUsData.studioInfo.foundedYear }}</div>
                <div class="text-caption">Founded</div>
              </v-col>
              <v-col cols="6" sm="3" class="text-center">
                <div class="text-h4 font-weight-bold text-primary">{{ aboutUsData.studioInfo.stats.teamMembers }}</div>
                <div class="text-caption">Team Members</div>
              </v-col>
              <v-col cols="6" sm="3" class="text-center">
                <div class="text-h4 font-weight-bold text-primary">{{ aboutUsData.studioInfo.stats.region }}</div>
                <div class="text-caption">Region</div>
              </v-col>
              <v-col cols="6" sm="3" class="text-center">
                <div class="text-h4 font-weight-bold text-primary">{{ aboutUsData.studioInfo.stats.culturalStories }}</div>
                <div class="text-caption">Cultural Stories</div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Studio Info Card -->
    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-card elevation="12" rounded="xl" class="pa-6">
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <h3 class="text-h4 font-weight-bold mb-4 text-primary">
                    Studio Information
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
                    <v-list-item prepend-icon="mdi-school">
                      <v-list-item-title>University</v-list-item-title>
                      <v-list-item-subtitle>{{ aboutUsData.studioInfo.university }} - {{ aboutUsData.studioInfo.campus }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item prepend-icon="mdi-gamepad-variant">
                      <v-list-item-title>Focus</v-list-item-title>
                      <v-list-item-subtitle>{{ aboutUsData.studioInfo.focus }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="12" md="6" class="d-flex align-center justify-center">
                  <v-card
                    elevation="8"
                    rounded="lg"
                    color="primary"
                    width="400"
                    height="300"
                    class="d-flex align-center justify-center"
                  >
                    <div class="text-center">
                      <v-icon size="100" color="white" class="mb-4">
                        mdi-map-marker-multiple
                      </v-icon>
                      <div class="text-h6 font-weight-bold text-white">
                        Butuan City, Caraga
                      </div>
                      <div class="text-body-2 text-white opacity-90">
                        Caraga State University
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Our Story Section -->
    <v-sheet class="py-16" color="surface-variant">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <div class="text-center mb-8">
              <h2 class="text-h2 font-weight-bold mb-4">{{ aboutUsData.storySection.title }}</h2>
              <p class="text-h6 text-medium-emphasis">
                {{ aboutUsData.storySection.subtitle }}
              </p>
            </div>

            <div class="story-content">
              <p
                v-for="(paragraph, index) in aboutUsData.storySection.content"
                :key="index"
                class="text-h6 text-medium-emphasis mb-6 line-height-lg"
              >
                {{ paragraph }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Team Section -->
    <v-container class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-h2 font-weight-bold mb-4">Meet Our Team</h2>
        <p class="text-h6 text-medium-emphasis">
          The passionate individuals behind Thunder Stack Studio
        </p>
      </div>

      <v-row>
        <v-col
          v-for="member in aboutUsData.teamMembers"
          :key="member.name"
          cols="12"
          sm="6"
          lg="3"
          class="mb-8"
        >
          <v-card
            elevation="8"
            rounded="xl"
            class="fill-height team-card"
          >
            <v-card-text class="pa-6 text-center">
              <v-avatar
                size="100"
                class="mb-4"
                color="primary"
              >
                <v-icon size="60" color="white">{{ member.fallbackIcon }}</v-icon>
              </v-avatar>

              <h3 class="text-h5 font-weight-bold mb-2">
                {{ member.name }}
              </h3>

              <p class="text-subtitle-1 text-primary font-weight-medium mb-3">
                {{ member.role }}
              </p>

              <p class="text-body-2 text-medium-emphasis mb-4">
                {{ member.description }}
              </p>

              <!-- Skills -->
              <div class="mb-4">
                <v-chip
                  v-for="skill in member.skills"
                  :key="skill"
                  size="small"
                  color="primary"
                  variant="tonal"
                  class="ma-1"
                >
                  {{ skill }}
                </v-chip>
              </div>

              <!-- Social Links -->
              <div class="d-flex justify-center gap-2">
                <v-btn
                  v-if="member.social.email"
                  icon="mdi-email"
                  variant="outlined"
                  size="small"
                  color="primary"
                />
                <v-btn
                  v-if="member.social.linkedin"
                  icon="mdi-linkedin"
                  variant="outlined"
                  size="small"
                  color="primary"
                />
                <v-btn
                  v-if="member.social.github"
                  icon="mdi-github"
                  variant="outlined"
                  size="small"
                  color="primary"
                />
                <v-btn
                  v-if="member.social.behance"
                  icon="mdi-behance"
                  variant="outlined"
                  size="small"
                  color="primary"
                />
                <v-btn
                  v-if="member.social.instagram"
                  icon="mdi-instagram"
                  variant="outlined"
                  size="small"
                  color="primary"
                />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Achievements Section -->
    <v-sheet class="py-16" color="primary">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h2 font-weight-bold mb-4 text-white">Our Impact</h2>
          <p class="text-h6 text-white opacity-90">
            What we've accomplished and continue to strive for
          </p>
        </div>

        <v-row>
          <v-col
            v-for="achievement in aboutUsData.achievements"
            :key="achievement.title"
            cols="12"
            sm="6"
            md="3"
            class="mb-6"
          >
            <v-card
              elevation="0"
              rounded="xl"
              color="white"
              class="text-center pa-6 achievement-card"
            >
              <v-avatar
                size="64"
                :color="achievement.color"
                class="mb-4"
              >
                <v-icon
                  :icon="achievement.icon"
                  size="32"
                  color="white"
                />
              </v-avatar>

              <h3 class="text-h6 font-weight-bold mb-3">
                {{ achievement.title }}
              </h3>

              <p class="text-body-2 text-medium-emphasis">
                {{ achievement.description }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Contact CTA Section -->
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <v-card
            elevation="16"
            rounded="xl"
            class="pa-8"
            variant="outlined"
          >
            <v-card-text>
              <v-icon
                size="64"
                color="primary"
                class="mb-4"
              >
                mdi-hand-wave
              </v-icon>

              <h3 class="text-h3 font-weight-bold mb-4">
                Let's Connect
              </h3>

              <p class="text-h6 text-medium-emphasis mb-6">
                Interested in collaborating or learning more about our cultural gaming projects?
                We'd love to hear from you!
              </p>

              <v-row justify="center" class="gap-4">
                <v-col cols="auto">
                  <v-btn
                    size="large"
                    variant="elevated"
                    color="primary"
                    class="px-8"
                    prepend-icon="mdi-email"
                    rounded="pill"
                  >
                    Contact Us
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    size="large"
                    variant="outlined"
                    color="primary"
                    class="px-8"
                    prepend-icon="mdi-account-plus"
                    rounded="pill"
                  >
                    Join Our Team
                  </v-btn>
                </v-col>
              </v-row>
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

.team-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15) !important;
}

.achievement-card {
  transition: transform 0.2s ease-in-out;
}

.achievement-card:hover {
  transform: translateY(-4px);
}

.story-content p {
  text-align: justify;
}
</style>
