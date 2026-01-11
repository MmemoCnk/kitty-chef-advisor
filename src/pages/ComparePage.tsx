import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getFoodById } from '@/data/mockFoods';
import { FoodProduct } from '@/types/cat';
import { ArrowLeft, Check, X } from 'lucide-react';

export default function ComparePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productIds = searchParams.get('ids')?.split(',') || [];

  const products: FoodProduct[] = productIds
    .map((id) => getFoodById(id))
    .filter((p): p is FoodProduct => !!p);

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">ไม่พบสินค้าที่จะเปรียบเทียบ</p>
          <button onClick={() => navigate('/app')} className="cat-button-primary mt-4">
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-10">
        <div className="flex items-center gap-4 p-4 max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">เปรียบเทียบอาหาร ({products.length})</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 pb-8 overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Product Headers */}
          <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}>
            <div className="font-bold text-muted-foreground">รายการ</div>
            {products.map((product) => (
              <div key={product.id} className="cat-card text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-2">
                  🍽️
                </div>
                <p className="font-bold">{product.formula}</p>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
              </div>
            ))}

            {/* Type */}
            <div className="font-medium py-3">ประเภท</div>
            {products.map((product) => (
              <div key={product.id} className="py-3 text-center">
                {product.type === 'dry' ? 'เม็ด' : product.type === 'wet' ? 'เปียก' : 'ขนม'}
              </div>
            ))}

            {/* Protein */}
            <div className="font-medium py-3 bg-secondary/30 rounded-l-xl pl-3">Protein</div>
            {products.map((product, idx) => (
              <div
                key={product.id}
                className={`py-3 text-center bg-secondary/30 ${idx === products.length - 1 ? 'rounded-r-xl' : ''}`}
              >
                <span className="font-bold text-primary">{product.nutrition.protein}%</span>
              </div>
            ))}

            {/* Fat */}
            <div className="font-medium py-3">Fat</div>
            {products.map((product) => (
              <div key={product.id} className="py-3 text-center">
                <span className="font-bold text-primary">{product.nutrition.fat}%</span>
              </div>
            ))}

            {/* Fiber */}
            <div className="font-medium py-3 bg-secondary/30 rounded-l-xl pl-3">Fiber</div>
            {products.map((product, idx) => (
              <div
                key={product.id}
                className={`py-3 text-center bg-secondary/30 ${idx === products.length - 1 ? 'rounded-r-xl' : ''}`}
              >
                <span className="font-bold text-primary">{product.nutrition.fiber}%</span>
              </div>
            ))}

            {/* Calories */}
            <div className="font-medium py-3">Calories</div>
            {products.map((product) => (
              <div key={product.id} className="py-3 text-center">
                <span className="font-bold text-primary">{product.nutrition.calories}</span>
                <span className="text-xs text-muted-foreground"> kcal/100g</span>
              </div>
            ))}

            {/* Trust Score */}
            <div className="font-medium py-3 bg-secondary/30 rounded-l-xl pl-3">Trust Score</div>
            {products.map((product, idx) => (
              <div
                key={product.id}
                className={`py-3 text-center bg-secondary/30 ${idx === products.length - 1 ? 'rounded-r-xl' : ''}`}
              >
                <span className="font-bold text-lg text-trust">{product.trustScore}</span>
              </div>
            ))}

            {/* Positive */}
            <div className="font-medium py-3">รีวิว Positive</div>
            {products.map((product) => (
              <div key={product.id} className="py-3 text-center">
                <span className="font-bold text-accent">{product.positivePercent}%</span>
              </div>
            ))}

            {/* Negative */}
            <div className="font-medium py-3 bg-secondary/30 rounded-l-xl pl-3">รีวิว Negative</div>
            {products.map((product, idx) => (
              <div
                key={product.id}
                className={`py-3 text-center bg-secondary/30 ${idx === products.length - 1 ? 'rounded-r-xl' : ''}`}
              >
                <span className="font-bold text-destructive">{product.negativePercent}%</span>
              </div>
            ))}

            {/* Grain Free */}
            <div className="font-medium py-3">Grain-Free</div>
            {products.map((product) => (
              <div key={product.id} className="py-3 text-center">
                {product.isGrainFree ? (
                  <Check className="mx-auto text-accent" />
                ) : (
                  <X className="mx-auto text-destructive" />
                )}
              </div>
            ))}

            {/* Holistic */}
            <div className="font-medium py-3 bg-secondary/30 rounded-l-xl pl-3">Holistic</div>
            {products.map((product, idx) => (
              <div
                key={product.id}
                className={`py-3 text-center bg-secondary/30 ${idx === products.length - 1 ? 'rounded-r-xl' : ''}`}
              >
                {product.isHolistic ? (
                  <Check className="mx-auto text-accent" />
                ) : (
                  <X className="mx-auto text-destructive" />
                )}
              </div>
            ))}

            {/* Medical */}
            <div className="font-medium py-3">ทางการแพทย์</div>
            {products.map((product) => (
              <div key={product.id} className="py-3 text-center">
                {product.isMedical ? (
                  <Check className="mx-auto text-accent" />
                ) : (
                  <X className="mx-auto text-destructive" />
                )}
              </div>
            ))}

            {/* Taurine */}
            <div className="font-medium py-3 bg-secondary/30 rounded-l-xl pl-3">Taurine</div>
            {products.map((product, idx) => (
              <div
                key={product.id}
                className={`py-3 text-center bg-secondary/30 ${idx === products.length - 1 ? 'rounded-r-xl' : ''}`}
              >
                {product.hasSupplements.taurine ? (
                  <Check className="mx-auto text-accent" />
                ) : (
                  <X className="mx-auto text-destructive" />
                )}
              </div>
            ))}

            {/* Omega-3 */}
            <div className="font-medium py-3">Omega-3</div>
            {products.map((product) => (
              <div key={product.id} className="py-3 text-center">
                {product.hasSupplements.omega3 ? (
                  <Check className="mx-auto text-accent" />
                ) : (
                  <X className="mx-auto text-destructive" />
                )}
              </div>
            ))}

            {/* Probiotics */}
            <div className="font-medium py-3 bg-secondary/30 rounded-l-xl pl-3">Probiotics</div>
            {products.map((product, idx) => (
              <div
                key={product.id}
                className={`py-3 text-center bg-secondary/30 ${idx === products.length - 1 ? 'rounded-r-xl' : ''}`}
              >
                {product.hasSupplements.probiotics ? (
                  <Check className="mx-auto text-accent" />
                ) : (
                  <X className="mx-auto text-destructive" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
