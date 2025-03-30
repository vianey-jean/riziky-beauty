
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminProductTable from '@/components/admin/AdminProductTable';
import AdminAddEditProduct from '@/components/admin/AdminAddEditProduct';
import AdminSalesStats from '@/components/admin/AdminSalesStats';
import { BarChart, Store, Package, UsersRound } from 'lucide-react';

const AdminDashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Admin access check - in a real app, you'd check user roles
  // This is a simple workaround for demo purposes
  if (!isAuthenticated) {
    navigate('/login?redirect=admin');
    return null;
  }

  // Mock admin check based on email
  if (user?.email !== 'admin@example.com') {
    return (
      <div className="container-custom py-16">
        <Card>
          <CardHeader>
            <CardTitle>Accès non autorisé</CardTitle>
            <CardDescription>
              Vous n'avez pas les droits d'accès pour cette section.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Seuls les administrateurs peuvent accéder à cette page. Si vous pensez qu'il s'agit d'une erreur, veuillez contacter le support.
            </p>
            <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de Bord Administrateur</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,543 €</div>
            <p className="text-xs text-muted-foreground">+18% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">432</div>
            <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+8 nouveaux produits cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,765</div>
            <p className="text-xs text-muted-foreground">+32 nouveaux clients cette semaine</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Gestion des Produits</TabsTrigger>
          <TabsTrigger value="sales">Statistiques des Ventes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          {isAddingProduct || editingProduct ? (
            <AdminAddEditProduct 
              product={editingProduct} 
              onCancel={() => {
                setIsAddingProduct(false);
                setEditingProduct(null);
              }}
              onSave={() => {
                setIsAddingProduct(false);
                setEditingProduct(null);
              }}
            />
          ) : (
            <>
              <div className="flex justify-end">
                <Button onClick={() => setIsAddingProduct(true)}>
                  Ajouter un Produit
                </Button>
              </div>
              <AdminProductTable 
                onEdit={setEditingProduct} 
              />
            </>
          )}
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-4">
          <AdminSalesStats />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardPage;
