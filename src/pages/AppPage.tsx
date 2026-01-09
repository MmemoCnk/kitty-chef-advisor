import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { FoodProduct, CatProfile } from '@/types/cat';
import { searchFoodByBrand, recommendFoodsForCat, mockFoods } from '@/data/mockFoods';
import { CatIcon } from '@/components/CatIcon';
import { NutritionCard } from '@/components/NutritionCard';
import { SupplementsCard } from '@/components/SupplementsCard';
import { TrustScoreCard } from '@/components/TrustScoreCard';
import { SimilarProductsCard } from '@/components/SimilarProductsCard';
import { FilterChips } from '@/components/FilterChips';
import { FoodProductCard } from '@/components/FoodProductCard';
import { AllergyWarningPopup } from '@/components/AllergyWarningPopup';
import { CatProfileForm } from '@/components/CatProfileForm';
import {
  Search,
  Camera,
  LogOut,
  User,
  ChevronLeft,
  UtensilsCrossed,
  Cat,
  ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';

type Tab = 'food' | 'cat';
type View = 'search' | 'results' | 'detail';

export default function AppPage() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>('food');
  const [view, setView] = useState<View>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<FoodProduct | null>(null);
  const [allergyWarning, setAllergyWarning] = useState<{ allergens: string[]; catName: string } | null>(null);
  const [filters, setFilters] = useState({ grainFree: false, holistic: false, medical: false });

  // For cat search (guest mode)
  const [guestCat, setGuestCat] = useState<Partial<CatProfile>>({
    name: 'น้องแมว',
    allergies: [],
    furLength: 'short',
    isNeutered: false,
    wantsWeightLoss: false,
  });

  // For logged-in user cat selection
  const [selectedCatId, setSelectedCatId] = useState<string | null>(
    user?.cats[0]?.id || null
  );

  const selectedCat = user?.cats.find((c) => c.id === selectedCatId) || guestCat;

  const handleLogout = () => {
    logout();
    toast.success('ออกจากระบบแล้ว');
    navigate('/');
  };

  const handleFoodSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('กรุณากรอกชื่ออาหารหรือยี่ห้อ');
      return;
    }
    const results = searchFoodByBrand(searchQuery);
    setSearchResults(results);
    setView('results');
  };

  const handleCatSearch = () => {
    const catData = isLoggedIn ? selectedCat : guestCat;
    const results = recommendFoodsForCat(
      0, // age calculation could be added
      catData.allergies || [],
      catData.wantsWeightLoss || false,
      filters
    );
    setSearchResults(results);
    setView('results');
  };

  const handleProductSelect = (product: FoodProduct) => {
    setSelectedProduct(product);
    setView('detail');

    // Check for allergies if logged in
    if (isLoggedIn && selectedCat?.allergies) {
      const foundAllergens = selectedCat.allergies.filter((allergy) =>
        product.ingredients.some((ing) =>
          ing.toLowerCase().includes(allergy.toLowerCase())
        )
      );
      if (foundAllergens.length > 0) {
        setAllergyWarning({
          allergens: foundAllergens,
          catName: selectedCat.name || 'น้องแมว',
        });
      }
    }
  };

  const handleFilterChange = (key: 'grainFree' | 'holistic' | 'medical') => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBack = () => {
    if (view === 'detail') {
      setView('results');
      setSelectedProduct(null);
    } else if (view === 'results') {
      setView('search');
      setSearchResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-10">
        <div className="flex items-center justify-between p-4 max-w-lg mx-auto">
          {view !== 'search' ? (
            <button onClick={handleBack} className="p-2 hover:bg-secondary rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <CatIcon className="text-white" size={24} />
            </div>
          )}

          <h1 className="text-lg font-bold">
            {view === 'search'
              ? 'Cat Food Finder'
              : view === 'results'
              ? 'ผลการค้นหา'
              : selectedProduct?.brand}
          </h1>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <User size={20} />
            </button>
          )}
        </div>

        {/* Tab Buttons - Only show on search view */}
        {view === 'search' && (
          <div className="px-4 pb-4 max-w-lg mx-auto">
            <div className="flex gap-2 p-1 bg-secondary rounded-2xl">
              <button
                onClick={() => setActiveTab('food')}
                className={activeTab === 'food' ? 'tab-button-active' : 'tab-button'}
              >
                <UtensilsCrossed size={18} className="inline mr-2" />
                ค้นหาอาหาร
              </button>
              <button
                onClick={() => setActiveTab('cat')}
                className={activeTab === 'cat' ? 'tab-button-active' : 'tab-button'}
              >
                <Cat size={18} className="inline mr-2" />
                ค้นหาตามแมว
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-lg mx-auto p-4 pb-8">
        {/* Search View */}
        {view === 'search' && (
          <div className="space-y-6 animate-fade-in">
            {activeTab === 'food' ? (
              <>
                {/* Food Search */}
                <div className="cat-card">
                  <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔍</span>
                    ค้นหาอาหาร
                  </h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleFoodSearch()}
                        placeholder="พิมพ์ยี่ห้อหรือสูตร..."
                        className="cat-input pr-12"
                      />
                      <Search
                        size={20}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleFoodSearch}
                        className="flex-1 cat-button-primary"
                      >
                        <Search size={18} className="inline mr-2" />
                        ค้นหา
                      </button>
                      <button className="cat-button-secondary">
                        <Camera size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Search */}
                <div>
                  <h3 className="font-semibold mb-3 text-muted-foreground">ยี่ห้อยอดนิยม</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Royal Canin', 'Orijen', "Hill's", 'Wellness'].map((brand) => (
                      <button
                        key={brand}
                        onClick={() => {
                          setSearchQuery(brand);
                          const results = searchFoodByBrand(brand);
                          setSearchResults(results);
                          setView('results');
                        }}
                        className="filter-chip"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Cat Search */}
                {isLoggedIn && user && user.cats.length > 0 ? (
                  <div className="cat-card">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <span className="text-2xl">🐱</span>
                      เลือกน้องแมว
                    </h2>
                    <div className="relative">
                      <select
                        value={selectedCatId || ''}
                        onChange={(e) => setSelectedCatId(e.target.value)}
                        className="cat-input appearance-none cursor-pointer"
                      >
                        {user.cats.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name} ({cat.breed})
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                      />
                    </div>

                    {selectedCat && (
                      <div className="mt-4 p-4 rounded-xl bg-secondary/50 space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">สายพันธุ์:</span> {selectedCat.breed}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">ขน:</span>{' '}
                          {selectedCat.furLength === 'short' ? 'สั้น' : 'ยาว'}
                        </p>
                        {selectedCat.allergies && selectedCat.allergies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {selectedCat.allergies.map((a) => (
                              <span key={a} className="allergy-tag text-xs">
                                {a}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <CatProfileForm
                    cat={guestCat}
                    index={0}
                    onChange={setGuestCat}
                    showRemove={false}
                  />
                )}

                {/* Filters */}
                <div>
                  <h3 className="font-semibold mb-3 text-muted-foreground">ตัวกรอง</h3>
                  <FilterChips filters={filters} onFilterChange={handleFilterChange} />
                </div>

                <button onClick={handleCatSearch} className="w-full cat-button-primary">
                  <Search size={18} className="inline mr-2" />
                  ค้นหาอาหารที่เหมาะ
                </button>
              </>
            )}
          </div>
        )}

        {/* Results View */}
        {view === 'results' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                พบ {searchResults.length} รายการ
              </p>
              <FilterChips filters={filters} onFilterChange={handleFilterChange} />
            </div>

            {searchResults.length === 0 ? (
              <div className="cat-card text-center py-8">
                <span className="text-6xl mb-4 block">😿</span>
                <p className="text-muted-foreground">ไม่พบอาหารที่ตรงกับการค้นหา</p>
              </div>
            ) : (
              <div className="space-y-3">
                {searchResults.map((product) => (
                  <FoodProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductSelect(product)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Detail View */}
        {view === 'detail' && selectedProduct && (
          <div className="space-y-4 animate-fade-in">
            {/* Product Header */}
            <div className="cat-card">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl">
                  🍽️
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedProduct.brand}</h2>
                  <p className="text-muted-foreground">{selectedProduct.formula}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="cat-badge-info">
                      {selectedProduct.type === 'dry' ? 'เม็ด' : selectedProduct.type === 'wet' ? 'เปียก' : 'ขนม'}
                    </span>
                    {selectedProduct.isGrainFree && (
                      <span className="cat-badge-success">Grain-Free</span>
                    )}
                    {selectedProduct.isHolistic && (
                      <span className="cat-badge-info">Holistic</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="cat-card">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span>🏷️</span> ข้อมูลสินค้า
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Brand:</span> {selectedProduct.brand}
                </p>
                <p>
                  <span className="font-medium">สูตร:</span> {selectedProduct.formula}
                </p>
                <p>
                  <span className="font-medium">ประเภท:</span>{' '}
                  {selectedProduct.type === 'dry' ? 'เม็ด' : selectedProduct.type === 'wet' ? 'เปียก' : 'ขนม'}
                </p>
                <p>
                  <span className="font-medium">กลุ่มเป้าหมาย:</span> {selectedProduct.targetGroup}
                </p>
              </div>
            </div>

            <NutritionCard nutrition={selectedProduct.nutrition} />
            <SupplementsCard
              supplements={selectedProduct.supplements}
              hasSupplements={selectedProduct.hasSupplements}
            />
            <TrustScoreCard
              trustScore={selectedProduct.trustScore}
              positivePercent={selectedProduct.positivePercent}
              negativePercent={selectedProduct.negativePercent}
              reviews={selectedProduct.reviews}
            />

            {/* Similar Products with Filters */}
            <div>
              <h3 className="font-semibold mb-3 text-muted-foreground">ตัวกรอง Knowledge Graph</h3>
              <FilterChips filters={filters} onFilterChange={handleFilterChange} />
            </div>
            <SimilarProductsCard
              productId={selectedProduct.id}
              filters={filters}
              onProductClick={handleProductSelect}
            />
          </div>
        )}
      </div>

      {/* Allergy Warning Popup */}
      {allergyWarning && (
        <AllergyWarningPopup
          allergens={allergyWarning.allergens}
          catName={allergyWarning.catName}
          onClose={() => setAllergyWarning(null)}
        />
      )}
    </div>
  );
}
