import DashboardLayout from "../layouts/DashboardLayout";
import { Hero } from "../../components/hero";
import { Card, CardBody, CardHeader } from "../../components/card";
import { Switch } from "../../components/switch";
import React from "react";

export const SwitchPage = () => {
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(true);
  const [checked3, setChecked3] = React.useState(true);
  const [checked4, setChecked4] = React.useState(true);
  const [checked5, setChecked5] = React.useState(true);
  const [checked6, setChecked6] = React.useState(true);
  const [checked7, setChecked7] = React.useState(true);
  const [checked8, setChecked8] = React.useState(true);

  return (
    <DashboardLayout>
      <Hero className="mb-4">
        <p className="text-xs text-gray-800">Components</p>
        <h1 className="mb-2.5 text-4xl font-semibold text-gray-900">Switch</h1>
        <p className="text-sm text-gray-800">
          Kontrol on/off yang memberi pengguna cara instan untuk mengubah status
          sebuah fungsi.
        </p>
      </Hero>
      <div className="grid grid-cols-1 gap-4">
        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Switch Horizontal (Default)
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <Switch
              checked={checked}
              onCheckedChange={setChecked}
              color="primary"
              label="Primary"
            />
            <Switch
              checked={checked2}
              onCheckedChange={setChecked2}
              color="success"
              label="Success"
            />
            <Switch
              checked={checked3}
              onCheckedChange={setChecked3}
              color="danger"
              label="Danger"
              size="lg"
            />
            <Switch
              checked={checked4}
              onCheckedChange={setChecked4}
              color="warning"
              label="Warning"
            />
            <Switch
              checked={checked5}
              onCheckedChange={setChecked5}
              color="info"
              label="Info"
            />
            <Switch
              checked={checked6}
              onCheckedChange={setChecked6}
              color="orange"
              label="Orange"
            />
            <Switch
              checked={checked7}
              onCheckedChange={setChecked7}
              color="purple"
              label="Purple"
            />
            <Switch
              checked={checked8}
              onCheckedChange={setChecked8}
              color="gray"
              label="Gray"
            />
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Switch Vertical
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <Switch color="primary" label="Primary" direction="vertical" />
            <Switch color="success" label="Success" direction="vertical" />
            <Switch color="danger" label="Danger" direction="vertical" />
            <Switch color="warning" label="Warning" direction="vertical" />
            <Switch color="info" label="Info" direction="vertical" />
            <Switch color="orange" label="Orange" direction="vertical" />
            <Switch color="purple" label="Purple" direction="vertical" />
            <Switch color="gray" label="Gray" direction="vertical" />
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Switch Size
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <Switch
              color="primary"
              size="sm"
              label="Small (sm)"
              direction="vertical"
            />
            <Switch
              color="success"
              size="md"
              label="Medium (md)"
              direction="vertical"
            />
            <Switch
              color="danger"
              size="lg"
              label="Large (lg)"
              direction="vertical"
            />
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Switch With Hint
          </CardHeader>
          <CardBody className="flex flex-col gap-8">
            <Switch
              color="primary"
              label="With hint"
              direction="vertical"
              hint="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
            <Switch
              color="success"
              label="Error message"
              direction="vertical"
              errorMessages={["Error message 1", "Error message 2"]}
            />
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
};
