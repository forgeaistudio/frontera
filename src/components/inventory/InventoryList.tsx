
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
import { Plus, Search, Filter } from "lucide-react";
import { InventoryItem } from "./InventoryItem";

// Mock inventory data
const MOCK_INVENTORY = [
  { id: '1', name: 'Water Bottles', category: 'Water', quantity: 24, expiryDate: '2025-06-15', location: 'Pantry' },
  { id: '2', name: 'Canned Beans', category: 'Food', quantity: 12, expiryDate: '2025-12-10', location: 'Basement' },
  { id: '3', name: 'First Aid Kit', category: 'Medical', quantity: 2, expiryDate: '2026-03-20', location: 'Emergency Bag' },
  { id: '4', name: 'LED Flashlights', category: 'Tools', quantity: 5, expiryDate: null, location: 'Garage' },
  { id: '5', name: 'Batteries (AA)', category: 'Tools', quantity: 20, expiryDate: '2027-01-15', location: 'Kitchen Drawer' },
];

// Categories for filtering
const CATEGORIES = ["All", "Water", "Food", "Medical", "Tools", "Clothing", "Communication"];

export function InventoryList() {
  const [inventory] = useState(MOCK_INVENTORY);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Filter inventory based on search query and category
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6 animate-in">
      <Card className="frosted-glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Inventory</CardTitle>
            <CardDescription>
              Manage your preparedness supplies
            </CardDescription>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </Button>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
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
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredInventory.length > 0 ? (
              filteredInventory.map(item => (
                <InventoryItem key={item.id} item={item} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No inventory items found.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
