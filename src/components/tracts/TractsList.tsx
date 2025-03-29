import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Users } from "lucide-react";
import { CreateTractForm } from "./CreateTractForm";

// Mock tracts data
const MOCK_TRACTS = [
  { 
    id: '1', 
    name: 'Urban Preppers', 
    description: 'Preparing for emergencies in urban environments',
    members: 128,
    lastActive: '2023-06-15T12:30:00Z',
    tags: ['Urban', 'Beginner-Friendly'],
    image: 'https://i.pravatar.cc/150?img=1'
  },
  { 
    id: '2', 
    name: 'Water Purification', 
    description: 'Discussion on water filtration, purification, and storage',
    members: 64,
    lastActive: '2023-06-14T10:15:00Z',
    tags: ['Water', 'Technical'],
    image: 'https://i.pravatar.cc/150?img=2'
  },
  { 
    id: '3', 
    name: 'First Aid Skills', 
    description: 'Learn and share medical skills for emergencies',
    members: 95,
    lastActive: '2023-06-16T09:45:00Z',
    tags: ['Medical', 'Skills'],
    image: 'https://i.pravatar.cc/150?img=3'
  },
  { 
    id: '4', 
    name: 'Food Preservation', 
    description: 'Techniques for preserving food long-term',
    members: 76,
    lastActive: '2023-06-13T14:20:00Z',
    tags: ['Food', 'Self-Sufficiency'],
    image: 'https://i.pravatar.cc/150?img=4'
  },
];

export function TractsList() {
  const [tracts] = useState(MOCK_TRACTS);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter tracts based on search query
  const filteredTracts = tracts.filter(tract => 
    tract.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tract.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tract.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="space-y-6 animate-in">
      <Card className="frosted-glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tracts</CardTitle>
            <CardDescription>
              Connect with communities for knowledge sharing
            </CardDescription>
          </div>
          <CreateTractForm />
        </CardHeader>
        
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tracts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredTracts.length > 0 ? (
              filteredTracts.map(tract => (
                <Link key={tract.id} to={`/tracts/${tract.id}`} className="block">
                  <Card className="h-full transition-all hover:shadow-subtle">
                    <CardContent className="p-0">
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-10 w-10 rounded-md">
                            <AvatarImage src={tract.image} alt={tract.name} />
                            <AvatarFallback className="rounded-md bg-primary/10 text-primary">
                              {tract.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h3 className="font-medium text-base">{tract.name}</h3>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Users className="h-3 w-3 mr-1" />
                              <span>{tract.members} members</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {tract.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {tract.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center py-12 col-span-2">
                <p className="text-muted-foreground">No tracts found.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
