import { Button } from '../../../components/button';
import { useToast } from '../../../components/toast';
import Toast from '../../../components/toast/toast-card';
import MainSection from '../../components/MainSection';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function ToastPage() {
  const toast = useToast();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <MainSection title="Snackbar Toast">
          <div className="flex flex-row flex-wrap gap-4">
            <Toast title="Primary" description="Description" color="primary" />
            <Toast
              title="Primary"
              description="Description"
              color="secondary"
            />
            <Toast title="Primary" description="Description" color="danger" />
            <Toast title="Primary" description="Description" color="gray" />
            <Toast title="Primary" description="Description" color="info" />
            <Toast title="Primary" description="Description" color="orange" />
            <Toast title="Primary" description="Description" color="purple" />
            <Toast title="Primary" description="Description" color="success" />
            <Toast title="Primary" description="Description" color="warning" />
          </div>
        </MainSection>
        <MainSection title="Snackbar Toast With Icon">
          <div className="flex flex-row flex-wrap gap-4">
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="primary"
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="secondary"
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="danger"
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="gray"
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="info"
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="orange"
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="purple"
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="success"
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="warning"
            />
          </div>
        </MainSection>
        <MainSection title="Snackbar Toast With Action">
          <div className="flex flex-row flex-wrap gap-4">
            <Toast
              title="Primary"
              description="Description"
              color="primary"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              title="Primary"
              description="Description"
              color="secondary"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              title="Primary"
              description="Description"
              color="danger"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              title="Primary"
              description="Description"
              color="gray"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              title="Primary"
              description="Description"
              color="info"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              title="Primary"
              description="Description"
              color="orange"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              title="Primary"
              description="Description"
              color="purple"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              title="Primary"
              description="Description"
              color="success"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              title="Primary"
              description="Description"
              color="warning"
              onClickAction={() => console.log('ok')}
            />
          </div>
        </MainSection>
        <MainSection title="Snackbar Toast With Icon & Action">
          <div className="flex flex-row flex-wrap gap-4">
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="primary"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="secondary"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="danger"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="gray"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="info"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="orange"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="purple"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="success"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="warning"
              onClickAction={() => console.log('ok')}
            />
          </div>
        </MainSection>
        <MainSection title="Snackbar Toast Ourline">
          <div className="flex flex-row flex-wrap gap-4">
            <Toast
              variant="outline"
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="primary"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              variant="outline"
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="secondary"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              variant="outline"
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="danger"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              variant="outline"
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="gray"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              variant="outline"
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="info"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              variant="outline"
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="orange"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              variant="outline"
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="purple"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              variant="outline"
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="success"
              onClickAction={() => console.log('ok')}
            />
            <Toast
              variant="outline"
              icon="copy-fill"
              title="Primary"
              description="Description"
              color="warning"
              onClickAction={() => console.log('ok')}
            />
          </div>
        </MainSection>
        <MainSection title="Snackbar Toast Ourline">
          <div className="flex flex-row flex-wrap gap-4">
            <Button
              onClick={() =>
                toast.show({
                  title: 'Success!',
                  description: 'Data Created Successfully!',
                  color: 'primary',
                  duration: 10000,
                })
              }
            >
              Demo Toast Primary
            </Button>
            <Button
              color="secondary"
              onClick={() =>
                toast.show({
                  title: 'Success!',
                  description: 'Data Created Successfully!',
                  color: 'secondary',
                })
              }
            >
              Demo Toast Secondary
            </Button>
            <Button
              color="danger"
              onClick={() =>
                toast.show({
                  title: 'Success!',
                  description: 'Data Created Successfully!',
                  color: 'danger',
                })
              }
            >
              Demo Toast Danger
            </Button>
            <Button
              color="gray"
              onClick={() =>
                toast.show({
                  title: 'Success!',
                  description: 'Data Created Successfully!',
                  color: 'gray',
                })
              }
            >
              Demo Toast Gray
            </Button>
            <Button
              color="info"
              onClick={() =>
                toast.show({
                  title: 'Success!',
                  description: 'Data Created Successfully!',
                  color: 'info',
                })
              }
            >
              Demo Toast Info
            </Button>
            <Button
              color="orange"
              onClick={() =>
                toast.show({
                  title: 'Success!',
                  description: 'Data Created Successfully!',
                  color: 'orange',
                })
              }
            >
              Demo Toast Orange
            </Button>
            <Button
              color="purple"
              onClick={() =>
                toast.show({
                  title: 'Success!',
                  description: 'Data Created Successfully!',
                  color: 'purple',
                })
              }
            >
              Demo Toast Purple
            </Button>
            <Button
              color="success"
              onClick={() =>
                toast.show({
                  title: 'Success!',
                  description: 'Data Created Successfully!',
                  color: 'success',
                })
              }
            >
              Demo Toast Success
            </Button>
            <Button
              color="warning"
              onClick={() =>
                toast.show({
                  title: 'Success!',
                  description: 'Data Created Successfully!',
                  color: 'warning',
                })
              }
            >
              Demo Toast Warning
            </Button>
          </div>
        </MainSection>
      </div>
    </DashboardLayout>
  );
}
