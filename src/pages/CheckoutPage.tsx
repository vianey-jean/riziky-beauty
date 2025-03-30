
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, CreditCard } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

enum CheckoutStep {
  Shipping = 'shipping',
  Payment = 'payment',
  Review = 'review',
  Confirmation = 'confirmation'
}

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.Shipping);
  
  // Shipping info
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: user?.address || '',
    city: '',
    postalCode: '',
    country: 'France',
    phone: user?.phone || '',
    email: user?.email || '',
  });
  
  const [saveShippingInfo, setSaveShippingInfo] = useState(true);
  
  // Shipping method
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  // Payment info
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });
  
  // Shipping costs
  const shippingCosts = {
    standard: 5.99,
    express: 12.99,
    free: 0,
  };
  
  const shipping = totalPrice > 50 ? shippingCosts.free : shippingCosts[shippingMethod as keyof typeof shippingCosts];
  const total = totalPrice + shipping;
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate shipping info
    setCurrentStep(CheckoutStep.Payment);
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate payment info
    setCurrentStep(CheckoutStep.Review);
    window.scrollTo(0, 0);
  };
  
  const handleOrderSubmit = () => {
    // Process the order
    // In a real app, this would send the order to the server
    
    // Show loading state
    toast({
      title: "Traitement de la commande",
      description: "Veuillez patienter pendant que nous traitons votre commande...",
    });
    
    // Simulate API call
    setTimeout(() => {
      setCurrentStep(CheckoutStep.Confirmation);
      clearCart();
      window.scrollTo(0, 0);
    }, 2000);
  };
  
  // If the cart is empty, redirect to the cart page
  if (items.length === 0 && currentStep !== CheckoutStep.Confirmation) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="container-custom py-8">
      {/* Checkout steps */}
      <div className="mb-8">
        <div className="grid grid-cols-4 text-sm md:text-base">
          <div className={`text-center ${currentStep === CheckoutStep.Shipping || currentStep === CheckoutStep.Payment || currentStep === CheckoutStep.Review || currentStep === CheckoutStep.Confirmation ? 'text-primary font-semibold' : 'text-gray-500'}`}>
            1. Livraison
          </div>
          <div className={`text-center ${currentStep === CheckoutStep.Payment || currentStep === CheckoutStep.Review || currentStep === CheckoutStep.Confirmation ? 'text-primary font-semibold' : 'text-gray-500'}`}>
            2. Paiement
          </div>
          <div className={`text-center ${currentStep === CheckoutStep.Review || currentStep === CheckoutStep.Confirmation ? 'text-primary font-semibold' : 'text-gray-500'}`}>
            3. Vérification
          </div>
          <div className={`text-center ${currentStep === CheckoutStep.Confirmation ? 'text-primary font-semibold' : 'text-gray-500'}`}>
            4. Confirmation
          </div>
        </div>
        <div className="relative mt-2">
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded"></div>
          <div className={`absolute top-1/2 transform -translate-y-1/2 h-1 bg-primary rounded transition-all ${
            currentStep === CheckoutStep.Shipping ? 'w-1/4' :
            currentStep === CheckoutStep.Payment ? 'w-2/4' :
            currentStep === CheckoutStep.Review ? 'w-3/4' :
            'w-full'
          }`}></div>
        </div>
      </div>
      
      {/* Checkout content */}
      <div className="lg:flex lg:gap-8">
        {/* Main checkout form */}
        <div className="lg:w-2/3">
          {/* Shipping step */}
          {currentStep === CheckoutStep.Shipping && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Informations de livraison</h2>
              
              <form onSubmit={handleShippingSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Pays</Label>
                    <Input
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox
                      id="saveShippingInfo"
                      checked={saveShippingInfo}
                      onCheckedChange={(checked) => setSaveShippingInfo(checked as boolean)}
                    />
                    <label
                      htmlFor="saveShippingInfo"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Sauvegarder ces informations pour mes prochaines commandes
                    </label>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <h3 className="font-semibold mb-3">Méthode de livraison</h3>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                    <div className="grid gap-2">
                      <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="standard" id="shipping-standard" />
                        <Label htmlFor="shipping-standard" className="flex flex-col flex-1 cursor-pointer">
                          <span className="font-semibold">Standard (2-4 jours ouvrables)</span>
                          <span className="text-gray-500 text-sm">
                            {totalPrice > 50 ? 'Gratuit' : '5,99 €'}
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="express" id="shipping-express" />
                        <Label htmlFor="shipping-express" className="flex flex-col flex-1 cursor-pointer">
                          <span className="font-semibold">Express (1-2 jours ouvrables)</span>
                          <span className="text-gray-500 text-sm">12,99 €</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="text-right">
                  <Button type="submit" size="lg">
                    Continuer vers le paiement
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Payment step */}
          {currentStep === CheckoutStep.Payment && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Méthode de paiement</h2>
              
              <form onSubmit={handlePaymentSubmit}>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                  <div className="grid gap-3">
                    <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="credit-card" id="payment-card" />
                      <Label htmlFor="payment-card" className="flex flex-1 cursor-pointer">
                        <span className="font-semibold">Carte de crédit / débit</span>
                        <div className="ml-auto flex space-x-2">
                          <span className="font-semibold">Visa</span>
                          <span className="font-semibold">MasterCard</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="paypal" id="payment-paypal" />
                      <Label htmlFor="payment-paypal" className="flex flex-1 cursor-pointer">
                        <span className="font-semibold">PayPal</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
                
                {paymentMethod === 'credit-card' && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <div className="flex items-center">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={cardInfo.cardNumber}
                          onChange={handleCardInfoChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                        <CreditCard className="ml-2 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardHolder">Titulaire de la carte</Label>
                      <Input
                        id="cardHolder"
                        name="cardHolder"
                        value={cardInfo.cardHolder}
                        onChange={handleCardInfoChange}
                        placeholder="NOM PRÉNOM"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Date d'expiration (MM/AA)</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          value={cardInfo.expiry}
                          onChange={handleCardInfoChange}
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={cardInfo.cvv}
                          onChange={handleCardInfoChange}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8 text-gray-600">
                    Vous serez redirigé vers PayPal pour compléter votre paiement après la vérification de votre commande.
                  </div>
                )}
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setCurrentStep(CheckoutStep.Shipping)}
                  >
                    Retour
                  </Button>
                  <Button type="submit">
                    Continuer
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {/* Review step */}
          {currentStep === CheckoutStep.Review && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Vérification de la commande</h2>
              
              <div className="space-y-6">
                {/* Shipping information */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Informations de livraison</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setCurrentStep(CheckoutStep.Shipping)}
                    >
                      Modifier
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p>
                      {shippingInfo.firstName} {shippingInfo.lastName}
                    </p>
                    <p>{shippingInfo.address}</p>
                    <p>
                      {shippingInfo.postalCode} {shippingInfo.city}, {shippingInfo.country}
                    </p>
                    <p>{shippingInfo.phone}</p>
                    <p>{shippingInfo.email}</p>
                    <p className="mt-2 font-medium">
                      Méthode de livraison: {shippingMethod === 'standard' ? 'Standard (2-4 jours)' : 'Express (1-2 jours)'}
                    </p>
                  </div>
                </div>
                
                {/* Payment information */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Méthode de paiement</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setCurrentStep(CheckoutStep.Payment)}
                    >
                      Modifier
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    {paymentMethod === 'credit-card' ? (
                      <p>
                        Carte de crédit se terminant par {cardInfo.cardNumber.slice(-4)}
                      </p>
                    ) : (
                      <p>PayPal</p>
                    )}
                  </div>
                </div>
                
                {/* Order items */}
                <div>
                  <h3 className="font-semibold mb-2">Articles ({items.length})</h3>
                  <div className="divide-y">
                    {items.map(item => (
                      <div key={item.id} className="py-3 flex">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-gray-600">Quantité: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {(item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} par unité
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(CheckoutStep.Payment)}
                  >
                    Retour
                  </Button>
                  <Button onClick={handleOrderSubmit}>
                    Confirmer et payer
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Confirmation step */}
          {currentStep === CheckoutStep.Confirmation && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
              <div className="mb-4 text-green-500">
                <CheckCircle size={64} className="mx-auto" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Commande confirmée!</h2>
              <p className="mb-4">
                Merci pour votre commande. Votre numéro de commande est <strong>#12345</strong>.
              </p>
              <p className="mb-8 text-gray-600">
                Vous recevrez un e-mail de confirmation à <strong>{shippingInfo.email}</strong> avec les détails de votre commande.
              </p>
              <div className="flex justify-center">
                <Button onClick={() => navigate('/')}>
                  Retour à l'accueil
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Order summary */}
        {currentStep !== CheckoutStep.Confirmation && (
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>
              
              <div className="mb-4">
                <p className="text-gray-600 mb-2">{items.length} articles</p>
                <div className="max-h-60 overflow-y-auto divide-y">
                  {items.map(item => (
                    <div key={item.id} className="py-2 flex items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-gray-600 text-xs">Qté: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">
                        {(item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>
                    {totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span>
                    {shipping === 0 
                      ? 'Gratuit' 
                      : shipping.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
