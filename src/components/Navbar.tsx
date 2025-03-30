
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            Riziky Beauté
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link to="/products" className="hover:text-primary transition-colors">
              Produits
            </Link>
            <form onSubmit={handleSearch} className="relative w-64">
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search size={18} />
              </button>
            </form>
          </nav>
          
          {/* User and cart actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User size={20} />
                  <span>{user?.firstName}</span>
                </Button>
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg hidden group-hover:block">
                  <div className="py-1">
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mon compte
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mes commandes
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button>Se connecter</Button>
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <nav className="flex flex-col space-y-4 mb-4">
              <Link 
                to="/" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/products" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Produits
              </Link>
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Search size={18} />
                </button>
              </form>
            </nav>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <Link 
                to="/cart" 
                className="relative flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart />
                <span>Panier</span>
                {totalItems > 0 && (
                  <span className="bg-secondary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/account" 
                    className="text-sm hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mon compte
                  </Link>
                  <Link 
                    to="/orders" 
                    className="text-sm hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mes commandes
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm text-left text-red-500 hover:text-red-700"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button>Se connecter</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
