import { Avatar } from "../../components/avatar";
import { Card, CardBody, CardHeader } from "../../components/card";
import { Hero } from "../../components/hero";
import DashboardLayout from "../layouts/DashboardLayout";

function AvatarPage() {
  return (
    <DashboardLayout>
      <Hero className="mb-4">
        <p className="text-sm font-semibold text-gray-900">Components</p>
        <h1 className="text-3xl font-semibold text-gray-900">Avatar</h1>
      </Hero>
      <div className="grid grid-cols-1 gap-4">
        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Circular Avatar
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <div className="flex gap-2 items-end">
              <Avatar
                variant="circle"
                size={"xs"}
                color="danger"
                name="John Doe"
              />
              <Avatar
                variant="circle"
                size={"sm"}
                color="danger"
                name="John Doe"
              />
              <Avatar
                variant="circle"
                size={"md"}
                color="danger"
                name="John Doe"
              />
              <Avatar
                variant="circle"
                size={"lg"}
                color="danger"
                name="John Doe"
              />
              <Avatar
                variant="circle"
                size={"xl"}
                color="danger"
                name="John Doe"
              />
              <Avatar
                variant="circle"
                size={"xxl"}
                color="danger"
                name="John Doe"
              />
            </div>
            <Avatar
              variant="circle"
              url="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              name="John Doe"
            />
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Rounded Avatar
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <div className="flex gap-2 items-end">
              <Avatar
                variant="rounded"
                size={"xs"}
                color="gray"
                name="John Doe"
              />
              <Avatar
                variant="rounded"
                size={"sm"}
                color="primary"
                name="John Doe"
              />
              <Avatar
                variant="rounded"
                size={"md"}
                color="success"
                name="John Doe"
              />
              <Avatar
                variant="rounded"
                size={"lg"}
                color="info"
                name="John Doe"
              />
              <Avatar
                variant="rounded"
                size={"xl"}
                color="danger"
                name="John Doe"
              />
              <Avatar
                variant="rounded"
                size={"xxl"}
                color="warning"
                name="John Doe"
              />
            </div>
            <Avatar
              variant="rounded"
              url="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              name="John Doe"
            />
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Square Avatar
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <div className="flex gap-2 items-end">
              <Avatar
                variant="square"
                size={"xs"}
                color="primary"
                name="John Doe"
              />
              <Avatar
                variant="square"
                size={"sm"}
                color="primary"
                name="John Doe"
              />
              <Avatar
                variant="square"
                size={"md"}
                color="primary"
                name="John Doe"
              />
              <Avatar
                variant="square"
                size={"lg"}
                color="primary"
                name="John Doe"
              />
              <Avatar
                variant="square"
                size={"xl"}
                color="primary"
                name="John Doe"
              />
              <Avatar
                variant="square"
                size={"xxl"}
                color="primary"
                name="John Doe"
              />
            </div>
            <Avatar
              variant="square"
              url="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              name="John Doe"
            />
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default AvatarPage;
