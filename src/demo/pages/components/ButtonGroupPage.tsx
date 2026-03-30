import { ButtonGroup, ButtonGroupItem } from '../../../components/button-group';
import { Card, CardBody, CardHeader } from '../../../components/card';
import { Hero } from '../../../components/hero';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function ButtonGroupPage() {
  return (
    <DashboardLayout>
      <Hero className="mb-4">
        <p className="text-xs text-gray-800">Components</p>
        <h1 className="mb-2.5 text-4xl font-semibold text-gray-900">
          Button Group
        </h1>
        <p className="text-sm text-gray-800">
          Elemen interaktif utama yang digunakan untuk mengeksekusi perintah
          atau memulai alur tindakan.
        </p>
      </Hero>

      <div className="grid grid-cols-1 gap-4">
        <Card size={'lg'}>
          <CardHeader divider className="font-semibold text-gray-900">
            Button Group
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <ButtonGroup>
              <ButtonGroupItem>Button 1</ButtonGroupItem>
              <ButtonGroupItem>Button 2</ButtonGroupItem>
              <ButtonGroupItem>Button 3</ButtonGroupItem>
            </ButtonGroup>

            <ButtonGroup direction="vertical">
              <ButtonGroupItem>Button 1</ButtonGroupItem>
              <ButtonGroupItem>Button 2</ButtonGroupItem>
              <ButtonGroupItem>Button 3</ButtonGroupItem>
            </ButtonGroup>

            <ButtonGroup variant={'outline'}>
              <ButtonGroupItem>Button 1</ButtonGroupItem>
              <ButtonGroupItem>Button 2</ButtonGroupItem>
              <ButtonGroupItem>Button 3</ButtonGroupItem>
              <ButtonGroupItem>Button 4</ButtonGroupItem>
            </ButtonGroup>

            <ButtonGroup variant={'outline'} direction="vertical">
              <ButtonGroupItem>Button 1</ButtonGroupItem>
              <ButtonGroupItem>Button 2</ButtonGroupItem>
              <ButtonGroupItem>Button 3</ButtonGroupItem>
              <ButtonGroupItem>Button 4</ButtonGroupItem>
            </ButtonGroup>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
