
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { getCategories } from '@/data/products';

interface AdminAddEditProductProps {
  product: any | null;
  onCancel: () => void;
  onSave: () => void;
}

const AdminAddEditProduct: React.FC<AdminAddEditProductProps> = ({ 
  product, 
  onCancel, 
  onSave 
}) => {
  const isEditing = !!product;
  const [formState, setFormState] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
    images: product?.images || [''],
  });

  const { toast } = useToast();
  const categories = getCategories();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setFormState(prev => ({ ...prev, [name]: checked }));
  };

  const handleCategoryChange = (value: string) => {
    setFormState(prev => ({ ...prev, category: value }));
  };

  const handleAddImage = () => {
    setFormState(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const handleRemoveImage = (index: number) => {
    if (formState.images.length === 1) return;
    
    setFormState(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    setFormState(prev => ({
      ...prev,
      images: prev.images.map((url, i) => (i === index ? value : url))
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formState.name || !formState.price || !formState.category || 
        !formState.description || !formState.images[0]) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would submit to an API
    toast({
      title: isEditing ? "Produit mis à jour" : "Produit ajouté",
      description: `Le produit ${formState.name} a été ${isEditing ? 'mis à jour' : 'ajouté'} avec succès.`,
    });

    onSave();
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">
          {isEditing ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
        </h3>
        <p className="text-sm text-gray-500">
          {isEditing 
            ? 'Modifiez les détails du produit ci-dessous' 
            : 'Remplissez les détails du nouveau produit ci-dessous'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit *</Label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Nom du produit"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix (€) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formState.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie *</Label>
            <Select 
              value={formState.category} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              placeholder="Description du produit"
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Images du produit *</Label>
            {formState.images.map((image, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="URL de l'image"
                  required={index === 0}
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => handleRemoveImage(index)}
                  disabled={formState.images.length === 1 && index === 0}
                >
                  Supprimer
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddImage}>
              Ajouter une image
            </Button>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="flex items-center space-x-2">
              <Switch 
                id="inStock" 
                checked={formState.inStock}
                onCheckedChange={handleSwitchChange('inStock')}
              />
              <Label htmlFor="inStock">En stock</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="featured" 
                checked={formState.featured}
                onCheckedChange={handleSwitchChange('featured')}
              />
              <Label htmlFor="featured">Produit en vedette</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {isEditing ? 'Mettre à jour' : 'Ajouter le produit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddEditProduct;
