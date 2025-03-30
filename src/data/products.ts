
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    inStock: boolean;
    featured: boolean;
    rating: number;
  }
  
  // Mock products data
  export const products: Product[] = [
    {
      id: 1,
      name: "Smartphone Premium",
      description: "Dernier modèle de smartphone avec caméra 108MP, écran OLED et processeur ultra-rapide.",
      price: 899.99,
      images: [
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2027&q=80"
      ],
      category: "Électronique",
      inStock: true,
      featured: true,
      rating: 4.8
    },
    {
      id: 2,
      name: "Ordinateur Portable Ultrabook",
      description: "Ordinateur portable léger et puissant pour les professionnels et créatifs.",
      price: 1299.99,
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
      ],
      category: "Électronique",
      inStock: true,
      featured: true,
      rating: 4.6
    },
    {
      id: 3,
      name: "Écouteurs Sans Fil Pro",
      description: "Écouteurs avec réduction de bruit active et qualité sonore exceptionnelle.",
      price: 249.99,
      images: [
        "https://images.unsplash.com/photo-1590658268037-1e2a48a94195?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ],
      category: "Électronique",
      inStock: true,
      featured: false,
      rating: 4.7
    },
    {
      id: 4,
      name: "Montre Intelligente",
      description: "Montre connectée avec suivi santé, notifications et GPS intégré.",
      price: 299.99,
      images: [
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
        "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ],
      category: "Accessoires",
      inStock: true,
      featured: true,
      rating: 4.5
    },
    {
      id: 5,
      name: "Enceinte Bluetooth Portable",
      description: "Enceinte résistante à l'eau avec 24h d'autonomie et son immersif.",
      price: 129.99,
      images: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80",
        "https://images.unsplash.com/photo-1589491106920-0a470b7c31c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
      ],
      category: "Audio",
      inStock: true,
      featured: false,
      rating: 4.4
    },
    {
      id: 6,
      name: "Appareil Photo Mirrorless",
      description: "Appareil photo professionnel léger avec capteur plein format.",
      price: 1499.99,
      images: [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1538&q=80",
        "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ],
      category: "Photographie",
      inStock: false,
      featured: true,
      rating: 4.9
    },
    {
      id: 7,
      name: "Tablette Graphique",
      description: "Tablette pour artistes et designers avec stylet sensible à la pression.",
      price: 799.99,
      images: [
        "https://images.unsplash.com/photo-1623934199716-711d34598dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1561505457-62c5d38efa82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      ],
      category: "Accessoires",
      inStock: true,
      featured: false,
      rating: 4.6
    },
    {
      id: 8,
      name: "Console de Jeux",
      description: "Dernière génération de console avec graphismes 4K et manette sans fil.",
      price: 499.99,
      images: [
        "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
      ],
      category: "Jeux Vidéo",
      inStock: true,
      featured: true,
      rating: 4.8
    }
  ];
  
  // Get a product by ID
  export const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };
  
  // Get featured products
  export const getFeaturedProducts = (): Product[] => {
    return products.filter(product => product.featured);
  };
  
  // Get products by category
  export const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => product.category === category);
  };
  
  // Search products
  export const searchProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      product => 
        product.name.toLowerCase().includes(lowercaseQuery) || 
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );
  };
  
  // Get all product categories
  export const getCategories = (): string[] => {
    const categoriesSet = new Set(products.map(product => product.category));
    return Array.from(categoriesSet);
  };
  
  // Get best selling products (mock implementation)
  export const getBestSellingProducts = (): Product[] => {
    // In a real app, this would be based on actual sales data
    return products.slice(0, 4);
  };
  