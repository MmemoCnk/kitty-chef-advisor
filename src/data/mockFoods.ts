import { FoodProduct } from '@/types/cat';

export const mockFoods: FoodProduct[] = [
  {
    id: '1',
    brand: 'Royal Canin',
    formula: 'Kitten',
    type: 'dry',
    targetGroup: 'ลูกแมว (อายุ 4 เดือน - 1 ปี)',
    nutrition: {
      protein: 36,
      fat: 18,
      fiber: 2.4,
      calories: 410,
    },
    supplements: [
      'Taurine', 'Vitamin A', 'Vitamin B', 'Vitamin D', 'Vitamin E',
      'Omega-3', 'Zinc', 'Iron', 'Copper', 'Manganese', 'Selenium',
      'Biotin', 'Folic Acid', 'L-Carnitine'
    ],
    hasSupplements: {
      taurine: true,
      omega3: true,
      probiotics: false,
    },
    trustScore: 87,
    positivePercent: 82,
    negativePercent: 18,
    reviews: [
      { id: 'r1', text: 'น้องแมวชอบมาก กินหมดทุกมื้อ', isPositive: true, author: 'CatLover99' },
      { id: 'r2', text: 'ขนเงางามขึ้นเห็นได้ชัด', isPositive: true, author: 'MeowMom' },
      { id: 'r3', text: 'ราคาค่อนข้างแพง', isPositive: false, author: 'BudgetCat' },
    ],
    ingredients: ['chicken', 'rice', 'corn'],
    isGrainFree: false,
    isHolistic: false,
    isMedical: false,
    similarProducts: ['2', '3'],
  },
  {
    id: '2',
    brand: 'Orijen',
    formula: 'Cat & Kitten',
    type: 'dry',
    targetGroup: 'แมวทุกวัย',
    nutrition: {
      protein: 40,
      fat: 20,
      fiber: 3,
      calories: 416,
    },
    supplements: [
      'Taurine', 'Vitamin A', 'Vitamin D3', 'Vitamin E', 'Omega-3',
      'Omega-6', 'Zinc', 'Iron', 'Probiotics', 'DHA', 'EPA', 'Glucosamine'
    ],
    hasSupplements: {
      taurine: true,
      omega3: true,
      probiotics: true,
    },
    trustScore: 94,
    positivePercent: 91,
    negativePercent: 9,
    reviews: [
      { id: 'r4', text: 'อาหารคุณภาพสูงมาก น้องแมวสุขภาพดี', isPositive: true, author: 'PremiumCat' },
      { id: 'r5', text: 'Grain-free ดีมากสำหรับแมวแพ้ธัญพืช', isPositive: true, author: 'HealthyPaw' },
    ],
    ingredients: ['chicken', 'turkey', 'fish'],
    isGrainFree: true,
    isHolistic: true,
    isMedical: false,
    similarProducts: ['1', '4'],
  },
  {
    id: '3',
    brand: 'Hill\'s Science Diet',
    formula: 'Adult Indoor',
    type: 'dry',
    targetGroup: 'แมวโต (1-6 ปี) เลี้ยงในบ้าน',
    nutrition: {
      protein: 31,
      fat: 14,
      fiber: 6,
      calories: 365,
    },
    supplements: [
      'Taurine', 'Vitamin A', 'Vitamin C', 'Vitamin E', 'L-Carnitine',
      'Fiber Blend', 'Omega-6', 'Biotin'
    ],
    hasSupplements: {
      taurine: true,
      omega3: false,
      probiotics: false,
    },
    trustScore: 85,
    positivePercent: 79,
    negativePercent: 21,
    reviews: [
      { id: 'r6', text: 'ช่วยควบคุมน้ำหนักได้ดี', isPositive: true, author: 'ChubbyMom' },
      { id: 'r7', text: 'น้องแมวไม่ค่อยชอบเท่าไหร่', isPositive: false, author: 'PickyEater' },
    ],
    ingredients: ['chicken', 'rice', 'corn', 'wheat'],
    isGrainFree: false,
    isHolistic: false,
    isMedical: true,
    similarProducts: ['1', '5'],
  },
  {
    id: '4',
    brand: 'Wellness CORE',
    formula: 'Grain-Free Indoor',
    type: 'dry',
    targetGroup: 'แมวโตเลี้ยงในบ้าน',
    nutrition: {
      protein: 38,
      fat: 12,
      fiber: 5,
      calories: 380,
    },
    supplements: [
      'Taurine', 'Omega-3', 'Omega-6', 'Probiotics', 'Antioxidants',
      'Glucosamine', 'Chondroitin', 'Vitamin E'
    ],
    hasSupplements: {
      taurine: true,
      omega3: true,
      probiotics: true,
    },
    trustScore: 89,
    positivePercent: 85,
    negativePercent: 15,
    reviews: [
      { id: 'r8', text: 'อาหาร Holistic คุณภาพดี ราคาสมเหตุสมผล', isPositive: true, author: 'NaturalCat' },
      { id: 'r9', text: 'ขนนุ่มสลวยมาก', isPositive: true, author: 'FluffyQueen' },
    ],
    ingredients: ['turkey', 'chicken'],
    isGrainFree: true,
    isHolistic: true,
    isMedical: false,
    similarProducts: ['2', '6'],
  },
  {
    id: '5',
    brand: 'Royal Canin',
    formula: 'Urinary Care',
    type: 'dry',
    targetGroup: 'แมวที่มีปัญหาทางเดินปัสสาวะ',
    nutrition: {
      protein: 33,
      fat: 13,
      fiber: 4,
      calories: 378,
    },
    supplements: [
      'Taurine', 'Vitamin A', 'Vitamin D3', 'Vitamin E', 'S/O Index',
      'Low RSS', 'Omega-6'
    ],
    hasSupplements: {
      taurine: true,
      omega3: false,
      probiotics: false,
    },
    trustScore: 90,
    positivePercent: 88,
    negativePercent: 12,
    reviews: [
      { id: 'r10', text: 'ช่วยแมวที่เคยมีนิ่วได้ดีมาก', isPositive: true, author: 'VetApproved' },
      { id: 'r11', text: 'ต้องมีใบสั่งจากหมอ', isPositive: false, author: 'Confused' },
    ],
    ingredients: ['chicken', 'rice'],
    isGrainFree: false,
    isHolistic: false,
    isMedical: true,
    similarProducts: ['3'],
  },
  {
    id: '6',
    brand: 'Taste of the Wild',
    formula: 'Canyon River',
    type: 'dry',
    targetGroup: 'แมวทุกวัย',
    nutrition: {
      protein: 42,
      fat: 18,
      fiber: 3,
      calories: 400,
    },
    supplements: [
      'Taurine', 'Omega-3', 'Omega-6', 'Probiotics', 'Antioxidants',
      'Vitamin A', 'Vitamin D3', 'Vitamin E', 'Zinc', 'Selenium'
    ],
    hasSupplements: {
      taurine: true,
      omega3: true,
      probiotics: true,
    },
    trustScore: 86,
    positivePercent: 83,
    negativePercent: 17,
    reviews: [
      { id: 'r12', text: 'น้องแมวชอบมาก เหมือนอาหารธรรมชาติ', isPositive: true, author: 'WildHeart' },
      { id: 'r13', text: 'มีปลาเทราท์และปลาแซลมอน คุณภาพดี', isPositive: true, author: 'FishLover' },
    ],
    ingredients: ['fish', 'chicken'],
    isGrainFree: true,
    isHolistic: true,
    isMedical: false,
    similarProducts: ['2', '4'],
  },
];

export function searchFoodByBrand(query: string): FoodProduct[] {
  const lowerQuery = query.toLowerCase();
  return mockFoods.filter(
    (food) =>
      food.brand.toLowerCase().includes(lowerQuery) ||
      food.formula.toLowerCase().includes(lowerQuery)
  );
}

export function getFoodById(id: string): FoodProduct | undefined {
  return mockFoods.find((food) => food.id === id);
}

export function getSimilarProducts(productId: string): FoodProduct[] {
  const product = getFoodById(productId);
  if (!product) return [];
  return product.similarProducts
    .map((id) => getFoodById(id))
    .filter((p): p is FoodProduct => p !== undefined);
}

export function recommendFoodsForCat(
  age: number,
  allergies: string[],
  wantsWeightLoss: boolean,
  filters: { grainFree?: boolean; holistic?: boolean; medical?: boolean }
): FoodProduct[] {
  return mockFoods.filter((food) => {
    // Filter by allergies
    const hasAllergen = allergies.some((allergy) =>
      food.ingredients.some((ing) => ing.toLowerCase().includes(allergy.toLowerCase()))
    );
    if (hasAllergen) return false;

    // Filter by category
    if (filters.grainFree && !food.isGrainFree) return false;
    if (filters.holistic && !food.isHolistic) return false;
    if (filters.medical && !food.isMedical) return false;

    // Filter by weight loss (low fat, high fiber)
    if (wantsWeightLoss && food.nutrition.fat > 15) return false;

    return true;
  });
}
