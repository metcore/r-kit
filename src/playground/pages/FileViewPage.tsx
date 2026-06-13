import illust from '../../assets/images/typography.png';
import MainSection from '../components/MainSection';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { FileView } from '../../components/file-view';

export default function FileViewPage() {
  return (
    <>
      <HeroSection
        illust={illust}
        title="Data Display"
        subtitle="File View"
        description="Bantu user pilih satu item dari daftar tanpa memenuhi layar."
      />

      <div className="flex flex-col gap-4">
        <MainSection title="Default">
          <div className="grid grid-cols-4 gap-4">
            <FileView src="laporan.pdf" color="primary" size={20000} />
            <FileView src={illust} color="danger" size={20000000} />
            <FileView src="ex.pdf" color="warning" />
            <FileView src="ex.xls" color="success" />
            <FileView src="ex.xls" color="orange" />
            <FileView src="ex.xls" color="info" />
            <FileView src="ex.xls" color="purple" />
            <FileView src="" />
            <FileView src="../../src/assets/images/card-example.jpg" />
            <FileView src="../../src/assets/doc/sample.pdf" />
            <FileView src="ex.csv" />
            <FileView src="ex.mp4" />
          </div>
        </MainSection>
        <MainSection title="Default">
          <div className="grid grid-cols-4 gap-4">
            <FileView variant="small" src={illust} color="primary" />
            <FileView variant="small" src={illust} color="danger" />
            <FileView variant="small" src={illust} color="warning" />
            <FileView variant="small" src="adad.doc" color="success" />
            <FileView variant="small" src="adad.doc" color="orange" />
            <FileView variant="small" src="adad.xls" color="info" />
            <FileView variant="small" src="adad.mp3" color="purple" />
            <FileView variant="small" src="" />
            <FileView
              variant="small"
              src="../../src/assets/images/card-example.jpg"
            />
            <FileView variant="small" src="adad.pdf" />
            <FileView variant="small" src="ex.csv" />
            <FileView variant="small" src="ex.mp4" />
          </div>
        </MainSection>

        <Footer title="Colors" backTo="/typography" backToTitle="Typography" />
      </div>
    </>
  );
}
