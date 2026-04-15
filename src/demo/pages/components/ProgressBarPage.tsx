import HeroSection from '../../components/HeroSection';
import DashboardLayout from '../../layouts/DashboardLayout';
import illust from '../../assets/images/forms.png';
import MainSection from '../../components/MainSection';
import ProgressBar from '../../../components/progress-bar/progress-bar';
import dedent from 'dedent';

export default function ProgressBarPage() {
  const exampleDefault = dedent(`
    <ProgressBar value={10} useTooltip tooltipSide="bottom" />
  `);
  return (
    <DashboardLayout>
      <HeroSection
        title="Progress Bar"
        description="Progress bar component"
        subtitle="progress bar"
        illust={illust}
      />

      <MainSection
        title="Default"
        code={exampleDefault}
        contentClassName="space-y-3"
      >
        <ProgressBar value={10} />
        <ProgressBar value={20} color="info" />
        <ProgressBar value={30} color="danger" />
        <ProgressBar value={40} color="warning" />
        <ProgressBar value={50} color="orange" />
        <ProgressBar value={60} color="purple" />
        <ProgressBar value={70} color="gray" />
      </MainSection>

      <MainSection
        title="Tooltip Side Default"
        code={exampleDefault}
        className="mt-3"
        contentClassName="space-y-3"
      >
        <ProgressBar useTooltip value={10} />
        <ProgressBar useTooltip value={20} color="info" />
        <ProgressBar useTooltip value={30} color="danger" />
        <ProgressBar useTooltip value={40} color="warning" />
        <ProgressBar useTooltip value={50} color="orange" />
        <ProgressBar useTooltip value={60} color="purple" />
        <ProgressBar useTooltip value={70} color="gray" />
      </MainSection>

      <MainSection
        title="Tooltip Side Bottom"
        code={exampleDefault}
        className="mt-3"
        contentClassName="space-y-3"
      >
        <ProgressBar useTooltip tooltipSide="bottom" value={10} />
        <ProgressBar useTooltip tooltipSide="bottom" value={20} color="info" />
        <ProgressBar
          useTooltip
          tooltipSide="bottom"
          value={30}
          color="danger"
        />
        <ProgressBar
          useTooltip
          tooltipSide="bottom"
          value={40}
          color="warning"
        />
        <ProgressBar
          useTooltip
          tooltipSide="bottom"
          value={50}
          color="orange"
        />
        <ProgressBar
          useTooltip
          tooltipSide="bottom"
          value={60}
          color="purple"
        />
        <ProgressBar useTooltip tooltipSide="bottom" value={70} color="gray" />
      </MainSection>
    </DashboardLayout>
  );
}
