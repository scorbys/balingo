// app/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  PlayCircle, 
  BookOpen, 
  Award, 
  Users, 
  Calendar,
  Star,
  Trophy,
  Target,
  Brain,
  Clock
} from 'lucide-react';
import Link from 'next/link';

interface LessonCard {
  id: string;
  title: string;
  description: string;
  progress: number;
  isLocked: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

const lessons: LessonCard[] = [
  {
    id: '1',
    title: 'Aksara Bali Dasar',
    description: 'Belajar huruf dasar aksara Bali dan cara penulisannya',
    progress: 85,
    isLocked: false,
    difficulty: 'beginner',
    estimatedTime: '15 menit'
  },
  {
    id: '2',
    title: 'Sapaan Sehari-hari',
    description: 'Pelajari cara menyapa dalam bahasa Bali',
    progress: 60,
    isLocked: false,
    difficulty: 'beginner',
    estimatedTime: '10 menit'
  },
  {
    id: '3',
    title: 'Angka dan Bilangan',
    description: 'Mengenal angka 1-100 dalam bahasa Bali',
    progress: 30,
    isLocked: false,
    difficulty: 'beginner',
    estimatedTime: '20 menit'
  },
  {
    id: '4',
    title: 'Keluarga dan Hubungan',
    description: 'Vocabulary tentang anggota keluarga',
    progress: 0,
    isLocked: true,
    difficulty: 'intermediate',
    estimatedTime: '25 menit'
  },
  {
    id: '5',
    title: 'Upacara Adat',
    description: 'Istilah-istilah dalam upacara adat Bali',
    progress: 0,
    isLocked: true,
    difficulty: 'advanced',
    estimatedTime: '30 menit'
  }
];

const achievements = [
  { icon: Trophy, title: 'Pemula Handal', description: 'Selesaikan 5 pelajaran pertama' },
  { icon: Target, title: 'Konsisten', description: 'Belajar 7 hari berturut-turut' },
  { icon: Star, title: 'Sempurna', description: 'Dapatkan skor 100% dalam quiz' }
];

export default function HomePage() {
  const [userStats] = useState({
    streak: 7,
    totalXp: 1250,
    level: 5,
    completedLessons: 12
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Balingo</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/learn" className="text-gray-700 hover:text-blue-600 font-medium">
                Belajar
              </Link>
              <Link href="/stories" className="text-gray-700 hover:text-blue-600 font-medium">
                Cerita
              </Link>
              <Link href="/leaderboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Peringkat
              </Link>
              <Link href="/profile" className="text-gray-700 hover:text-blue-600 font-medium">
                Profil
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-orange-600">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">{userStats.totalXp}</span>
              </div>
              <Button size="sm">Masuk</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Belajar Bahasa Bali
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              dengan Menyenangkan
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Pelajari bahasa dan aksara Bali melalui pelajaran interaktif, cerita menarik, 
            dan latihan yang dirancang khusus untuk pemula hingga mahir.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 text-lg">
            <PlayCircle className="w-5 h-5 mr-2" />
            Mulai Belajar Gratis
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Learning Path */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Jalur Pembelajaran</h3>
              <Badge variant="secondary" className="text-sm">
                Level {userStats.level}
              </Badge>
            </div>

            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <Card 
                  key={lesson.id} 
                  className={`transition-all duration-200 hover:shadow-lg ${
                    lesson.isLocked 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'cursor-pointer hover:scale-[1.02]'
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          lesson.isLocked ? 'bg-gray-300' : getDifficultyColor(lesson.difficulty)
                        }`}>
                          {lesson.isLocked ? (
                            <span className="text-gray-500 font-bold">{index + 1}</span>
                          ) : (
                            <span className="text-white font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{lesson.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getDifficultyColor(lesson.difficulty)} text-white border-0`}
                            >
                              {lesson.difficulty}
                            </Badge>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {lesson.estimatedTime}
                            </div>
                          </div>
                        </div>
                      </div>
                      {!lesson.isLocked && (
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        >
                          {lesson.progress > 0 ? 'Lanjutkan' : 'Mulai'}
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-3">
                      {lesson.description}
                    </CardDescription>
                    {!lesson.isLocked && lesson.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{lesson.progress}%</span>
                        </div>
                        <Progress value={lesson.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Statistik Anda
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                    <span className="text-sm">Streak</span>
                  </div>
                  <span className="font-bold text-orange-500">{userStats.streak} hari</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                    <span className="text-sm">Total XP</span>
                  </div>
                  <span className="font-bold">{userStats.totalXp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">Pelajaran Selesai</span>
                  </div>
                  <span className="font-bold">{userStats.completedLessons}</span>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Pencapaian
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <achievement.icon className="w-8 h-8 text-yellow-500" />
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-500" />
                  Latihan Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Quiz Harian
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Flashcard
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Tantang Teman
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Mengapa Memilih Balingo?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Pembelajaran Interaktif</h4>
              <p className="text-gray-600">
                Metode pembelajaran yang menyenangkan dengan gamifikasi dan latihan interaktif
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Komunitas Aktif</h4>
              <p className="text-gray-600">
                Bergabung dengan ribuan pembelajar bahasa Bali dari seluruh dunia
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Sertifikat Resmi</h4>
              <p className="text-gray-600">
                Dapatkan sertifikat keahlian bahasa Bali yang diakui secara resmi
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}