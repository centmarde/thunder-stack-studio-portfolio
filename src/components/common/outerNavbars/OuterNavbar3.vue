<script lang="ts" setup>
  import type { CTAButton, NavigationItem, UIConfig, LogoConfig } from '@/controller/landingController'
  import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useDisplay } from 'vuetify'
  import { useTheme } from '@/composables/useTheme'

  interface Props {
    config?: UIConfig | null
  }

  const props = defineProps<Props>()
  const router = useRouter()

  // Vuetify display composable for responsiveness
  const { mobile, mdAndUp, lgAndUp, xs, sm, md } = useDisplay()

  // Mobile drawer state
  const drawer = ref(false)
  const isScrolled = ref(false)
  const lastScrollY = ref(0)

  // Theme management
  const { toggleTheme: handleToggleTheme, getCurrentTheme, isLoadingTheme } = useTheme()

  const navbarConfig = computed(() => props.config?.navbar)

  // Theme toggle computed properties
  const currentTheme = computed(() => getCurrentTheme())
  const themeIcon = computed(() => {
    return currentTheme.value === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night'
  })
  const themeTooltip = computed(() => {
    return `Switch to ${currentTheme.value === 'dark' ? 'light' : 'dark'} theme`
  })

  // Scroll handler for floating effect and auto-close drawer
  const handleScroll = () => {
    const currentScrollY = window.scrollY
    isScrolled.value = currentScrollY > 20

    // Auto-close drawer when scrolling down on mobile and tablets
    if (!lgAndUp.value && drawer.value) {
      if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
        drawer.value = false
      }
    }

    lastScrollY.value = currentScrollY
  }

  // Watch for drawer state changes and close on route change
  watch(() => router.currentRoute.value, () => {
    if (drawer.value) {
      drawer.value = false
    }
  })

  // Close drawer when switching from mobile to desktop
  watch(lgAndUp, (newLgAndUp, oldLgAndUp) => {
    if (!oldLgAndUp && newLgAndUp && drawer.value) {
      drawer.value = false
    }
  })

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  function toggleTheme () {
    handleToggleTheme()
  }

  function handleNavigation (item: NavigationItem) {
    // Close drawer on mobile after navigation
    drawer.value = false

    switch (item.action) {
      case 'scroll': {
        scrollToSection(item.target)
        break
      }
      case 'navigate': {
        router.push(item.target)
        break
      }
      case 'external': {
        window.open(item.target, '_blank', 'noopener,noreferrer')
        break
      }
    }
  }

  function handleCTAAction (button: CTAButton) {
    // Close drawer on mobile after CTA action
    drawer.value = false

    switch (button.action) {
      case 'scroll': {
        scrollToSection(button.target)
        break
      }
      case 'navigate': {
        router.push(button.target)
        break
      }
      case 'external': {
        window.open(button.target, '_blank', 'noopener,noreferrer')
        break
      }
    }
  }

  function scrollToSection (sectionId: string) {
    // If we're not on the home page, navigate there first
    if (router.currentRoute.value.path !== '/') {
      router.push('/').then(() => {
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.querySelector(`#${sectionId}`)
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
        }, 100)
      })
    } else {
      // We're already on home page, just scroll
      const element = document.querySelector(`#${sectionId}`)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
  }
</script>

<template>
  <div v-if="config?.showNavbar && navbarConfig">
    <!-- Always Fixed Navbar at Top -->
    <v-app-bar
      :elevation="isScrolled ? 12 : 8"
      :height="xs ? 56 : 64"
      rounded="pill"
      fixed
      class="mx-auto px-2 navbar-fixed"
      :style="{
        top: xs ? '8px' : '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: xs ? '96%' : '92%',
        maxWidth: '1200px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 9999
      }"

    >
      <!-- Logo Section with Badge -->
      <template #prepend>
        <div class="d-flex align-center">

            <!-- Logo Image with Icon Fallback -->
            <template v-if="navbarConfig.logo?.src">
              <v-img
                :src="navbarConfig.logo.src"
                :alt="navbarConfig.logo.alt"
                :width="navbarConfig.logo.width || 42"
                :height="navbarConfig.logo.height || 42"
                contain
              >
                <template #error>
                  <!-- Fallback to avatar with icon if image fails to load -->
                  <v-avatar
                    :color="navbarConfig.color"
                    size="42"
                  >
                    <v-icon
                      :icon="navbarConfig.icon"
                      size="22"
                      color="white"
                    />
                  </v-avatar>
                </template>
              </v-img>
            </template>
            <template v-else>
              <!-- Default avatar with icon when no logo is configured -->
              <v-avatar
                :color="navbarConfig.color"
                size="42"
              >
                <v-icon
                  :icon="navbarConfig.icon"
                  size="22"
                  color="white"
                />
              </v-avatar>
            </template>


          <!-- Hide title on mobile to minimize navbar -->
          <div class="d-flex flex-column ms-2 d-none d-md-flex">
            <span class="text-subtitle-1 font-weight-bold text-primary">
              {{ navbarConfig.title }}
            </span>
            <span class="text-caption text-medium-emphasis">
              Cultural Gaming Excellence
            </span>
          </div>
        </div>
      </template>

      <v-spacer />

      <!-- Desktop Navigation - Hidden on mobile and small tablets -->
      <template #append>
        <div class="d-flex align-center" v-if="lgAndUp">
          <!-- Navigation Tab Buttons -->
          <div class="d-flex align-center me-4">
            <v-btn-toggle
              variant="outlined"
              rounded="pill"
              density="comfortable"
              class="navigation-tabs"
            >
              <v-btn
                variant="text"
                size="default"
                prepend-icon="mdi-gamepad-variant"
                @click="scrollToSection('features')"
              >
                <span class="d-none d-lg-inline">Home</span>
                <span class="d-lg-none">Home</span>
              </v-btn>

              <v-btn
                variant="text"
                size="default"
                prepend-icon="mdi-compass-outline"
                @click="scrollToSection('vision-mission')"
              >
                <span class="d-none d-lg-inline">Vision</span>
                <span class="d-lg-none">Vision</span>
              </v-btn>

              <v-btn
                variant="text"
                size="default"
                prepend-icon="mdi-account-group"
                @click="scrollToSection('about')"
              >
                <span class="d-none d-lg-inline">About</span>
                <span class="d-lg-none">About</span>
              </v-btn>

              <v-btn
                variant="text"
                size="default"
                prepend-icon="mdi-briefcase-variant"
                @click="scrollToSection('portfolio')"
              >
                <span class="d-none d-lg-inline">Portfolio</span>
                <span class="d-lg-none">Works</span>
              </v-btn>
            </v-btn-toggle>
          </div>

          <!-- Theme Toggle Menu -->
          <v-menu location="bottom">
            <template #activator="{ props: menuProps }">
              <v-btn
                v-bind="menuProps"
                :loading="isLoadingTheme"
                variant="outlined"
                rounded="pill"
                size="large"
                class="me-3"
                :prepend-icon="themeIcon"
              >
                <span>Theme</span>
              </v-btn>
            </template>

            <v-card width="200" class="mt-2">
              <v-list density="compact">
                <v-list-item
                  prepend-icon="mdi-white-balance-sunny"
                  title="Light Mode"
                  :active="currentTheme === 'light'"
                  @click="currentTheme === 'dark' && toggleTheme()"
                />
                <v-list-item
                  prepend-icon="mdi-weather-night"
                  title="Dark Mode"
                  :active="currentTheme === 'dark'"
                  @click="currentTheme === 'light' && toggleTheme()"
                />
              </v-list>
            </v-card>
          </v-menu>

          <!-- CTA Button -->
         <!--  <v-btn
            v-if="navbarConfig.ctaButton"
            :color="navbarConfig.ctaButton.color"
            variant="elevated"
            size="large"
            rounded="pill"
            class="px-6"
            prepend-icon="mdi-rocket-launch-outline"
            @click="handleCTAAction(navbarConfig.ctaButton)"
          >
            {{ navbarConfig.ctaButton.label }}
            <v-icon
              end
              icon="mdi-arrow-right"
              class="ms-1"
            />
          </v-btn> -->
        </div>

        <!-- Mobile Menu Button -->
        <v-btn
          v-if="!lgAndUp"
          icon="mdi-menu"
          variant="text"
          :size="xs ? 'default' : 'large'"
          @click="drawer = !drawer"
        />
      </template>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :temporary="!lgAndUp"
      :permanent="false"
      location="start"
      :width="280"
      :scrim="true"
      :elevation="24"
      absolute
      class="pa-0"
      style="position: fixed !important; z-index: 1100 !important; top: 0 !important; left: 0 !important; height: 100vh !important;"
    >
      <!-- Drawer Header with Logo and Title -->
      <template #prepend>
        <v-card flat class="px-4 py-6">
          <div class="d-flex align-center">
            <v-badge
              content="V3"
              color="success"
              dot
              offset-x="8"
              offset-y="8"
              class="me-3"
            >
              <!-- Logo Image with Icon Fallback -->
              <template v-if="navbarConfig.logo?.src">
                <v-img
                  :src="navbarConfig.logo.src"
                  :alt="navbarConfig.logo.alt"
                  :width="navbarConfig.logo.width || 48"
                  :height="navbarConfig.logo.height || 48"
                  contain
                >
                  <template #error>
                    <!-- Fallback to avatar with icon if image fails to load -->
                    <v-avatar
                      :color="navbarConfig.color"
                      size="48"
                    >
                      <v-icon
                        :icon="navbarConfig.icon"
                        size="24"
                        color="white"
                      />
                    </v-avatar>
                  </template>
                </v-img>
              </template>
              <template v-else>
                <!-- Default avatar with icon when no logo is configured -->
                <v-avatar
                  :color="navbarConfig.color"
                  size="48"
                >
                  <v-icon
                    :icon="navbarConfig.icon"
                    size="24"
                    color="white"
                  />
                </v-avatar>
              </template>
            </v-badge>

            <div class="d-flex flex-column">
              <span class="text-h6 font-weight-bold text-primary">
                {{ navbarConfig.title }}
              </span>
              <span class="text-caption text-medium-emphasis">
                Cultural Gaming Excellence
              </span>
            </div>
          </div>

          <!-- Close Button -->
          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            class="position-absolute"
            style="top: 16px; right: 16px;"
            @click="drawer = false"
          />
        </v-card>
        <v-divider />
      </template>

      <!-- Navigation List -->
      <v-list nav class="py-0">
        <!-- Navigation Items -->
        <v-list-item
          prepend-icon="mdi-gamepad-variant"
          title="Games"
          subtitle="View our game features"
          rounded="xl"
          class="ma-2"
          @click="scrollToSection('features')"
        />

        <v-list-item
          prepend-icon="mdi-compass-outline"
          title="Vision & Mission"
          subtitle="Our goals and values"
          rounded="xl"
          class="ma-2"
          @click="scrollToSection('vision-mission')"
        />

        <v-list-item
          prepend-icon="mdi-account-group"
          title="About Us"
          subtitle="Meet our team"
          rounded="xl"
          class="ma-2"
          @click="scrollToSection('about')"
        />

        <v-list-item
          prepend-icon="mdi-briefcase-variant"
          title="Portfolio"
          subtitle="Our works & achievements"
          rounded="xl"
          class="ma-2"
          @click="scrollToSection('portfolio')"
        />

        <v-divider class="my-2" />

        <!-- Theme Toggle -->
        <v-list-group value="Theme">
          <template #activator="{ props: activatorProps }">
            <v-list-item
              v-bind="activatorProps"
              :prepend-icon="themeIcon"
              title="Theme"
              :subtitle="`Current: ${currentTheme === 'dark' ? 'Dark' : 'Light'} Mode`"
              rounded="xl"
              class="ma-2"
            />
          </template>

          <v-list-item
            prepend-icon="mdi-white-balance-sunny"
            title="Light Mode"
            :active="currentTheme === 'light'"
            rounded="xl"
            class="ma-2 ms-4"
            @click="currentTheme === 'dark' && toggleTheme()"
          />
          <v-list-item
            prepend-icon="mdi-weather-night"
            title="Dark Mode"
            :active="currentTheme === 'dark'"
            rounded="xl"
            class="ma-2 ms-4"
            @click="currentTheme === 'light' && toggleTheme()"
          />
        </v-list-group>
      </v-list>

      <!-- CTA Button at Bottom -->
      <template #append>
        <v-card flat class="pa-4">
        <!--   <v-btn
            v-if="navbarConfig.ctaButton"
            :color="navbarConfig.ctaButton.color"
            variant="elevated"
            size="large"
            rounded="pill"
            block
            prepend-icon="mdi-rocket-launch-outline"
            @click="handleCTAAction(navbarConfig.ctaButton)"
          >
            {{ navbarConfig.ctaButton.label }}
            <v-icon
              end
              icon="mdi-arrow-right"
              class="ms-1"
            />
          </v-btn> -->
        </v-card>
      </template>
    </v-navigation-drawer>

  </div>
</template>

<style scoped>
.navigation-tabs {
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
  background: rgba(var(--v-theme-surface), 0.8);
  backdrop-filter: blur(8px);
}

.navigation-tabs .v-btn {
  transition: all 0.2s ease-in-out;
  border: none !important;
}

.navigation-tabs .v-btn:hover {
  background: rgba(var(--v-theme-primary), 0.1);
  transform: translateY(-1px);
}

.navigation-tabs .v-btn.v-btn--active {
  background: rgba(var(--v-theme-primary), 0.15);
  color: rgb(var(--v-theme-primary));
}

.navbar-fixed {
  position: fixed !important;
}
</style>
