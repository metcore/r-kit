import dedent from 'dedent';
import { Card, CardBody, CardMedia } from '../../components/card';
import { Text } from '../../components/text';
import illust from '../../assets/images/typography.png';
import MainSection from '../components/MainSection';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { Button } from '../../components/button';

export default function CardPage() {
  const exampleCodeH1 = dedent(`
    <Text 
      value="Bold" 
      weight="bold" 
      variant="h1" 
    />
  `);

  const exampleCodeP1 = dedent(`
    <Text 
      value="Bold" 
      weight="bold" 
      variant="p1" 
    />
  `);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Card"
        description="Container serbaguna yang menyajikan konten, aksi, atau media dalam format terorganisir."
      />

      <div className="flex flex-col gap-4">
        <MainSection title="Card" code={exampleCodeH1}>
          <div className="flex flex-1 flex-col gap-8 overflow-auto">
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardMedia
                  image="../../src/assets/images/card-example.jpg"
                  alt="Paella dish"
                />
                <CardBody>
                  <div className="flex flex-col gap-4">
                    <Text
                      variant="t2"
                      weight="semibold"
                      className="text-gray-900"
                    >
                      Card Title
                    </Text>
                    <Text
                      variant="t3"
                      weight="regular"
                      className="text-gray-700"
                    >
                      Some quick example text to build on the card title and
                      make up the bulk of the cards content.
                    </Text>
                    <div className="flex grid grid-cols-2 flex-col gap-4">
                      <Button variant="outline" size="sm">
                        Secondary
                      </Button>
                      <Button size="sm" block>
                        Secondary
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card size="sm">
                <CardMedia
                  image="../../src/assets/images/card-example.jpg"
                  alt="Paella dish"
                />
                <CardBody>
                  <div className="flex flex-col gap-4">
                    <Text
                      variant="t2"
                      weight="semibold"
                      className="text-gray-900"
                    >
                      Card Title
                    </Text>
                    <Text
                      variant="t3"
                      weight="regular"
                      className="text-gray-700"
                    >
                      Some quick example text to build on the card title and
                      make up the bulk of the cards content.
                    </Text>
                    <div className="flex grid grid-cols-2 flex-col gap-4">
                      <Button variant="outline" size="sm">
                        Secondary
                      </Button>
                      <Button size="sm" block>
                        Secondary
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="col-span-2">
                <Card
                  size="sm"
                  className="flex grid grid-cols-2 flex-col gap-4"
                >
                  <CardMedia
                    image="../../src/assets/images/card-example.jpg"
                    alt="Paella dish"
                  />
                  <CardBody>
                    <div className="flex flex-col gap-4">
                      <Text
                        variant="t2"
                        weight="semibold"
                        className="text-gray-900"
                      >
                        Card Title
                      </Text>
                      <Text
                        variant="t3"
                        weight="regular"
                        className="text-gray-700"
                      >
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                      </Text>
                      <div className="flex grid grid-cols-2 flex-col gap-4">
                        <Button variant="outline" size="sm">
                          Secondary
                        </Button>
                        <Button size="sm" block>
                          Secondary
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </MainSection>

        <MainSection title="Color Card" code={exampleCodeP1}>
          <div className="flex flex-1 flex-col gap-8 overflow-auto">
            <div className="grid grid-cols-4 gap-4">
              <Card color="primary" variant="filled">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Primary Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="warning" variant="filled">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Warning Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="danger" variant="filled">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Danger Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="success" variant="filled">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Success Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="info" variant="filled">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Info Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="orange" variant="filled">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Orange Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="purple" variant="filled">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Purple Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="gray" variant="filled">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Gray Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
            </div>
          </div>
        </MainSection>

        <MainSection title="Color Card" code={exampleCodeP1}>
          <div className="flex flex-1 flex-col gap-8 overflow-auto">
            <div className="grid grid-cols-4 gap-4">
              <Card color="primary">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Primary Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="warning">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Warning Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="danger">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Danger Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="success">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Success Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="info">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Info Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="orange">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Orange Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="purple">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Purple Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
              <Card color="gray">
                <CardBody>
                  <Text variant="t2" weight="semibold">
                    Gray Card
                  </Text>
                  <Text variant="t3" weight="regular">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </Text>
                </CardBody>
              </Card>
            </div>
          </div>
        </MainSection>
        <Footer title="Typography" nextTo="/colors" nextToTitle="Colors" />
      </div>
    </>
  );
}
