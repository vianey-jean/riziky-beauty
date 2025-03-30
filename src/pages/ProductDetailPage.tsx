
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Check, Truck, ArrowLeft, Plus, Minus } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(parseInt(id || '0'));
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // Get related products
  useEffect(() => {
    if (product) {
      const related = getProductsByCategory(product.category)
        .filter(p => p.id !== product.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    });
    
    toast({
      title: "Produit ajouté",
      description: `${quantity} x ${product.name} ajouté(s) à votre panier.`,
      duration: 3000,
    });
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <p className="mb-4">Désolé, le produit que vous recherchez n'existe pas.</p>
        <Link to="/products">
          <Button>
            <ArrowLeft className="mr-2" size={16} />
            Retour aux produits
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/products" className="flex items-center text-primary hover:underline">
          <ArrowLeft size={16} className="mr-1" />
          Retour aux produits
        </Link>
      </div>
      
      <div className="md:flex -mx-4">
        {/* Product images */}
        <div className="md:w-1/2 px-4 mb-8 md:mb-0">
          <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
            <img 
              src={product.images[selectedImageIndex]} 
              alt={product.name} 
              className="w-full h-80 object-contain p-4"
            />
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImageIndex === index 
                      ? 'border-primary' 
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product details */}
        <div className="md:w-1/2 px-4">
          {/* Badges */}
          <div className="flex mb-3 space-x-2">
            {product.featured && (
              <span className="bg-secondary text-white text-xs px-2 py-1 rounded">
                Populaire
              </span>
            )}
            {!product.inStock && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                Rupture de stock
              </span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
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
              <span className="ml-1 text-gray-600">
                ({product.rating.toFixed(1)})
              </span>
            </div>
          </div>
          
          {/* Price */}
          <div className="text-2xl font-bold mb-4">
            {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </div>
          
          {/* Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Availability */}
          <div className="flex items-center mb-6">
            <span className="mr-2">Disponibilité:</span>
            {product.inStock ? (
              <span className="text-green-600 flex items-center">
                <Check size={16} className="mr-1" />
                En stock
              </span>
            ) : (
              <span className="text-red-500">Rupture de stock</span>
            )}
          </div>
          
          {/* Quantity and Add to cart */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="mr-4">Quantité:</span>
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={decrementQuantity}
                  className="p-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-0"
                />
                <button 
                  onClick={incrementQuantity}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2" size={18} />
              Ajouter au panier
            </Button>
          </div>
          
          {/* Shipping info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-start">
              <Truck className="mr-2 flex-shrink-0 mt-1" size={18} />
              <div>
                <p className="font-semibold">Livraison</p>
                <p className="text-sm text-gray-600">
                  Livraison gratuite à partir de 50€ d'achat. Livraison estimée sous 2-4 jours ouvrables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="specifications">Spécifications</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-4 bg-white rounded-b-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Description du produit</h3>
            <p>{product.description}</p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
              Sed euismod, nisl vel lacinia tincidunt, nisl nisl aliquam nisl, vel 
              aliquet nisl nisl vel nisl.
            </p>
          </TabsContent>
          <TabsContent value="specifications" className="p-4 bg-white rounded-b-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Spécifications techniques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Caractéristiques</h4>
                <ul className="space-y-1">
                  <li className="flex">
                    <span className="font-medium w-1/3">Marque</span>
                    <span className="w-2/3">TechBrand</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-1/3">Modèle</span>
                    <span className="w-2/3">2023</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-1/3">Garantie</span>
                    <span className="w-2/3">2 ans</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Dimensions</h4>
                <ul className="space-y-1">
                  <li className="flex">
                    <span className="font-medium w-1/3">Poids</span>
                    <span className="w-2/3">0.5 kg</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-1/3">Dimensions</span>
                    <span className="w-2/3">10 x 15 x 2 cm</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4 bg-white rounded-b-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Avis clients</h3>
            <div className="mb-4">
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
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
                <span className="text-xl font-semibold">{product.rating.toFixed(1)}/5</span>
                <span className="text-gray-600 ml-2">(24 avis)</span>
              </div>
            </div>
            
            {/* Sample reviews */}
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Marie D.</span>
                  <span className="text-gray-600 text-sm">Il y a 2 jours</span>
                </div>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700">
                  Excellent produit, je suis très satisfaite de mon achat. La livraison a été rapide et le produit correspond parfaitement à la description.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Thomas B.</span>
                  <span className="text-gray-600 text-sm">Il y a 1 semaine</span>
                </div>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700">
                  Bon rapport qualité-prix. L'appareil fonctionne bien mais l'autonomie pourrait être meilleure.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
