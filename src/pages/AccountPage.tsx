
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Package, CreditCard, LogOut, ShoppingBag, Edit, Save } from 'lucide-react';

const AccountPage = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [personalInfoEditing, setPersonalInfoEditing] = useState(false);
  const [passwordEditing, setPasswordEditing] = useState(false);
  
  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Mock order history
  const orders = [
    {
      id: '12345',
      date: '2023-05-15',
      status: 'Livré',
      total: 129.99,
      items: 2,
    },
    {
      id: '12346',
      date: '2023-04-28',
      status: 'En cours',
      total: 89.99,
      items: 1,
    },
    {
      id: '12347',
      date: '2023-03-10',
      status: 'Livré',
      total: 234.50,
      items: 3,
    },
  ];
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdatePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setPersonalInfoEditing(false);
      
      toast({
        title: "Informations mises à jour",
        description: "Vos informations personnelles ont été mises à jour avec succès.",
        duration: 3000,
      });
    }, 1000);
  };
  
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setPasswordEditing(false);
      setPasswordInfo({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été mis à jour avec succès.",
        duration: 3000,
      });
    }, 1000);
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
      duration: 3000,
    });
  };
  
  if (!user) {
    return null; // User not authenticated, should be redirected
  }
  
  return (
    <div className="container-custom py-8">
      <div className="md:flex md:gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4 mb-8 md:mb-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <User className="text-primary" size={32} />
              </div>
              <h2 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-2" size={18} />
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:w-3/4">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile" className="flex items-center">
                <User className="mr-2" size={16} />
                Profil
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center">
                <ShoppingBag className="mr-2" size={16} />
                Commandes
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center">
                <CreditCard className="mr-2" size={16} />
                Paiement
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Informations personnelles</CardTitle>
                        <CardDescription>
                          Gérez vos informations personnelles
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPersonalInfoEditing(!personalInfoEditing)}
                      >
                        {personalInfoEditing ? (
                          <Save className="mr-2" size={16} />
                        ) : (
                          <Edit className="mr-2" size={16} />
                        )}
                        {personalInfoEditing ? 'Annuler' : 'Modifier'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdatePersonalInfo}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={personalInfo.firstName}
                            onChange={handlePersonalInfoChange}
                            disabled={!personalInfoEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Nom</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={personalInfo.lastName}
                            onChange={handlePersonalInfoChange}
                            disabled={!personalInfoEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={handlePersonalInfoChange}
                            disabled={!personalInfoEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                            disabled={!personalInfoEditing}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Adresse</Label>
                          <Input
                            id="address"
                            name="address"
                            value={personalInfo.address}
                            onChange={handlePersonalInfoChange}
                            disabled={!personalInfoEditing}
                          />
                        </div>
                      </div>
                      
                      {personalInfoEditing && (
                        <div className="mt-4 flex justify-end">
                          <Button type="submit" disabled={isUpdating}>
                            {isUpdating ? 'Mise à jour...' : 'Enregistrer les modifications'}
                          </Button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Sécurité</CardTitle>
                        <CardDescription>
                          Gérez votre mot de passe
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPasswordEditing(!passwordEditing)}
                      >
                        {passwordEditing ? (
                          <Save className="mr-2" size={16} />
                        ) : (
                          <Edit className="mr-2" size={16} />
                        )}
                        {passwordEditing ? 'Annuler' : 'Modifier'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {passwordEditing ? (
                      <form onSubmit={handleUpdatePassword}>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                            <Input
                              id="currentPassword"
                              name="currentPassword"
                              type="password"
                              value={passwordInfo.currentPassword}
                              onChange={handlePasswordChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                            <Input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              value={passwordInfo.newPassword}
                              onChange={handlePasswordChange}
                              required
                              minLength={8}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Minimum 8 caractères
                            </p>
                          </div>
                          <div>
                            <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={passwordInfo.confirmPassword}
                              onChange={handlePasswordChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Button type="submit" disabled={isUpdating}>
                            {isUpdating ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-600">
                          Pour des raisons de sécurité, le mot de passe n'est pas affiché.
                          Cliquez sur "Modifier" pour changer votre mot de passe.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des commandes</CardTitle>
                  <CardDescription>
                    Consultez vos commandes passées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b">
                            <th className="pb-2">N° de commande</th>
                            <th className="pb-2">Date</th>
                            <th className="pb-2">Statut</th>
                            <th className="pb-2">Total</th>
                            <th className="pb-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order.id} className="border-b">
                              <td className="py-3">#{order.id}</td>
                              <td className="py-3">{order.date}</td>
                              <td className="py-3">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                  order.status === 'Livré' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-3">
                                {order.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                              </td>
                              <td className="py-3">
                                <Button variant="ghost" size="sm">
                                  Détails
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="mx-auto text-gray-400 mb-4" size={48} />
                      <h3 className="text-lg font-semibold mb-2">Aucune commande</h3>
                      <p className="text-gray-600">
                        Vous n'avez pas encore passé de commande.
                      </p>
                      <Button className="mt-4">
                        Voir nos produits
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payment Tab */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Méthodes de paiement</CardTitle>
                  <CardDescription>
                    Gérez vos méthodes de paiement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CreditCard className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-lg font-semibold mb-2">Aucune méthode de paiement</h3>
                    <p className="text-gray-600">
                      Vous n'avez pas encore enregistré de méthode de paiement.
                    </p>
                    <Button className="mt-4">
                      Ajouter une méthode de paiement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
