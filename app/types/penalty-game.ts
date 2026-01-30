export interface GameSession{
    session_id: number
    started_at: string
    goals_scored?: number
    total_shots?: number
}

export interface GameResult {
    session: {
        goals_scored: number
        total_shots: number
        accuracy: number
        points_earned: number
    }

    stats: {
        total_points: number
        total_goals: number
        games_played: number
        best_score: number
        current_streak: number
    }
}

export interface GameStats {
    total_points: number
    total_goals: number
    total_shots: number
    games_played: number
    best_score: number
    accuracy: number
    current_streak: number
    best_streak: number
    rank: number | null
}

export interface LeaderboardEntry {
    rank: number
    user: {
        id: number
        name: string
    }
    total_points: number
    total_goals: number
    games_played: number
    best_score:number
    accuracy: number
}

export interface GameHistory {
    id: number
    goals_scored: number
    total_shots: number
    points_earned: number
    accuracy_percentage: number
    started_at: string
    ended_at: string
}

export interface Pagination {
    current_page: number
    last_page: number
    per_page: number
    total: number
}