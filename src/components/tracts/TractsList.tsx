import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { getTractsList, deleteTract } from '@/lib/api';
import { Database } from '@/lib/database.types';
import { Button } from '../ui/button';
import { Trash2, Users } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { Badge } from '../ui/badge';

type Tract = Database['public']['Tables']['tracts']['Row'];

export default function TractsList() {
  const [tracts, setTracts] = useState<Tract[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTracts();
  }, []);

  const loadTracts = async () => {
    try {
      const data = await getTractsList();
      setTracts(data);
    } catch (error) {
      console.error('Error loading tracts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tracts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTract(id);
      setTracts(tracts.filter(tract => tract.id !== id));
      toast({
        title: 'Success',
        description: 'Tract deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting tract:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete tract',
        variant: 'destructive',
      });
    }
  };

  const filteredTracts = tracts.filter(tract => {
    const matchesSearch = 
      tract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tract.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tract.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search tracts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="space-y-4">
          {filteredTracts.map((tract) => (
            <Card key={tract.id}>
              <CardContent className="flex items-start justify-between p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{tract.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{tract.member_count}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{tract.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tract.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(tract.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}

          {filteredTracts.length === 0 && (
            <p className="text-center text-gray-500">No tracts found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
