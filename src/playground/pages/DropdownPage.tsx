import illust from '../../assets/images/typography.png';
import MainSection from '../components/MainSection';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import {
  Checkbox,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownPanel,
  DropdownSeparator,
  DropdownTrigger,
  Input,
} from '../../clients';
import { Button } from '../../components/button';
import { Icon } from '../../components/icons';
import { Kbd } from '../../components/kbd';
import GridWrapper from '../components/GridWrapper';
import { ButtonIcon } from '../../components/button-icon/button-icon';

export default function DropdownPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Navigation"
        subtitle="Dropdown"
        description="Bantu user pilih satu item dari daftar tanpa memenuhi layar."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection title="Default">
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary">Primary</Button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem>
                  <Button
                    color="primary"
                    variant="outline"
                    block
                    className="text-left"
                  >
                    Form
                  </Button>
                </DropdownItem>
                <DropdownItem>
                  <div className="flex flex-wrap items-center gap-2">
                    <Icon name="user" />
                    Another Action
                  </div>
                </DropdownItem>
                <DropdownItem> Something ELse Here</DropdownItem>
                <DropdownSeparator />
                <DropdownItem> Separted Link </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </MainSection>
          <MainSection title="Color Button">
            <div className="flex flex-wrap items-center gap-2">
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
                  <DropdownSeparator />
                  <DropdownItem> Separted Link </DropdownItem>
                </DropdownContent>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger>
                  <Button color="secondary">Secondary</Button>
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
                  <DropdownSeparator />
                  <DropdownItem> Separted Link </DropdownItem>
                </DropdownContent>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger>
                  <Button color="warning">Warning</Button>
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
                  <DropdownSeparator />
                  <DropdownItem> Separted Link </DropdownItem>
                </DropdownContent>
              </Dropdown>
            </div>
          </MainSection>
        </GridWrapper>

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
                <DropdownItem> Action </DropdownItem>
                <DropdownItem onClick={() => alert('d')}>
                  <Icon name="user" />
                  Another Action
                </DropdownItem>
                <DropdownItem>
                  Something ELse Here
                  <Kbd size="sm">
                    <Icon name="arrow-turn-down-left" size={12} />
                  </Kbd>
                </DropdownItem>
                <DropdownSeparator />
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
                <DropdownPanel className="flex flex-col gap-2">
                  <Input label="email" />
                  <Input label="Password" />
                  <Checkbox label="remember me" />
                  <Button>Sign In</Button>
                </DropdownPanel>
                <DropdownSeparator />
                <DropdownItem>Forgot Password</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </MainSection>

        <GridWrapper>
          <MainSection title="Icon">
            <Dropdown>
              <DropdownTrigger>
                <ButtonIcon icon="user" variant="tertiary" />
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem href="/playground/dropdown">View</DropdownItem>
                <DropdownItem href="/playground/dropdown">Create</DropdownItem>
                <DropdownItem href="/playground/dropdown">Update</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </MainSection>
          <MainSection title="As Link">
            <Dropdown>
              <DropdownTrigger>
                <Button color="warning">Action</Button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem href="/playground/dropdown">View</DropdownItem>
                <DropdownItem href="/playground/dropdown">Create</DropdownItem>
                <DropdownItem href="/playground/dropdown">Update</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </MainSection>
        </GridWrapper>

        <Footer title="Colors" backTo="/typography" backToTitle="Typography" />
      </div>
    </>
  );
}
