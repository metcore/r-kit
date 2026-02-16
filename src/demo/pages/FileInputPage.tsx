import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Hero } from "../../components/hero";
import { Card, CardBody, CardHeader } from "../../components/card";
import { FileInput } from "../../components/file-input";

function FileInputPage() {
  return (
    <DashboardLayout>
      <Hero className="mb-4">
        <p className="text-xs text-gray-800">Components</p>
        <h1 className="mb-2.5 text-4xl font-semibold text-gray-900">
          File Input
        </h1>
        <p className="text-sm text-gray-800">
          Elemen interaktif utama yang digunakan untuk mengeksekusi perintah
          atau memulai alur tindakan.
        </p>
      </Hero>
      <div className="grid grid-cols-1 gap-4">
        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            File Input
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <FileInput
              hint={"halo dunia"}
              label="Attachment"
              existingFiles={[
                {
                  url: "https://www.skeyndorindonesia.id/images/gallery/678b7387bea72bc2b157dceb1c9907a70.png",
                  name: "document.pdf",
                  size: 1024000, // optional
                  type: "application/pdf", // optional
                },
                {
                  url: "https://www.skeyndorindonesia.id/images/gallery/678b7387bea72bc2b157dceb1c9907a70.png",
                  name: "photo.jpg",
                },
              ]}
            />
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            File Input
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <FileInput size="md" label="Multiple Attachment" multiple />
          </CardBody>
        </Card>

        <Card size={"lg"}>
          <CardHeader divider className="font-semibold text-gray-900">
            File Input
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <FileInput accept={["image/*"]} size="lg" label="Attachment" />
          </CardBody>
        </Card>

      
      </div>
    </DashboardLayout>
  );
}

export default FileInputPage;
