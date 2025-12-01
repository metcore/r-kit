import { Avatar } from "../../components/avatar";
import { Card, CardBody, CardHeader } from "../../components/card";
import { Hero } from "../../components/hero";
import DashboardLayout from "../layouts/DashboardLayout";

function AvatarPage() {
  return (
    <DashboardLayout>
      <Hero>
        <p className="text-sm font-semibold text-gray-900">Components</p>
        <h1 className="text-3xl font-semibold text-gray-900">Avatar</h1>
      </Hero>
      <div className="grid grid-cols-1 gap-4">
        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Avatar
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <Avatar
              url="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              name="John Doe"
            />
            <Avatar size={"lg"} color="danger" name="John Doe" />
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default AvatarPage;
