import dedent from 'dedent';
import { Icon } from '../../components/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuGroup,
  SidebarMenuItem,
  SidebarProvider,
} from '../../components/sidebar/sidebar';
import { Text } from '../../components/text';
import illust from '../../assets/images/navigation.png';
import GridWrapper from '../components/GridWrapper';
import HeroSection from '../components/HeroSection';
import MainSection from '../components/MainSection';
import Footer from '../components/Footer';

// `collapsible="none"` merender sidebar sebagai kolom biasa, bukan panel
// fixed setinggi layar, sehingga aman disematkan di dalam kartu contoh.
function DemoFrame({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="min-h-0 rounded-md border border-gray-200">
      <Sidebar collapsible="none" className="h-[320px]">
        {children}
      </Sidebar>
    </SidebarProvider>
  );
}

const exampleBasic = dedent(`
  import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
  } from '@herca/r-kit';

  <SidebarProvider>
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem asChild={false}>Overview</SidebarMenuItem>
          <SidebarMenuItem asChild={false}>Laporan</SidebarMenuItem>
          <SidebarMenuItem asChild={false}>Pengaturan</SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  </SidebarProvider>
`);

const exampleIconActive = dedent(`
  import { Icon } from '@herca/r-kit';

  <SidebarMenu>
    <SidebarMenuItem
      active
      asChild={false}
      icon={<Icon size={18} name="grid-square" />}
    >
      Overview
    </SidebarMenuItem>
    <SidebarMenuItem asChild={false} icon={<Icon size={18} name="users" />}>
      Pengguna
    </SidebarMenuItem>
  </SidebarMenu>
`);

const exampleLink = dedent(`
  import { Link } from 'react-router-dom';

  // asChild aktif secara bawaan: SidebarMenuItem meneruskan
  // gaya dan ikonnya ke elemen anak tunggal.
  <SidebarMenuItem icon={<Icon size={18} name="grid-square" />}>
    <Link to="/dashboard">Dashboard</Link>
  </SidebarMenuItem>
`);

const exampleGroup = dedent(`
  <SidebarMenu>
    <SidebarMenuGroup
      label="Manajemen"
      active
      icon={<Icon size={18} name="folder" />}
    >
      <SidebarMenuItem asChild={false}>Pengguna</SidebarMenuItem>
      <SidebarMenuItem asChild={false} active>
        Peran
      </SidebarMenuItem>
    </SidebarMenuGroup>
  </SidebarMenu>
`);

const exampleHeaderFooter = dedent(`
  <Sidebar>
    <SidebarHeader>Herca Admin</SidebarHeader>
    <SidebarContent>
      <SidebarMenu>{/* ...menu */}</SidebarMenu>
    </SidebarContent>
    <SidebarFooter>Masuk sebagai Herca</SidebarFooter>
  </Sidebar>
`);

export default function SidebarPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Navigation"
        subtitle="Sidebar"
        description="Panel navigasi tetap di sisi halaman yang memuat menu utama aplikasi, dapat dikelompokkan dan diciutkan menjadi ikon."
      />

      <div className="flex flex-col gap-4">
        <GridWrapper>
          <MainSection title="Basic" code={exampleBasic}>
            <DemoFrame>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem asChild={false}>Overview</SidebarMenuItem>
                  <SidebarMenuItem asChild={false}>Laporan</SidebarMenuItem>
                  <SidebarMenuItem asChild={false}>Pengaturan</SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </DemoFrame>
          </MainSection>

          <MainSection
            title="With Icon & Active State"
            code={exampleIconActive}
          >
            <DemoFrame>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem
                    active
                    asChild={false}
                    icon={<Icon size={18} name="grid-square" />}
                  >
                    Overview
                  </SidebarMenuItem>
                  <SidebarMenuItem
                    asChild={false}
                    icon={<Icon size={18} name="users" />}
                  >
                    Pengguna
                  </SidebarMenuItem>
                  <SidebarMenuItem
                    asChild={false}
                    icon={<Icon size={18} name="chart-line" />}
                  >
                    Laporan
                  </SidebarMenuItem>
                  <SidebarMenuItem
                    asChild={false}
                    icon={<Icon size={18} name="settings" />}
                  >
                    Pengaturan
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </DemoFrame>
          </MainSection>
        </GridWrapper>

        <GridWrapper>
          <MainSection title="Menu Group" code={exampleGroup}>
            <DemoFrame>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem
                    asChild={false}
                    icon={<Icon size={18} name="grid-square" />}
                  >
                    Overview
                  </SidebarMenuItem>
                  <SidebarMenuGroup
                    active
                    label="Manajemen"
                    icon={<Icon size={18} name="folder" />}
                  >
                    <SidebarMenuItem asChild={false}>Pengguna</SidebarMenuItem>
                    <SidebarMenuItem active asChild={false}>
                      Peran
                    </SidebarMenuItem>
                    <SidebarMenuItem asChild={false}>Perizinan</SidebarMenuItem>
                  </SidebarMenuGroup>
                  <SidebarMenuGroup
                    label="Keuangan"
                    icon={<Icon size={18} name="credit-card" />}
                  >
                    <SidebarMenuItem asChild={false}>Tagihan</SidebarMenuItem>
                    <SidebarMenuItem asChild={false}>
                      Pembayaran
                    </SidebarMenuItem>
                  </SidebarMenuGroup>
                </SidebarMenu>
              </SidebarContent>
            </DemoFrame>
          </MainSection>

          <MainSection title="Header & Footer" code={exampleHeaderFooter}>
            <DemoFrame>
              <SidebarHeader className="items-center px-3 py-4">
                <Text variant="p2" weight="semibold" value="Herca Admin" />
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem
                    active
                    asChild={false}
                    icon={<Icon size={18} name="grid-square" />}
                  >
                    Overview
                  </SidebarMenuItem>
                  <SidebarMenuItem
                    asChild={false}
                    icon={<Icon size={18} name="document" />}
                  >
                    Dokumen
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter className="border-t border-gray-200 px-3 py-4">
                <Text
                  variant="t2"
                  className="text-gray-800"
                  value="Masuk sebagai Herca"
                />
              </SidebarFooter>
            </DemoFrame>
          </MainSection>
        </GridWrapper>

        <MainSection title="Item Sebagai Tautan" code={exampleLink}>
          <DemoFrame>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem icon={<Icon size={18} name="grid-square" />}>
                  <a href="/playground/sidebar">Dashboard</a>
                </SidebarMenuItem>
                <SidebarMenuItem icon={<Icon size={18} name="bell" />}>
                  <a href="/playground/sidebar">Notifikasi</a>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </DemoFrame>
        </MainSection>

        <Footer
          title="Sidebar"
          backTo="/playground/pagination"
          backToTitle="Pagination"
          nextTo="/playground/alert"
          nextToTitle="Alert"
        />
      </div>
    </>
  );
}
