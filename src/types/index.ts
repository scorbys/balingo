import { ObjectId } from 'mongodb';

// User Types
export interface User {
  _id?: ObjectId;
  email: string;
  name: string;
  avatar?: string;
  level: number;
  experience: number;
  streak: number;
  hearts: number;
  gems: number;
  createdAt: Date;
  updatedAt: Date;
}

// Lesson Types
export interface Lesson {
  _id?: ObjectId;
  title: string;
  description: string;
  level: number;
  order: number;
  isLocked: boolean;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
}

// Exercise Types
export interface Exercise {
  _id?: ObjectId;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  audioUrl?: string;
  imageUrl?: string;
  balineseText?: string;
  indonesianText?: string;
  latinText?: string;
}

export enum ExerciseType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRANSLATE = 'translate',
  LISTEN = 'listen',
  SPEAK = 'speak',
  MATCH = 'match',
  FILL_BLANK = 'fill_blank'
}

// Progress Types
export interface UserProgress {
  _id?: ObjectId;
  userId: ObjectId;
  lessonId: ObjectId;
  completed: boolean;
  score: number;
  completedAt?: Date;
  attempts: number;
  createdAt: Date;
  updatedAt: Date;
}

// Dictionary Types
export interface DictionaryEntry {
  _id?: ObjectId;
  balinese: string;
  indonesian: string;
  latin: string;
  category: string;
  level: number;
  audioUrl?: string;
  examples: {
    balinese: string;
    indonesian: string;
    latin: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}