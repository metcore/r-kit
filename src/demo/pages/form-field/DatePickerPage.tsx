import HeroSection from "../../components/HeroSection";
import DashboardLayout from "../../layouts/DashboardLayout";
import illust from "../../assets/images/forms.png";
import { DatePicker } from "../../../components/date-picker";
import { useState } from "react";

export default function DatePickerPage() {
  const [date, setDate] = useState<any | null>(null);

  console.log({ date });
  return (
    <DashboardLayout>
      <HeroSection
        illust={illust}
        title="Form"
        subtitle="Date Picker"
        description="Digunakan untuk memilih tanggal secara akurat menggunakan tampilan kalender yang interaktif."
      />

      <DatePicker format="DD-MM-YYYY" onChange={setDate} />
      <DatePicker mode="range" onRangeChange={setDate} format="DD MMMM YYYY" />
      {/* <p>{date?.getDate()}</p> */}
      {/* <p>{date}</p> */}
    </DashboardLayout>
  );
}
