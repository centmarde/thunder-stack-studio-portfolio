<script lang="ts" setup>
import { computed } from 'vue'

interface StudioInfo {
  foundedYear: string
  location: string
  focus: string
}

interface TeamMember {
  name: string
  role: string
  description: string
  fallbackIcon: string
}

interface AboutUsData {
  studioInfo: StudioInfo
  teamMembers: TeamMember[]
}

interface Props {
  data: AboutUsData | null
}

const props = defineProps<Props>()

// Calculate responsive column sizes based on data count
const teamMembersCount = computed(() => props.data?.teamMembers?.length || 0)

const getTeamCardCols = computed(() => {
  const count = Math.min(teamMembersCount.value, 4) // Max 4 items shown
  switch (count) {
    case 1: return { cols: 12, sm: 12, md: 8, lg: 6 } // Single card, centered
    case 2: return { cols: 12, sm: 12, md: 6, lg: 6 } // Two cards, 50% each
    case 3: return { cols: 12, sm: 6, md: 4, lg: 4 } // Three cards
    case 4:
    default: return { cols: 12, sm: 6, md: 6, lg: 3 } // Four cards (default)
  }
})
</script>

<template>
  <section v-if="data" id="about" class="about-section py-16">
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
                    <v-list-item-subtitle>{{ data.studioInfo.foundedYear }}</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-map-marker">
                    <v-list-item-title>Location</v-list-item-title>
                    <v-list-item-subtitle>{{ data.studioInfo.location }}</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item prepend-icon="mdi-gamepad-variant">
                    <v-list-item-title>Focus</v-list-item-title>
                    <v-list-item-subtitle>{{ data.studioInfo.focus }}</v-list-item-subtitle>
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
          v-for="(member, index) in data.teamMembers.slice(0, 4)"
          :key="member.name"
          v-bind="getTeamCardCols"
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


    </v-container>
  </section>
</template>

<style scoped>
.about-section {
  background: linear-gradient(135deg, rgba(63, 81, 181, 0.02) 0%, rgba(118, 136, 224, 0.05) 100%);
}

.team-card-preview {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.team-card-preview:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12) !important;
}
</style>
