import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import TractsList from "@/components/tracts/TractsList";
import { CreateTractForm } from "@/components/tracts/CreateTractForm";

export default function Tracts() {
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tracts</h1>
            <p className="text-muted-foreground">Manage your locations and community</p>
          </div>
          <CreateTractForm />
        </div>
        <TractsList />
      </div>
    </AppLayout>
  );
}
