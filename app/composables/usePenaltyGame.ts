import type { 
  GameSession,
  GameResult,
  LeaderboardEntry,
  GameHistory,
  GameStats,
  Pagination
} from '~/types/penalty-game'

export const usePenaltyGame = () => {
  const config = useRuntimeConfig()
  const { $api } = useNuxtApp()

  // mulai game
  const startGame = async () => {
    try {
      const response = await $api('/penalty-game/start', {
        method: 'POST'
      })
      return response.data
    } catch (error) {
      console.error('Failed to start game:', error)
      throw error
    }
  }

  // Record gol apa kaga
  const recordShot = async (sessionId: number, isGoal: boolean) => {
    try {
      const response = await $api('/penalty-game/shot', {
        method: 'POST',
        body: {
          session_id: sessionId,
          is_goal: isGoal
        }
      })
      return response.data
    } catch (error) {
      console.error('Failed to record shot:', error)
      throw error
    }
  }

  // sesi end game
  const endGame = async (sessionId: number) => {
    try {
      const response = await $api('/penalty-game/end', {
        method: 'POST',
        body: {
          session_id: sessionId
        }
      })
      return response.data
    } catch (error) {
      console.error('Failed to end game:', error)
      throw error
    }
  }

  // Get leaderboard
  const getLeaderboard = async (page: number = 1, perPage: number = 10) => {
    try {
      const response = await $api('/penalty-game/leaderboard', {
        params: {
          page,
          per_page: perPage
        }
      })
      return response
    } catch (error) {
      console.error('Failed to get leaderboard:', error)
      throw error
    }
  }

  // Get user stats
  const getUserStats = async () => {
    try {
      const response = await $api('/penalty-game/stats')
      return response.data
    } catch (error) {
      console.error('Failed to get user stats:', error)
      throw error
    }
  }

  // Get user game history
  const getUserHistory = async (page: number = 1, perPage: number = 10) => {
    try {
      const response = await $api('/penalty-game/history', {
        params: {
          page,
          per_page: perPage
        }
      })
      return response
    } catch (error) {
      console.error('Failed to get game history:', error)
      throw error
    }
  }

  return {
    startGame,
    recordShot,
    endGame,
    getLeaderboard,
    getUserStats,
    getUserHistory
  }
}