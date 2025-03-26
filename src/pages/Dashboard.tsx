
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Bell, Package, MessageSquare, BookOpen } from "lucide-react";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  
  // Recent activity mock data
  const recentActivity = [
    {
      id: '1',
      type: 'tract',
      title: 'Urban Preppers',
      action: 'New message in',
      time: '2 hours ago',
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      id: '2',
      type: 'inventory',
      title: 'First Aid Kit',
      action: 'Item expiring soon',
      time: '1 day ago',
      icon: <Package className="h-4 w-4" />
    },
    {
      id: '3',
      type: 'resource',
      title: 'Emergency Water Purification Methods',
      action: 'Bookmarked resource',
      time: '2 days ago',
      icon: <BookOpen className="h-4 w-4" />
    }
  ];
  
  // Format the user's join date
  const formatJoinDate = () => {
    if (!user?.created) return '';
    
    const date = new Date(user.created);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 pt-16">
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 md:ml-56">
            <Container>
              <div className="space-y-6 animate-in">
                {/* Welcome banner */}
                <div className="relative overflow-hidden rounded-lg bg-frontera-600 text-primary-foreground p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-frontera-500 to-frontera-700 opacity-80" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h1 className="text-2xl font-bold mb-2">
                          Welcome back, {user?.name || 'User'}
                        </h1>
                        <p className="text-primary-foreground/80">
                          Your preparedness dashboard is ready for you
                        </p>
                      </div>
                      
                      <Button variant="secondary" className="shrink-0">
                        View Your Preparedness Score
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* User profile summary */}
                  <Card className="md:col-span-1 frosted-glass">
                    <CardHeader>
                      <CardTitle>Your Profile</CardTitle>
                      <CardDescription>
                        Preparedness status
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <Avatar className="h-20 w-20 mb-4">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback className="text-lg">
                            {user?.name?.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <h3 className="font-medium text-lg mb-1">{user?.name}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="secondary">
                            Level {user?.level || 1}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Joined {formatJoinDate()}
                          </span>
                        </div>
                        
                        <div className="w-full">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Preparedness Score</span>
                            <span className="text-muted-foreground">45/100</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-frontera-500 h-2 rounded-full" 
                              style={{ width: "45%" }}
                            />
                          </div>
                        </div>
                        
                        <Button 
                          variant="link" 
                          className="mt-4" 
                          asChild
                        >
                          <Link to="/profile">
                            Update Profile
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Recent activity */}
                  <Card className="md:col-span-2 frosted-glass">
                    <CardHeader className="flex flex-row justify-between items-start space-y-0">
                      <div>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                          Latest updates from your account
                        </CardDescription>
                      </div>
                      
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map(activity => (
                          <div 
                            key={activity.id} 
                            className="flex items-start gap-3 p-3 rounded-md transition-colors hover:bg-muted/50"
                          >
                            <div className={`h-8 w-8 rounded-full bg-frontera-500/10 flex items-center justify-center text-frontera-600`}>
                              {activity.icon}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">
                                {activity.action} <span className="font-semibold">{activity.title}</span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {activity.time}
                              </p>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-full"
                              asChild
                            >
                              <Link to={`/${activity.type}s${activity.type === 'tract' ? `/${activity.id}` : ''}`}>
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Quick Access Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <QuickAccessCard 
                    title="Inventory" 
                    description="Manage your supplies" 
                    icon={<Package className="h-10 w-10" />}
                    href="/inventory"
                    count={42}
                    label="items"
                    color="bg-emerald-500/10 text-emerald-600"
                  />
                  
                  <QuickAccessCard 
                    title="Tracts" 
                    description="Join the community" 
                    icon={<MessageSquare className="h-10 w-10" />}
                    href="/tracts"
                    count={3}
                    label="active"
                    color="bg-frontera-500/10 text-frontera-600"
                  />
                  
                  <QuickAccessCard 
                    title="Resources" 
                    description="Access guides & tutorials" 
                    icon={<BookOpen className="h-10 w-10" />}
                    href="/resources"
                    count={12}
                    label="bookmarked"
                    color="bg-amber-500/10 text-amber-600"
                  />
                </div>
              </div>
            </Container>
            
            <div className="mt-auto">
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  count: number;
  label: string;
  color: string;
}

const QuickAccessCard = ({ title, description, icon, href, count, label, color }: QuickAccessCardProps) => {
  return (
    <Link to={href} className="block">
      <Card className="h-full transition-all hover:shadow-subtle">
        <CardContent className="p-6">
          <div className={`h-16 w-16 rounded-lg ${color} flex items-center justify-center mb-4`}>
            {icon}
          </div>
          
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-muted-foreground mb-4">
            {description}
          </p>
          
          <div className="flex items-end justify-between">
            <div>
              <span className="text-2xl font-bold">{count}</span>
              <span className="text-sm text-muted-foreground ml-1">{label}</span>
            </div>
            
            <Button variant="ghost" size="sm" className="gap-1 text-frontera-600">
              <span>View</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Dashboard;
