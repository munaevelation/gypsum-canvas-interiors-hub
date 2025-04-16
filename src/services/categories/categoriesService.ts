
import { supabase } from "@/integrations/supabase/client";
import { Category } from "../dataService";

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
