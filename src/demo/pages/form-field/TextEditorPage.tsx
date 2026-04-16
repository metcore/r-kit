import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../../../components/card';
import illust from '../../assets/images/forms.png';
import HeroSection from '../../components/HeroSection';
import DashboardLayout from '../../layouts/DashboardLayout';
import { TextEditor, type FileItem } from '../../../clients';

type UploadedImage = {
  data: {
    url: string;
    name: string;
  };
};

export default function TextEditorPage() {
  const [value, setValue] = useState('jir ini value nih');
  const [files, setFiles] = useState<FileItem[]>([]);

  console.log(value);
  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Text Editor"
        description="Komponen untuk membuat dan mengedit konten rich text dengan format, struktur, dan elemen tambahan di luar input teks biasa."
      />

      <Card>
        <CardHeader divider>
          <h3>Text Editor</h3>
        </CardHeader>

        <CardBody>
          <TextEditor
            field={{
              label: 'Desciption',
              required: true,
            }}
            editor={{
              value,
              onChange: (v) => setValue(v.getHTML()),
              attachmentField: {
                accept: 'image/*',
                hint: 'hint',
                label: 'label',
                onChange: (files) => setFiles(files),
                value: files,
                maxSize: 5,
                extractUploadResult: (results) => {
                  const imageResult = results[0].uploadedData as UploadedImage;

                  return {
                    url: imageResult?.data?.url,
                    altText: imageResult?.data?.name,
                  };
                },
                uploadConfig: {
                  url: 'https://stg.media.herca.id/api/upload',
                  headers: {
                    'accept': 'application/json',
                    'X-API-KEY':
                      '19ee5d65cf71b64e5ed168dbf4817e89bc9024b90c499557',
                  },
                },
              },
            }}
            ui={{
              size: 'sm',
            }}
          />
        </CardBody>
      </Card>
    </DashboardLayout>
  );
}
