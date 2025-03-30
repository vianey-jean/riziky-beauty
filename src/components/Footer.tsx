
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Riziky-Beaute</h3>
            <p className="text-gray-400 mb-4">
              Votre destination pour trouver les meilleurs produits électroniques et accessoires.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Catégories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Électronique" className="text-gray-400 hover:text-white transition-colors">
                  Électronique
                </Link>
              </li>
              <li>
                <Link to="/products?category=Accessoires" className="text-gray-400 hover:text-white transition-colors">
                  Accessoires
                </Link>
              </li>
              <li>
                <Link to="/products?category=Audio" className="text-gray-400 hover:text-white transition-colors">
                  Audio
                </Link>
              </li>
              <li>
                <Link to="/products?category=Photographie" className="text-gray-400 hover:text-white transition-colors">
                  Photographie
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  123 Rue de Commerce, 75001 Paris, France
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-gray-400">+33 (0)1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-gray-400">contact@Riziky-Beaute.fr</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Riziky-Beaute. Tous droits réservés.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
