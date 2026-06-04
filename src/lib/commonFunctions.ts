import moment from "moment";


export const setDateFormat = (dateString: string) => {
  return moment(dateString).utc().format("DD-MM-YYYY");
};

export const AVATAR_COLORS = [
  "#FF6B6B",
  "#FA5252",
  "#F06595",
  "#E64980",
  "#CC5DE8",
  "#BE4BDB",
  "#A855F7",
  "#9775FA",
  "#845EF7",
  "#7950F2",
  "#748FFC",
  "#5C7CFA",
  "#4C6EF5",
  "#4263EB",
  "#339AF0",
  "#228BE6",
  "#1C7ED6",
  "#22B8CF",
  "#15AABF",
  "#1098AD",
  "#20C997",
  "#12B886",
  "#0CA678",
  "#51CF66",
  "#40C057",
  "#37B24D",
  "#94D82D",
  "#82C91E",
  "#74B816",
  "#FCC419",
  "#FAB005",
  "#F59F00",
  "#FF922B",
  "#FD7E14",
  "#F76707",
  "#FF8787",
  "#FFA8A8",
  "#FFC9C9",
  "#FFD8A8",
  "#FFE066",
  "#FFF3BF",
  "#D3F9D8",
  "#B2F2BB",
  "#96F2D7",
  "#C5F6FA",
  "#A5D8FF",
  "#BAC8FF",
  "#D0BFFF",
  "#E5DBFF",
  "#F3D9FA",
  "#FFDEEB",
  "#F8F0FC",
  "#E7F5FF",
  "#E3FAFC",
  "#EBFBEE",
  "#FFF9DB",
  "#FFF4E6",
  "#F1F3F5",
];


// get avatar color
export const getAvatarColor = (name: string) => {
  const index = name.toUpperCase().charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

// make first letter capital
export const CapitalFirstCase = (str: string) => {
  var strng = str.charAt(0).toUpperCase() + str.slice(1);
  return strng.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

};


export const makeSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");