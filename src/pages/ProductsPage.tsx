
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory, searchProducts, getCategories, products as allProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('q');
  
  const [displayedProducts, setDisplayedProducts] = useState(allProducts);
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : []);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = getCategories();
  
  // Filter products based on URL params on initial load
  useEffect(() => {
    if (searchQuery) {
      setDisplayedProducts(searchProducts(searchQuery));
      setLocalSearch(searchQuery);
    } else if (categoryParam) {
      setDisplayedProducts(getProductsByCategory(categoryParam));
    } else {
      setDisplayedProducts(allProducts);
    }
  }, [searchQuery, categoryParam]);
  
  // Filter products when filters change
  const applyFilters = () => {
    let filtered = [...allProducts];
    
    // Apply search if present
    if (localSearch) {
      filtered = searchProducts(localSearch);
    }
    
    // Apply category filter if any categories are selected
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setDisplayedProducts(filtered);
  };
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  // Apply filters whenever filter state changes
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, priceRange]);
  
  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {searchQuery 
              ? `Résultats pour "${searchQuery}"` 
              : categoryParam 
                ? `Catégorie: ${categoryParam}` 
                : 'Tous les produits'}
          </h1>
          
          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            className="md:hidden flex items-center mb-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={16} className="mr-2" />
            {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
          </Button>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters sidebar - desktop always visible, mobile toggled */}
            <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Rechercher</h3>
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Rechercher..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        className="pr-10"
                      />
                      <button 
                        type="submit" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        <Search size={18} />
                      </button>
                    </div>
                  </form>
                </div>
                
                <div className="mb-6 border-t pt-4">
                  <h3 className="font-semibold mb-3">Catégories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <label 
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4 border-t pt-4">
                  <h3 className="font-semibold mb-3">Prix</h3>
                  <Slider
                    defaultValue={[0, 2000]}
                    max={2000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{priceRange[0]}€</span>
                    <span>{priceRange[1]}€</span>
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange([0, 2000]);
                      setLocalSearch('');
                    }}
                  >
                    <X size={16} className="mr-2" />
                    Réinitialiser les filtres
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products grid */}
            <div className="md:w-3/4">
              {displayedProducts.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
                  <p className="text-gray-600">Essayez de modifier vos filtres ou votre recherche.</p>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-4">{displayedProducts.length} produits trouvés</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
