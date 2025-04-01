import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { createInventoryItem } from '@/lib/api';
import { useToast } from '../ui/use-toast';
import { Textarea } from '../ui/textarea';

const CATEGORIES = ['Water', 'Food', 'Medical', 'Energy', 'Communication'];

export default function AddInventoryForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    location: '',
    expiry_date: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const quantity = parseInt(formData.quantity);
      if (isNaN(quantity)) {
        throw new Error('Quantity must be a number');
      }

      await createInventoryItem({
        ...formData,
        quantity,
      });

      toast({
        title: 'Success',
        description: 'Inventory item added successfully',
      });

      // Reset form
      setFormData({
        name: '',
        category: '',
        quantity: '',
        unit: '',
        location: '',
        expiry_date: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding inventory item:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add inventory item',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Inventory Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Item name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <Select
              value={formData.category}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

            <Input
              name="unit"
              placeholder="Unit (e.g., pieces, gallons)"
              value={formData.unit}
              onChange={handleChange}
              required
            />

            <Input
              name="location"
              placeholder="Storage location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <Input
              name="expiry_date"
              type="date"
              placeholder="Expiry date"
              value={formData.expiry_date}
              onChange={handleChange}
            />
          </div>

          <Textarea
            name="description"
            placeholder="Item description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding...' : 'Add Item'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 