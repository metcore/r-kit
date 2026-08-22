import { useState } from 'react';
import dedent from 'dedent';
import {
  Modal,
  ModalBody,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../../components/modal';
import { Button } from '../../components/button';
import { Icon } from '../../components/icons';
import { Input } from '../../components/input';
import { Text } from '../../components/text';
import illust from '../../assets/images/data-display.png';
import GridWrapper from '../components/GridWrapper';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';

type ModalKey =
  | 'basic'
  | 'top'
  | 'bottom'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'full'
  | 'konfirmasi'
  | 'form'
  | 'takBisaTutup';

const SIZES = ['xs', 'sm', 'md', 'lg', 'full'] as const;

const exampleBasic = dedent(`
  import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
  } from '@herca/r-kit';

  const [isOpen, setIsOpen] = useState(false);

  <Button onClick={() => setIsOpen(true)}>Buka Modal</Button>

  <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
    <ModalHeader>
      <ModalTitle>Ubah Profil</ModalTitle>
    </ModalHeader>

    <ModalBody>Perbarui data profil Anda di sini.</ModalBody>

    <ModalFooter className="justify-end gap-2">
      <Button variant="outline" color="gray" onClick={() => setIsOpen(false)}>
        Batal
      </Button>
      <Button onClick={() => setIsOpen(false)}>Simpan</Button>
    </ModalFooter>
  </Modal>
`);

const examplePosition = dedent(`
  // position mengatur modal menempel di atas, tengah (bawaan), atau bawah.
  <Modal isOpen={isOpen} onClose={close} position="top">...</Modal>
  <Modal isOpen={isOpen} onClose={close} position="center">...</Modal>
  <Modal isOpen={isOpen} onClose={close} position="bottom">...</Modal>
`);

const exampleSize = dedent(`
  // xs 327px · sm 480px · md 700px (bawaan) · lg 1000px · full selebar layar
  <Modal isOpen={isOpen} onClose={close} size="sm">...</Modal>
`);

const exampleTitleProp = dedent(`
  // title dan description bisa langsung lewat prop,
  // tanpa menyusun ModalHeader sendiri.
  <Modal
    isOpen={isOpen}
    onClose={close}
    size="xs"
    title="Hapus dokumen?"
    description="Dokumen yang dihapus tidak dapat dikembalikan."
  >
    <ModalFooter className="justify-end gap-2">
      <Button variant="outline" color="gray" onClick={close}>Batal</Button>
      <Button color="danger" onClick={close}>Hapus</Button>
    </ModalFooter>
  </Modal>
`);

const exampleForm = dedent(`
  // Modal cocok untuk form pendek yang tidak perlu halaman sendiri.
  <Modal isOpen={isOpen} onClose={close} size="sm">
    <ModalHeader>
      <ModalTitle>Tambah Pengguna</ModalTitle>
      <ModalDescription>Undangan dikirim lewat email.</ModalDescription>
    </ModalHeader>

    <ModalBody className="flex flex-col gap-3">
      <Input label="Nama lengkap" placeholder="Herca Pratama" />
      <Input label="Email" placeholder="nama@herca.id" />
    </ModalBody>

    <ModalFooter className="justify-end gap-2">
      <Button variant="outline" color="gray" onClick={close}>Batal</Button>
      <Button onClick={close}>Kirim Undangan</Button>
    </ModalFooter>
  </Modal>
`);

const exampleNotClosable = dedent(`
  // Untuk proses yang tidak boleh diputus di tengah jalan:
  // matikan tombol silang dan klik di area gelap.
  <Modal
    isOpen={isOpen}
    onClose={close}
    showCloseButton={false}
    closeOnOverlayClick={false}
  >
    ...
  </Modal>
`);

export default function ModalPage() {
  const [open, setOpen] = useState<ModalKey | null>(null);
  const close = () => setOpen(null);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Components"
        subtitle="Modal"
        description="Jendela yang muncul di atas halaman untuk memusatkan perhatian user pada satu tugas atau konfirmasi sebelum melanjutkan."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection title="Basic" code={exampleBasic}>
            <Button onClick={() => setOpen('basic')}>Buka Modal</Button>

            <Modal isOpen={open === 'basic'} onClose={close}>
              <ModalHeader>
                <ModalTitle>Ubah Profil</ModalTitle>
                <ModalDescription>
                  Perubahan akan langsung terlihat oleh rekan satu tim.
                </ModalDescription>
              </ModalHeader>

              <ModalBody>
                <Text variant="t1" className="text-gray-800">
                  Perbarui nama, jabatan, dan foto profil Anda di sini.
                </Text>
              </ModalBody>

              <ModalFooter className="justify-end gap-2">
                <Button variant="outline" color="gray" onClick={close}>
                  Batal
                </Button>
                <Button onClick={close}>Simpan</Button>
              </ModalFooter>
            </Modal>
          </MainSection>

          <MainSection title="Konfirmasi Singkat" code={exampleTitleProp}>
            <Button color="danger" onClick={() => setOpen('konfirmasi')}>
              Hapus Dokumen
            </Button>

            <Modal
              size="xs"
              isOpen={open === 'konfirmasi'}
              onClose={close}
              title="Hapus dokumen?"
              description="Dokumen yang dihapus tidak dapat dikembalikan."
            >
              <ModalFooter className="justify-end gap-2">
                <Button variant="outline" color="gray" onClick={close}>
                  Batal
                </Button>
                <Button color="danger" onClick={close}>
                  Hapus
                </Button>
              </ModalFooter>
            </Modal>
          </MainSection>
        </GridWrapper>

        <MainSection
          title="Posisi"
          code={examplePosition}
          contentClassName="flex flex-wrap gap-3"
        >
          <Button variant="outline" onClick={() => setOpen('top')}>
            Atas
          </Button>
          <Button variant="outline" onClick={() => setOpen('basic')}>
            Tengah
          </Button>
          <Button variant="outline" onClick={() => setOpen('bottom')}>
            Bawah
          </Button>

          <Modal position="top" isOpen={open === 'top'} onClose={close}>
            <ModalHeader>
              <ModalTitle>Menempel di Atas</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Text variant="t1" className="text-gray-800">
                Cocok untuk notifikasi atau pencarian cepat.
              </Text>
            </ModalBody>
            <ModalFooter className="justify-end">
              <Button onClick={close}>Tutup</Button>
            </ModalFooter>
          </Modal>

          <Modal position="bottom" isOpen={open === 'bottom'} onClose={close}>
            <ModalHeader>
              <ModalTitle>Menempel di Bawah</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Text variant="t1" className="text-gray-800">
                Terasa alami di layar ponsel, dekat dengan ibu jari.
              </Text>
            </ModalBody>
            <ModalFooter className="justify-end">
              <Button onClick={close}>Tutup</Button>
            </ModalFooter>
          </Modal>
        </MainSection>

        <MainSection
          title="Ukuran"
          code={exampleSize}
          contentClassName="flex flex-wrap gap-3"
        >
          {SIZES.map((size) => (
            <Button
              key={size}
              variant="outline"
              onClick={() => setOpen(size as ModalKey)}
            >
              {size}
            </Button>
          ))}

          {SIZES.map((size) => (
            <Modal
              key={size}
              size={size}
              isOpen={open === size}
              onClose={close}
            >
              <ModalHeader>
                <ModalTitle>{`Ukuran ${size}`}</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text variant="t1" className="text-gray-800">
                  Lebar maksimum modal menyesuaikan prop size.
                </Text>
              </ModalBody>
              <ModalFooter className="justify-end">
                <Button onClick={close}>Tutup</Button>
              </ModalFooter>
            </Modal>
          ))}
        </MainSection>

        <GridWrapper>
          <MainSection title="Berisi Form" code={exampleForm}>
            <Button className="gap-2" onClick={() => setOpen('form')}>
              <Icon name="plus" size={16} />
              Tambah Pengguna
            </Button>

            <Modal size="sm" isOpen={open === 'form'} onClose={close}>
              <ModalHeader>
                <ModalTitle>Tambah Pengguna</ModalTitle>
                <ModalDescription>
                  Undangan dikirim lewat email.
                </ModalDescription>
              </ModalHeader>

              <ModalBody className="flex flex-col gap-3">
                <Input label="Nama lengkap" placeholder="Herca Pratama" />
                <Input label="Email" placeholder="nama@herca.id" />
              </ModalBody>

              <ModalFooter className="justify-end gap-2">
                <Button variant="outline" color="gray" onClick={close}>
                  Batal
                </Button>
                <Button onClick={close}>Kirim Undangan</Button>
              </ModalFooter>
            </Modal>
          </MainSection>

          <MainSection
            title="Tidak Bisa Ditutup Sembarangan"
            code={exampleNotClosable}
          >
            <Button variant="outline" onClick={() => setOpen('takBisaTutup')}>
              Mulai Proses
            </Button>

            <Modal
              size="sm"
              isOpen={open === 'takBisaTutup'}
              onClose={close}
              showCloseButton={false}
              closeOnOverlayClick={false}
            >
              <ModalHeader>
                <ModalTitle>Sedang Memproses</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Text variant="t1" className="text-gray-800">
                  Tidak ada tombol silang dan klik di area gelap diabaikan.
                  Satu-satunya jalan keluar adalah tombol di bawah.
                </Text>
              </ModalBody>
              <ModalFooter className="justify-end">
                <Button onClick={close}>Selesai</Button>
              </ModalFooter>
            </Modal>
          </MainSection>
        </GridWrapper>

        <Footer
          title="Modal"
          backTo="/playground/chip"
          backToTitle="Chip"
          nextTo="/playground/progress-bar"
          nextToTitle="Progress Bar"
        />
      </div>
    </>
  );
}
