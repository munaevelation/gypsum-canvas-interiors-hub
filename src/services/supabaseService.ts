
import { supabase } from "@/integrations/supabase/client";
import { Product, Category, CarouselImage } from "./dataService";

// Products
export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data;
};

export const fetchProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  
  return data;
};

export const fetchFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true);
    
  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
  
  return data;
};

export const fetchNewArrivals = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_new_arrival', true);
    
  if (error) {
    console.error('Error fetching new arrivals:', error);
    return [];
  }
  
  return data;
};

export const createProduct = async (product: Omit<Product, "id">) => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating product:', error);
    return null;
  }
  
  return data;
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating product:', error);
    return null;
  }
  
  return data;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }
  
  return true;
};

// Categories
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');
    
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data;
};

export const createCategory = async (category: Omit<Category, "id">) => {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating category:', error);
    return null;
  }
  
  return data;
};

export const updateCategory = async (id: string, updates: Partial<Category>) => {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating category:', error);
    return null;
  }
  
  return data;
};

export const deleteCategory = async (id: string) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting category:', error);
    return false;
  }
  
  return true;
};

// Carousel Images
export const fetchCarouselImages = async () => {
  const { data, error } = await supabase
    .from('carousel_images')
    .select('*')
    .order('display_order');
    
  if (error) {
    console.error('Error fetching carousel images:', error);
    return [];
  }
  
  return data;
};

export const createCarouselImage = async (image: Omit<CarouselImage, "id">) => {
  const { data, error } = await supabase
    .from('carousel_images')
    .insert([image])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating carousel image:', error);
    return null;
  }
  
  return data;
};

export const updateCarouselImage = async (id: string, updates: Partial<CarouselImage>) => {
  const { data, error } = await supabase
    .from('carousel_images')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating carousel image:', error);
    return null;
  }
  
  return data;
};

export const deleteCarouselImage = async (id: string) => {
  const { error } = await supabase
    .from('carousel_images')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting carousel image:', error);
    return false;
  }
  
  return true;
};

export const updateCarouselImageOrder = async (id: string, newOrder: number) => {
  const { data, error } = await supabase
    .from('carousel_images')
    .update({ display_order: newOrder })
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating carousel image order:', error);
    return null;
  }
  
  return data;
};
