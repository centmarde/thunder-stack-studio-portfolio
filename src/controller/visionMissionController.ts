import axios from 'axios'
import { ref, type Ref } from 'vue'

export interface VisionMission {
  title: string
  statement: string
  icon: string
  color: string
}

export interface CoreValue {
  title: string
  description: string
  icon: string
  color: string
}

export interface CallToAction {
  title: string
  subtitle: string
  buttonText: string
  buttonIcon: string
}

export interface Meta {
  version: string
  lastUpdated: string
  author: string
}

export interface VisionMissionData {
  vision: VisionMission
  mission: VisionMission
  values: CoreValue[]
  callToAction: CallToAction
  meta: Meta
}

export interface VisionMissionController {
  data: Ref<VisionMissionData | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  fetchVisionMissionData: () => Promise<void>
}

export function useVisionMissionController(): VisionMissionController {
  const data = ref<VisionMissionData | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchVisionMissionData = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const response = await axios.get<VisionMissionData>('/data/vision-mission.json', {
        timeout: 5000, // 5 second timeout
        headers: {
          'Content-Type': 'application/json',
        },
      })

      data.value = response.data

      console.log('Vision Mission data loaded successfully')
    } catch (error_) {
      console.error('Failed to fetch Vision Mission data:', error_)
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
    fetchVisionMissionData,
  }
}
