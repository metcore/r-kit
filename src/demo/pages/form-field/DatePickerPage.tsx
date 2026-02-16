import HeroSection from "../../components/HeroSection";
import DashboardLayout from "../../layouts/DashboardLayout";
import illust from "../../assets/images/forms.png";
import { DatePicker } from "../../../components/date-picker";

export default function DatePickerPage() {
  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Date Picker"
        description="Digunakan untuk memilih tanggal secara akurat menggunakan tampilan kalender yang interaktif."
      />

      <DatePicker format="DD-MM-YYYY" />
      <DatePicker mode="range" />
    </DashboardLayout>
  );
}
