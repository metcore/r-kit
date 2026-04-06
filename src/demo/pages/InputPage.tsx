import { Button } from '../../components/button';
import { Card, CardBody } from '../../components/card';
import { Input } from '../../components/input';
import { RoundedSpinner } from '../../components/loading';
import { Textarea } from '../../components/textarea';
import DashboardLayout from '../layouts/DashboardLayout';

function InputPage() {
  return (
    <DashboardLayout>
      <div>
        <Card>
          <CardBody className="grid grid-cols-2">
            <div className="space-y-4">
              <Input
                size={'md'}
                label="Email"
                errorMessages={['email is required']}
                hint="email nya jangan lupa diisi ya :)"
              />
              <Textarea label="Email" id="email" maxLength={30} />
              <Button size={'md'}>Submit</Button>
            </div>
          </CardBody>
        </Card>
        <div className="flex items-center justify-center gap-2.5 p-10">
          <RoundedSpinner color="primary" />
          <RoundedSpinner color="secondary" />
          <RoundedSpinner color="success" />
          <RoundedSpinner color="danger" />
          <RoundedSpinner color="warning" />
          <RoundedSpinner color="info" />
          <RoundedSpinner color="orange" />
          <RoundedSpinner color="purple" />
          <RoundedSpinner color="gray" />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InputPage;
