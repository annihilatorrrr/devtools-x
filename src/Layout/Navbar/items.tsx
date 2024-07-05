import { BsSortNumericUpAlt, BsFilePdf } from "react-icons/bs";
import {
  FaRandom,
  FaReact,
  FaPaste,
  FaCode,
  FaMarkdown,
  FaYinYang,
  FaExchangeAlt,
  FaCompress,
  FaCss3,
} from "react-icons/fa";
import { FiClock, FiHash, FiFile, FiStar } from "react-icons/fi";
import {
  MdQrCode,
  MdWork,
  MdAnchor,
  MdColorize,
  MdPassword,
  MdQuestionMark,
  MdHtml,
  MdPermIdentity,
  MdDataExploration,
  MdWeb,
  MdImage,
} from "react-icons/md";
import {
  FcCamera,
  FcFactory,
  FcFilm,
  FcInTransit,
  FcOrganization,
  FcPackage,
  FcPrivacy,
  FcProcess,
  FcRefresh,
  FcSettings,
} from "react-icons/fc";
import { RiPingPongLine } from "react-icons/ri";
import { SiPrettier, SiJsonwebtokens, SiPostgresql } from "react-icons/si";
import {
  VscSymbolString,
  VscDiff,
  VscTypeHierarchySub,
  VscRegex,
} from "react-icons/vsc";
import { NavItem } from ".";

export const navitems: NavItem[] = [
  {
    id: "rest",
    to: "/rest",
    icon: <MdWeb />,
    text: "REST API",
    group: "Web",
  },
  {
    id: "epoch",
    to: "/epoch",
    icon: <FiClock />,
    text: "Epoch Converter",
    group: "Web",
  },
  {
    id: "ping",
    to: "/ping",
    icon: <RiPingPongLine />,
    text: "Ping",
    group: "Utilities",
  },
  {
    id: "password",
    to: "/password",
    icon: <FaRandom />,
    text: "Password Generator",
    group: "Password",
  },
  {
    id: "qrcode",
    to: "/qrcode",
    icon: <MdQrCode />,
    text: "QR Code Generator",
    group: "Generators",
  },
  {
    id: "minify",
    to: "/minify",
    icon: <SiPrettier />,
    text: "Minify/Beautify",
    group: "Minifier/Formatters",
  },
  {
    id: "playground",
    to: "/playground",
    icon: <FaReact />,
    text: "React Pad",
    group: "Testing",
  },
  {
    id: "cssplayground",
    to: "/cssplayground",
    icon: <FaCss3 />,
    text: "CSS Playground",
    group: "Testing",
  },
  {
    id: "lorem",
    to: "/lorem",
    icon: <MdWork />,
    text: "Lorem Ipsum",
    group: "Generators",
  },
  {
    id: "image",
    to: "/image",
    icon: <MdImage />,
    text: "Image Compressor",
    group: "Image",
  },
  {
    id: "pastebin",
    to: "/pastebin",
    icon: <FaPaste />,
    text: "Pastebin",
    group: "Utilities",
  },
  {
    id: "repl",
    to: "/repl",
    icon: <FaCode />,
    text: "Scratchpad",
    group: "Testing",
  },
  {
    id: "bulk-image",
    to: "/bulk-image",
    icon: <MdImage />,
    text: "Bulk Compressor",
    group: "Image",
  },
  {
    id: "base64-text",
    to: "/base64-text",
    icon: <VscSymbolString />,
    text: "Base64 Text",
    group: "Converters",
  },
  {
    id: "base64-image",
    to: "/base64-image",
    icon: <VscSymbolString />,
    text: "Base64 Image",
    group: "Converters",
  },
  {
    id: "hash-text",
    to: "/hash-text",
    icon: <FiHash />,
    text: "Hashing Text",
    group: "Hashing",
  },
  {
    id: "hash-file",
    to: "/hash-file",
    icon: <FiFile />,
    text: "Hashing Files",
    group: "Hashing",
  },

  {
    id: "json-formatter",
    to: "/json-formatter",
    icon: <MdAnchor />,
    text: "JSON Tools",
    group: "Minifier/Formatters",
  },
  {
    id: "jwt",
    to: "/jwt",
    icon: <SiJsonwebtokens />,
    text: "JWT Tools",
    group: "Web",
  },
  {
    id: "nums",
    to: "/nums",
    icon: <BsSortNumericUpAlt />,
    text: "Number Tools",
    group: "Converters",
  },
  {
    id: "sql",
    to: "/sql",
    icon: <SiPostgresql />,
    text: "SQL Formatter",
    group: "Minifier/Formatters",
  },
  {
    id: "colors",
    to: "/colors",
    icon: <MdColorize />,
    text: "Color Utils",
    group: "Converters",
  },

  {
    id: "text",
    to: "/text",
    icon: <VscDiff />,
    text: "Diff Tools",
    group: "Utilities",
  },
  {
    id: "markdown",
    to: "/markdown",
    icon: <FaMarkdown />,
    text: "Markdown",
    group: "Previewers",
  },
  {
    id: "yamljson",
    to: "/yamljson",
    icon: <FaYinYang />,
    text: "Yaml Json",
    group: "Converters",
  },
  {
    id: "units",
    to: "/units",
    icon: <FaExchangeAlt />,
    text: "Unit Converter",
    group: "Converters",
  },
  {
    id: "compress",
    to: "/compress",
    icon: <FaCompress />,
    text: "Compress Text",
    group: "Minifier/Formatters",
  },
  {
    id: "stateless",
    to: "/stateless",
    icon: <MdPassword />,
    text: "Stateless Password",
    group: "Password",
  },

  {
    id: "quicktype",
    to: "/quicktype",
    icon: <VscTypeHierarchySub />,
    text: "Quicktype",
    group: "Testing",
  },

  {
    id: "url-parser",
    to: "/url-parser",
    icon: <MdQuestionMark />,
    text: "URL Parser",
    group: "Web",
  },
  {
    id: "html-preview",
    to: "/html-preview",
    icon: <MdHtml />,
    text: "HTML Preview",
    group: "Previewers",
  },

  {
    id: "pdf-reader",
    to: "/pdf-reader",
    icon: <BsFilePdf />,
    text: "PDF Reader",
    group: "Previewers",
  },

  {
    id: "cron",
    to: "/cron",
    icon: <FiStar />,
    text: "Cron",
    group: "Utilities",
  },
  {
    id: "ids",
    to: "/ids",
    icon: <MdPermIdentity />,
    text: "ID Generator",
    group: "Generators",
  },
  {
    id: "regex",
    to: "/regex",
    icon: <VscRegex />,
    text: "Regex Tester",
    group: "Testing",
  },
  {
    id: "faker",
    to: "/faker",
    icon: <MdDataExploration />,
    text: "Faker",
    group: "Generators",
  },
];

// These icons don't make sense, but I don't care
export const groupIcons = {
  Web: <FcPackage />,
  Utilities: <FcInTransit />,
  Testing: <FcSettings />,
  Password: <FcPrivacy />,
  Image: <FcCamera />,
  Generators: <FcFactory />,
  "Minifier/Formatters": <FcRefresh />,
  Previewers: <FcFilm />,
  Converters: <FcProcess />,
  Hashing: <FcOrganization />,
};
