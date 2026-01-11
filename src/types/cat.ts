export interface CatProfile {
  id: string;
  name: string;
  breed: string;
  gender: 'male' | 'female';
  birthDate: string;
  isNeutered: boolean;
  allergies: string[];
  allergiesOther: string; // Free text for additional allergies
  dislikes: string[];
  dislikesOther: string; // Free text for additional dislikes
  furLength: 'short' | 'long';
  diseases: string;
  wantsWeightLoss: boolean;
}

export interface User {
  id: string;
  email: string;
  username: string;
  cats: CatProfile[];
}

export interface SearchHistoryItem {
  id: string;
  type: 'search' | 'compare';
  query?: string;
  productIds: string[];
  catIds: string[];
  timestamp: Date;
}

export interface FoodProduct {
  id: string;
  brand: string;
  formula: string;
  type: 'dry' | 'wet' | 'treat';
  targetGroup: string;
  nutrition: {
    protein: number;
    fat: number;
    fiber: number;
    calories: number;
  };
  supplements: string[];
  hasSupplements: {
    taurine: boolean;
    omega3: boolean;
    probiotics: boolean;
  };
  trustScore: number;
  positivePercent: number;
  negativePercent: number;
  reviews: Review[];
  ingredients: string[];
  isGrainFree: boolean;
  isHolistic: boolean;
  isMedical: boolean;
  similarProducts: string[];
  imageUrl?: string;
}

export interface Review {
  id: string;
  text: string;
  isPositive: boolean;
  author: string;
}

export type AllergyOption = 
  | 'chicken'
  | 'fish'
  | 'beef'
  | 'pork'
  | 'dairy'
  | 'eggs'
  | 'wheat'
  | 'corn'
  | 'soy';

export const ALLERGY_LABELS: Record<AllergyOption, string> = {
  chicken: 'แพ้ไก่ 🐔',
  fish: 'แพ้ปลา 🐟',
  beef: 'แพ้เนื้อวัว 🐄',
  pork: 'แพ้หมู 🐷',
  dairy: 'แพ้นม 🥛',
  eggs: 'แพ้ไข่ 🥚',
  wheat: 'แพ้ข้าวสาลี 🌾',
  corn: 'แพ้ข้าวโพด 🌽',
  soy: 'แพ้ถั่วเหลือง 🫘',
};

export const DISLIKE_LABELS: Record<AllergyOption, string> = {
  chicken: 'ไม่ชอบไก่ 🐔',
  fish: 'ไม่ชอบปลา 🐟',
  beef: 'ไม่ชอบเนื้อวัว 🐄',
  pork: 'ไม่ชอบหมู 🐷',
  dairy: 'ไม่ชอบนม 🥛',
  eggs: 'ไม่ชอบไข่ 🥚',
  wheat: 'ไม่ชอบข้าวสาลี 🌾',
  corn: 'ไม่ชอบข้าวโพด 🌽',
  soy: 'ไม่ชอบถั่วเหลือง 🫘',
};

export const BREED_OPTIONS = [
  'ไทย (วิเชียรมาศ)',
  'เปอร์เซีย',
  'อเมริกันช็อตแฮร์',
  'บริติชช็อตแฮร์',
  'สก็อตติชโฟลด์',
  'เมนคูน',
  'แร็กดอลล์',
  'เบงกอล',
  'รัสเซียนบลู',
  'สยามีส',
  'มันช์กิ้น',
  'ผสม',
  'อื่นๆ',
];
