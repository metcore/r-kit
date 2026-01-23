export default function useColors() {
  const defaultColors = [
    {
      name: "Black",
      hexa: "#282828",
      percentage: "100%",
    },
    {
      name: "Black",
      hexa: "#282828",
      percentage: "60%",
    },
    {
      name: "White",
      hexa: "#ffffff",
      percentage: "100%",
    },
    {
      name: "White",
      hexa: "#ffffff",
      percentage: "60%",
    },
  ];

  const grayColors = [
    {
      name: "50",
      hexa: "#F7F7F7",
    },
    {
      name: "100",
      hexa: "#F2F2F2",
    },
    {
      name: "200",
      hexa: "#EBEBEB",
    },
    {
      name: "300",
      hexa: "#E5E5E5",
    },
    {
      name: "400",
      hexa: "#DEDEDE",
    },
    {
      name: "500",
      hexa: "#D7D7D7",
    },
    {
      name: "600",
      hexa: "#B4B4B4",
    },
    {
      name: "700",
      hexa: "#909090",
    },
    {
      name: "800",
      hexa: "#6C6C6C",
    },
    {
      name: "900",
      hexa: "#484848",
    },
    {
      name: "950",
      hexa: "#2B2B2B",
    },
  ];

  const primaryColors = [
    {
      name: "50",
      hexa: "#F1F2FF",
    },
    {
      name: "100",
      hexa: "#E6E8FF",
    },
    {
      name: "200",
      hexa: "#D0D5FF",
    },
    {
      name: "300",
      hexa: "#ABB1FF",
    },
    {
      name: "400",
      hexa: "#7B7EFF",
    },
    {
      name: "500",
      hexa: "#4d46ff",
    },
    {
      name: "600",
      hexa: "#3421ff",
    },
    {
      name: "700",
      hexa: "#250ff2",
    },
    {
      name: "800",
      hexa: "#1e0ccb",
    },
    {
      name: "900",
      hexa: "#1b0ca6",
    },
    {
      name: "950",
      hexa: "#14087D",
    },
    {
      name: "1000",
      hexa: "#080355",
    },
  ];

  const warningColors = [
    {
      name: "50",
      hexa: "#FFFAEB",
    },
    {
      name: "100",
      hexa: "#FEF0C7",
    },
    {
      name: "200",
      hexa: "#FEDF89",
    },
    {
      name: "300",
      hexa: "#FEC84B",
    },
    {
      name: "400",
      hexa: "#FDB022",
    },
    {
      name: "500",
      hexa: "#F79009",
    },
    {
      name: "600",
      hexa: "#DC6803",
    },
    {
      name: "700",
      hexa: "#B54708",
    },
    {
      name: "800",
      hexa: "#93370D",
    },
    {
      name: "900",
      hexa: "#7A2E0E",
    },
    {
      name: "950",
      hexa: "#6B2508",
    },
  ];

  const dangerColors = [
    {
      name: "50",
      hexa: "#FEF3F2",
    },
    {
      name: "100",
      hexa: "#FEE4E2",
    },
    {
      name: "200",
      hexa: "#FECDCA",
    },
    {
      name: "300",
      hexa: "#FDA29B",
    },
    {
      name: "400",
      hexa: "#F97066",
    },
    {
      name: "500",
      hexa: "#F04438",
    },
    {
      name: "600",
      hexa: "#D92D20",
    },
    {
      name: "700",
      hexa: "#B42318",
    },
    {
      name: "800",
      hexa: "#912018",
    },
    {
      name: "900",
      hexa: "#7A271A",
    },
    {
      name: "950",
      hexa: "#66180C",
    },
  ];

  const successColors = [
    {
      name: "50",
      hexa: "#E5FFE8",
    },
    {
      name: "100",
      hexa: "#CEFBD4",
    },
    {
      name: "200",
      hexa: "#9EF7B3",
    },
    {
      name: "300",
      hexa: "#6BE995",
    },
    {
      name: "400",
      hexa: "#44D382",
    },
    {
      name: "500",
      hexa: "#12B76A",
    },
    {
      name: "600",
      hexa: "#0D9D68",
    },
    {
      name: "700",
      hexa: "#098363",
    },
    {
      name: "800",
      hexa: "#056A59",
    },
    {
      name: "900",
      hexa: "#035752",
    },
    {
      name: "950",
      hexa: "#034C48",
    },
  ];

  const infoColors = [
    {
      name: "50",
      hexa: "#E6FBFF",
    },
    {
      name: "100",
      hexa: "#CDF8FF",
    },
    {
      name: "200",
      hexa: "#9DEBFF",
    },
    {
      name: "300",
      hexa: "#6CD8FF",
    },
    {
      name: "400",
      hexa: "#48C5FF",
    },
    {
      name: "500",
      hexa: "#0CA2FF",
    },
    {
      name: "600",
      hexa: "#077EDA",
    },
    {
      name: "700",
      hexa: "#065EB7",
    },
    {
      name: "800",
      hexa: "#012F7A",
    },
    {
      name: "900",
      hexa: "#022A6B",
    },
    {
      name: "950",
      hexa: "#052B69",
    },
  ];

  const orangeColors = [
    {
      name: "50",
      hexa: "#FFFBED",
    },
    {
      name: "100",
      hexa: "#FFF7D4",
    },
    {
      name: "200",
      hexa: "#FFEBA8",
    },
    {
      name: "300",
      hexa: "#FFDA71",
    },
    {
      name: "400",
      hexa: "#FFBF38",
    },
    {
      name: "500",
      hexa: "#FDA712",
    },
    {
      name: "600",
      hexa: "#F79009",
    },
    {
      name: "700",
      hexa: "#C56A09",
    },
    {
      name: "800",
      hexa: "#9D530F",
    },
    {
      name: "900",
      hexa: "#7E4510",
    },
    {
      name: "950",
      hexa: "#442106",
    },
  ];

  const purpleColors = [
    {
      name: "50",
      hexa: "#eeefff",
    },
    {
      name: "100",
      hexa: "#e0e2ff",
    },
    {
      name: "200",
      hexa: "#c8c9fd",
    },
    {
      name: "300",
      hexa: "#a6a6fb",
    },
    {
      name: "400",
      hexa: "#8c82f7",
    },
    {
      name: "500",
      hexa: "#7761ef",
    },
    {
      name: "600",
      hexa: "#6c48e3",
    },
    {
      name: "700",
      hexa: "#5d3ac8",
    },
    {
      name: "800",
      hexa: "#4c31a2",
    },
    {
      name: "900",
      hexa: "#402f80",
    },
    {
      name: "950",
      hexa: "#261c4a",
    },
  ];

  const dividerColors = [
    {
      title: "Divider",
      name: "50",
      hexa: "#282828",
      percentage: "12%",
    },
    {
      title: "Disabled",
      name: "50",
      hexa: "#282828",
      percentage: "38%",
    },
  ];

  return {
    primaryColors,
    warningColors,
    successColors,
    infoColors,
    defaultColors,
    grayColors,
    dangerColors,
    purpleColors,
    dividerColors,
    orangeColors,
  };
}
