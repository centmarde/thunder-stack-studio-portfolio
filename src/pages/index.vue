<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useLandingController } from '@/controller/landingController'
  import { useVisionMissionController } from '@/controller/visionMissionController'
  import { useAboutUsController } from '@/controller/aboutUsController'
  import { usePortfolioController } from '@/controller/portfolioController'
  import { useScrollNavigation } from '@/composables/useScrollNavigation'

  // Components
  import OuterLayoutWrapper from '@/layouts/OuterLayoutWrapper.vue'
  import {
    HeroSection,
    FeaturesSection,
    VisionMissionSection,
    AboutUsSection,
    PortfolioSection,
    LoadingState,
    ErrorState
  } from '@/components/landing'

  // Data controllers
  const { data, loading, error, fetchLandingData } = useLandingController()
  const { data: visionMissionData, loading: visionMissionLoading, error: visionMissionError, fetchVisionMissionData } = useVisionMissionController()
  const { data: aboutUsData, loading: aboutUsLoading, error: aboutUsError, fetchAboutUsData } = useAboutUsController()
  const { data: portfolioData, loading: portfolioLoading, error: portfolioError, fetchPortfolioData } = usePortfolioController()

  // Navigation functions
  const { scrollToFeatures, scrollToVisionMission, scrollToAbout, scrollToPortfolio, openGithub, openDocumentation } = useScrollNavigation()

  // Initialize data
  onMounted(async () => {
    await Promise.all([
      fetchLandingData(),
      fetchVisionMissionData(),
      fetchAboutUsData(),
      fetchPortfolioData()
    ])
  })

  // Helper functions
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
        <LoadingState
          v-if="loading || visionMissionLoading || aboutUsLoading || portfolioLoading"
          :loading="loading"
          :vision-mission-loading="visionMissionLoading"
          :about-us-loading="aboutUsLoading"
          :portfolio-loading="portfolioLoading"
        />

        <!-- Error State -->
        <ErrorState
          v-else-if="error || visionMissionError || aboutUsError || portfolioError"
          :error="error"
          :vision-mission-error="visionMissionError"
          :about-us-error="aboutUsError"
          :portfolio-error="portfolioError"
        />

        <!-- Content -->
        <div v-else-if="data">
          <!-- Hero Section -->
          <HeroSection :data="data" />

          <!-- Features Section -->
          <FeaturesSection :data="data" />

          <!-- Vision & Mission Section -->
          <VisionMissionSection :data="visionMissionData" />

          <!-- About Us Section -->
          <AboutUsSection :data="aboutUsData" />

          <!-- Portfolio Section -->
          <PortfolioSection :data="portfolioData" />
        </div>
      </div>
    </template>
  </OuterLayoutWrapper>
</template>

<style scoped>
.landing-view {
  min-height: 100vh;
}
</style>
