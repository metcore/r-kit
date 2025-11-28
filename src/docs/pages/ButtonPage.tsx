import DashboardLayout from "../layouts/DashboardLayout";
import { Card, CardBody } from "../../components/card";
import { Button } from "../../components/button";
import { Icon } from "../../components/icons";

function ButtonPage() {
  return (
    <DashboardLayout>
      <div>ButtonPage</div>
      <div>
        <Card>
          <CardBody className="flex gap-2">
            <Button color="primary" className="inline-flex gap-1.5">
              <Icon name="user" size={12} />
              Primary
            </Button>
            <Button color="secondary">Secondary</Button>
            <Button color="success">Success</Button>
            <Button color="danger">Danger</Button>
            <Button color="warning">Warning</Button>
            <Button color="info">Info</Button>
            <Button color="orange">Orange</Button>
            <Button color="purple">Purple</Button>
            <Button color="gray">Gray</Button>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default ButtonPage;
