export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  streak: number
  totalXP: number
  currentLevel: number
  gems: number
  hearts: number
  completedLessons: number[]
  achievements: Achievement[]
  createdAt: Date
  lastActiveAt: Date
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: Date
  type: 'streak' | 'lesson' | 'xp' | 'special'
}

export interface Course {
  id: string
  title: string
  description: string
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  units: Unit[]
  totalLessons: number
  estimatedDuration: string
}

export interface Unit {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  isLocked: boolean
  completedLessons: number
  totalLessons: number
}

export interface Lesson {
  id: string
  title: string
  type: LessonType
  exercises: Exercise[]
  xpReward: number
  isCompleted: boolean
  isLocked: boolean
  difficulty: number
  estimatedTime: number
}

export type LessonType = 
  | 'basic_vocab'
  | 'translate'
  | 'match_pairs'
  | 'fill_blanks'
  | 'listening'
  | 'speaking'
  | 'story'
  | 'grammar'

export interface Exercise {
  id: string
  type: ExerciseType
  question: string
  questionAudio?: string
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
  hints?: string[]
  baliScript?: string
  latinScript?: string
}

export type ExerciseType =
  | 'multiple_choice'
  | 'translate_text'
  | 'match_pairs'
  | 'fill_blank'
  | 'arrange_words'
  | 'listen_and_type'
  | 'speak_phrase'
  | 'select_image'

export interface UserProgress {
  userId: string
  courseId: string
  currentUnit: number
  currentLesson: number
  completedExercises: string[]
  streak: number
  totalXP: number
  weeklyXP: number
  monthlyXP: number
  lastStudyDate: Date
}

export interface LeaderboardEntry {
  userId: string
  userName: string
  userAvatar?: string
  weeklyXP: number
  rank: number
  isCurrentUser?: boolean
}

export interface StudySession {
  id: string
  userId: string
  startTime: Date
  endTime?: Date
  exercisesCompleted: number
  xpEarned: number
  accuracy: number
  lessonId: string
}

// Bali-specific types
export interface BaliWord {
  id: string
  baliScript: string
  latinScript: string
  indonesian: string
  english: string
  pronunciation: string
  audioUrl?: string
  category: WordCategory
  difficulty: number
  examples: BaliExample[]
}

export interface BaliExample {
  baliScript: string
  latinScript: string
  indonesian: string
  english: string
  audioUrl?: string
}

export type WordCategory =
  | 'greetings'
  | 'family'
  | 'numbers'
  | 'colors'
  | 'food'
  | 'animals'
  | 'body_parts'
  | 'time'
  | 'weather'
  | 'emotions'
  | 'actions'
  | 'places'
  | 'nature'
  | 'religion'
  | 'culture'

export interface BaliGrammarRule {
  id: string
  title: string
  description: string
  examples: BaliExample[]
  exercises: string[] // Exercise IDs
  difficulty: number
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Component Props types
export interface LessonCardProps {
  lesson: Lesson
  isLocked: boolean
  isCompleted: boolean
  onClick: () => void
}

export interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
}

export interface ExerciseComponentProps {
  exercise: Exercise
  onAnswer: (answer: string | string[], isCorrect: boolean) => void
  onNext: () => void
  showResult: boolean
  isCorrect?: boolean
}

// Store types (if using state management)
export interface AppState {
  user: User | null
  currentCourse: Course | null
  userProgress: UserProgress | null
  isLoading: boolean
  error: string | null
}

export interface LessonState {
  currentExercise: number
  totalExercises: number
  correctAnswers: number
  wrongAnswers: number
  xpEarned: number
  hearts: number
  isCompleted: boolean
}