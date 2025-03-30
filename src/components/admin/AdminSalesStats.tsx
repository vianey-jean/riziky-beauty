
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart as BarChartIcon, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

// Données fictives pour les graphiques
const monthlySalesData = [
  { name: 'Jan', total: 1500 },
  { name: 'Fév', total: 2300 },
  { name: 'Mar', total: 3200 },
  { name: 'Avr', total: 2800 },
  { name: 'Mai', total: 3800 },
  { name: 'Juin', total: 4300 },
  { name: 'Juil', total: 4100 },
  { name: 'Août', total: 4700 },
  { name: 'Sep', total: 5200 },
  { name: 'Oct', total: 4800 },
  { name: 'Nov', total: 6000 },
  { name: 'Déc', total: 7200 },
];

const topProductsData = [
  { name: 'Smartphone XYZ', total: 450 },
  { name: 'Écouteurs Bluetooth', total: 380 },
  { name: 'Montre connectée', total: 320 },
  { name: 'Ordinateur portable', total: 280 },
  { name: 'Tablette tactile', total: 250 },
];

const AdminSalesStats = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Ventes mensuelles</CardTitle>
              <CardDescription>
                Évolution des ventes au cours de l'année
              </CardDescription>
            </div>
            <BarChartIcon className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} €`, 'Ventes']}
                    labelFormatter={(label) => `Mois: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="total" name="Ventes (€)" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Produits les plus vendus</CardTitle>
              <CardDescription>
                Top 5 des produits par nombre de ventes
              </CardDescription>
            </div>
            <TrendingUp className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={topProductsData} 
                  layout="vertical" 
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip 
                    formatter={(value) => [`${value} unités`, 'Ventes']}
                    labelFormatter={(label) => `Produit: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="total" name="Unités vendues" fill="#F97316" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tendances des ventes</CardTitle>
          <CardDescription>
            Analyse comparative des ventes sur les 12 derniers mois
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="annee">
            <TabsList className="mb-4">
              <TabsTrigger value="annee">Année</TabsTrigger>
              <TabsTrigger value="trimestre">Trimestre</TabsTrigger>
              <TabsTrigger value="mois">Mois</TabsTrigger>
            </TabsList>
            <TabsContent value="annee" className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} €`, 'Ventes']}
                    labelFormatter={(label) => `Mois: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    name="Ventes (€)" 
                    stroke="#4F46E5" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="trimestre" className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={monthlySalesData.slice(6)} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} €`, 'Ventes']}
                    labelFormatter={(label) => `Mois: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    name="Ventes (€)" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="mois" className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={monthlySalesData.slice(9)} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} €`, 'Ventes']}
                    labelFormatter={(label) => `Mois: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    name="Ventes (€)" 
                    stroke="#F97316" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSalesStats;
