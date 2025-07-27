import { getDatabase } from '@/lib/mongodb';
import { Lesson, Exercise, ExerciseType } from '@/types';
import { ObjectId } from 'mongodb';

export class LessonService {
  private async getCollection() {
    const db = await getDatabase();
    return db.collection<Lesson>('lessons');
  }

  async getAllLessons(): Promise<Lesson[]> {
    const collection = await this.getCollection();
    return await collection.find({}).sort({ level: 1, order: 1 }).toArray();
  }

  async getLessonById(id: string): Promise<Lesson | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  async getLessonsByLevel(level: number): Promise<Lesson[]> {
    const collection = await this.getCollection();
    return await collection.find({ level }).sort({ order: 1 }).toArray();
  }

  async createLesson(lesson: Omit<Lesson, '_id' | 'createdAt' | 'updatedAt'>): Promise<Lesson> {
    const collection = await this.getCollection();
    const now = new Date();
    const newLesson = {
      ...lesson,
      createdAt: now,
      updatedAt: now
    };
    
    const result = await collection.insertOne(newLesson);
    return { ...newLesson, _id: result.insertedId };
  }

  async updateLesson(id: string, updates: Partial<Lesson>): Promise<boolean> {
    const collection = await this.getCollection();
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

  async deleteLesson(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  // Sample data initialization
  async initializeSampleLessons(): Promise<void> {
    const collection = await this.getCollection();
    const count = await collection.countDocuments();
    
    if (count === 0) {
      const sampleLessons: Omit<Lesson, '_id' | 'createdAt' | 'updatedAt'>[] = [
        {
          title: "Salam dan Perkenalan",
          description: "Belajar sapaan dasar dalam bahasa Bali",
          level: 1,
          order: 1,
          isLocked: false,
          exercises: [
            {
              type: ExerciseType.MULTIPLE_CHOICE,
              question: "Bagaimana cara mengucapkan 'Selamat pagi' dalam bahasa Bali?",
              options: ["Rahajeng semeng", "Rahajeng wengi", "Suksma", "Ampura"],
              correctAnswer: "Rahajeng semeng",
              explanation: "Rahajeng semeng adalah sapaan 'Selamat pagi' dalam bahasa Bali",
              balineseText: "ᬭᬳᬚᭂᬂ ᬲᭂᬫᭂᬂ",
              indonesianText: "Selamat pagi",
              latinText: "Rahajeng semeng"
            },
            {
              type: ExerciseType.TRANSLATE,
              question: "Terjemahkan: 'Suksma'",
              correctAnswer: "Terima kasih",
              explanation: "Suksma berarti 'Terima kasih' dalam bahasa Bali",
              balineseText: "ᬲᬸᬓ᭄ᬲ᭄ᬫ",
              indonesianText: "Terima kasih",
              latinText: "Suksma"
            }
          ]
        },
        {
          title: "Angka dan Waktu",
          description: "Pelajari angka dan ungkapan waktu dalam bahasa Bali",
          level: 1,
          order: 2,
          isLocked: true,
          exercises: [
            {
              type: ExerciseType.MULTIPLE_CHOICE,
              question: "Bagaimana cara mengucapkan angka '5' dalam bahasa Bali?",
              options: ["Dasa", "Lima", "Panca", "Enem"],
              correctAnswer: "Panca",
              explanation: "Panca adalah angka 5 dalam bahasa Bali",
              balineseText: "ᬧᬜ᭄ᬘ",
              indonesianText: "Lima",
              latinText: "Panca"
            }
          ]
        }
      ];

      for (const lesson of sampleLessons) {
        await this.createLesson(lesson);
      }
    }
  }
}