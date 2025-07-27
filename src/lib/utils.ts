import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function calculateProgress(completed: number, total: number): number {
  return Math.round((completed / total) * 100)
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 365) return "🔥"
  if (streak >= 100) return "⚡"
  if (streak >= 30) return "🌟"
  if (streak >= 7) return "✨"
  return "🎯"
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function generateLessonPath(unitId: string, lessonId: string): string {
  return `/learn/${unitId}/${lessonId}`
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function isLessonUnlocked(lessonIndex: number, completedLessons: number[]): boolean {
  if (lessonIndex === 0) return true
  return completedLessons.includes(lessonIndex - 1)
}

export function getNextLesson(currentIndex: number, totalLessons: number): number | null {
  return currentIndex + 1 < totalLessons ? currentIndex + 1 : null
}