import { Sidebar } from "@/components/layout/Sidebar";
import { Container } from "@/components/ui/Container";
import { UserProfile } from "@/components/auth/UserProfile";

const Profile = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <main className="flex-1 md:ml-56">
        <Container>
          <div className="py-6">
            <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
            <UserProfile />
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Profile;
