import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { FoodProduct, CatProfile } from '@/types/cat';
import { searchFoodByBrand, mockFoods, getFoodById } from '@/data/mockFoods';
import { CatIcon } from '@/components/CatIcon';
import { NutritionCard } from '@/components/NutritionCard';
import { SupplementsCard } from '@/components/SupplementsCard';
import { TrustScoreCard } from '@/components/TrustScoreCard';
import { SimilarProductsCard } from '@/components/SimilarProductsCard';
import { FilterChips } from '@/components/FilterChips';
import { FoodProductCard } from '@/components/FoodProductCard';
import { CatAvatarSelector } from '@/components/CatAvatarSelector';
import { Search, Camera, LogOut, User, ChevronLeft, Clock, GitCompare, Plus } from 'lucide-react';
import { toast } from 'sonner';

type View = 'search' | 'results' | 'detail';

export default function AppPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, isLoggedIn, logout, addToHistory } = useAuth();

  const [view, setView] = useState<View>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<FoodProduct | null>(null);
  const [filters, setFilters] = useState({ grainFree: false, holistic: false, medical: false });
  const [selectedCatIds, setSelectedCatIds] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Handle URL parameters for navigation from history
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const productParam = searchParams.get('product');
    
    if (searchParam) {
      setSearchQuery(searchParam);
      const results = searchFoodByBrand(searchParam);
      setSearchResults(results);
      setView('results');
    } else if (productParam) {
      const product = getFoodById(productParam);
      if (product) {
        setSelectedProduct(product);
        setView('detail');
      }
    }
  }, [searchParams]);

  // Initialize selected cats when user data changes
  useEffect(() => {
    if (user?.cats && user.cats.length > 0) {
      // Only initialize if selectedCatIds is empty or contains invalid ids
      setSelectedCatIds((prev) => {
        const validIds = prev.filter((id) => user.cats.some((c) => c.id === id));
        if (validIds.length === 0) {
          return user.cats.map((c) => c.id); // Select all cats by default
        }
        return validIds;
      });
    }
  }, [user?.cats]);

  const selectedCats = user?.cats.filter((c) => selectedCatIds.includes(c.id)) || [];

  const handleLogout = () => {
    logout();
    toast.success('ออกจากระบบแล้ว');
    navigate('/');
  };

  const handleToggleCat = (catId: string) => {
    setSelectedCatIds((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const filterResultsByCats = (products: FoodProduct[]): FoodProduct[] => {
    // Apply category filters first
    let filtered = products.filter((product) => {
      if (filters.grainFree && !product.isGrainFree) return false;
      if (filters.holistic && !product.isHolistic) return false;
      if (filters.medical && !product.isMedical) return false;
      return true;
    });

    // If no cats selected, return category-filtered results
    if (selectedCats.length === 0) return filtered;

    // Filter out products with allergens from ANY selected cat
    return filtered.filter((product) => {
      for (const cat of selectedCats) {
        const allAllergies = [...(cat.allergies || [])];
        if (cat.allergiesOther) {
          allAllergies.push(...cat.allergiesOther.split(',').map((a) => a.trim().toLowerCase()));
        }

        const hasAllergen = allAllergies.some((allergy) =>
          product.ingredients.some((ing) => ing.toLowerCase().includes(allergy.toLowerCase()))
        );

        if (hasAllergen) return false;
      }
      return true;
    });
  };

  const handleFoodSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('กรุณากรอกชื่ออาหารหรือยี่ห้อ');
      return;
    }
    const results = searchFoodByBrand(searchQuery);
    const filtered = filterResultsByCats(results);
    setSearchResults(filtered);
    setView('results');

    if (isLoggedIn) {
      addToHistory({ type: 'search', query: searchQuery, productIds: [], catIds: selectedCatIds });
    }
  };

  const handleProductSelect = (product: FoodProduct) => {
    setSelectedProduct(product);
    setView('detail');
    
    // Save to history as viewed product
    if (isLoggedIn) {
      addToHistory({ type: 'view', productIds: [product.id], catIds: selectedCatIds });
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

  const handleToggleCompare = (productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) {
        toast.error('เปรียบเทียบได้สูงสุด 3 รายการ');
        return prev;
      }
      return [...prev, productId];
    });
  };

  const handleCompare = () => {
    if (compareList.length < 2) {
      toast.error('กรุณาเลือกอย่างน้อย 2 รายการ');
      return;
    }
    if (isLoggedIn) {
      addToHistory({ type: 'compare', productIds: compareList, catIds: selectedCatIds });
    }
    navigate(`/compare?ids=${compareList.join(',')}`);
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
            {view === 'search' ? 'Cat Food Finder' : view === 'results' ? 'ผลการค้นหา' : `${selectedProduct?.formula}`}
          </h1>

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button onClick={() => navigate('/history')} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <Clock size={20} />
              </button>
            )}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <LogOut size={20} />
              </button>
            ) : (
              <button onClick={() => navigate('/')} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <User size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Cat Avatar Selector - Always show for logged in users */}
        {isLoggedIn && user && (
          <div className="px-4 pb-4 max-w-lg mx-auto">
            <p className="text-xs text-muted-foreground mb-2">เลือกน้องแมวที่จะค้นหา (เลือกได้หลายตัว)</p>
            <CatAvatarSelector 
              cats={user.cats} 
              selectedCatIds={selectedCatIds} 
              onToggleCat={handleToggleCat} 
            />
          </div>
        )}
      </div>

      <div className="max-w-lg mx-auto p-4 pb-8">
        {/* Search View */}
        {view === 'search' && (
          <div className="space-y-6 animate-fade-in">
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
                  <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleFoodSearch} className="flex-1 cat-button-primary">
                    <Search size={18} className="inline mr-2" />
                    ค้นหา
                  </button>
                  <button className="cat-button-secondary">
                    <Camera size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-muted-foreground">ตัวกรอง</h3>
              <FilterChips filters={filters} onFilterChange={handleFilterChange} />
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-muted-foreground">ยี่ห้อยอดนิยม</h3>
              <div className="flex flex-wrap gap-2">
                {['Royal Canin', 'Orijen', "Hill's", 'Wellness'].map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSearchQuery(brand);
                      const results = filterResultsByCats(searchFoodByBrand(brand));
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
          </div>
        )}

        {/* Results View */}
        {view === 'results' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">พบ {searchResults.length} รายการ</p>
              {compareList.length > 0 && (
                <button onClick={handleCompare} className="cat-button-primary text-sm py-2 px-4">
                  <GitCompare size={16} className="inline mr-1" />
                  เปรียบเทียบ ({compareList.length})
                </button>
              )}
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
                    selectedCats={selectedCats}
                    isInCompare={compareList.includes(product.id)}
                    onToggleCompare={() => handleToggleCompare(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Detail View */}
        {view === 'detail' && selectedProduct && (
          <div className="space-y-4 animate-fade-in">
            <div className="cat-card">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl">🍽️</div>
                <div>
                  <h2 className="text-xl font-bold">{selectedProduct.formula}</h2>
                  <p className="text-muted-foreground">{selectedProduct.brand}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="cat-badge-info">
                      {selectedProduct.type === 'dry' ? 'เม็ด' : selectedProduct.type === 'wet' ? 'เปียก' : 'ขนม'}
                    </span>
                    {selectedProduct.isGrainFree && <span className="cat-badge-success">Grain-Free</span>}
                    {selectedProduct.isHolistic && <span className="cat-badge-info">Holistic</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="cat-card">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span>🏷️</span> ข้อมูลสินค้า
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Brand:</span> {selectedProduct.brand}</p>
                <p><span className="font-medium">สูตร:</span> {selectedProduct.formula}</p>
                <p><span className="font-medium">ประเภท:</span> {selectedProduct.type === 'dry' ? 'เม็ด' : selectedProduct.type === 'wet' ? 'เปียก' : 'ขนม'}</p>
                <p><span className="font-medium">กลุ่มเป้าหมาย:</span> {selectedProduct.targetGroup}</p>
              </div>
            </div>

            <NutritionCard nutrition={selectedProduct.nutrition} />
            <SupplementsCard supplements={selectedProduct.supplements} hasSupplements={selectedProduct.hasSupplements} />
            <TrustScoreCard trustScore={selectedProduct.trustScore} positivePercent={selectedProduct.positivePercent} negativePercent={selectedProduct.negativePercent} reviews={selectedProduct.reviews} />

            <div>
              <h3 className="font-semibold mb-3 text-muted-foreground">ตัวกรอง Knowledge Graph</h3>
              <FilterChips filters={filters} onFilterChange={handleFilterChange} />
            </div>
            <SimilarProductsCard productId={selectedProduct.id} filters={filters} onProductClick={handleProductSelect} />
          </div>
        )}
      </div>
    </div>
  );
}
