import { Hero } from '../../../components/hero';
import { Text } from '../../../components/text';
import { Accordion, AccordionItem } from '../../../components/accordion';
import GridWrapper from '../../components/GridWrapper';
import MainSection from '../../components/MainSection';
import { Icon } from '../../../components/icons';
import { Switch } from '../../../clients';
import { useState } from 'react';

const DESCRIPTION =
  'Lorem ipsum dolor sit amet contortuor sit amet lorem ipsum';

export default function ListPage() {
  const [isOpen, setIsOpen] = useState<boolean>();
  const renderHeader = () => (
    <div className="flex items-center justify-between">
      <Text variant="t2" weight="semibold" className="text-gray-900">
        Ini Header Accordion
      </Text>
      <Icon
        name={isOpen == true ? 'arrow-down' : 'arrow-up'}
        className="text-gray-600"
        size={15}
      />
    </div>
  );
  return (
    <>
      <Hero className="mb-4">
        <p className="text-xs text-gray-800">Components</p>
        <h1 className="mb-2.5 text-4xl font-semibold text-gray-900">
          Accordion
        </h1>
        <p className="text-sm text-gray-800">
          Elemen icon utama yang digunakan untuk menampilkan gambar.
        </p>
      </Hero>
      <GridWrapper>
        <MainSection title="Default">
          <Accordion
            onCollapse={(e) => setIsOpen(e)}
            renderHeader={renderHeader()}
          >
            <AccordionItem>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
            <AccordionItem>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
            <AccordionItem>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
            <AccordionItem>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
          </Accordion>
        </MainSection>
        <MainSection title="Strip">
          <Accordion
            renderHeader={renderHeader()}
            onCollapse={(e) => setIsOpen(e)}
            variant="striped"
          >
            <AccordionItem>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
            <AccordionItem>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
            <AccordionItem>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
            <AccordionItem>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
          </Accordion>
        </MainSection>
        <MainSection title="Active">
          <Accordion
            onCollapse={(e) => setIsOpen(e)}
            renderHeader={renderHeader()}
          >
            <AccordionItem active>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
            <AccordionItem>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
            <AccordionItem>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
            <AccordionItem active>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
          </Accordion>
        </MainSection>
        <MainSection title="Content">
          <Accordion
            onCollapse={(e) => setIsOpen(e)}
            renderHeader={renderHeader()}
          >
            <AccordionItem active>
              <div className="flex flex-wrap items-center gap-2">
                <Icon name="user" size={20} className="text-gray-700" />
                <div className="flex flex-col">
                  <Text variant="t2" className="text-gray-900">
                    Push Notificiation
                  </Text>
                  <Text variant="t2" className="text-gray-700">
                    Push Notificiation
                  </Text>
                </div>
              </div>
            </AccordionItem>
            <AccordionItem>
              <div className="flex items-center justify-between">
                <Text variant="t2" className="text-gray-900">
                  Push Notificiation
                </Text>
                <Text variant="t2" className="text-gray-700">
                  <Switch />
                </Text>
              </div>
            </AccordionItem>
            <AccordionItem>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
            <AccordionItem active>
              <Text>{DESCRIPTION}</Text>
            </AccordionItem>
          </Accordion>
        </MainSection>
      </GridWrapper>
    </>
  );
}
