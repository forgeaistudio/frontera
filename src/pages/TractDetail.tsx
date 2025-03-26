
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { TractChat } from "@/components/tracts/TractChat";

const TractDetail = () => {
  const { tractId } = useParams<{ tractId: string }>();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 pt-16">
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1 md:ml-56">
            <Container className="h-[calc(100vh-12rem)]">
              <TractChat tractId={tractId} />
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

export default TractDetail;
