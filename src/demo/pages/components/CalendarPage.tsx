import HeroSection from "../../components/HeroSection";
import DashboardLayout from "../../layouts/DashboardLayout";
import illust from "../../assets/images/forms.png";
import { Calendar } from "../../../components/calendar";
import { useState } from "react";
import type {
  CalendarDayConfig,
  CalendarStyleConfig,
} from "../../../components/calendar";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Disable weekend dates
  const disabledDates = [
    new Date(2026, 1, 14), // 14 Feb 2026
    new Date(2026, 1, 15), // 15 Feb 2026
    new Date(2026, 1, 21), // 21 Feb 2026
  ];

  // Configure specific days with dots
  const dayConfigs: CalendarDayConfig[] = [
    {
      date: new Date(2026, 1, 10),
      dots: [
        { color: "#3b82f6" }, // blue
        { color: "#ef4444" }, // red
      ],
    },
    {
      date: new Date(2026, 1, 12),
      dots: [
        { color: "#10b981" }, // green
      ],
    },
  ];

  // Custom styling
  const styleConfig: CalendarStyleConfig = {
    disabled: {
      background: "#fee4e2", // red-500/30
      text: "#f04438", // red-500
    },
  };

  return (
    <DashboardLayout>
      <HeroSection
        title="Calendar"
        description="Calendar component"
        subtitle="Calendar"
        illust={illust}
      />

      <div className="flex flex-col gap-2">
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          disabledDates={disabledDates}
          dayConfigs={dayConfigs}
          styleConfig={styleConfig}
          showNavigator={true}
          showHeader={true}
        />
        {selectedDate && (
          <div className="mt-4 text-center">
            <p>Selected: {selectedDate.toLocaleDateString("id-ID")}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
