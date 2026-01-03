<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

interface LandingData {
  title: string
  subtitle: string
  description: string
  features?: any[]
}

interface Props {
  data: LandingData | null
}

defineProps<Props>()

// Carousel functionality
const currentSlide = ref(0)
const carouselImages = [
  '/assets/Front/a1.jpg',
  '/assets/Front/a2.jpg',
  '/assets/Front/a3.jpg',
  '/assets/Front/a4.jpg',
  '/assets/Front/a5.jpg',
  '/assets/Front/a6.jpg',
  '/assets/Front/a7.jpg'
]

let carouselInterval: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselImages.length
}

const startCarousel = () => {
  carouselInterval = setInterval(nextSlide, 5000) // Change slide every 5 seconds
}

const stopCarousel = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
}

onMounted(() => {
  startCarousel()
})

onUnmounted(() => {
  stopCarousel()
})
</script>

<template>
  <section class="hero-section">
    <!-- Carousel Background -->
    <div class="carousel-container">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div
          v-for="(image, index) in carouselImages"
          :key="index"
          class="carousel-slide"
          :style="{ backgroundImage: `url(${image})` }"
        />
      </div>

      <!-- Dark Overlay -->
      <div class="overlay" />
    </div>

    <!-- Hero Content -->
    <v-container class="hero-content">
      <v-row align="center" class="min-height-screen" justify="center">
        <v-col cols="12" lg="8" md="10">
          <div class="text-center">
            <h1 class="text-h2 text-md-h3 font-weight-bold mb-4 text-white">
              {{ data?.title }}
            </h1>

            <h2 class="text-h4 text-md-h4 text-grey-lighten-2 mb-6">
              {{ data?.subtitle }}
            </h2>

            <p class="text-h6 text-md-h6 text-grey-lighten-1 mb-8">
              {{ data?.description }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  z-index: 1;
  margin-top: -64px; /* Negative margin to cover navbar gap */
  padding-top: 64px; /* Padding to push content below navbar */
}

.min-height-screen {
  min-height: 100vh;
}

.carousel-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 1s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 3;
  height: 100%;
  margin: 0;
  padding: 0;
}



/* Text color adjustments for better contrast */
.text-white {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.text-grey-lighten-2 {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.text-grey-lighten-1 {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .carousel-controls {
    padding: 0 10px;
  }

  .carousel-btn {
    width: 40px !important;
    height: 40px !important;
  }

  .carousel-indicators {
    bottom: 20px;
  }

  .indicator {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .carousel-controls {
    display: none; /* Hide arrow controls on very small screens */
  }
}

/* Override Vuetify container padding to remove gaps */
.hero-content.v-container {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin: 0 !important;
  max-width: none !important;
}
</style>
