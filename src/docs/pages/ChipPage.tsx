import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Hero } from "../../components/hero";
import { Card, CardBody, CardFooter, CardHeader } from "../../components/card";
import {
  Chip,
  ChipGroup,
  type ChipOptionProps,
  type ChipValue,
} from "../../components/chip";

export default function ChipPage() {
  const [selected, setSelected] = useState<ChipValue[]>([]);
  const [singleSelected, setSingleSelected] = useState<ChipValue[]>([]);

  const chipOptions: ChipOptionProps[] = [
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
    { value: "tailwind", label: "Tailwind" },
    { value: "next js", label: "Next.js" },
    { value: "node js", label: "Node.js", disabled: true },
  ];

  return (
    <DashboardLayout>
      <Hero className="mb-4">
        <p className="text-sm font-semibold text-gray-900">Components</p>
        <h1 className="text-3xl font-semibold text-gray-900">Chip</h1>
        <p>
          Elemen interaktif utama yang digunakan untuk mengeksekusi perintah
          atau memulai alur tindakan.
        </p>
      </Hero>
      <div className="grid grid-cols-1 gap-4">
        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Chip Group Multiple Select
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <ChipGroup
              options={chipOptions}
              selected={selected}
              onSelect={setSelected}
              multiple
              color="success"
              size="md"
            />
          </CardBody>
          <CardFooter divider className="text-gray-800">
            Selected: {selected.length > 0 ? selected.join(", ") : ""}
          </CardFooter>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Chip Group Single Select
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <ChipGroup
              options={chipOptions}
              selected={singleSelected}
              onSelect={setSingleSelected}
              color="primary"
              size="md"
            />
          </CardBody>
          <CardFooter divider className="text-gray-800">
            Selected:{" "}
            {singleSelected.length > 0 ? singleSelected.join(", ") : ""}
          </CardFooter>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            Button
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <ChipGroup
              options={chipOptions}
              selected={singleSelected}
              onSelect={setSingleSelected}
              color="primary"
              size="md"
            />
            <div className="flex gap-2">
              <Chip color="primary">Primary</Chip>
              <Chip color="success">Success</Chip>
              <Chip color="danger">Danger</Chip>
              <Chip color="orange">Orange</Chip>
              <Chip color="info">Info</Chip>
              <Chip color="purple">Purple</Chip>
              <Chip color="gray">Gray</Chip>
              <Chip color="warning">Warning</Chip>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
