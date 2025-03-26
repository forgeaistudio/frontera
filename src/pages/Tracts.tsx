
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { TractsList } from "@/components/tracts/TractsList";

const Tracts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 pt-16">
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 md:ml-56">
            <Container>
              <h1 className="text-3xl font-bold mb-6">Tracts</h1>
              <TractsList />
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

export default Tracts;
