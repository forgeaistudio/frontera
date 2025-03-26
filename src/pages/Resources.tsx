import { Sidebar } from "@/components/layout/Sidebar";
import { Container } from "@/components/ui/Container";
import { ResourcesList } from "@/components/resources/ResourcesList";

const Resources = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-56">
        <Container>
          <div className="py-6">
            <h1 className="text-3xl font-bold mb-6">Resource Library</h1>
            <ResourcesList />
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Resources;
