import { Card, CardBody, CardHeader } from '../../../components/card';
import illust from '../../../assets/images/forms.png';
import { Textarea } from '../../../clients';
import HeroSection from '../../components/HeroSection';

export default function TextAreaPage() {
  return (
    <>
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
          <Textarea />
        </CardBody>
      </Card>
    </>
  );
}
