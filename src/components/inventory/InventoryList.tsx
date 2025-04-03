import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getInventoryList, deleteInventoryItem } from '@/lib/api';
import { Database } from '@/lib/database.types';
import { Button } from '../ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';

type Inventory = Database['public']['Tables']['inventory']['Row'];

export default function InventoryList() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      console.log('Loading inventory, user:', user);
      const data = await getInventoryList();
      console.log('Inventory data received:', data);
      setInventory(data);
      setError(null);
    } catch (error) {
      console.error('Error loading inventory:', error);
      setError(error instanceof Error ? error.message : 'Failed to load inventory items');
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load inventory items',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteInventoryItem(id);
      setInventory(inventory.filter(item => item.id !== id));
      toast({
        title: 'Success',
        description: 'Item deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete item',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (item: Inventory) => {
    if (item.status === 'Expiring Soon') {
      return <Badge variant="destructive">Expiring Soon</Badge>;
    }
    return null;
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(inventory.map(item => item.category)));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Input
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredInventory.map((item) => (
          <Card key={item.id} className="p-4 hover:bg-accent/5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  {item.category && (
                    <Badge variant="outline" className="capitalize">
                      {item.category}
                    </Badge>
                  )}
                  {getStatusBadge(item)}
                </div>
                <div className="mt-2 text-sm text-gray-500 space-x-2">
                  <span>Qty: {item.quantity} {item.unit}</span>
                  <span>•</span>
                  <span>Location: {item.location}</span>
                  {item.expiry_date && (
                    <>
                      <span>•</span>
                      <span>Expires: {new Date(item.expiry_date).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {/* TODO: Implement edit */}}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredInventory.length === 0 && (
          <p className="text-center text-gray-500">No inventory items found</p>
        )}
      </div>
    </div>
  );
}
