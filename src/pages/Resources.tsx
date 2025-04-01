import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { ResourcesList } from "@/components/resources/ResourcesList";
import { AddResourceForm } from "@/components/resources/AddResourceForm";

export default function Resources() {
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Resources</h1>
            <p className="text-muted-foreground">Access and manage your preparedness resources</p>
          </div>
          <AddResourceForm />
        </div>
        <ResourcesList />
      </div>
    </AppLayout>
  );
}
