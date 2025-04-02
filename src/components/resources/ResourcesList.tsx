import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getResourcesList, deleteResource, toggleResourceBookmark } from '@/lib/api';
import { Database } from '@/lib/database.types';
import { Button } from '../ui/button';
import { Trash2, Bookmark, BookmarkCheck } from 'lucide-react';
import { useToast } from '../ui/use-toast';

type Resource = Database['public']['Tables']['resources']['Row'];

export default function ResourcesList() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await getResourcesList();
      setResources(data);
    } catch (error) {
      console.error('Error loading resources:', error);
      toast({
        title: 'Error',
        description: 'Failed to load resources',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteResource(id);
      setResources(resources.filter(resource => resource.id !== id));
      toast({
        title: 'Success',
        description: 'Resource deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete resource',
        variant: 'destructive',
      });
    }
  };

  const handleToggleBookmark = async (id: string, currentValue: boolean) => {
    try {
      const updatedResource = await toggleResourceBookmark(id, currentValue);
      setResources(resources.map(resource => 
        resource.id === id ? updatedResource : resource
      ));
      toast({
        title: 'Success',
        description: `Resource ${currentValue ? 'removed from' : 'added to'} bookmarks`,
      });
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast({
        title: 'Error',
        description: 'Failed to update bookmark',
        variant: 'destructive',
      });
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = Array.from(new Set(resources.map(resource => resource.type)));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="max-w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <Card key={resource.id}>
              <CardContent className="flex items-start justify-between p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{resource.title}</h3>
                    <span className="text-sm text-gray-500">{resource.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>By {resource.author}</span>
                    <span>Category: {resource.category}</span>
                    <span>Rating: {resource.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleBookmark(resource.id, resource.bookmarked)}
                  >
                    {resource.bookmarked ? (
                      <BookmarkCheck className="h-4 w-4" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(resource.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredResources.length === 0 && (
            <p className="text-center text-gray-500">No resources found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
