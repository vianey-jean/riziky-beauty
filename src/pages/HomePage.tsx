
import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts, getCategories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  const categories = getCategories();
  
  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Découvrez les meilleurs produits tech
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Des smartphones aux ordinateurs portables, en passant par les accessoires indispensables pour votre quotidien.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" variant="secondary">
                  Voir les produits
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Produits populaires</h2>
            <Link to="/products" className="text-primary flex items-center hover:underline">
              Voir tous
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Parcourir par catégorie
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link 
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="relative rounded-lg overflow-hidden h-40 group"
              >
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Promo section */}
      <section className="py-16 bg-secondary/10">
        <div className="container-custom">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Inscrivez-vous et bénéficiez de 10% sur votre première commande
              </h2>
              <p className="text-lg mb-6">
                Rejoignez notre communauté et soyez le premier à découvrir nos nouveaux produits et offres spéciales.
              </p>
              <Link to="/register">
                <Button size="lg">
                  S'inscrire maintenant
                </Button>
              </Link>
            </div>
            
            <div className="md:w-1/3">
              {/* Placeholder for a nice image */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Avantages membres</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>Livraison gratuite sur les commandes de +100€</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>Accès prioritaire aux ventes privées</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>Garantie prolongée sur certains produits</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
