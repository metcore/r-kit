import { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "../../components/modal";
import { Button } from "../../components/button";
import DashboardLayout from "../layouts/DashboardLayout";
import { Hero } from "../../components/hero";
import { Card, CardBody, CardHeader } from "../../components/card";
import { Input } from "../../components/input";

export default function ModalPage() {
  const [modalCenter, setModalCenter] = useState<boolean>(false);
  const [modalTop, setModalTop] = useState<boolean>(false);
  const [modalBottom, setModalBottom] = useState<boolean>(false);
  const [modalSm, setModalSm] = useState<boolean>(false);
  const [modalMd, setModalMd] = useState<boolean>(false);
  const [modalLg, setModalLg] = useState<boolean>(false);
  const [modalFull, setModalFull] = useState<boolean>(false);

  return (
    <DashboardLayout>
      <Hero className="mb-4">
        <p className="text-xs text-gray-800">Components</p>
        <h1 className="mb-2.5 text-4xl font-semibold text-gray-900">Modal</h1>
        <p className="text-sm text-gray-800">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius quae
          doloremque ab dolore ipsum accusamus impedit dolorem unde ad a autem
          quod possimus exercitationem cumque, quisquam placeat, minus, tenetur
          hic.
        </p>
      </Hero>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader divider className="font-semibold text-gray-900">
            Modal Position
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <Button onClick={() => setModalTop(true)}>Top Modal</Button>
            <Button onClick={() => setModalCenter(true)}>
              Center Modal (default)
            </Button>
            <Button onClick={() => setModalBottom(true)}>Bottom Modal</Button>
            {/* top */}
            <Modal
              isOpen={modalTop}
              onClose={() => setModalTop(false)}
              position={"top"}
              title="Modal Top Title"
              description="modal top description"
            >
              <ModalBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                culpa, provident nihil, accusamus praesentium quo asperiores
                eaque porro distinctio odio nobis, molestiae aliquam aperiam
                iusto rem aut sunt sint explicabo.
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button variant="outline" onClick={() => setModalTop(false)}>
                  Batal
                </Button>
                <Button onClick={() => setModalTop(false)}>Ok</Button>
              </ModalFooter>
            </Modal>

            {/* center */}
            <Modal
              isOpen={modalCenter}
              onClose={() => setModalCenter(false)}
              size="md"
              title="Modal Title"
              description="modal description"
            >
              <ModalBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                culpa, provident nihil, accusamus praesentium quo asperiores
                eaque porro distinctio odio nobis, molestiae aliquam aperiam
                iusto rem aut sunt sint explicabo.
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Dolorum commodi labore temporibus vitae saepe asperiores
                  eligendi quos id sit aut, tempore ab itaque fugiat alias
                  voluptate autem explicabo repudiandae esse, cum quisquam
                  minima! Officiis quia dicta omnis ratione saepe rem
                  consequuntur officia quam tenetur delectus deleniti, provident
                  sed temporibus iusto inventore non a quae doloribus at aperiam
                  id. Numquam veritatis assumenda excepturi aut quibusdam,
                  similique libero quisquam, laboriosam neque sunt inventore
                  ipsa aspernatur totam magnam consequuntur perspiciatis
                  voluptates tempora nihil ullam accusamus. Laudantium assumenda
                  voluptates repudiandae vel alias magni tempore, quia odio
                  neque incidunt repellat quo dolores iste temporibus fuga.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                  temporibus repudiandae consectetur perspiciatis magni ad
                  deleniti maiores nisi architecto corporis ducimus reiciendis
                  debitis dolore exercitationem nesciunt, consequatur molestiae
                  suscipit sit odio enim ea inventore dolorum nobis nulla. Odio,
                  distinctio. Voluptates, voluptatibus odio quas ducimus,
                  quaerat recusandae sequi aliquam dolore dolores laborum
                  explicabo quo facere dignissimos eaque sapiente illum nemo
                  deleniti et rem fugit perferendis corrupti voluptas
                  asperiores! Itaque ad perspiciatis ut suscipit possimus cumque
                  porro magnam deserunt incidunt corporis provident earum modi,
                  quasi impedit nesciunt assumenda eveniet consequuntur expedita
                  minima iure magni deleniti cum architecto? Quo quis ex sequi
                  molestiae enim dolor dicta optio tempore earum, molestias
                  nihil quae quos cumque accusantium similique facilis odio
                  veritatis ut consectetur aspernatur, mollitia inventore!
                  Pariatur, corrupti libero voluptates quis repudiandae
                  quibusdam quo vitae veritatis, rerum, laboriosam ipsa adipisci
                  dolores dicta quae consequuntur non accusamus? Corporis modi
                  soluta nemo? Similique aliquam corrupti aut voluptatum,
                  assumenda nostrum cupiditate illo dicta dolorem sed corporis
                  nemo qui ad ullam animi? Repudiandae dolore repellendus
                  corporis nulla voluptates beatae distinctio dolores ea?
                  Accusantium tempora id labore. Amet accusamus alias odio,
                  itaque laborum molestiae eveniet sunt sint dignissimos
                  excepturi tenetur eos pariatur libero error unde asperiores
                  cum explicabo vel. Doloribus consectetur rerum ab fugiat,
                  beatae asperiores magni autem, inventore quos quo sunt.
                  Laboriosam illum itaque vel quibusdam tempore voluptatibus id
                  dolores sit numquam labore. Accusamus sapiente sit tenetur
                  cumque accusantium assumenda sed pariatur repudiandae,
                  inventore et ipsa possimus facilis tempora omnis aut molestias
                  cum veritatis itaque quidem! Soluta ab, ex tempore labore sunt
                  minima quos cum qui natus autem aut quo rem quia ipsam ducimus
                  voluptatibus incidunt laborum? Facere magnam dolorem quisquam
                  ut commodi quis, accusantium expedita quod ad impedit
                  perspiciatis labore et non consequatur, similique, illum
                  culpa. Consectetur blanditiis accusamus, et, quisquam hic
                  consequatur suscipit modi, ea ipsum at corrupti nemo
                  repudiandae nam delectus minima magni sit. Placeat qui
                  reiciendis sunt numquam ducimus! Eligendi doloremque
                  temporibus autem cum sunt maiores ratione nulla repellat
                  quasi, culpa error aliquid sed id animi facilis veniam
                  consectetur. Delectus ullam omnis quia officia libero natus,
                  nesciunt quasi enim ratione harum, sed accusantium. Quod nulla
                  iste molestias aspernatur qui optio? Fugit a id officia
                  assumenda consequuntur harum quod est hic cumque, omnis,
                  deserunt voluptatum possimus dolorem. Blanditiis aliquam,
                  facilis cumque mollitia esse eos adipisci, suscipit dolore in
                  cupiditate, fugit optio perspiciatis corrupti dolores laborum
                  quaerat rem rerum quo inventore placeat est a at sed eius?
                  Deserunt rerum praesentium odio modi nesciunt blanditiis nam
                  laboriosam porro aliquid? Temporibus amet in laudantium
                  libero. Dolores, pariatur enim porro alias culpa
                  exercitationem accusantium possimus nam ipsa eligendi dolor
                  eum reiciendis consequatur beatae voluptate iste! Porro
                  maiores necessitatibus quam dicta nostrum impedit fugiat
                  deserunt minus, qui deleniti debitis magni adipisci. Explicabo
                  aperiam nostrum quam, vel iste cumque sed ab, amet magni
                  assumenda vero a mollitia tenetur natus sint quod laboriosam?
                  Obcaecati ipsa eaque labore sapiente quia rem laudantium
                  perferendis, accusamus culpa numquam, at, ab quis quos saepe!
                  Inventore quia quae aliquam, porro a assumenda pariatur
                  delectus non ipsa quam magni nam corporis expedita reiciendis
                  necessitatibus quod, cumque laudantium consequuntur. Molestias
                  minus itaque cupiditate illo odit eum ducimus, alias commodi,
                  voluptas saepe sit repellendus optio earum at. Aut molestias
                  ex quibusdam minus praesentium, fugiat optio quo accusantium
                  facilis reprehenderit tempore dolores incidunt voluptatum sit
                  tempora quia exercitationem maiores architecto a molestiae
                  corporis error est sunt doloremque! Error, minima dolor!
                  Repudiandae aut optio, distinctio qui cupiditate totam placeat
                  delectus modi corrupti maxime sunt quaerat dolorum amet,
                  sapiente quis ex cum adipisci debitis quos necessitatibus
                  tempora numquam? Quaerat ex ipsum sed officiis omnis tenetur
                  doloribus molestias, impedit, nobis modi dolorum nostrum.
                  Ducimus quidem quia dolore quas veniam? Sunt voluptatibus
                  tempore voluptatem illum ut, eaque provident? Omnis eos
                  quisquam inventore earum facere expedita quo! Accusamus
                  consequatur obcaecati maxime sunt iure quaerat nesciunt quod
                  placeat quae similique! Accusantium atque nam fugit voluptates
                  quos optio quas harum incidunt doloribus sunt nisi alias
                  quisquam, labore eos sint velit, repudiandae fuga natus totam
                  enim error. Ab facilis illum nesciunt a dignissimos. Assumenda
                  architecto saepe maxime voluptatibus sit ex officia vero neque
                  soluta? Sapiente, placeat similique minus ea tempore
                  voluptatum, tempora impedit veritatis excepturi iusto libero
                  delectus illum, vel et corporis maxime est magnam pariatur
                  sed! Voluptates minus tempora magni corporis, autem nesciunt
                  quasi distinctio dolorum, eos totam deserunt magnam facere in,
                  commodi esse sed dicta culpa iure recusandae impedit.
                  Officiis, quae consectetur quidem ut mollitia accusantium
                  labore tempora! Officia, voluptas impedit. Exercitationem
                  beatae vero iusto, magni delectus, unde libero sequi quae
                  veritatis quaerat nobis repudiandae, perspiciatis perferendis
                  fugiat. Perspiciatis sit esse quasi. Iusto necessitatibus amet
                  veritatis vel dolore? Obcaecati, ad nemo. Minima commodi
                  accusantium dolorem porro ex odio! Optio, voluptatum
                  cupiditate nulla eveniet nisi reiciendis exercitationem
                  facilis facere. Placeat asperiores obcaecati voluptatem illum
                  nam velit impedit expedita minima cum animi, officia iusto,
                  assumenda amet. Ipsum ad dignissimos quasi. Commodi aliquid
                  iusto eaque atque blanditiis eveniet et incidunt sunt
                  aspernatur error in consequatur dolores illum cupiditate nihil
                  sapiente, architecto, iste, nemo praesentium fuga explicabo.
                  Temporibus, tempora atque quae similique laborum corporis aut
                  alias voluptatibus ab animi maxime. Quidem fuga laboriosam,
                  repellat, accusantium doloribus veniam earum numquam atque
                  esse voluptas incidunt iusto ea aliquam vero illum sunt aut
                  est veritatis quae! Fugit ea fuga suscipit. Esse iusto natus
                  earum ullam fugiat et maxime, voluptates pariatur expedita
                  doloremque provident laborum commodi quo optio beatae, alias
                  inventore sed nihil. Incidunt consequuntur at repellendus sunt
                  quam voluptates eius necessitatibus perferendis hic
                  aspernatur? Asperiores adipisci deserunt dicta sunt ex
                  quisquam animi ab voluptate consectetur exercitationem eum in
                  quas similique culpa laborum est officiis veniam accusantium
                  natus, quidem eius cupiditate? Fuga tempora provident impedit
                  libero laborum, deleniti ullam ad maxime ab, nemo quasi! Iure
                  assumenda veritatis enim distinctio odit nobis deserunt
                  tempora illum ab optio at excepturi modi, quam culpa
                  voluptatibus ducimus? Nostrum eligendi reiciendis delectus!
                  Nam eaque voluptas labore quae animi nulla est voluptatem
                  aliquid! Ullam modi quaerat ratione deleniti reiciendis enim
                  iste. Nulla numquam facilis ratione cupiditate quidem
                  dignissimos tenetur laboriosam error nemo mollitia. Suscipit
                  laudantium ab explicabo accusantium quam commodi, ducimus
                  veniam?
                </p>
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button variant="outline" onClick={() => setModalCenter(false)}>
                  Batal
                </Button>
                <Button onClick={() => setModalCenter(false)}>OK</Button>
              </ModalFooter>
            </Modal>

            {/* bottom */}
            <Modal
              isOpen={modalBottom}
              onClose={() => setModalBottom(false)}
              size="md"
              position={"bottom"}
              title="Modal Bottom Title"
              description="modal bottom description"
            >
              <ModalBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                culpa, provident nihil, accusamus praesentium quo asperiores
                eaque porro distinctio odio nobis, molestiae aliquam aperiam
                iusto rem aut sunt sint explicabo.
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Dolorum commodi labore temporibus vitae saepe asperiores
                  eligendi quos id sit aut, tempore ab itaque fugiat alias
                  voluptate autem explicabo repudiandae esse, cum quisquam
                  minima! Officiis quia dicta omnis ratione saepe rem
                  consequuntur officia quam tenetur delectus deleniti, provident
                  sed temporibus iusto inventore non a quae doloribus at aperiam
                  id. Numquam veritatis assumenda excepturi aut quibusdam,
                  similique libero quisquam, laboriosam neque sunt inventore
                  ipsa aspernatur totam magnam consequuntur perspiciatis
                  voluptates tempora nihil ullam accusamus. Laudantium assumenda
                  voluptates repudiandae vel alias magni tempore, quia odio
                  neque incidunt repellat quo dolores iste temporibus fuga.
                </p>
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button variant="outline" onClick={() => setModalBottom(false)}>
                  Batal
                </Button>
                <Button onClick={() => setModalBottom(false)}>Ok</Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>

        <Card>
          <CardHeader divider className="font-semibold text-gray-900">
            Modal Size
          </CardHeader>
          <CardBody className="flex flex-wrap gap-8">
            <Button onClick={() => setModalSm(true)}>Modal sm</Button>

            <Button onClick={() => setModalMd(true)}>Modal md (default)</Button>

            <Button onClick={() => setModalLg(true)}>Modal lg</Button>
            <Button onClick={() => setModalFull(true)}>fullscreen</Button>

            <Modal
              isOpen={modalSm}
              onClose={() => setModalSm(false)}
              size="sm"
              title="Modal Title"
              description="modal description"
            >
              <ModalBody>
                <div>
                  <Input />
                </div>
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button variant="outline" onClick={() => setModalSm(false)}>
                  Batal
                </Button>
                <Button onClick={() => setModalSm(false)}>Oke gas</Button>
              </ModalFooter>
            </Modal>

            <Modal
              isOpen={modalMd}
              onClose={() => setModalMd(false)}
              size="md"
              title="Modal Title"
              description="modal description"
            >
              <ModalBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                culpa, provident nihil, accusamus praesentium quo asperiores
                eaque porro distinctio odio nobis, molestiae aliquam aperiam
                iusto rem aut sunt sint explicabo.
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button variant="outline" onClick={() => setModalMd(false)}>
                  Batal
                </Button>
                <Button onClick={() => setModalMd(false)}>OK</Button>
              </ModalFooter>
            </Modal>

            <Modal
              isOpen={modalLg}
              onClose={() => setModalLg(false)}
              size="lg"
              title="Modal Title"
              description="modal description"
            >
              <ModalBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                culpa, provident nihil, accusamus praesentium quo asperiores
                eaque porro distinctio odio nobis, molestiae aliquam aperiam
                iusto rem aut sunt sint explicabo.
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button variant="outline" onClick={() => setModalLg(false)}>
                  Batal
                </Button>
                <Button onClick={() => setModalLg(false)}>OK</Button>
              </ModalFooter>
            </Modal>

            <Modal
              isOpen={modalFull}
              onClose={() => setModalFull(false)}
              size="full"
              title="Modal Title"
              description="modal description"
            >
              <ModalBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                culpa, provident nihil, accusamus praesentium quo asperiores
                eaque porro distinctio odio nobis, molestiae aliquam aperiam
                iusto rem aut sunt sint explicabo.
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button variant="outline" onClick={() => setModalFull(false)}>
                  Batal
                </Button>
                <Button onClick={() => setModalFull(false)}>OK</Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
