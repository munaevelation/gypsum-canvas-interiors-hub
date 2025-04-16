
import { supabase } from "@/integrations/supabase/client";
import { CarouselImage } from "../dataService";

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
