
import { supabase } from "@/integrations/supabase/client";
import { Product } from "../dataService";

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
