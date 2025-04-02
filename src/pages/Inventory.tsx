import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import InventoryList from "@/components/inventory/InventoryList";
import AddInventoryForm from "@/components/inventory/AddInventoryForm";

export default function Inventory() {
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Inventory</h1>
            <p className="text-muted-foreground">Manage your supplies and equipment</p>
          </div>
          <AddInventoryForm />
        </div>
        <InventoryList />
      </div>
    </AppLayout>
  );
}
