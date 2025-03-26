
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter, BookOpen } from "lucide-react";
import { ResourceItem } from "./ResourceItem";

// Mock resources data
const MOCK_RESOURCES = [
  { 
    id: '1', 
    title: 'Emergency Water Purification Methods', 
    type: 'Guide',
    description: 'Comprehensive guide to purifying water in emergency situations',
    author: 'Sarah Wilson',
    dateAdded: '2023-04-15T10:30:00Z',
    category: 'Water',
    rating: 4.8,
    bookmarked: true,
  },
  { 
    id: '2', 
    title: 'Building a 72-Hour Emergency Kit', 
    type: 'Checklist',
    description: 'Step-by-step checklist for assembling a complete 72-hour emergency kit',
    author: 'John Martinez',
    dateAdded: '2023-03-10T09:15:00Z',
    category: 'Preparedness',
    rating: 4.5,
    bookmarked: false,
  },
  { 
    id: '3', 
    title: 'First Aid Essentials: Wound Care', 
    type: 'Tutorial',
    description: 'Visual tutorial on proper wound cleaning and dressing techniques',
    author: 'Dr. Lisa Kim',
    dateAdded: '2023-05-22T14:45:00Z',
    category: 'Medical',
    rating: 4.9,
    bookmarked: true,
  },
  { 
    id: '4', 
    title: 'Long-term Food Storage Strategies', 
    type: 'Guide',
    description: 'Detailed guide on food preservation methods and storage rotation',
    author: 'Robert Johnson',
    dateAdded: '2023-02-18T11:20:00Z',
    category: 'Food',
    rating: 4.6,
    bookmarked: false,
  },
];

// Resource types and categories for filtering
const RESOURCE_TYPES = ["All Types", "Guide", "Checklist", "Tutorial", "Template", "Reference"];
const RESOURCE_CATEGORIES = ["All Categories", "Water", "Food", "Medical", "Preparedness", "Communication", "Shelter"];

export function ResourcesList() {
  const [resources] = useState(MOCK_RESOURCES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  // Filter resources based on search query, type, and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "All Types" || resource.type === selectedType;
    const matchesCategory = selectedCategory === "All Categories" || resource.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });
  
  return (
    <div className="space-y-6 animate-in">
      <Card className="frosted-glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Resource Library</CardTitle>
            <CardDescription>
              Knowledge hub for emergency preparedness
            </CardDescription>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Resource</span>
          </Button>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-36">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {RESOURCE_TYPES.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {RESOURCE_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => (
                <ResourceItem key={resource.id} resource={resource} />
              ))
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-muted-foreground">No resources found matching your criteria.</p>
                <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
