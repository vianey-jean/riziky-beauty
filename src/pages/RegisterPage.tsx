
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, User, Mail, Phone, Lock, MapPin } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect URL from query params
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect') || '/';
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions d'utilisation.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API to send verification code
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowVerification(true);
      toast({
        title: "Code envoyé",
        description: "Un code de vérification a été envoyé à votre adresse email.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le compte.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer le code de vérification.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would verify the code with an API
      // For demo, we'll simulate a successful verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After verification, register the user
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
      });
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
        duration: 3000,
      });
      
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Code de vérification invalide.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Créer un compte</h1>
          <p className="text-gray-600">
            Rejoignez Riziky-Beaute pour profiter de nos services
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          {!showVerification ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Jean"
                      className="pl-10"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Dupont"
                      className="pl-10"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="jean.dupont@exemple.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+33 6 12 34 56 78"
                      className="pl-10"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="address">Adresse</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="123 Rue de Paris, 75001 Paris"
                      className="pl-10"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 8 caractères
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="••••••••"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm">
                    J'accepte les{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      conditions d'utilisation
                    </Link>{' '}
                    et la{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      politique de confidentialité
                    </Link>
                  </Label>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Traitement en cours...' : 'Créer un compte'}
                <ArrowRight className="ml-2" size={16} />
              </Button>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Vous avez déjà un compte?{' '}
                  <Link
                    to={`/login${redirectTo !== '/' ? `?redirect=${redirectTo}` : ''}`}
                    className="text-primary font-semibold hover:underline"
                  >
                    Se connecter
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">Vérification de l'email</h2>
                <p className="text-gray-600">
                  Nous avons envoyé un code de vérification à <strong>{formData.email}</strong>.
                  Veuillez entrer ce code ci-dessous pour compléter votre inscription.
                </p>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="verificationCode">Code de vérification</Label>
                <Input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Entrez le code à 6 chiffres"
                  className="text-center text-lg tracking-widest"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Vérification en cours...' : 'Vérifier et créer le compte'}
              </Button>
              
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-primary hover:underline text-sm"
                  onClick={() => {
                    // In a real app, this would resend the verification code
                    toast({
                      title: "Code renvoyé",
                      description: "Un nouveau code de vérification a été envoyé à votre adresse email.",
                      duration: 3000,
                    });
                  }}
                >
                  Renvoyer le code
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
