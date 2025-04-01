import { supabase } from './supabase';
import { Database } from './database.types';

type Tract = Database['public']['Tables']['tracts']['Row'];
type Inventory = Database['public']['Tables']['inventory']['Row'];
type Resource = Database['public']['Tables']['resources']['Row'];

// Tract APIs
export const getTractsList = async () => {
  const { data, error } = await supabase
    .from('tracts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createTract = async (tract: Omit<Tract, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
  const { data, error } = await supabase
    .from('tracts')
    .insert([tract])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateTract = async (id: string, updates: Partial<Tract>) => {
  const { data, error } = await supabase
    .from('tracts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteTract = async (id: string) => {
  const { error } = await supabase
    .from('tracts')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Inventory APIs
export const getInventoryList = async () => {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createInventoryItem = async (item: Omit<Inventory, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
  const { data, error } = await supabase
    .from('inventory')
    .insert([item])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateInventoryItem = async (id: string, updates: Partial<Inventory>) => {
  const { data, error } = await supabase
    .from('inventory')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteInventoryItem = async (id: string) => {
  const { error } = await supabase
    .from('inventory')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Resource APIs
export const getResourcesList = async () => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createResource = async (resource: Omit<Resource, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
  const { data, error } = await supabase
    .from('resources')
    .insert([resource])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateResource = async (id: string, updates: Partial<Resource>) => {
  const { data, error } = await supabase
    .from('resources')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteResource = async (id: string) => {
  const { error } = await supabase
    .from('resources')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

export const toggleResourceBookmark = async (id: string, currentValue: boolean) => {
  const { data, error } = await supabase
    .from('resources')
    .update({ bookmarked: !currentValue })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}; 