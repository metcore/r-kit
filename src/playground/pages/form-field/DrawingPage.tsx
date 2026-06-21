import dedent from 'dedent';
import { useCallback, useEffect, useRef, useState } from 'react';
import illust from '../../../assets/images/forms.png';
import GridWrapper from '../../components/GridWrapper';
import HeroSection from '../../components/HeroSection';
import MainSection from '../../components/MainSection';
import Footer from '../../components/Footer';
import { Drawing } from '../../../components/drawing';
import { InputFilePreview, useInputFile } from '../../../components/input-file';
import type { FileItem } from '../../../components/input-file';

const SIGNATURE_TOTAL = 40;
const SIGNATURE_PAGE_SIZE = 8;

const makeSignature = (index: number): FileItem => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80"><rect width="100%" height="100%" fill="#ffffff"/><text x="16" y="50" font-family="cursive" font-size="26" fill="#1D1D80">Sign ${index}</text></svg>`;
  return {
    id: `signature-${index}`,
    file: new File([svg], `signature-${index}.svg`, { type: 'image/svg+xml' }),
    customName: `signature-${index}.svg`,
    preview: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
  };
};

// Simulates fetching one page of the user's saved signatures from an API.
const fetchSignaturePage = (page: number): Promise<FileItem[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const start = page * SIGNATURE_PAGE_SIZE;
      const count = Math.max(
        0,
        Math.min(SIGNATURE_PAGE_SIZE, SIGNATURE_TOTAL - start)
      );
      resolve(
        Array.from({ length: count }, (_, k) => makeSignature(start + k + 1))
      );
    }, 700);
  });

const SavedSignatures = () => {
  const [signatures, setSignatures] = useState<FileItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingRef = useRef(false);

  const signatureInput = useInputFile({
    value: signatures,
    onChange: setSignatures,
  });

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setIsLoadingMore(true);

    const items = await fetchSignaturePage(page);
    setSignatures((prev) => [...prev, ...items]);
    setPage((prev) => prev + 1);
    setHasMore((page + 1) * SIGNATURE_PAGE_SIZE < SIGNATURE_TOTAL);

    setIsLoadingMore(false);
    loadingRef.current = false;
  }, [page, hasMore]);

  useEffect(() => {
    void loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <InputFilePreview
        inputFile={signatureInput}
        title="Saved Signature"
        mode="compact"
        onLoadMore={() => void loadMore()}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
      />
      {signatures.length === 0 && (
        <p className="text-sm text-gray-600">
          {isLoadingMore ? 'Loading signatures...' : 'No saved signatures.'}
        </p>
      )}
    </div>
  );
};

export const DrawingPage = () => {
  const defaultExample = dedent(`
    <Drawing
      required
      height={200}
    />
  `);

  const labelHelperExample = dedent(`
    <Drawing
      label="Label"
      hint="Helper text"
      height={200}
    />
  `);

  const requiredExample = dedent(`
    <Drawing
      label="Label"
      required
      hint="Helper text"
      height={200}
    />
  `);

  const disabledExample = dedent(`
    <Drawing
      label="Label"
      disabled
      height={200}
    />
  `);

  const invalidExample = dedent(`
    <Drawing
      label="Label"
      errorMessages="Signature is required."
      hint="Helper text"
      height={200}
    />
  `);

  const actionsExample = dedent(`
    <Drawing
      showActions
      label="Label"
      hint="Helper text"
      height={200}
    />
  `);

  const tooltipExample = dedent(`
    <Drawing
      showActions
      label="Label"
      hint="Helper text"
      height={200}
      tooltip="Signature"
    />
  `);

  const savedExample = dedent(`
    // Lazily fetch the user's signatures as they scroll the list.
    const [signatures, setSignatures] = useState<FileItem[]>([]);
    const input = useInputFile({ value: signatures, onChange: setSignatures });

    <InputFilePreview
      inputFile={input}
      title="Saved Signature"
      mode="compact"
      onLoadMore={loadNextPage}
      hasMore={hasMore}
      isLoadingMore={isLoadingMore}
    />
  `);

  return (
    <>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Drawing"
        description="Kanvas gambar bebas untuk tanda tangan atau coretan, mendukung input mouse maupun sentuh, serta ekspor ke data URL / Blob."
      />

      <div className="flex flex-col gap-8">
        <GridWrapper>
          <MainSection title="Default" code={defaultExample}>
            <Drawing required height={200} />
          </MainSection>

          <MainSection
            title="Drawing with Label & helper text"
            code={labelHelperExample}
          >
            <Drawing
              label="Label"
              placeholder="Draw your signature here"
              hint="helper text"
              height={200}
              strokeColor="#000"
              onChange={(e) => console.log(e)}
            />
          </MainSection>

          <MainSection title="Drawing Required" code={requiredExample}>
            <Drawing label="Label" required hint="Helper text" height={200} />
          </MainSection>

          <MainSection title="Disabled" code={disabledExample}>
            <Drawing label="Label" disabled hint="Helper text" height={200} />
          </MainSection>

          <MainSection title="Invalid" code={invalidExample}>
            <Drawing
              label="Label"
              errorMessages="Invalid Text."
              placeholder="Draw your signature here"
              hint="Helper text"
              height={200}
            />
          </MainSection>

          <MainSection title="Drawing with Actions" code={actionsExample}>
            <Drawing
              showActions
              label="Label"
              placeholder="Draw your signature here"
              hint="Helper text"
              height={200}
            />
          </MainSection>

          <MainSection title="Drawing with Tooltip" code={tooltipExample}>
            <Drawing
              showActions
              label="Label"
              placeholder="Draw your signature here"
              hint="Helper text"
              height={200}
              tooltip="Yea"
            />
          </MainSection>

          <MainSection
            title="Saved Signatures (Infinite Scroll)"
            code={savedExample}
          >
            <SavedSignatures />
          </MainSection>
        </GridWrapper>

        <Footer
          backTo="/slider"
          backToTitle="Slider"
          nextTo="/color-picker"
          title="Drawing"
          nextToTitle="Color Picker"
        />
      </div>
    </>
  );
};
