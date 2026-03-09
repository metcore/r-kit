import type { DateFormat } from "./type";

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const monthsFull = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get format configuration
const getFormatConfig = (format: DateFormat) => {
  switch (format) {
    case "DD-MM-YYYY":
      return { separator: "-", placeholder: "DD-MM-YYYY", maxLength: 10 };
    case "DD/MM/YYYY":
      return { separator: "/", placeholder: "DD/MM/YYYY", maxLength: 10 };
    case "DD MMM YYYY":
      return { separator: " ", placeholder: "DD MMM YYYY", maxLength: 11 };
    case "DD MMMM YYYY":
      return { separator: " ", placeholder: "DD MMMM YYYY", maxLength: 18 };
    case "YYYY-MM-DD":
      return { separator: "-", placeholder: "YYYY-MM-DD", maxLength: 10 };
    case "MM/DD/YYYY":
      return { separator: "/", placeholder: "MM/DD/YYYY", maxLength: 10 };
    default:
      return { separator: "-", placeholder: "DD-MM-YYYY", maxLength: 10 };
  }
};

// Format Date to custom format
const formatDateToString = (date: Date | null, format: DateFormat): string => {
  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const monthShort = monthsShort[date.getMonth()];
  const monthFull = monthsFull[date.getMonth()];
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const time = `${hours}:${minutes}:${seconds}`;

  switch (format) {
    case "DD-MM-YYYY":
      return `${day}-${month}-${year}`;

    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;

    case "DD MMM YYYY":
      return `${day} ${monthShort} ${year}`;

    case "DD MMMM YYYY":
      return `${day} ${monthFull} ${year}`;

    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;

    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;

    case "DD-MM-YYYY HH:mm:ss":
      return `${day}-${month}-${year} ${time}`;

    case "DD/MM/YYYY HH:mm:ss":
      return `${day}/${month}/${year} ${time}`;

    case "DD MMM YYYY HH:mm:ss":
      return `${day} ${monthShort} ${year} ${time}`;

    case "DD MMM YYYY - HH:mm:ss":
      return `${day} ${monthShort} ${year} - ${time}`;

    case "DD MMMM YYYY HH:mm:ss":
      return `${day} ${monthFull} ${year} ${time}`;

    case "DD MMMM YYYY - HH:mm:ss":
      return `${day} ${monthFull} ${year} - ${time}`;

    case "YYYY-MM-DD HH:mm:ss":
      return `${year}-${month}-${day} ${time}`;

    default:
      return `${day}-${month}-${year}`;
  }
};

const parseMonthName = (monthStr: string): number | null => {
  const monthLower = monthStr.toLowerCase();

  const shortIndex = monthsShort.findIndex(
    (m) => m.toLowerCase() === monthLower,
  );
  if (shortIndex !== -1) return shortIndex + 1;

  const fullIndex = monthsFull.findIndex((m) => m.toLowerCase() === monthLower);
  if (fullIndex !== -1) return fullIndex + 1;

  return null;
};

export {
  getFormatConfig,
  formatDateToString,
  monthsFull,
  monthsShort,
  parseMonthName,
};
