
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Send, Users, Info, PinIcon } from "lucide-react";

// Mock messages data
const MOCK_MESSAGES = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=68'
    },
    content: 'Has anyone tried the Berkey water filter system?',
    timestamp: '2023-06-16T10:30:00Z',
    isPinned: false
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?img=47'
    },
    content: 'Yes! I've been using it for 2 years now. Excellent for emergency prep and daily use.',
    timestamp: '2023-06-16T10:32:00Z',
    isPinned: false
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Mike Chen',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    content: 'I prefer the Sawyer mini filter for portability. It's part of my bug-out bag.',
    timestamp: '2023-06-16T10:35:00Z',
    isPinned: false
  },
  {
    id: '4',
    user: {
      id: 'u4',
      name: 'Lisa Yamada',
      avatar: 'https://i.pravatar.cc/150?img=25'
    },
    content: 'Here's our community guide on water filtration options for different scenarios.',
    timestamp: '2023-06-16T10:41:00Z',
    isPinned: true
  },
];

// Mock tract data
const MOCK_TRACT = {
  id: '2',
  name: 'Water Purification',
  description: 'Discussion on water filtration, purification, and storage techniques for emergency situations and everyday use.',
  members: 64,
  created: '2023-01-15T00:00:00Z',
  rules: [
    'Share evidence-based information only',
    'Be respectful of differing opinions',
    'No commercial promotion without mod approval'
  ],
  pinnedMessages: ['4']
};

// Mock members data (simplified)
const MOCK_MEMBERS = [
  { id: 'u1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=68', role: 'Member' },
  { id: 'u2', name: 'Sarah Wilson', avatar: 'https://i.pravatar.cc/150?img=47', role: 'Member' },
  { id: 'u3', name: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?img=12', role: 'Member' },
  { id: 'u4', name: 'Lisa Yamada', avatar: 'https://i.pravatar.cc/150?img=25', role: 'Moderator' },
  { id: 'u5', name: 'Robert Johnson', avatar: 'https://i.pravatar.cc/150?img=32', role: 'Admin' },
];

export function TractChat({ tractId = '2' }) {
  const [messages] = useState(MOCK_MESSAGES);
  const [tract] = useState(MOCK_TRACT);
  const [members] = useState(MOCK_MEMBERS);
  const [newMessage, setNewMessage] = useState("");
  
  // Format the timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, we would send the message to the server
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };
  
  return (
    <div className="animate-in h-full">
      <div className="md:grid md:grid-cols-4 gap-6 h-full">
        <div className="col-span-3">
          <Card className="frosted-glass h-full flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{tract.name}</CardTitle>
                  <CardDescription>
                    {tract.members} members
                  </CardDescription>
                </div>
                
                <Badge className="bg-frontera-500 hover:bg-frontera-600">
                  Joined
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-0">
              {/* Pinned Messages */}
              {messages.filter(m => m.isPinned).length > 0 && (
                <div className="p-3 bg-secondary/50 m-4 mb-0 rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium mb-2">
                    <PinIcon className="h-3 w-3" />
                    <span>Pinned Message</span>
                  </div>
                  
                  {messages.filter(m => m.isPinned).map(message => (
                    <div key={message.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.user.avatar} alt={message.user.name} />
                        <AvatarFallback>
                          {message.user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{message.user.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Regular Messages */}
              <div className="p-4 space-y-4">
                {messages.map(message => (
                  <div key={message.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.user.avatar} alt={message.user.name} />
                      <AvatarFallback>
                        {message.user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{message.user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
        
        <div className="hidden md:block">
          <Card className="frosted-glass h-full">
            <Tabs defaultValue="members">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="members">
                  <Users className="h-4 w-4 mr-2" />
                  Members
                </TabsTrigger>
                <TabsTrigger value="about">
                  <Info className="h-4 w-4 mr-2" />
                  About
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="members" className="p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                <div className="space-y-3">
                  {members.map(member => (
                    <div key={member.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm truncate">{member.name}</span>
                          {member.role !== 'Member' && (
                            <Badge variant="outline" className="text-xs">
                              {member.role}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="about" className="p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">About</h3>
                    <p className="text-sm text-muted-foreground">
                      {tract.description}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-1">Rules</h3>
                    <ul className="space-y-2">
                      {tract.rules.map((rule, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex gap-2">
                          <span className="font-medium">{index + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-1">Created</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(tract.created).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
