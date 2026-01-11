import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getFoodById } from '@/data/mockFoods';
import { ArrowLeft, Search, GitCompare, Trash2, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { searchHistory, clearHistory, user } = useAuth();

  const getCatNames = (catIds: string[]): string[] => {
    if (!user) return [];
    return catIds
      .map((id) => user.cats.find((c) => c.id === id)?.name)
      .filter((name): name is string => !!name);
  };

  const getProductNames = (productIds: string[]): string[] => {
    return productIds
      .map((id) => {
        const product = getFoodById(id);
        return product ? `${product.formula} - ${product.brand}` : null;
      })
      .filter((name): name is string => !!name);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-10">
        <div className="flex items-center justify-between p-4 max-w-lg mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/app')}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">ประวัติการค้นหา</h1>
          </div>
          {searchHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 pb-8">
        {searchHistory.length === 0 ? (
          <div className="cat-card text-center py-12">
            <Clock size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">ยังไม่มีประวัติการค้นหา</p>
          </div>
        ) : (
          <div className="space-y-3">
            {searchHistory.map((item) => (
              <div key={item.id} className="cat-card">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === 'search'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/10 text-accent'
                    }`}
                  >
                    {item.type === 'search' ? <Search size={20} /> : <GitCompare size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">
                      {item.type === 'search' ? 'ค้นหา' : 'เปรียบเทียบ'}
                    </p>
                    {item.query && (
                      <p className="text-sm text-muted-foreground truncate">
                        คำค้น: {item.query}
                      </p>
                    )}
                    {item.productIds.length > 0 && (
                      <div className="mt-1">
                        {getProductNames(item.productIds).map((name, idx) => (
                          <p key={idx} className="text-sm text-muted-foreground truncate">
                            • {name}
                          </p>
                        ))}
                      </div>
                    )}
                    {item.catIds.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        🐱 {getCatNames(item.catIds).join(', ')}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {format(new Date(item.timestamp), 'd MMM yyyy HH:mm', { locale: th })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
