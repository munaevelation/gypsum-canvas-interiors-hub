export interface Product {
  id: string;  // Changed from number to string for UUID
  name: string;
  description?: string;
  dimensions?: string;
  category: string;
  useCase?: string;
  image?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;  // Changed from number to string for UUID
  name: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CarouselImage {
  id: string;  // Changed from number to string for UUID
  image: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Add search function to work with the Header component
export const searchProducts = (query: string): Product[] => {
  if (!query.trim()) return [];
  
  // Implement search logic here against Supabase in the future
  return [];
};

// Mock data (replace with actual data fetching later)
const products: Product[] = [
  {
    id: "1",
    name: "Classic Ceiling Medallion",
    category: "Ceiling Medallions",
    image: "https://placehold.co/600x400/png",
    isFeatured: true,
    isNewArrival: true,
    description: "An elegant addition to any room.",
    dimensions: "50cm diameter",
    useCase: "Living Rooms, Dining Rooms"
  },
  {
    id: "2",
    name: "Modern Wall Panel",
    category: "Wall Panels",
    image: "https://placehold.co/600x400/png",
    description: "Sleek and contemporary design.",
    dimensions: "120cm x 60cm",
    useCase: "Offices, Studios"
  },
  {
    id: "3",
    name: "Gypsum Cornice",
    category: "Ceiling Cornices",
    image: "https://placehold.co/600x400/png",
    description: "Decorative molding for ceilings.",
    dimensions: "240cm length",
    useCase: "Bedrooms, Hallways"
  },
  {
    id: "4",
    name: "Ornate Wall Sconce",
    category: "Wall Decor",
    image: "https://placehold.co/600x400/png",
    description: "Adds a touch of sophistication.",
    dimensions: "30cm height",
    useCase: "Entryways, Lounges"
  },
  {
    id: "5",
    name: "Contemporary Ceiling Light",
    category: "Ceiling Lights",
    image: "https://placehold.co/600x400/png",
    description: "Modern lighting solution.",
    dimensions: "40cm diameter",
    useCase: "Kitchens, Bathrooms"
  },
  {
    id: "6",
    name: "Textured Wall Art",
    category: "Wall Decor",
    image: "https://placehold.co/600x400/png",
    description: "Unique and tactile wall art.",
    dimensions: "90cm x 90cm",
    useCase: "Living Rooms, Galleries"
  },
  {
    id: "7",
    name: "Abstract Gypsum Sculpture",
    category: "Sculptures",
    image: "https://placehold.co/600x400/png",
    description: "A statement piece for any space.",
    dimensions: "60cm height",
    useCase: "Gardens, Patios"
  },
  {
    id: "8",
    name: "Minimalist Wall Mirror",
    category: "Wall Decor",
    image: "https://placehold.co/600x400/png",
    description: "Clean and simple design.",
    dimensions: "70cm diameter",
    useCase: "Bedrooms, Dressing Rooms"
  },
  {
    id: "9",
    name: "Geometric Ceiling Tiles",
    category: "Ceiling Tiles",
    image: "https://placehold.co/600x400/png",
    description: "Adds a modern geometric pattern.",
    dimensions: "30cm x 30cm",
    useCase: "Offices, Retail Spaces"
  },
  {
    id: "10",
    name: "Rustic Wall Clock",
    category: "Wall Decor",
    image: "https://placehold.co/600x400/png",
    description: "A charming rustic touch.",
    dimensions: "45cm diameter",
    useCase: "Kitchens, Studies"
  }
];

const categories: Category[] = [
  { id: "1", name: "Ceiling Medallions", image: "https://placehold.co/600x400/png", description: "Decorative elements for ceilings." },
  { id: "2", name: "Wall Panels", image: "https://placehold.co/600x400/png", description: "Stylish panels for walls." },
  { id: "3", name: "Ceiling Cornices", image: "https://placehold.co/600x400/png", description: "Elegant moldings for ceilings." },
  { id: "4", name: "Wall Decor", image: "https://placehold.co/600x400/png", description: "Various decorations for walls." },
  { id: "5", name: "Ceiling Lights", image: "https://placehold.co/600x400/png", description: "Lighting fixtures for ceilings." },
  { id: "6", name: "Sculptures", image: "https://placehold.co/600x400/png", description: "Three-dimensional art pieces." },
  { id: "7", name: "Ceiling Tiles", image: "https://placehold.co/600x400/png", description: "Tiles for ceiling decoration." }
];

const carouselImages: CarouselImage[] = [
  {
    id: "1",
    image: "https://placehold.co/1200x500/png",
    title: "Exclusive Collection",
    subtitle: "Discover our new arrivals",
    buttonText: "Shop Now",
    buttonLink: "/?category=Ceiling%20Medallions",
    displayOrder: 1
  },
  {
    id: "2",
    image: "https://placehold.co/1200x500/png",
    title: "Summer Sale",
    subtitle: "Up to 50% off on selected items",
    buttonText: "View Sale",
    buttonLink: "/?category=Wall%20Panels",
    displayOrder: 2
  },
  {
    id: "3",
    image: "https://placehold.co/1200x500/png",
    title: "Featured Designs",
    subtitle: "Explore our top-rated designs",
    buttonText: "Explore",
    buttonLink: "/?category=Ceiling%20Cornices",
    displayOrder: 3
  }
];

const productGalleries: { [productId: string]: string[] } = {
  "1": [
    "https://placehold.co/600x400/png",
    "https://placehold.co/600x400/png",
    "https://placehold.co/600x400/png"
  ],
  "2": [
    "https://placehold.co/600x400/png",
    "https://placehold.co/600x400/png"
  ],
  "3": [
    "https://placehold.co/600x400/png"
  ]
};

// Local Storage Mock
const localStorageMock = {
  getItem: (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};

// Products
export const getProducts = (): Product[] => {
  return localStorageMock.getItem('products') || products;
};

export const getProductById = (id: number): Product | undefined => {
  const products = getProducts();
  return products.find(product => parseInt(product.id, 10) === id);
};

export const addProduct = (product: Omit<Product, "id">): void => {
  const products = getProducts();
  const newProduct = { ...product, id: String(products.length + 1) };
  localStorageMock.setItem('products', [...products, newProduct]);
};

export const updateProduct = (product: Product): void => {
  const products = getProducts();
  const updatedProducts = products.map(p => (p.id === product.id ? product : p));
  localStorageMock.setItem('products', updatedProducts);
};

export const deleteProduct = (id: number): void => {
  const products = getProducts();
  const updatedProducts = products.filter(product => parseInt(product.id, 10) !== id);
  localStorageMock.setItem('products', updatedProducts);
};

// Categories
export const getCategories = (): Category[] => {
  return localStorageMock.getItem('categories') || categories;
};

export const getCategoryNames = (): string[] => {
  const categories = getCategories();
  return categories.map(category => category.name);
};

export const addCategory = (category: Omit<Category, "id">): void => {
  const categories = getCategories();
  const newCategory = { ...category, id: String(categories.length + 1) };
  localStorageMock.setItem('categories', [...categories, newCategory]);
};

export const updateCategory = (category: Category): void => {
  const categories = getCategories();
  const updatedCategories = categories.map(c => (c.id === category.id ? category : c));
  localStorageMock.setItem('categories', updatedCategories);
};

export const deleteCategory = (id: number): void => {
  const categories = getCategories();
  const updatedCategories = categories.filter(category => parseInt(category.id, 10) !== id);
  localStorageMock.setItem('categories', updatedCategories);
};

// Carousel Images
export const getCarouselImages = (): CarouselImage[] => {
  return localStorageMock.getItem('carouselImages') || carouselImages;
};

export const addCarouselImage = (image: Omit<CarouselImage, "id">): void => {
  const carouselImages = getCarouselImages();
  const newImage = { ...image, id: String(carouselImages.length + 1) };
  localStorageMock.setItem('carouselImages', [...carouselImages, newImage]);
};

export const updateCarouselImage = (image: CarouselImage): void => {
  const carouselImages = getCarouselImages();
  const updatedImages = carouselImages.map(img => (img.id === image.id ? image : img));
  localStorageMock.setItem('carouselImages', updatedImages);
};

export const deleteCarouselImage = (id: number): void => {
  const carouselImages = getCarouselImages();
  const updatedImages = carouselImages.filter(image => parseInt(image.id, 10) !== id);
  localStorageMock.setItem('carouselImages', updatedImages);
};

export const moveCarouselImageUp = (id: number): void => {
  const carouselImages = getCarouselImages();
  const index = carouselImages.findIndex(image => parseInt(image.id, 10) === id);
  if (index > 0) {
    const temp = carouselImages[index];
    carouselImages[index] = carouselImages[index - 1];
    carouselImages[index - 1] = temp;
    localStorageMock.setItem('carouselImages', carouselImages);
  }
};

export const moveCarouselImageDown = (id: number): void => {
  const carouselImages = getCarouselImages();
  const index = carouselImages.findIndex(image => parseInt(image.id, 10) === id);
  if (index < carouselImages.length - 1) {
    const temp = carouselImages[index];
    carouselImages[index] = carouselImages[index + 1];
    carouselImages[index + 1] = temp;
    localStorageMock.setItem('carouselImages', carouselImages);
  }
};

// Product Gallery
export const getProductGalleryImages = (productId: number): string[] | undefined => {
  const gallery = localStorageMock.getItem('productGalleries') || productGalleries;
  return gallery[String(productId)];
};

export const updateProductGallery = (productId: number, images: string[]): void => {
  let gallery = localStorageMock.getItem('productGalleries') || productGalleries;
  gallery = { ...gallery, [String(productId)]: images };
  localStorageMock.setItem('productGalleries', gallery);
};
