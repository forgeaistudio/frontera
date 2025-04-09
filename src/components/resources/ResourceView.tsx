import { Card, CardContent } from "@/components/ui/card";
import { Database } from "@/lib/database.types";
import { Button } from "@/components/ui/button";
import { ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { toggleResourceBookmark } from "@/lib/api";

type Resource = Database['public']['Tables']['resources']['Row'];

interface ResourceViewProps {
  resource: Resource | null;
  onBookmarkToggle: (id: string, currentValue: boolean) => void;
}

export function ResourceView({ resource, onBookmarkToggle }: ResourceViewProps) {
  const { toast } = useToast();

  if (!resource) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Select a resource to view</p>
        </CardContent>
      </Card>
    );
  }

  const handleBookmarkToggle = async () => {
    try {
      await toggleResourceBookmark(resource.id, resource.bookmarked);
      onBookmarkToggle(resource.id, resource.bookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast({
        title: 'Error',
        description: 'Failed to update bookmark',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{resource.title}</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By {resource.author}</span>
              <span>•</span>
              <span>{resource.type}</span>
              <span>•</span>
              <span>Category: {resource.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmarkToggle}
            >
              {resource.bookmarked ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
            {resource.url && (
              <Button
                variant="ghost"
                size="icon"
                asChild
              >
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-muted-foreground mb-4">{resource.description}</p>
          
          {resource.content && (
            <div className="mt-4">
              {resource.content}
            </div>
          )}
        </div>

        {resource.rating && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Rating</h3>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < resource.rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 