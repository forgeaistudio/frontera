import { useParams } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Container } from "@/components/ui/Container";
import { TractChat } from "@/components/tracts/TractChat";

const TractDetail = () => {
  const { tractId } = useParams<{ tractId: string }>();
  
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-56">
        <Container className="h-[calc(100vh-3rem)]">
          <div className="py-6 h-full">
            <TractChat tractId={tractId} />
          </div>
        </Container>
      </main>
    </div>
  );
};

export default TractDetail;
