import { Timeline } from '../../../components/timeline';
import MainSection from '../../components/MainSection';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function TimelinePage() {
  return (
    <DashboardLayout>
      <MainSection title="default">
        <Timeline
          value={{
            label: 'label',
            title: 'Timeline Title',
            subtitle: 'Subtitle',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec dictum viverra consequat vitae urna',
          }}
        />
        <Timeline
          color="success"
          className="mt-5"
          badge={{
            color: 'primary',
            value: 'Badge',
          }}
          value={{
            label: 'label',
            title: 'Timeline Title',
            subtitle: 'Subtitle',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec dictum viverra consequat vitae urna',
          }}
        />
        <Timeline
          color="danger"
          className="mt-5"
          badge={{
            color: 'danger',
            value: 'Badge',
          }}
          value={{
            label: 'label',
            title: 'Timeline Title',
            subtitle: 'Subtitle',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec dictum viverra consequat vitae urna',
          }}
        />
        <Timeline
          color="info"
          className="mt-5"
          badge={{
            color: 'info',
            value: 'Badge',
          }}
          value={{
            label: 'label',
            title: 'Timeline Title',
            subtitle: 'Subtitle',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec dictum viverra consequat vitae urna',
          }}
        />
        <Timeline
          color="warning"
          className="mt-5"
          badge={{
            color: 'warning',
            value: 'Badge',
          }}
          value={{
            label: 'label',
            title: 'Timeline Title',
            subtitle: 'Subtitle',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec dictum viverra consequat vitae urna',
          }}
        />
        <Timeline
          color="orange"
          className="mt-5"
          badge={{
            color: 'orange',
            value: 'Badge',
          }}
          value={{
            label: 'label',
            title: 'Timeline Title',
            subtitle: 'Subtitle',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec dictum viverra consequat vitae urna',
          }}
        />
        <Timeline
          color="gray"
          className="mt-5"
          badge={{
            color: 'gray',
            value: 'Badge',
          }}
          value={{
            label: 'label',
            title: 'Timeline Title',
            subtitle: 'Subtitle',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec dictum viverra consequat vitae urna',
          }}
        />
      </MainSection>
    </DashboardLayout>
  );
}
