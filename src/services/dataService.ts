// Simple in-memory data service
// In a real application, this would connect to a backend API

// Types for our data
export interface Product {
  id: number;
  name: string;
  description: string;
  dimensions: string;
  category: string;
  useCase: string;
  image: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface CarouselImage {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

// Initial sample data
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Royal Crown Cornice",
    description: "Elegant cornice design with intricate detailing.",
    dimensions: "12cm height x 15cm projection",
    category: "Ceiling Cornices",
    useCase: "Living Rooms, Dining Rooms",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    isFeatured: true,
    isNewArrival: false
  },
  {
    id: 2,
    name: "Geometric 3D Wall Panel",
    description: "Modern geometric pattern that creates a stunning visual effect.",
    dimensions: "50cm x 50cm panels",
    category: "3D Panels",
    useCase: "Feature Walls, Office Spaces",
    image: "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c",
    isFeatured: true,
    isNewArrival: false
  },
  {
    id: 3,
    name: "Classic Ceiling Medallion",
    description: "Traditional ceiling medallion with floral motif.",
    dimensions: "60cm diameter",
    category: "Ceiling Medallions",
    useCase: "Dining Rooms, Entryways",
    image: "https://images.unsplash.com/photo-1603203040289-611d79cb1fe7",
    isFeatured: false,
    isNewArrival: true
  }
];

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Ceiling Cornices",
    description: "Elegant ceiling trim designs to enhance your room's perimeter.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
  },
  {
    id: 2,
    name: "Wall Panels",
    description: "Add texture and dimension to your walls with decorative panels.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea"
  },
  {
    id: 3,
    name: "Light Troughs",
    description: "Create ambient lighting with our recessed ceiling designs.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
  },
  {
    id: 4,
    name: "Columns & Pillars",
    description: "Classic and modern column designs for architectural accents.",
    image: "https://images.unsplash.com/photo-1505796149773-5d216eb9ac6d"
  }
];

// Create localStorage keys
const PRODUCTS_STORAGE_KEY = 'gypsum-cms-products';
const CATEGORIES_STORAGE_KEY = 'gypsum-cms-categories';

// Helper function to initialize data
const initializeData = <T>(key: string, initialData: T[]): T[] => {
  try {
    const storedData = localStorage.getItem(key);
    if (!storedData) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(storedData);
  } catch (error) {
    console.error(`Error initializing ${key} data:`, error);
    return initialData;
  }
};

// Products CRUD operations
export const getProducts = (): Product[] => {
  return initializeData<Product>(PRODUCTS_STORAGE_KEY, initialProducts);
};

export const getProductById = (id: number): Product | null => {
  const products = getProducts();
  return products.find(product => product.id === id) || null;
};

export const getFeaturedProducts = (): Product[] => {
  const products = getProducts();
  return products.filter(product => product.isFeatured);
};

export const getNewArrivals = (): Product[] => {
  const products = getProducts();
  return products.filter(product => product.isNewArrival);
};

export const addProduct = (product: Omit<Product, "id">): Product => {
  const products = getProducts();
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  
  const newProduct: Product = {
    ...product,
    id: newId
  };
  
  const updatedProducts = [...products, newProduct];
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));
  
  return newProduct;
};

export const updateProduct = (product: Product): Product => {
  // Ensure a product can't be both featured and new arrival
  if (product.isFeatured && product.isNewArrival) {
    product.isNewArrival = false;
  }
  
  const products = getProducts();
  const updatedProducts = products.map(p => 
    p.id === product.id ? product : p
  );
  
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));
  return product;
};

export const deleteProduct = (id: number): void => {
  const products = getProducts();
  const updatedProducts = products.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedProducts));
};

// Categories CRUD operations
export const getCategories = (): Category[] => {
  return initializeData<Category>(CATEGORIES_STORAGE_KEY, initialCategories);
};

export const addCategory = (category: Omit<Category, "id">): Category => {
  const categories = getCategories();
  const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
  
  const newCategory: Category = {
    ...category,
    id: newId
  };
  
  const updatedCategories = [...categories, newCategory];
  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updatedCategories));
  
  return newCategory;
};

export const updateCategory = (category: Category): Category => {
  const categories = getCategories();
  const updatedCategories = categories.map(c => 
    c.id === category.id ? category : c
  );
  
  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updatedCategories));
  return category;
};

export const deleteCategory = (id: number): void => {
  const categories = getCategories();
  const updatedCategories = categories.filter(c => c.id !== id);
  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updatedCategories));
};

// Get category names for dropdown
export const getCategoryNames = (): string[] => {
  const categories = getCategories();
  return categories.map(category => category.name);
};

// Get carousel images from localStorage
export const getCarouselImages = (): CarouselImage[] => {
  const images = localStorage.getItem("carouselImages");
  return images ? JSON.parse(images) : [];
};

// Add a new carousel image
export const addCarouselImage = (image: Omit<CarouselImage, "id">) => {
  const images = getCarouselImages();
  const newImage = {
    ...image,
    id: Date.now()
  };
  
  localStorage.setItem("carouselImages", JSON.stringify([...images, newImage]));
  return newImage;
};

// Update an existing carousel image
export const updateCarouselImage = (updatedImage: CarouselImage) => {
  const images = getCarouselImages();
  const updatedImages = images.map(img => 
    img.id === updatedImage.id ? updatedImage : img
  );
  
  localStorage.setItem("carouselImages", JSON.stringify(updatedImages));
  return updatedImage;
};

// Delete a carousel image
export const deleteCarouselImage = (id: number) => {
  const images = getCarouselImages();
  const updatedImages = images.filter(img => img.id !== id);
  
  localStorage.setItem("carouselImages", JSON.stringify(updatedImages));
  return id;
};

// Move a carousel image up in the order
export const moveCarouselImageUp = (id: number) => {
  const images = getCarouselImages();
  const index = images.findIndex(img => img.id === id);
  
  if (index <= 0) return; // Already at the top
  
  const newImages = [...images];
  const temp = newImages[index];
  newImages[index] = newImages[index - 1];
  newImages[index - 1] = temp;
  
  localStorage.setItem("carouselImages", JSON.stringify(newImages));
  return newImages;
};

// Move a carousel image down in the order
export const moveCarouselImageDown = (id: number) => {
  const images = getCarouselImages();
  const index = images.findIndex(img => img.id === id);
  
  if (index === -1 || index === images.length - 1) return; // Not found or already at the bottom
  
  const newImages = [...images];
  const temp = newImages[index];
  newImages[index] = newImages[index + 1];
  newImages[index + 1] = temp;
  
  localStorage.setItem("carouselImages", JSON.stringify(newImages));
  return newImages;
};

// Search products function
export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) return [];
  
  const products = getProducts();
  const searchTerm = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm) || 
    product.category.toLowerCase().includes(searchTerm)
  );
};

// Get product gallery images
export const getProductGalleryImages = (productId: number): string[] => {
  const galleries = localStorage.getItem('productGalleries');
  if (!galleries) return [];
  
  const parsedGalleries = JSON.parse(galleries);
  return parsedGalleries[productId] || [];
};

// Update product gallery
export const updateProductGallery = (productId: number, images: string[]): void => {
  const galleries = localStorage.getItem('productGalleries');
  let parsedGalleries = galleries ? JSON.parse(galleries) : {};
  
  parsedGalleries[productId] = images;
  localStorage.setItem('productGalleries', JSON.stringify(parsedGalleries));
};
