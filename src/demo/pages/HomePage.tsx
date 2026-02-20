import { Hero } from "../../components/hero";
import { Kbd } from "../../components/kbd";
import DashboardLayout from "../layouts/DashboardLayout";

function HomePage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-4">
        <Hero>Welcome</Hero>

        <div className="flex flex-col items-start gap-2">
          <Kbd size="sm">ctrl</Kbd>
          <Kbd size="md">ctrl</Kbd>
          <Kbd size="lg">ctrl</Kbd>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Kbd size="sm">Ctrl</Kbd>
          <Kbd size="md" variant="ghost">
            ctrl
          </Kbd>
          <Kbd size="lg" variant="ghost">
            ctrl
          </Kbd>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Kbd size="sm" variant="outline">
            ctrl
          </Kbd>
          <Kbd size="md" variant="outline">
            ctrl
          </Kbd>
          <Kbd size="lg" variant="outline">
            ctrl
          </Kbd>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Kbd size="sm" color="primary">
            ctrl
          </Kbd>
          <Kbd size="md" color="danger">
            ctrl
          </Kbd>
          <Kbd size="lg" color="success">
            ctrl
          </Kbd>
          <Kbd size="lg" color="info">
            ctrl
          </Kbd>
          <Kbd size="lg" color="warning">
            ctrl
          </Kbd>
          <Kbd size="lg" color="neutral">
            ctrl
          </Kbd>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default HomePage;
