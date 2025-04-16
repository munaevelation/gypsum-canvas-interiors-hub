import { supabase } from "@/integrations/supabase/client";
import { Product } from "../dataService";
import { toast } from "sonner";

export const fetchProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    toast.error('Failed to fetch products');
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
    console.error('Error fetching product:', error);
    toast.error('Failed to fetch product details');
    return null;
  }
};

export const fetchFeaturedProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    toast.error('Failed to fetch featured products');
    return [];
  }
};

export const fetchNewArrivals = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_new_arrival', true)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    toast.error('Failed to fetch new arrivals');
    return [];
  }
};

export const createProduct = async (product: Omit<Product, "id">) => {
  try {
    // Validate required fields
    if (!product.name || !product.category) {
      toast.error('Product name and category are required');
      return null;
    }

    // Convert keys to snake_case for Supabase
    const supabaseProduct = {
      name: product.name,
      description: product.description,
      dimensions: product.dimensions,
      category: product.category,
      use_case: product.useCase,
      image: product.image,
      is_featured: product.isFeatured,
      is_new_arrival: product.isNewArrival,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('products')
      .insert([supabaseProduct])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }
    
    toast.success('Product created successfully');
    
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
    console.error('Error creating product:', error);
    toast.error('Failed to create product');
    return null;
  }
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  try {
    // Validate required fields if they are being updated
    if (updates.name === '' || updates.category === '') {
      toast.error('Product name and category cannot be empty');
      return null;
    }

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
    supabaseUpdates.updated_at = new Date().toISOString();
    
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
    
    toast.success('Product updated successfully');
    
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
    console.error('Error updating product:', error);
    toast.error('Failed to update product');
    return null;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
    
    toast.success('Product deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    toast.error('Failed to delete product');
    return false;
  }
};
