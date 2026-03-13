import HeroSection from "../../components/HeroSection";
import DashboardLayout from "../../layouts/DashboardLayout";
import illust from "../../assets/images/forms.png";
import { DatePicker } from "../../../components/date-picker";
import { useState } from "react";

export default function DatePickerPage() {
  const [range, setRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  console.log(range);

  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Date Picker"
        description="Digunakan untuk memilih tanggal secara akurat menggunakan tampilan kalender yang interaktif."
      />

      <DatePicker
        showController={false}
        size="sm"
        mode="range"
        format="DD-MM-YYYY"
        rangeValue={range}
        onRangeChange={setRange}
      />
    </DashboardLayout>
  );
}
