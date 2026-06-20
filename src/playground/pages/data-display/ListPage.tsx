import { Hero } from '../../../components/hero';
import { Text } from '../../../components/text';
import { List, ListItem } from '../../../components/list';
import GridWrapper from '../../components/GridWrapper';
import MainSection from '../../components/MainSection';
import { Icon } from '../../../components/icons';
import { Switch } from '../../../clients';

const DESCRIPTION =
  'Lorem ipsum dolor sit amet contortuor sit amet lorem ipsum';

export default function ListPage() {
  return (
    <>
      <Hero className="mb-4">
        <p className="text-xs text-gray-800">Components</p>
        <h1 className="mb-2.5 text-4xl font-semibold text-gray-900">List</h1>
        <p className="text-sm text-gray-800">
          Elemen icon utama yang digunakan untuk menampilkan gambar.
        </p>
      </Hero>
      <GridWrapper>
        <MainSection title="Default">
          <List>
            <ListItem>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
            <ListItem>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
            <ListItem>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
            <ListItem>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
          </List>
        </MainSection>
        <MainSection title="Strip">
          <List variant="striped">
            <ListItem>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
            <ListItem>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
            <ListItem>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
            <ListItem>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
          </List>
        </MainSection>
        <MainSection title="Active">
          <List>
            <ListItem active>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
            <ListItem>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
            <ListItem>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
            <ListItem active>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
          </List>
        </MainSection>
        <MainSection title="Content">
          <List>
            <ListItem active>
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
            </ListItem>
            <ListItem>
              <div className="flex items-center justify-between">
                <Text variant="t2" className="text-gray-900">
                  Push Notificiation
                </Text>
                <Text variant="t2" className="text-gray-700">
                  <Switch />
                </Text>
              </div>
            </ListItem>
            <ListItem>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
            <ListItem active>
              <Text>{DESCRIPTION}</Text>
            </ListItem>
          </List>
        </MainSection>
      </GridWrapper>
    </>
  );
}
