
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save } from "lucide-react";

export function UserProfile() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate profile update
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6 animate-in">
      <Card className="frosted-glass">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            Manage your personal information and preferences
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-white shadow-md">
                <AvatarImage src="https://i.pravatar.cc/150?img=68" alt="Profile" />
                <AvatarFallback className="text-xl">JD</AvatarFallback>
              </Avatar>
              
              <Button 
                size="icon" 
                variant="secondary" 
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  defaultValue="John" 
                  required 
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  defaultValue="Doe" 
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue="john.doe@example.com" 
                required 
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                defaultValue="Portland, OR" 
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                defaultValue="Preparedness enthusiast focused on sustainable emergency planning." 
                className="min-h-32"
                disabled={isLoading}
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="flex gap-2">
                <Save className="h-4 w-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card className="frosted-glass">
        <CardHeader>
          <CardTitle>Preparedness Level</CardTitle>
          <CardDescription>
            Current skills and achievements
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Level 2: Equipped</span>
              <span className="text-sm text-muted-foreground">45/100</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2.5">
              <div className="bg-frontera-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-secondary/50 rounded-md">
              <div className="font-medium">First Aid Certified</div>
              <p className="text-sm text-muted-foreground">
                Completed basic first aid training
              </p>
            </div>
            
            <div className="p-3 bg-secondary/50 rounded-md">
              <div className="font-medium">Water Storage</div>
              <p className="text-sm text-muted-foreground">
                Achieved 2-week water supply goal
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
