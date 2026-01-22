import dedent from "dedent";
import { Text } from "../../components/text";
import illust from "../assets/images/typography.png";
import HeroSection from "../components/HeroSection";
import MainSection from "../components/MainSection";
import DashboardLayout from "../layouts/DashboardLayout";
import { useMarkdown } from "../hooks/useMarkdown";
import { Card, CardBody } from "../../components/card";
import MarkdownRenderer from "../components/MarkdownRenderer";

interface FontVariantProps {
  variant: string;
  children: React.ReactNode;
  fontSize: number;
  lineHeight: number;
}

export default function TypographyPage() {
  const { doc } = useMarkdown(`/docs/typography.md`);
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

  const exampleCodeT1 = dedent(`
    <Text 
      value="Bold" 
      weight="bold" 
      variant="p1" 
    />
  `);

  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Foundation"
        subtitle="Typography"
        description="Tipografi berperan dalam membentuk hierarki visual yang terstruktur,
            menyajikan informasi dengan rapi, dan memudahkan user mengenali
            elemen UI saat melakukan pemindaian halaman."
      />

      <div className="flex flex-col gap-4">
        <MainSection
          title="Heading Font Metropolis"
          downloadUrl="/public/metropolis.zip"
          code={exampleCodeH1}
        >
          <div className="flex flex-1 flex-col gap-8 overflow-auto">
            <FontVariants variant="H1" fontSize={36} lineHeight={46}>
              <Text
                value="Bold"
                weight="bold"
                variant="h1"
                className="text-nowrap"
              />
              <Text
                value="Semi Bold"
                weight="semibold"
                variant="h1"
                className="text-nowrap"
              />
              <Text
                value="Medium"
                weight="medium"
                variant="h1"
                className="text-nowrap"
              />
              <Text
                value="Regular"
                weight="regular"
                variant="h1"
                className="text-nowrap"
              />
            </FontVariants>
            <FontVariants variant="H2" fontSize={32} lineHeight={42}>
              <Text
                value="Bold"
                weight="bold"
                variant="h2"
                className="text-nowrap"
              />
              <Text
                value="Semi Bold"
                weight="semibold"
                variant="h2"
                className="text-nowrap"
              />
              <Text
                value="Medium"
                weight="medium"
                variant="h2"
                className="text-nowrap"
              />
              <Text
                value="Regular"
                weight="regular"
                variant="h2"
                className="text-nowrap"
              />
            </FontVariants>
            <FontVariants variant="H3" fontSize={28} lineHeight={38}>
              <Text
                value="Bold"
                weight="bold"
                variant="h3"
                className="text-nowrap"
              />
              <Text
                value="Semi Bold"
                weight="semibold"
                variant="h3"
                className="text-nowrap"
              />
              <Text
                value="Medium"
                weight="medium"
                variant="h3"
                className="text-nowrap"
              />
              <Text
                value="Regular"
                weight="regular"
                variant="h3"
                className="text-nowrap"
              />
            </FontVariants>
            <FontVariants variant="H4" fontSize={24} lineHeight={34}>
              <Text
                value="Bold"
                weight="bold"
                variant="h4"
                className="text-nowrap"
              />
              <Text
                value="Semi Bold"
                weight="semibold"
                variant="h4"
                className="text-nowrap"
              />
              <Text
                value="Medium"
                weight="medium"
                variant="h4"
                className="text-nowrap"
              />
              <Text
                value="Regular"
                weight="regular"
                variant="h4"
                className="text-nowrap"
              />
            </FontVariants>
          </div>
        </MainSection>

        <MainSection
          title="Paragraph Font Metropolis"
          downloadUrl="/public/metropolis.zip"
          code={exampleCodeP1}
        >
          <div className="flex flex-1 flex-col gap-8 overflow-auto">
            <FontVariants variant="P1" fontSize={36} lineHeight={46}>
              <Text
                value="Bold"
                weight="bold"
                variant="p1"
                className="text-nowrap"
              />
              <Text
                value="Semi Bold"
                weight="semibold"
                variant="p1"
                className="text-nowrap"
              />
              <Text
                value="Medium"
                weight="medium"
                variant="p1"
                className="text-nowrap"
              />
              <Text
                value="Regular"
                weight="regular"
                variant="p1"
                className="text-nowrap"
              />
            </FontVariants>
            <FontVariants variant="P2" fontSize={32} lineHeight={42}>
              <Text
                value="Bold"
                weight="bold"
                variant="p2"
                className="text-nowrap"
              />
              <Text
                value="Semi Bold"
                weight="semibold"
                variant="p2"
                className="text-nowrap"
              />
              <Text
                value="Medium"
                weight="medium"
                variant="p2"
                className="text-nowrap"
              />
              <Text
                value="Regular"
                weight="regular"
                variant="p2"
                className="text-nowrap"
              />
            </FontVariants>
            <FontVariants variant="P3" fontSize={28} lineHeight={38}>
              <Text
                value="Bold"
                weight="bold"
                variant="p3"
                className="text-nowrap"
              />
              <Text
                value="Semi Bold"
                weight="semibold"
                variant="p3"
                className="text-nowrap"
              />
              <Text
                value="Medium"
                weight="medium"
                variant="p3"
                className="text-nowrap"
              />
              <Text
                value="Regular"
                weight="regular"
                variant="p3"
                className="text-nowrap"
              />
            </FontVariants>
          </div>
        </MainSection>

        <MainSection
          title="Text Font Metropolis"
          downloadUrl="/public/metropolis.zip"
          code={exampleCodeT1}
        >
          <div className="flex flex-1 flex-col gap-8 overflow-auto">
            <FontVariants variant="T1" fontSize={36} lineHeight={46}>
              <Text
                value="Bold"
                weight="bold"
                variant="t1"
                className="text-nowrap"
              />
              <Text
                value="Semi Bold"
                weight="semibold"
                variant="t1"
                className="text-nowrap"
              />
              <Text
                value="Medium"
                weight="medium"
                variant="t1"
                className="text-nowrap"
              />
              <Text
                value="Regular"
                weight="regular"
                variant="t1"
                className="text-nowrap"
              />
            </FontVariants>
            <FontVariants variant="T2" fontSize={32} lineHeight={42}>
              <Text
                value="Bold"
                weight="bold"
                variant="t2"
                className="text-nowrap"
              />
              <Text
                value="Semi Bold"
                weight="semibold"
                variant="t2"
                className="text-nowrap"
              />
              <Text
                value="Medium"
                weight="medium"
                variant="t2"
                className="text-nowrap"
              />
              <Text
                value="Regular"
                weight="regular"
                variant="t2"
                className="text-nowrap"
              />
            </FontVariants>
            <FontVariants variant="T3" fontSize={28} lineHeight={38}>
              <Text
                value="Bold"
                weight="bold"
                variant="t3"
                className="text-nowrap"
              />
              <Text
                value="Semi Bold"
                weight="semibold"
                variant="t3"
                className="text-nowrap"
              />
              <Text
                value="Medium"
                weight="medium"
                variant="t3"
                className="text-nowrap"
              />
              <Text
                value="Regular"
                weight="regular"
                variant="t3"
                className="text-nowrap"
              />
            </FontVariants>
            <FontVariants variant="T4" fontSize={24} lineHeight={34}>
              <Text
                value="Bold"
                weight="bold"
                variant="t4"
                className="text-nowrap"
              />
              <Text
                value="Semi Bold"
                weight="semibold"
                variant="t4"
                className="text-nowrap"
              />
              <Text
                value="Medium"
                weight="medium"
                variant="t4"
                className="text-nowrap"
              />
              <Text
                value="Regular"
                weight="regular"
                variant="t4"
                className="text-nowrap"
              />
            </FontVariants>
          </div>
        </MainSection>

        <Card>
          <CardBody>
            <MarkdownRenderer content={doc?.content || ""} />
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}

const FontVariants = ({
  children,
  fontSize,
  lineHeight,
  variant,
}: FontVariantProps) => {
  return (
    <div className="flex flex-1 flex-row flex-nowrap items-center">
      <div className="flex min-w-[700px] flex-1 flex-row items-center gap-6">
        <Text value={variant} className="text-gray-700" />
        <div className="flex flex-row items-center gap-8">{children}</div>
      </div>

      <div className="flex flex-row items-center gap-3">
        <Text value={`Font Size: ${fontSize}px`} className="text-nowrap" />
        <Text value="|" />
        <Text value={`Line Height: ${lineHeight}`} className="text-nowrap" />
      </div>
    </div>
  );
};
