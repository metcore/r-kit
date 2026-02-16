import DashboardLayout from "../layouts/DashboardLayout";
import { Input } from "../../components/input";
import { Card, CardBody } from "../../components/card";
import { Button } from "../../components/button";
import { Textarea } from "../../components/textarea";
import { Hero } from "../../components/hero";
import { Select } from "../../components/select";
import { useState } from "react";

function SelectPage() {
  const [singleValue, setSingleValue] = useState(null);
  const [multiValue, setMultiValue] = useState([]);
  const [customValue, setCustomValue] = useState([]);

  const basicOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "nextjs", label: "Next.js" },
    { value: "nuxtjs", label: "Nuxt.js" },
    { value: "nodejs", label: "Node.js" },
    { value: "express", label: "Express.js" },
    { value: "fastify", label: "Fastify.js" },
    { value: "nest", label: "Nest.js" },
    { value: "laravel", label: "Laravel" },
    { value: "symfony", label: "Symfony" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "yii", label: "Yii" },
  ];

  const customOptions = [
    { value: "1", label: "John Doe", role: "Developer", avatar: "👨‍💻" },
    { value: "2", label: "Jane Smith", role: "Designer", avatar: "👩‍🎨" },
    { value: "3", label: "Bob Johnson", role: "Manager", avatar: "👨‍💼" },
    { value: "4", label: "Alice Brown", role: "Product Owner", avatar: "👩‍💼" },
  ];

  const renderCustomOption = (option, { selected }) => (
    <div className="flex items-center gap-3">
      <span className="text-2xl">{option.avatar}</span>
      <div>
        <div className={`font-medium ${selected ? "text-blue-600" : ""}`}>
          {option.label}
        </div>
        <div className="text-xs text-gray-500">{option.role}</div>
      </div>
    </div>
  );

  const renderCustomValue = (option) => (
    <span className="flex items-center gap-2">
      <span>{option.avatar}</span>
      <span>{option.label}</span>
    </span>
  );
  return (
    <DashboardLayout>
      <Hero className="mb-4">
        <p className="text-xs text-gray-800">Components</p>
        <h1 className="mb-2.5 text-4xl font-semibold text-gray-900">Select</h1>
        <p className="text-sm text-gray-800">
          Elemen interaktif utama yang digunakan untuk mengeksekusi perintah
          atau memulai alur tindakan.
        </p>
      </Hero>
      <div>
        <Card>
          <CardBody className="grid grid-cols-2">
            <div className="space-y-4">
              <Input
                size={"md"}
                label="Email"
                errorMessages={["email is required"]}
                hint="email nya jangan lupa diisi ya :)"
              />
              <Textarea disabled label="Email" id="email" maxLength={30} />
              <Button size={"md"}>Submit</Button>
            </div>
          </CardBody>
        </Card>
        <div>
          <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Single Select
                  </label>
                  <Select
                    options={basicOptions}
                    value={singleValue}
                    onChange={setSingleValue}
                    placeholder="Pilih framework..."
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Selected: {singleValue ? singleValue.label : "None"}
                  </p>
                </div>

                <div>
                  <Select
                    label="Select Multiple"
                    options={basicOptions}
                    value={multiValue}
                    onChange={setMultiValue}
                    // errorMessages={"Please select at least one framework"}
                    isMulti
                    placeholder="Pilih beberapa framework..."
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Selected: {multiValue.length} items
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Custom Render (Team Members)
                  </label>
                  <Select
                    options={customOptions}
                    value={customValue}
                    onChange={setCustomValue}
                    isMulti
                    placeholder="Pilih team members..."
                    renderOption={renderCustomOption}
                    renderValue={renderCustomValue}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Selected:{" "}
                    {customValue.map((v) => v.label).join(", ") || "None"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SelectPage;
