
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { InventoryList } from "@/components/inventory/InventoryList";

const Inventory = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 pt-16">
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 md:ml-56">
            <Container>
              <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
              <InventoryList />
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

export default Inventory;
