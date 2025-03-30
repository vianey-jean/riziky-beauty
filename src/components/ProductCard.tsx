
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
    
    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre panier.`,
      duration: 3000,
    });
  };
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="block group"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
        {/* Product image */}
        <div className="relative h-48 md:h-64 bg-gray-100 overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Out of stock badge */}
          {!product.inStock && (
            <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-semibold">
              Rupture de stock
            </div>
          )}
          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-0 left-0 bg-secondary text-white px-2 py-1 text-xs font-semibold">
              Populaire
            </div>
          )}
        </div>
        
        {/* Product details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <span className="font-bold text-lg">
              {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {product.description}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Rating stars */}
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-sm text-gray-500">
                ({product.rating.toFixed(1)})
              </span>
            </div>
            
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart size={16} className="mr-1" />
              Ajouter
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
