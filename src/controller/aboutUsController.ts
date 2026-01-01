import axios from 'axios'
import { ref, type Ref } from 'vue'

export interface StudioInfo {
  foundedYear: string
  location: string
  university: string
  campus: string
  focus: string
  stats: {
    teamMembers: string
    region: string
    culturalStories: string
  }
}

export interface StorySection {
  title: string
  subtitle: string
  content: string[]
}

export interface TeamMemberSocial {
  github?: string
  linkedin?: string
  email?: string
  behance?: string
  instagram?: string
}

export interface TeamMember {
  name: string
  role: string
  description: string
  avatar: string
  fallbackIcon: string
  skills: string[]
  social: TeamMemberSocial
}

export interface Achievement {
  title: string
  description: string
  icon: string
  color: string
}

export interface Contact {
  email: string
  phone: string
  address: string
}

export interface SocialMedia {
  platform: string
  icon: string
  url: string
  color: string
}

export interface Meta {
  version: string
  lastUpdated: string
  author: string
}

export interface AboutUsData {
  studioInfo: StudioInfo
  storySection: StorySection
  teamMembers: TeamMember[]
  achievements: Achievement[]
  contact: Contact
  socialMedia: SocialMedia[]
  meta: Meta
}

export interface AboutUsController {
  data: Ref<AboutUsData | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  fetchAboutUsData: () => Promise<void>
}

export function useAboutUsController(): AboutUsController {
  const data = ref<AboutUsData | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchAboutUsData = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const response = await axios.get<AboutUsData>('/data/about-us.json', {
        timeout: 5000, // 5 second timeout
        headers: {
          'Content-Type': 'application/json',
        },
      })

      data.value = response.data

      console.log('About Us data loaded successfully')
    } catch (error_) {
      console.error('Failed to fetch About Us data:', error_)
      error.value = error_ instanceof Error ? error_.message : 'Unknown error occurred'

      data.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    fetchAboutUsData,
  }
}
