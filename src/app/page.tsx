'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { FeatureSection } from '@/components/sections/feature-section'
import { StatsSection } from '@/components/sections/stats-section'
import { 
  BookOpen, 
  Code2, 
  Zap, 
  Trophy, 
  ArrowRight,
  Play,
  Star
} from 'lucide-react'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <Badge variant="secondary" className="mb-4">
                <Star className="w-4 h-4 mr-1" />
                Interactive Learning Platform
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              Master Programming Scripts
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Learn programming languages through interactive exercises, real-world projects, 
              and personalized feedback. Start your coding journey today!
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="group" asChild>
                <Link href="/lessons">
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link href="/playground">
                  <Code2 className="w-5 h-5 mr-2" />
                  Try Playground
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Quick Start Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: BookOpen,
                title: "Interactive Lessons",
                description: "Step-by-step tutorials with hands-on coding exercises",
                href: "/lessons"
              },
              {
                icon: Code2,
                title: "Code Playground",
                description: "Practice coding in a safe, interactive environment",
                href: "/playground"
              },
              {
                icon: Trophy,
                title: "Track Progress",
                description: "Monitor your learning journey with detailed analytics",
                href: "/progress"
              }
            ].map((card, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <Link href={card.href}>
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <card.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {card.title}
                      </CardTitle>
                      <CardDescription>
                        {card.description}
                      </CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <StatsSection />
      <FeatureSection />
    </div>
  )
}