import { Hero } from "../../components/hero";
import DashboardLayout from "../layouts/DashboardLayout";

function HomePage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-4">
        <Hero>Welcome</Hero>
      </div>
    </DashboardLayout>
  );
}

export default HomePage;
