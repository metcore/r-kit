import DashboardLayout from "../layouts/DashboardLayout";
import { Card, CardBody, CardHeader } from "../../components/card";
import { Button } from "../../components/button";
import { Icon } from "../../components/icons";
import { Hero } from "../../components/hero";
import { RoundedSpinner } from "../../components/loading";

function ButtonPage() {
  return (
    <DashboardLayout>
      <Hero className="mb-4">
        <p className="text-sm font-semibold text-gray-900">Components</p>
        <h1 className="text-3xl font-semibold text-gray-900">Button</h1>
        <p>
          Elemen interaktif utama yang digunakan untuk mengeksekusi perintah
          atau memulai alur tindakan.
        </p>
      </Hero>
      <div className="grid grid-cols-1 gap-4">
        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Button
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <Button color="primary">Primary</Button>
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

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Button with Icon
          </CardHeader>
          <CardBody className="flex gap-8 flex-wrap">
            <Button className="gap-2" color="primary">
              <Icon name="arrow-left-circle" size={16} /> Primary
              <Icon name="arrow-right-circle" size={16} />
            </Button>
            <Button className="gap-2" color="secondary">
              <Icon name="arrow-left-circle" size={16} /> Secondary
              <Icon name="arrow-right-circle" size={16} />
            </Button>
            <Button className="gap-2" color="success">
              <Icon name="arrow-left-circle" size={16} /> Success
              <Icon name="arrow-right-circle" size={16} />
            </Button>
            <Button className="gap-2" color="danger">
              <Icon name="arrow-left-circle" size={16} /> Danger
              <Icon name="arrow-right-circle" size={16} />
            </Button>
            <Button className="gap-2" color="warning">
              <Icon name="arrow-left-circle" size={16} /> Warning
              <Icon name="arrow-right-circle" size={16} />
            </Button>
            <Button className="gap-2" color="info">
              <Icon name="arrow-left-circle" size={16} /> Info
              <Icon name="arrow-right-circle" size={16} />
            </Button>
            <Button className="gap-2" color="orange">
              <Icon name="arrow-left-circle" size={16} /> Orange
              <Icon name="arrow-right-circle" size={16} />
            </Button>
            <Button className="gap-2" color="purple">
              <Icon name="arrow-left-circle" size={16} /> Purple
              <Icon name="arrow-right-circle" size={16} />
            </Button>
            <Button className="gap-2" color="gray">
              <Icon name="arrow-left-circle" size={16} /> Gray
              <Icon name="arrow-right-circle" size={16} />
            </Button>
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Button Outline
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <Button variant={"outline"} color="primary">
              Primary
            </Button>
            <Button variant={"outline"} color="secondary">
              Secondary
            </Button>
            <Button variant={"outline"} color="success">
              Success
            </Button>
            <Button variant={"outline"} color="danger">
              Danger
            </Button>
            <Button variant={"outline"} color="warning">
              Warning
            </Button>
            <Button variant={"outline"} color="info">
              Info
            </Button>
            <Button variant={"outline"} color="orange">
              Orange
            </Button>
            <Button variant={"outline"} color="purple">
              Purple
            </Button>
            <Button variant={"outline"} color="gray">
              Gray
            </Button>
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Button Tertiary
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <Button variant={"tertiary"} color="primary">
              Primary
            </Button>
            <Button variant={"tertiary"} color="secondary">
              Secondary
            </Button>
            <Button variant={"tertiary"} color="success">
              Success
            </Button>
            <Button variant={"tertiary"} color="danger">
              Danger
            </Button>
            <Button variant={"tertiary"} color="warning">
              Warning
            </Button>
            <Button variant={"tertiary"} color="info">
              Info
            </Button>
            <Button variant={"tertiary"} color="orange">
              Orange
            </Button>
            <Button variant={"tertiary"} color="purple">
              Purple
            </Button>
            <Button variant={"tertiary"} color="gray">
              Gray
            </Button>
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Button Icon Only
          </CardHeader>
          <CardBody className="flex gap-8 flex-wrap">
            <Button size={"icon"} color="primary">
              <Icon name="arrow-left-circle" size={16} />
            </Button>
            <Button size={"icon"} color="secondary">
              <Icon name="arrow-left-circle" size={16} />
            </Button>
            <Button size={"icon"} color="success">
              <Icon name="arrow-left-circle" size={16} />
            </Button>
            <Button size={"icon"} color="danger">
              <Icon name="arrow-left-circle" size={16} />
            </Button>
            <Button size={"icon"} color="warning">
              <Icon name="arrow-left-circle" size={16} />
            </Button>
            <Button size={"icon"} color="info">
              <Icon name="arrow-left-circle" size={16} />
            </Button>
            <Button size={"icon"} color="orange">
              <Icon name="arrow-left-circle" size={16} />
            </Button>
            <Button size={"icon"} color="purple">
              <Icon name="arrow-left-circle" size={16} />
            </Button>
            <Button size={"icon"} color="gray">
              <Icon name="arrow-left-circle" size={16} />
            </Button>
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Button Disabled
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <Button disabled color="primary">
              Primary
            </Button>
            <Button disabled color="secondary">
              Secondary
            </Button>
            <Button disabled color="success">
              Success
            </Button>
            <Button disabled color="danger">
              Danger
            </Button>
            <Button disabled color="warning">
              Warning
            </Button>
            <Button disabled color="info">
              Info
            </Button>
            <Button disabled color="orange">
              Orange
            </Button>
            <Button disabled color="purple">
              Purple
            </Button>
            <Button disabled color="gray">
              Gray
            </Button>
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Button Loading
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <Button className="gap-2" color="primary">
              <RoundedSpinner size={16} stroke={1.5} /> Primary
            </Button>
            <Button className="gap-2" color="secondary">
              <RoundedSpinner size={16} stroke={1.5} /> Secondary
            </Button>
            <Button className="gap-2" color="success">
              <RoundedSpinner size={16} stroke={1.5} /> Success
            </Button>
            <Button className="gap-2" color="danger">
              <RoundedSpinner size={16} stroke={1.5} /> Danger
            </Button>
            <Button className="gap-2" color="warning">
              <RoundedSpinner size={16} stroke={1.5} /> Warning
            </Button>
            <Button className="gap-2" color="info">
              <RoundedSpinner size={16} stroke={1.5} /> Info
            </Button>
            <Button className="gap-2" color="orange">
              <RoundedSpinner size={16} stroke={1.5} /> Orange
            </Button>
            <Button className="gap-2" color="purple">
              <RoundedSpinner size={16} stroke={1.5} /> Purple
            </Button>
            <Button className="gap-2" color="gray">
              <RoundedSpinner size={16} stroke={1.5} /> Gray
            </Button>
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Button Size
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <div className="flex flex-wrap gap-2">
              <Button size={"sm"} color="primary">
                Primary sm
              </Button>
              <Button size={"sm"} color="secondary">
                Secondary sm
              </Button>
              <Button size={"sm"} color="success">
                Success sm
              </Button>
              <Button size={"sm"} color="danger">
                Danger sm
              </Button>
              <Button size={"sm"} color="warning">
                Warning sm
              </Button>
              <Button size={"sm"} color="info">
                Info sm
              </Button>
              <Button size={"sm"} color="orange">
                Orange sm
              </Button>
              <Button size={"sm"} color="purple">
                Purple sm
              </Button>
              <Button size={"sm"} color="gray">
                Gray sm
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size={"md"} color="primary">
                Primary md
              </Button>
              <Button size={"md"} color="secondary">
                Secondary md
              </Button>
              <Button size={"md"} color="success">
                Success md
              </Button>
              <Button size={"md"} color="danger">
                Danger md
              </Button>
              <Button size={"md"} color="warning">
                Warning md
              </Button>
              <Button size={"md"} color="info">
                Info md
              </Button>
              <Button size={"md"} color="orange">
                Orange md
              </Button>
              <Button size={"md"} color="purple">
                Purple md
              </Button>
              <Button size={"md"} color="gray">
                Gray md
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size={"lg"} color="primary">
                Primary lg
              </Button>
              <Button size={"lg"} color="secondary">
                Secondary lg
              </Button>
              <Button size={"lg"} color="success">
                Success lg
              </Button>
              <Button size={"lg"} color="danger">
                Danger lg
              </Button>
              <Button size={"lg"} color="warning">
                Warning lg
              </Button>
              <Button size={"lg"} color="info">
                Info lg
              </Button>
              <Button size={"lg"} color="orange">
                Orange lg
              </Button>
              <Button size={"lg"} color="purple">
                Purple lg
              </Button>
              <Button size={"lg"} color="gray">
                Gray lg
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default ButtonPage;
