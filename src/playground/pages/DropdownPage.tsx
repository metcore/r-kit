import illust from '../../assets/images/typography.png';
import MainSection from '../components/MainSection';
import { Text } from '../../components/text';
import { cn } from '../../lib/utils';
import useColors from '../hooks/useColors';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import {
  Checkbox,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
  Input,
} from '../../clients';
import { Button } from '../../components/button';
import { Icon } from '../../components/icons';

export default function DropdownPage() {
  const {
    primaryColors,
    warningColors,
    successColors,
    infoColors,
    grayColors,
    dangerColors,
    purpleColors,
    dividerColors,
    orangeColors,
  } = useColors();

  return (
    <>
      <HeroSection
        illust={illust}
        title="Navigation"
        subtitle="Dropdown"
        description="Bantu user pilih satu item dari daftar tanpa memenuhi layar."
      />

      <div className="flex flex-col gap-4">
        <MainSection title="Default">
          <div className="flex flex-wrap gap-4">
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary">Primary</Button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem> Action</DropdownItem>
                <DropdownItem>
                  <div className="flex flex-wrap items-center gap-2">
                    <Icon name="user" />
                    Another Action
                  </div>
                </DropdownItem>
                <DropdownItem> Something ELse Here</DropdownItem>
                <DropdownSeparator className="DropdownMenuSeparator" />
                <DropdownItem> Separted Link </DropdownItem>
              </DropdownContent>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" variant="outline">
                  Secondary
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem> Action</DropdownItem>
                <DropdownItem>
                  <div className="flex flex-wrap items-center gap-2">
                    <Icon name="user" />
                    Another Action
                  </div>
                </DropdownItem>
                <DropdownItem> Something ELse Here</DropdownItem>
                <DropdownSeparator className="DropdownMenuSeparator" />
                <DropdownItem> Separted Link </DropdownItem>
              </DropdownContent>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" variant="outline">
                  Form
                </Button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem>
                  <div className="flex flex-col gap-2">
                    <Input label="email" />
                    <Input label="Password" />
                    <Checkbox label="remember me" />
                    <Button>Sign In</Button>
                  </div>
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem>Forgot Password</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </MainSection>
        <MainSection title="Gray">
          <div className="flex flex-row flex-wrap items-center gap-8">
            {grayColors.map((color, index) => (
              <CardColor
                key={index}
                color={color.hexa}
                name={color.name}
                className="border border-gray-500"
              />
            ))}
          </div>
        </MainSection>
        <MainSection title="Primary">
          <div className="flex flex-row flex-wrap items-center gap-8">
            {primaryColors.map((color, index) => (
              <CardColor
                key={index}
                color={color.hexa}
                name={color.name}
                className="border border-gray-500"
              />
            ))}
          </div>
        </MainSection>
        <MainSection title="Warning">
          <div className="flex flex-row flex-wrap items-center gap-8">
            {warningColors.map((color, index) => (
              <CardColor
                key={index}
                color={color.hexa}
                name={color.name}
                className="border border-gray-500"
              />
            ))}
          </div>
        </MainSection>
        <MainSection title="Danger">
          <div className="flex flex-row flex-wrap items-center gap-8">
            {dangerColors.map((color, index) => (
              <CardColor
                key={index}
                color={color.hexa}
                name={color.name}
                className="border border-gray-500"
              />
            ))}
          </div>
        </MainSection>
        <MainSection title="Success">
          <div className="flex flex-row flex-wrap items-center gap-8">
            {successColors.map((color, index) => (
              <CardColor
                key={index}
                color={color.hexa}
                name={color.name}
                className="border border-gray-500"
              />
            ))}
          </div>
        </MainSection>
        <MainSection title="Info">
          <div className="flex flex-row flex-wrap items-center gap-8">
            {infoColors.map((color, index) => (
              <CardColor
                key={index}
                color={color.hexa}
                name={color.name}
                className="border border-gray-500"
              />
            ))}
          </div>
        </MainSection>
        <MainSection title="Orange">
          <div className="flex flex-row flex-wrap items-center gap-8">
            {orangeColors.map((color, index) => (
              <CardColor
                key={index}
                color={color.hexa}
                name={color.name}
                className="border border-gray-500"
              />
            ))}
          </div>
        </MainSection>
        <MainSection title="Purple">
          <div className="flex flex-row flex-wrap items-center gap-8">
            {purpleColors.map((color, index) => (
              <CardColor
                key={index}
                color={color.hexa}
                name={color.name}
                className="border border-gray-500"
              />
            ))}
          </div>
        </MainSection>
        <div className="flex flex-row items-stretch gap-4">
          {dividerColors.map((color, index) => (
            <MainSection key={index} title={color.title} className="flex-1">
              <div className="flex flex-row flex-wrap items-center gap-8">
                <CardColor
                  key={index}
                  color={color.hexa}
                  name={color.name}
                  percentage={color.percentage}
                  className={cn(
                    'border border-gray-500',
                    index === 0 && 'opacity-13',
                    index === 1 && 'opacity-38'
                  )}
                />
              </div>
            </MainSection>
          ))}
        </div>

        <Footer title="Colors" backTo="/typography" backToTitle="Typography" />
      </div>
    </>
  );
}

const CardColor = ({
  className,
  percentage,
  color,
  name,
}: {
  className?: string;
  percentage?: string;
  color: string;
  name: string;
}) => {
  return (
    <div className="items-tart flex flex-col gap-4">
      <div
        className={cn('h-28 w-28 rounded-sm border', className)}
        style={{ backgroundColor: color }}
      />
      <div className="flex flex-col">
        <Text value={name} weight="semibold" variant="t2" />
        <div className="flex flex-row items-center justify-between">
          <Text
            value={color}
            weight="medium"
            variant="t3"
            className="text-gray-700"
          />
          {percentage !== undefined && (
            <Text
              value={percentage}
              weight="medium"
              variant="t3"
              className="text-gray-700"
            />
          )}
        </div>
      </div>
    </div>
  );
};
