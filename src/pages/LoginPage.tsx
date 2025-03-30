
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect URL from query params
  const queryParams = new URLSearchParams(location.search);
  const redirectTo = queryParams.get('redirect') || '/';
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset password state
  const [resetEmail, setResetEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté.",
        duration: 3000,
      });
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Identifiants incorrects.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    
    setIsResetting(true);
    
    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Email envoyé",
        description: "Un email a été envoyé avec les instructions pour réinitialiser votre mot de passe.",
        duration: 5000,
      });
      setResetEmail('');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email de réinitialisation.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsResetting(false);
    }
  };
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Bienvenue sur Riziky-Beaute</h1>
          <p className="text-gray-600">
            Connectez-vous pour accéder à votre compte
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="reset">Mot de passe oublié</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        type="email"
                        id="email"
                        placeholder="votre.email@exemple.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="••••••••"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember" className="text-sm">Se souvenir de moi</Label>
                    </div>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Pas encore de compte?{' '}
                  <Link
                    to={`/register${redirectTo !== '/' ? `?redirect=${redirectTo}` : ''}`}
                    className="text-primary font-semibold hover:underline"
                  >
                    S'inscrire
                  </Link>
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="reset">
              <form onSubmit={handleResetPassword}>
                <div className="space-y-4 mb-6">
                  <p className="text-gray-600 mb-4">
                    Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe.
                  </p>
                  <div>
                    <Label htmlFor="reset-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        type="email"
                        id="reset-email"
                        placeholder="votre.email@exemple.com"
                        className="pl-10"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isResetting}
                >
                  {isResetting ? 'Envoi en cours...' : 'Réinitialiser le mot de passe'}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Vous vous souvenez de votre mot de passe?{' '}
                  <Link to="/login" className="text-primary font-semibold hover:underline">
                    Se connecter
                  </Link>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
