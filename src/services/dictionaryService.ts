import { getDatabase } from '@/lib/mongodb';
import { DictionaryEntry } from '@/types';
import { ObjectId } from 'mongodb';

export class DictionaryService {
  private async getCollection() {
    const db = await getDatabase();
    return db.collection<DictionaryEntry>('dictionary');
  }

  async searchWords(query: string, limit: number = 20): Promise<DictionaryEntry[]> {
    const collection = await this.getCollection();
    const searchRegex = new RegExp(query, 'i');
    
    return await collection.find({
      $or: [
        { balinese: searchRegex },
        { indonesian: searchRegex },
        { latin: searchRegex }
      ]
    }).limit(limit).toArray();
  }

  async getWordsByCategory(category: string): Promise<DictionaryEntry[]> {
    const collection = await this.getCollection();
    return await collection.find({ category }).sort({ balinese: 1 }).toArray();
  }

  async getWordsByLevel(level: number): Promise<DictionaryEntry[]> {
    const collection = await this.getCollection();
    return await collection.find({ level }).sort({ balinese: 1 }).toArray();
  }

  async getWordById(id: string): Promise<DictionaryEntry | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  async addWord(word: Omit<DictionaryEntry, '_id' | 'createdAt' | 'updatedAt'>): Promise<DictionaryEntry> {
    const collection = await this.getCollection();
    const now = new Date();
    const newWord = {
      ...word,
      createdAt: now,
      updatedAt: now
    };
    
    const result = await collection.insertOne(newWord);
    return { ...newWord, _id: result.insertedId };
  }

  async getAllCategories(): Promise<string[]> {
    const collection = await this.getCollection();
    return await collection.distinct('category');
  }

  // Initialize sample dictionary data
  async initializeSampleDictionary(): Promise<void> {
    const collection = await this.getCollection();
    const count = await collection.countDocuments();
    
    if (count === 0) {
      const sampleWords: Omit<DictionaryEntry, '_id' | 'createdAt' | 'updatedAt'>[] = [
        {
          balinese: "ᬭᬳᬚᭂᬂ ᬲᭂᬫᭂᬂ",
          indonesian: "Selamat pagi",
          latin: "Rahajeng semeng",
          category: "Sapaan",
          level: 1,
          examples: [
            {
              balinese: "ᬭᬳᬚᭂᬂ ᬲᭂᬫᭂᬂ, ᬓᭂᬦ᭄ᬤᬕ ᬓᬬᬸ?",
              indonesian: "Selamat pagi, bagaimana kabar Anda?",
              latin: "Rahajeng semeng, kendag kayu?"
            }
          ]
        },
        {
          balinese: "ᬲᬸᬓ᭄ᬲ᭄ᬫ",
          indonesian: "Terima kasih",
          latin: "Suksma",
          category: "Sopan Santun",
          level: 1,
          examples: [
            {
              balinese: "ᬲᬸᬓ᭄ᬲ᭄ᬫ ᬫᬫᬭ",
              indonesian: "Terima kasih banyak",
              latin: "Suksma memer"
            }
          ]
        },
        {
          balinese: "ᬧᬜ᭄ᬘ",
          indonesian: "Lima",
          latin: "Panca",
          category: "Angka",
          level: 1,
          examples: [
            {
              balinese: "ᬅᬤ ᬧᬜ᭄ᬘ ᬚᬦᬶ",
              indonesian: "Ada lima orang",
              latin: "Ada panca jani"
            }
          ]
        },
        {
          balinese: "ᬳᬸᬫ",
          indonesian: "Rumah",
          latin: "Umah",
          category: "Benda",
          level: 1,
          examples: [
            {
              balinese: "ᬳᬸᬫᬦ᭄ᬫᬸ ᬚᬭᬦ᭄",
              indonesian: "Rumahmu jauh",
              latin: "Umahmu jaran"
            }
          ]
        },
        {
          balinese: "ᬚᬸᬓ᭄",
          indonesian: "Anjing",
          latin: "Juk",
          category: "Hewan",
          level: 1,
          examples: [
            {
              balinese: "ᬚᬸᬓᭂ ᬓᭂᬦ᭄ᬤᬄ",
              indonesian: "Anjing kecil",
              latin: "Juke kendah"
            }
          ]
        }
      ];

      for (const word of sampleWords) {
        await this.addWord(word);
      }
    }
  }
}