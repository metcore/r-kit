import { useState } from 'react';
import { Card, CardBody, CardHeader } from '../../../components/card';
import TextEditor from '../../../components/text-editor/text-editor';
import illust from '../../assets/images/forms.png';
import HeroSection from '../../components/HeroSection';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function TextEditorPage() {
  const [value, setValue] = useState('');
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
              hint: 'jir',
              errorMessages: 'ok',
              description: 'deskripsi',
              required: true,
            }}
            editor={{
              onChange: (v) => setValue(v.getHTML()),
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
