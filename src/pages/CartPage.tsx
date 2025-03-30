
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  
  const shipping = items.length > 0 ? 5.99 : 0;
  const total = totalPrice + shipping;
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    // Simulate API call
    setTimeout(() => {
      setCouponMessage('Code promo non valide');
      setIsApplyingCoupon(false);
    }, 1000);
  };
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-gray-600 mb-6">
            Il semble que vous n'ayez pas encore ajouté d'articles à votre panier.
          </p>
          <Link to="/products">
            <Button size="lg">
              Découvrir nos produits
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <ShoppingCart className="mr-2" />
        Votre Panier
      </h1>
      
      <div className="lg:flex lg:space-x-8">
        {/* Cart items */}
        <div className="lg:w-2/3">
          {/* Column headers - desktop only */}
          <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-semibold text-gray-600 p-4 bg-gray-50 rounded">
            <div className="col-span-6">Produit</div>
            <div className="col-span-2 text-center">Prix</div>
            <div className="col-span-2 text-center">Quantité</div>
            <div className="col-span-2 text-center">Total</div>
          </div>
          
          {/* Cart items */}
          <div className="space-y-4">
            {items.map(item => (
              <div 
                key={item.id} 
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border rounded-lg p-4 bg-white"
              >
                {/* Product image and info */}
                <div className="col-span-1 md:col-span-6 flex items-center space-x-4">
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  </Link>
                  <div>
                    <Link 
                      to={`/product/${item.id}`}
                      className="font-semibold hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm flex items-center mt-1"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Supprimer
                    </button>
                  </div>
                </div>
                
                {/* Price */}
                <div className="col-span-1 md:col-span-2 text-center md:text-center flex justify-between md:block">
                  <span className="md:hidden font-semibold">Prix:</span>
                  <span>
                    {item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
                
                {/* Quantity */}
                <div className="col-span-1 md:col-span-2 flex justify-between items-center md:justify-center">
                  <span className="md:hidden font-semibold">Quantité:</span>
                  <div className="flex items-center border rounded">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                
                {/* Total */}
                <div className="col-span-1 md:col-span-2 text-center md:text-center flex justify-between md:block">
                  <span className="md:hidden font-semibold">Total:</span>
                  <span className="font-semibold">
                    {(item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Cart actions */}
          <div className="flex justify-between items-center mt-6">
            <Link to="/products">
              <Button variant="outline">
                Continuer les achats
              </Button>
            </Link>
            <Button 
              variant="destructive" 
              onClick={clearCart}
            >
              <Trash2 size={16} className="mr-2" />
              Vider le panier
            </Button>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Récapitulatif de la commande</h2>
            
            {/* Coupon form */}
            <form onSubmit={handleApplyCoupon} className="mb-6">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Code promo"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button 
                  type="submit"
                  variant="outline"
                  disabled={isApplyingCoupon}
                >
                  Appliquer
                </Button>
              </div>
              {couponMessage && (
                <p className="text-red-500 text-sm mt-1">{couponMessage}</p>
              )}
            </form>
            
            {/* Summary */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>
                  {totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span>
                  {shipping.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
              <div className="border-t my-4"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  {total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </span>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleCheckout}
            >
              Passer à la caisse
              <ArrowRight size={16} className="ml-2" />
            </Button>
            
            {/* Payment methods */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Moyens de paiement acceptés:</p>
              <div className="flex space-x-2">
                <div className="bg-gray-100 rounded p-2">
                  <span className="font-semibold">Visa</span>
                </div>
                <div className="bg-gray-100 rounded p-2">
                  <span className="font-semibold">MasterCard</span>
                </div>
                <div className="bg-gray-100 rounded p-2">
                  <span className="font-semibold">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
