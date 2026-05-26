import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import illust from '../../assets/images/typography.png';
import { Card, CardBody, CardHeader } from '../../components/card';
import { Button } from '../../components/button';
import { Text } from '../../components/text';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  type SheetSide,
  type SheetSize,
} from '../../clients';

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;
const SHEET_SIZES = ['sm', 'md', 'lg', 'xl', 'full'] as const;

export default function SheetPage() {
  const [sheetSide, setSheetSide] = useState<SheetSide>('right');
  const [sheetSize, setSheetSize] = useState<SheetSize>('md');
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const openSheet = (side: SheetSide, size: SheetSize) => {
    setSheetSide(side);
    setSheetSize(size);
    setIsSheetOpen(true);
  };

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Navigation"
        subtitle="Sheet"
        description="Panel yang muncul dari bawah atau samping untuk menampilkan navigasi tambahan tanpa meninggalkan halaman utama."
      />

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader divider>Sheet</CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-4">
              {SHEET_SIDES.map((side) => (
                <Button key={side} onClick={() => openSheet(side, 'md')}>
                  Sheet {side}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader divider>Sheet Size</CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-4">
              {SHEET_SIZES.map((size) => (
                <Sheet key={size} id={`user-profile-${size}`}>
                  <SheetTrigger>
                    <Button> Sheet {size}</Button>
                  </SheetTrigger>
                  <SheetContent size={size} side={sheetSide}>
                    <SheetHeader>
                      <SheetTitle>User Profile</SheetTitle>
                    </SheetHeader>
                    <SheetBody>
                      <SheetTrigger>
                        <Text>
                          Lorem ipsum, or lipsum as it is sometimes known, is
                          dummy text used in laying out print, graphic or web
                          designs. The passage is attributed to an unknown
                          typesetter in the 15th century who is thought to have
                          scrambled parts of Ciceros De Finibus Bonorum et
                          Malorum for use in a type specimen book.
                        </Text>
                        <Button>Close</Button>
                      </SheetTrigger>
                    </SheetBody>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </CardBody>
        </Card>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side={sheetSide} size={sheetSize}>
            <SheetHeader>
              <SheetTitle>
                <Text variant="p2" weight="semibold">
                  Title Sheet
                </Text>
              </SheetTitle>
              <SheetDescription>Sheet {sheetSide}</SheetDescription>
            </SheetHeader>
            <SheetBody>
              <Text>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs. The passage is
                attributed to an unknown typesetter in the 15th century who is
                thought to have scrambled parts of Ciceros De Finibus Bonorum et
                Malorum for use in a type specimen book.
              </Text>
              <Button onClick={closeSheet}>Continue</Button>
            </SheetBody>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
