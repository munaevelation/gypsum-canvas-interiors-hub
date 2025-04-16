
import { supabase } from "@/integrations/supabase/client";
import { Product } from "../dataService";

export const fetchProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Exception fetching product:', error);
    return null;
  }
};

export const fetchFeaturedProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true);
      
    if (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching featured products:', error);
    return [];
  }
};

export const fetchNewArrivals = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_new_arrival', true);
      
    if (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching new arrivals:', error);
    return [];
  }
};

export const createProduct = async (product: Omit<Product, "id">) => {
  try {
    // Convert keys to snake_case for Supabase
    const supabaseProduct = {
      name: product.name,
      description: product.description,
      dimensions: product.dimensions,
      category: product.category,
      use_case: product.useCase,
      image: product.image,
      is_featured: product.isFeatured,
      is_new_arrival: product.isNewArrival
    };
    
    console.log('Creating product with data:', supabaseProduct);
    
    const { data, error } = await supabase
      .from('products')
      .insert([supabaseProduct])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }
    
    console.log('Product created successfully:', data);
    
    // Convert back to camelCase for frontend
    return data ? {
      id: data.id,
      name: data.name,
      description: data.description,
      dimensions: data.dimensions,
      category: data.category,
      useCase: data.use_case,
      image: data.image,
      isFeatured: data.is_featured,
      isNewArrival: data.is_new_arrival,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    } : null;
  } catch (error) {
    console.error('Exception creating product:', error);
    return null;
  }
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  try {
    // Convert keys to snake_case for Supabase
    const supabaseUpdates: any = {};
    
    if (updates.name !== undefined) supabaseUpdates.name = updates.name;
    if (updates.description !== undefined) supabaseUpdates.description = updates.description;
    if (updates.dimensions !== undefined) supabaseUpdates.dimensions = updates.dimensions;
    if (updates.category !== undefined) supabaseUpdates.category = updates.category;
    if (updates.useCase !== undefined) supabaseUpdates.use_case = updates.useCase;
    if (updates.image !== undefined) supabaseUpdates.image = updates.image;
    if (updates.isFeatured !== undefined) supabaseUpdates.is_featured = updates.isFeatured;
    if (updates.isNewArrival !== undefined) supabaseUpdates.is_new_arrival = updates.isNewArrival;
    
    console.log('Updating product with ID:', id, 'and data:', supabaseUpdates);
    
    const { data, error } = await supabase
      .from('products')
      .update(supabaseUpdates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }
    
    console.log('Product updated successfully:', data);
    
    // Convert back to camelCase for frontend
    return data ? {
      id: data.id,
      name: data.name,
      description: data.description,
      dimensions: data.dimensions,
      category: data.category,
      useCase: data.use_case,
      image: data.image,
      isFeatured: data.is_featured,
      isNewArrival: data.is_new_arrival,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    } : null;
  } catch (error) {
    console.error('Exception updating product:', error);
    return null;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    console.log('Deleting product with ID:', id);
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
    
    console.log('Product deleted successfully');
    return true;
  } catch (error) {
    console.error('Exception deleting product:', error);
    return false;
  }
};
