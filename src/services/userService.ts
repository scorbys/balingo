import { getDatabase } from '@/lib/mongodb';
import { User, UserProgress } from '@/types';
import { ObjectId } from 'mongodb';

export class UserService {
  private async getUserCollection() {
    const db = await getDatabase();
    return db.collection<User>('users');
  }

  private async getProgressCollection() {
    const db = await getDatabase();
    return db.collection<UserProgress>('user_progress');
  }

  async createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const collection = await this.getUserCollection();
    const now = new Date();
    const newUser = {
      ...userData,
      level: 1,
      experience: 0,
      streak: 0,
      hearts: 5,
      gems: 0,
      createdAt: now,
      updatedAt: now
    };
    
    const result = await collection.insertOne(newUser);
    return { ...newUser, _id: result.insertedId };
  }

  async getUserById(id: string): Promise<User | null> {
    const collection = await this.getUserCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const collection = await this.getUserCollection();
    return await collection.findOne({ email });
  }

  async updateUser(id: string, updates: Partial<User>): Promise<boolean> {
    const collection = await this.getUserCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updates, 
          updatedAt: new Date() 
        } 
      }
    );
    return result.modifiedCount > 0;
  }

  async addExperience(userId: string, experience: number): Promise<User | null> {
    const collection = await this.getUserCollection();
    const user = await this.getUserById(userId);
    
    if (!user) return null;

    const newExperience = user.experience + experience;
    const newLevel = Math.floor(newExperience / 100) + 1; // 100 XP per level

    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          experience: newExperience,
          level: newLevel,
          updatedAt: new Date()
        }
      }
    );

    return await this.getUserById(userId);
  }

  async updateStreak(userId: string): Promise<boolean> {
    const collection = await this.getUserCollection();
    const user = await this.getUserById(userId);
    
    if (!user) return false;

    const today = new Date();
    const lastUpdate = new Date(user.updatedAt);
    const daysDiff = Math.floor((today.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));

    let newStreak = user.streak;
    if (daysDiff === 1) {
      // Continue streak
      newStreak = user.streak + 1;
    } else if (daysDiff > 1) {
      // Streak broken
      newStreak = 1;
    }
    // If daysDiff === 0, no change needed (same day)

    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          streak: newStreak,
          updatedAt: new Date()
        }
      }
    );

    return result.modifiedCount > 0;
  }

  // Progress tracking
  async saveProgress(userId: string, lessonId: string, score: number): Promise<UserProgress> {
    const collection = await this.getProgressCollection();
    const now = new Date();
    
    const existingProgress = await collection.findOne({
      userId: new ObjectId(userId),
      lessonId: new ObjectId(lessonId)
    });

    if (existingProgress) {
      // Update existing progress
      await collection.updateOne(
        { _id: existingProgress._id },
        {
          $set: {
            score: Math.max(existingProgress.score, score),
            completed: score >= 80, // 80% to pass
            completedAt: score >= 80 ? now : existingProgress.completedAt,
            attempts: existingProgress.attempts + 1,
            updatedAt: now
          }
        }
      );
      return await collection.findOne({ _id: existingProgress._id }) as UserProgress;
    } else {
      // Create new progress
      const newProgress: Omit<UserProgress, '_id'> = {
        userId: new ObjectId(userId),
        lessonId: new ObjectId(lessonId),
        completed: score >= 80,
        score,
        completedAt: score >= 80 ? now : undefined,
        attempts: 1,
        createdAt: now,
        updatedAt: now
      };
      
      const result = await collection.insertOne(newProgress);
      return { ...newProgress, _id: result.insertedId };
    }
  }

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    const collection = await this.getProgressCollection();
    return await collection.find({ userId: new ObjectId(userId) }).toArray();
  }

  async getLessonProgress(userId: string, lessonId: string): Promise<UserProgress | null> {
    const collection = await this.getProgressCollection();
    return await collection.findOne({
      userId: new ObjectId(userId),
      lessonId: new ObjectId(lessonId)
    });
  }
}