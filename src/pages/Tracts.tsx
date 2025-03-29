import { Sidebar } from "@/components/layout/Sidebar";
import { Container } from "@/components/ui/Container";
import { TractsList } from "@/components/tracts/TractsList";

const Tracts = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-56">
        <Container>
          <div className="py-6">
            <TractsList />
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Tracts;
