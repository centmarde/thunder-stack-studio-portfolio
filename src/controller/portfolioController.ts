import axios from 'axios'
import { ref, type Ref } from 'vue'

export interface FeaturedGame {
  id: number
  title: string
  subtitle: string
  description: string
  status: 'Released' | 'In Development' | 'Prototype' | 'Concept'
  category: string
  platforms: string[]
  culturalElements: string[]
  technologies: string[]
  images: {
    thumbnail: string
    screenshots: string[]
  }
  fallbackIcon: string
  primaryColor: string
  progress: number
  releaseDate: string
  downloads?: number
  rating?: number
}

export interface Achievement {
  id: number
  title: string
  organization: string
  year: number
  description: string
  project: string
  icon: string
  color: string
  category: 'Award' | 'Recognition' | 'Milestone' | 'Partnership' | 'Community' | 'Innovation'
  certificateImage?: string
}

export interface Statistics {
  totalDownloads: number
  activeProjects: number
  averageRating: number
  communityMembers: number
  culturalElementsPreserved: number
  educationalPartnerships: number
}

export interface Category {
  name: string
  description: string
  icon: string
  color: string
}

export interface UpcomingRelease {
  title: string
  releaseWindow: string
  status: string
}

export interface StudioPortfolio {
  title: string
  subtitle: string
  description: string
}

export interface Meta {
  version: string
  lastUpdated: string
  author: string
}

export interface PortfolioData {
  studioPortfolio: StudioPortfolio
  featuredGames: FeaturedGame[]
  achievements: Achievement[]
  statistics: Statistics
  categories: Category[]
  upcomingReleases: UpcomingRelease[]
  meta: Meta
}

export interface PortfolioController {
  data: Ref<PortfolioData | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  fetchPortfolioData: () => Promise<void>
}

export function usePortfolioController(): PortfolioController {
  const data = ref<PortfolioData | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchPortfolioData = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const response = await axios.get<PortfolioData>('/data/portfolio.json', {
        timeout: 5000, // 5 second timeout
        headers: {
          'Content-Type': 'application/json',
        },
      })

      data.value = response.data

      console.log('Portfolio data loaded successfully')
    } catch (error_) {
      console.error('Failed to fetch Portfolio data:', error_)
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
    fetchPortfolioData,
  }
}
