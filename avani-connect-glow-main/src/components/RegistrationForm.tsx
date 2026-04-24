// src/components/RegistrationForm.tsx 

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox"; // unused but kept as-is
import { useToast } from "@/hooks/use-toast";
import { getBackendUrl } from "@/lib/api";
import { Check, Send, User, Mail, Phone, Briefcase, ChevronDown, FileText, MapPin } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const services = [
  "Web Development",
  "Social Media Management",
  "AI Automation",
  "Google Ads & Meta Ads",
];

// Country codes array - सभी major countries के codes
const countryCodes = [
  {
    "value": "+91",
    "label": "India (+91)",
    "digits": 10
  },
  {
    "value": "+93",
    "label": "Afghanistan (+93)",
    "digits": 9
  },
  {
    "value": "+355",
    "label": "Albania (+355)",
    "digits": 9
  },
  {
    "value": "+213",
    "label": "Algeria (+213)",
    "digits": 9
  },
  {
    "value": "+1684",
    "label": "American Samoa (+1684)",
    "digits": 10
  },
  {
    "value": "+376",
    "label": "Andorra (+376)",
    "digits": 6
  },
  {
    "value": "+244",
    "label": "Angola (+244)",
    "digits": 9
  },
  {
    "value": "+1264",
    "label": "Anguilla (+1264)",
    "digits": 10
  },
  {
    "value": "+1268",
    "label": "Antigua and Barbuda (+1268)",
    "digits": 10
  },
  {
    "value": "+54",
    "label": "Argentina (+54)",
    "digits": [
      6,
      7,
      8
    ]
  },
  {
    "value": "+374",
    "label": "Armenia (+374)",
    "digits": 6
  },
  {
    "value": "+297",
    "label": "Aruba (+297)",
    "digits": 7
  },
  {
    "value": "+61",
    "label": "Australia (+61)",
    "digits": 9
  },
  {
    "value": "+43",
    "label": "Austria (+43)",
    "digits": [
      10,
      11
    ]
  },
  {
    "value": "+994",
    "label": "Azerbaijan (+994)",
    "digits": 9
  },
  {
    "value": "+1242",
    "label": "Bahamas (+1242)",
    "digits": 10
  },
  {
    "value": "+973",
    "label": "Bahrain (+973)",
    "digits": 8
  },
  {
    "value": "+880",
    "label": "Bangladesh (+880)",
    "digits": 10
  },
  {
    "value": "+1246",
    "label": "Barbados (+1246)",
    "digits": 10
  },
  {
    "value": "+375",
    "label": "Belarus (+375)",
    "digits": 9
  },
  {
    "value": "+32",
    "label": "Belgium (+32)",
    "digits": 9
  },
  {
    "value": "+501",
    "label": "Belize (+501)",
    "digits": 7
  },
  {
    "value": "+229",
    "label": "Benin (+229)",
    "digits": 8
  },
  {
    "value": "+1441",
    "label": "Bermuda (+1441)",
    "digits": 10
  },
  {
    "value": "+975",
    "label": "Bhutan (+975)",
    "digits": 7
  },
  {
    "value": "+591",
    "label": "Bolivia (+591)",
    "digits": 9
  },
  {
    "value": "+387",
    "label": "Bosnia and Herzegovina (+387)",
    "digits": 8
  },
  {
    "value": "+267",
    "label": "Botswana (+267)",
    "digits": 7
  },
  {
    "value": "+55",
    "label": "Brazil (+55)",
    "digits": 11
  },
  {
    "value": "+673",
    "label": "Brunei (+673)",
    "digits": 7
  },
  {
    "value": "+359",
    "label": "Bulgaria (+359)",
    "digits": 9
  },
  {
    "value": "+226",
    "label": "Burkina Faso (+226)",
    "digits": 8
  },
  {
    "value": "+257",
    "label": "Burundi (+257)",
    "digits": 8
  },
  {
    "value": "+855",
    "label": "Cambodia (+855)",
    "digits": 9
  },
  {
    "value": "+237",
    "label": "Cameroon (+237)",
    "digits": 9
  },
  {
    "value": "+1",
    "label": "Canada (+1)",
    "digits": 10
  },
  {
    "value": "+238",
    "label": "Cape Verde (+238)",
    "digits": 10
  },
  {
    "value": "+1345",
    "label": "Cayman Islands (+1345)",
    "digits": 7
  },
  {
    "value": "+236",
    "label": "Central African Republic (+236)",
    "digits": 8
  },
  {
    "value": "+235",
    "label": "Chad (+235)",
    "digits": 6
  },
  {
    "value": "+56",
    "label": "Chile (+56)",
    "digits": 9
  },
  {
    "value": "+86",
    "label": "China (+86)",
    "digits": 11
  },
  {
    "value": "+57",
    "label": "Colombia (+57)",
    "digits": 10
  },
  {
    "value": "+269",
    "label": "Comoros (+269)",
    "digits": 7
  },
  {
    "value": "+682",
    "label": "Cook Islands (+682)",
    "digits": 5
  },
  {
    "value": "+506",
    "label": "Costa Rica (+506)",
    "digits": 8
  },
  {
    "value": "+385",
    "label": "Croatia (+385)",
    "digits": 9
  },
  {
    "value": "+53",
    "label": "Cuba (+53)",
    "digits": 8
  },
  {
    "value": "+599",
    "label": "Curaçao (+599)",
    "digits": 7
  },
  {
    "value": "+357",
    "label": "Cyprus (+357)",
    "digits": 8
  },
  {
    "value": "+420",
    "label": "Czech Republic (+420)",
    "digits": 9
  },
  {
    "value": "+243",
    "label": "Democratic Republic of the Congo (+243)",
    "digits": 9
  },
  {
    "value": "+45",
    "label": "Denmark (+45)",
    "digits": 8
  },
  {
    "value": "+253",
    "label": "Djibouti (+253)",
    "digits": 10
  },
  {
    "value": "+1767",
    "label": "Dominica (+1767)",
    "digits": 10
  },
  {
    "value": "+1809",
    "label": "Dominican Republic (+1809)",
    "digits": 10
  },
  {
    "value": "+670",
    "label": "East Timor (+670)",
    "digits": 10
  },
  {
    "value": "+593",
    "label": "Ecuador (+593)",
    "digits": 9
  },
  {
    "value": "+20",
    "label": "Egypt (+20)",
    "digits": 10
  },
  {
    "value": "+503",
    "label": "El Salvador (+503)",
    "digits": 8
  },
  {
    "value": "+240",
    "label": "Equatorial Guinea (+240)",
    "digits": 9
  },
  {
    "value": "+291",
    "label": "Eritrea (+291)",
    "digits": 7
  },
  {
    "value": "+372",
    "label": "Estonia (+372)",
    "digits": 8
  },
  {
    "value": "+251",
    "label": "Ethiopia (+251)",
    "digits": 9
  },
  {
    "value": "+500",
    "label": "Falkland Islands (+500)",
    "digits": 5
  },
  {
    "value": "+298",
    "label": "Faroe Islands (+298)",
    "digits": 5
  },
  {
    "value": "+679",
    "label": "Fiji (+679)",
    "digits": 7
  },
  {
    "value": "+358",
    "label": "Finland (+358)",
    "digits": 10
  },
  {
    "value": "+33",
    "label": "France (+33)",
    "digits": 9
  },
  {
    "value": "+689",
    "label": "French Polynesia (+689)",
    "digits": 8
  },
  {
    "value": "+241",
    "label": "Gabon (+241)",
    "digits": 7
  },
  {
    "value": "+220",
    "label": "Gambia (+220)",
    "digits": 7
  },
  {
    "value": "+995",
    "label": "Georgia (+995)",
    "digits": 9
  },
  {
    "value": "+49",
    "label": "Germany (+49)",
    "digits": 10
  },
  {
    "value": "+233",
    "label": "Ghana (+233)",
    "digits": 9
  },
  {
    "value": "+350",
    "label": "Gibraltar (+350)",
    "digits": 8
  },
  {
    "value": "+30",
    "label": "Greece (+30)",
    "digits": 10
  },
  {
    "value": "+299",
    "label": "Greenland (+299)",
    "digits": 6
  },
  {
    "value": "+1473",
    "label": "Grenada (+1473)",
    "digits": 10
  },
  {
    "value": "+1671",
    "label": "Guam (+1671)",
    "digits": 10
  },
  {
    "value": "+502",
    "label": "Guatemala (+502)",
    "digits": 8
  },
  {
    "value": "+224",
    "label": "Guinea (+224)",
    "digits": 9
  },
  {
    "value": "+245",
    "label": "Guinea-Bissau (+245)",
    "digits": 9
  },
  {
    "value": "+592",
    "label": "Guyana (+592)",
    "digits": 7
  },
  {
    "value": "+509",
    "label": "Haiti (+509)",
    "digits": 8
  },
  {
    "value": "+504",
    "label": "Honduras (+504)",
    "digits": 8
  },
  {
    "value": "+852",
    "label": "Hong Kong (+852)",
    "digits": 8
  },
  {
    "value": "+36",
    "label": "Hungary (+36)",
    "digits": 9
  },
  {
    "value": "+354",
    "label": "Iceland (+354)",
    "digits": 7
  },
  {
    "value": "+62",
    "label": "Indonesia (+62)",
    "digits": 11
  },
  {
    "value": "+98",
    "label": "Iran (+98)",
    "digits": 11
  },
  {
    "value": "+964",
    "label": "Iraq (+964)",
    "digits": 10
  },
  {
    "value": "+353",
    "label": "Ireland (+353)",
    "digits": 9
  },
  {
    "value": "+972",
    "label": "Israel (+972)",
    "digits": 9
  },
  {
    "value": "+39",
    "label": "Italy (+39)",
    "digits": 10
  },
  {
    "value": "+225",
    "label": "Ivory Coast (+225)",
    "digits": 10
  },
  {
    "value": "+1876",
    "label": "Jamaica (+1876)",
    "digits": 10
  },
  {
    "value": "+81",
    "label": "Japan (+81)",
    "digits": 10
  },
  {
    "value": "+962",
    "label": "Jordan (+962)",
    "digits": [
      8,
      9
    ]
  },
  {
    "value": "+7",
    "label": "Kazakhstan (+7)",
    "digits": 10
  },
  {
    "value": "+254",
    "label": "Kenya (+254)",
    "digits": 10
  },
  {
    "value": "+686",
    "label": "Kiribati (+686)",
    "digits": 8
  },
  {
    "value": "+383",
    "label": "Kosovo (+383)",
    "digits": 10
  },
  {
    "value": "+965",
    "label": "Kuwait (+965)",
    "digits": 8
  },
  {
    "value": "+996",
    "label": "Kyrgyzstan (+996)",
    "digits": 9
  },
  {
    "value": "+856",
    "label": "Laos (+856)",
    "digits": 10
  },
  {
    "value": "+371",
    "label": "Latvia (+371)",
    "digits": 8
  },
  {
    "value": "+961",
    "label": "Lebanon (+961)",
    "digits": [
      7,
      8
    ]
  },
  {
    "value": "+266",
    "label": "Lesotho (+266)",
    "digits": 8
  },
  {
    "value": "+231",
    "label": "Liberia (+231)",
    "digits": [
      8,
      9
    ]
  },
  {
    "value": "+218",
    "label": "Libya (+218)",
    "digits": 10
  },
  {
    "value": "+423",
    "label": "Liechtenstein (+423)",
    "digits": 7
  },
  {
    "value": "+370",
    "label": "Lithuania (+370)",
    "digits": 8
  },
  {
    "value": "+352",
    "label": "Luxembourg (+352)",
    "digits": 9
  },
  {
    "value": "+853",
    "label": "Macau (+853)",
    "digits": 10
  },
  {
    "value": "+389",
    "label": "Macedonia (+389)",
    "digits": 8
  },
  {
    "value": "+261",
    "label": "Madagascar (+261)",
    "digits": 7
  },
  {
    "value": "+265",
    "label": "Malawi (+265)",
    "digits": [
      7,
      8,
      9
    ]
  },
  {
    "value": "+60",
    "label": "Malaysia (+60)",
    "digits": 7
  },
  {
    "value": "+960",
    "label": "Maldives (+960)",
    "digits": 7
  },
  {
    "value": "+223",
    "label": "Mali (+223)",
    "digits": 8
  },
  {
    "value": "+356",
    "label": "Malta (+356)",
    "digits": 8
  },
  {
    "value": "+692",
    "label": "Marshall Islands (+692)",
    "digits": 7
  },
  {
    "value": "+222",
    "label": "Mauritania (+222)",
    "digits": 8
  },
  {
    "value": "+230",
    "label": "Mauritius (+230)",
    "digits": 8
  },
  {
    "value": "+262",
    "label": "Mayotte (+262)",
    "digits": 9
  },
  {
    "value": "+52",
    "label": "Mexico (+52)",
    "digits": 10
  },
  {
    "value": "+691",
    "label": "Micronesia (+691)",
    "digits": 7
  },
  {
    "value": "+373",
    "label": "Moldova (+373)",
    "digits": 8
  },
  {
    "value": "+377",
    "label": "Monaco (+377)",
    "digits": 8
  },
  {
    "value": "+976",
    "label": "Mongolia (+976)",
    "digits": 8
  },
  {
    "value": "+382",
    "label": "Montenegro (+382)",
    "digits": 8
  },
  {
    "value": "+1664",
    "label": "Montserrat (+1664)",
    "digits": 10
  },
  {
    "value": "+212",
    "label": "Morocco (+212)",
    "digits": 9
  },
  {
    "value": "+258",
    "label": "Mozambique (+258)",
    "digits": 12
  },
  {
    "value": "+95",
    "label": "Myanmar (+95)",
    "digits": 10
  },
  {
    "value": "+264",
    "label": "Namibia (+264)",
    "digits": 7
  },
  {
    "value": "+674",
    "label": "Nauru (+674)",
    "digits": 7
  },
  {
    "value": "+977",
    "label": "Nepal (+977)",
    "digits": 10
  },
  {
    "value": "+31",
    "label": "Netherlands (+31)",
    "digits": 9
  },
  {
    "value": "+687",
    "label": "New Caledonia (+687)",
    "digits": 6
  },
  {
    "value": "+64",
    "label": "New Zealand (+64)",
    "digits": [
      8,
      9
    ]
  },
  {
    "value": "+505",
    "label": "Nicaragua (+505)",
    "digits": 8
  },
  {
    "value": "+227",
    "label": "Niger (+227)",
    "digits": 8
  },
  {
    "value": "+234",
    "label": "Nigeria (+234)",
    "digits": 8
  },
  {
    "value": "+683",
    "label": "Niue (+683)",
    "digits": 4
  },
  {
    "value": "+672",
    "label": "Norfolk Island (+672)",
    "digits": 6
  },
  {
    "value": "+850",
    "label": "North Korea (+850)",
    "digits": 10
  },
  {
    "value": "+1670",
    "label": "Northern Mariana Islands (+1670)",
    "digits": 7
  },
  {
    "value": "+47",
    "label": "Norway (+47)",
    "digits": 8
  },
  {
    "value": "+968",
    "label": "Oman (+968)",
    "digits": 8
  },
  {
    "value": "+92",
    "label": "Pakistan (+92)",
    "digits": 10
  },
  {
    "value": "+680",
    "label": "Palau (+680)",
    "digits": 7
  },
  {
    "value": "+970",
    "label": "Palestine (+970)",
    "digits": 9
  },
  {
    "value": "+507",
    "label": "Panama (+507)",
    "digits": 8
  },
  {
    "value": "+675",
    "label": "Papua New Guinea (+675)",
    "digits": 8
  },
  {
    "value": "+595",
    "label": "Paraguay (+595)",
    "digits": 9
  },
  {
    "value": "+51",
    "label": "Peru (+51)",
    "digits": 9
  },
  {
    "value": "+63",
    "label": "Philippines (+63)",
    "digits": 10
  },
  {
    "value": "+48",
    "label": "Poland (+48)",
    "digits": 9
  },
  {
    "value": "+351",
    "label": "Portugal (+351)",
    "digits": 9
  },
  {
    "value": "+1787",
    "label": "Puerto Rico (+1787)",
    "digits": 10
  },
  {
    "value": "+974",
    "label": "Qatar (+974)",
    "digits": 8
  },
  {
    "value": "+242",
    "label": "Republic of the Congo (+242)",
    "digits": 9
  },
  {
    "value": "+201",
    "label": "Romania (+40)",
    "digits": 10
  },
  {
    "value": "+262",
    "label": "Réunion (+262)",
    "digits": 10
  },
  {
    "value": "+40",
    "label": "Romania (+40)",
    "digits": 10
  },
  {
    "value": "+7",
    "label": "Russia (+7)",
    "digits": 10
  },
  {
    "value": "+250",
    "label": "Rwanda (+250)",
    "digits": 9
  },
  {
    "value": "+590",
    "label": "Saint Barthélemy (+590)",
    "digits": 9
  },
  {
    "value": "+290",
    "label": "Saint Helena (+290)",
    "digits": 4
  },
  {
    "value": "+1869",
    "label": "Saint Kitts and Nevis (+1869)",
    "digits": 10
  },
  {
    "value": "+1758",
    "label": "Saint Lucia (+1758)",
    "digits": 7
  },
  {
    "value": "+590",
    "label": "Saint Martin (+590)",
    "digits": 6
  },
  {
    "value": "+508",
    "label": "Saint Pierre and Miquelon (+508)",
    "digits": 6
  },
  {
    "value": "+1784",
    "label": "Saint Vincent and the Grenadines (+1784)",
    "digits": 7
  },
  {
    "value": "+685",
    "label": "Samoa (+685)",
    "digits": [
      5,
      6,
      7
    ]
  },
  {
    "value": "+378",
    "label": "San Marino (+378)",
    "digits": 10
  },
  {
    "value": "+239",
    "label": "Sao Tome and Principe (+239)",
    "digits": 7
  },
  {
    "value": "+966",
    "label": "Saudi Arabia (+966)",
    "digits": 9
  },
  {
    "value": "+221",
    "label": "Senegal (+221)",
    "digits": 9
  },
  {
    "value": "+381",
    "label": "Serbia (+381)",
    "digits": 9
  },
  {
    "value": "+248",
    "label": "Seychelles (+248)",
    "digits": 7
  },
  {
    "value": "+232",
    "label": "Sierra Leone (+232)",
    "digits": 8
  },
  {
    "value": "+65",
    "label": "Singapore (+65)",
    "digits": 8
  },
  {
    "value": "+1721",
    "label": "Sint Maarten (+1721)",
    "digits": 10
  },
  {
    "value": "+421",
    "label": "Slovakia (+421)",
    "digits": 9
  },
  {
    "value": "+386",
    "label": "Slovenia (+386)",
    "digits": 9
  },
  {
    "value": "+677",
    "label": "Solomon Islands (+677)",
    "digits": 7
  },
  {
    "value": "+252",
    "label": "Somalia (+252)",
    "digits": [
      8,
      9
    ]
  },
  {
    "value": "+27",
    "label": "South Africa (+27)",
    "digits": 9
  },
  {
    "value": "+82",
    "label": "South Korea (+82)",
    "digits": 10
  },
  {
    "value": "+211",
    "label": "South Sudan (+211)",
    "digits": 7
  },
  {
    "value": "+34",
    "label": "Spain (+34)",
    "digits": 9
  },
  {
    "value": "+94",
    "label": "Sri Lanka (+94)",
    "digits": 7
  },
  {
    "value": "+249",
    "label": "Sudan (+249)",
    "digits": 7
  },
  {
    "value": "+597",
    "label": "Suriname (+597)",
    "digits": [
      6,
      7
    ]
  },
  {
    "value": "+268",
    "label": "Swaziland (+268)",
    "digits": 8
  },
  {
    "value": "+46",
    "label": "Sweden (+46)",
    "digits": 7
  },
  {
    "value": "+41",
    "label": "Switzerland (+41)",
    "digits": 9
  },
  {
    "value": "+963",
    "label": "Syria (+963)",
    "digits": 7
  },
  {
    "value": "+886",
    "label": "Taiwan (+886)",
    "digits": 9
  },
  {
    "value": "+992",
    "label": "Tajikistan (+992)",
    "digits": 9
  },
  {
    "value": "+255",
    "label": "Tanzania (+255)",
    "digits": 7
  },
  {
    "value": "+66",
    "label": "Thailand (+66)",
    "digits": 9
  },
  {
    "value": "+228",
    "label": "Togo (+228)",
    "digits": 8
  },
  {
    "value": "+690",
    "label": "Tokelau (+690)",
    "digits": 5
  },
  {
    "value": "+676",
    "label": "Tonga (+676)",
    "digits": 5
  },
  {
    "value": "+1868",
    "label": "Trinidad and Tobago (+1868)",
    "digits": 7
  },
  {
    "value": "+216",
    "label": "Tunisia (+216)",
    "digits": 8
  },
  {
    "value": "+90",
    "label": "Turkey (+90)",
    "digits": 11
  },
  {
    "value": "+993",
    "label": "Turkmenistan (+993)",
    "digits": 8
  },
  {
    "value": "+1649",
    "label": "Turks and Caicos Islands (+1649)",
    "digits": 10
  },
  {
    "value": "+688",
    "label": "Tuvalu (+688)",
    "digits": 5
  },
  {
    "value": "+1340",
    "label": "U.S. Virgin Islands (+1340)",
    "digits": 7
  },
  {
    "value": "+256",
    "label": "Uganda (+256)",
    "digits": 7
  },
  {
    "value": "+380",
    "label": "Ukraine (+380)",
    "digits": 9
  },
  {
    "value": "+971",
    "label": "United Arab Emirates (+971)",
    "digits": 9
  },
  {
    "value": "+44",
    "label": "United Kingdom (+44)",
    "digits": 10
  },
  {
    "value": "+1",
    "label": "United States (+1)",
    "digits": 10
  },
  {
    "value": "+598",
    "label": "Uruguay (+598)",
    "digits": 8
  },
  {
    "value": "+998",
    "label": "Uzbekistan (+998)",
    "digits": 9
  },
  {
    "value": "+678",
    "label": "Vanuatu (+678)",
    "digits": 5
  },
  {
    "value": "+379",
    "label": "Vatican (+379)",
    "digits": 10
  },
  {
    "value": "+58",
    "label": "Venezuela (+58)",
    "digits": 7
  },
  {
    "value": "+84",
    "label": "Vietnam (+84)",
    "digits": 10
  },
  {
    "value": "+681",
    "label": "Wallis and Futuna (+681)",
    "digits": 6
  },
  {
    "value": "+967",
    "label": "Yemen (+967)",
    "digits": 9
  },
  {
    "value": "+260",
    "label": "Zambia (+260)",
    "digits": 9
  },
  {
    "value": "+263",
    "label": "Zimbabwe (+263)",
    "digits": 9
  }
];

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  cityState: z.string().trim().min(2, "City & State must be at least 2 characters").max(200),
  phone: z.string().trim().min(4, "Phone number is too short").max(20, "Phone number is too long"),
  service: z.array(z.string()).min(1, "Please select at least one service"),
  businessCategory: z.string().max(1000).optional(),
  consent: z.boolean().refine((val) => val === true, "You must agree to continue"),
});

type FormData = z.infer<typeof formSchema>;
const fieldSchemas = formSchema.shape;

interface RegistrationFormProps {
  uniqueConsentId: string;
  source?: string;
  isEmbedded?: boolean;
}

export default function RegistrationForm({ uniqueConsentId, source, isEmbedded = false }: RegistrationFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<FormData>>({
    name: "",
    email: "",
    cityState: "",
    phone: "",
    service: [],
    businessCategory: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [openCountryCode, setOpenCountryCode] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const cityStateRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const notesRef = useRef<HTMLTextAreaElement | null>(null);

  const validateField = (field: keyof FormData, value: unknown) => {
    try {
      if (field === "phone") {
        const country = countryCodes.find((c) => c.value === selectedCountryCode);
        const digits = country?.digits;
        const phoneVal = value as string;

        if (digits) {
          const len = phoneVal.length;
          const isValidLen = Array.isArray(digits) ? digits.includes(len) : len === digits;
          if (!isValidLen) {
            const req = Array.isArray(digits) ? digits.join(" or ") : digits;
            setErrors((prev) => ({ ...prev, [field]: `Phone number must be ${req} digits` }));
            return false;
          }
        }
      }
      const fieldSchema = fieldSchemas[field] as z.ZodTypeAny;
      fieldSchema.parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);

    // Custom check for phone length before schema validation
    const country = countryCodes.find((c) => c.value === selectedCountryCode);
    if (country?.digits) {
      const d = country.digits;
      const phone = formData.phone || "";
      const valid = Array.isArray(d) ? d.includes(phone.length) : phone.length === d;
      if (!valid) {
        const req = Array.isArray(d) ? d.join(" or ") : d;
        setErrors((prev) => ({ ...prev, phone: `Phone number must be ${req} digits` }));
        toast({
          title: "Invalid Phone Number",
          description: `Phone number must be ${req} digits for ${country.label}`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    try {
      const validatedData = formSchema.parse({
        name: formData.name,
        email: formData.email,
        cityState: formData.cityState,
        phone: formData.phone,
        service: formData.service ?? [],
        businessCategory: formData.businessCategory,
        consent: formData.consent,
      });


      // Ensure source is captured correctly from props
      const finalSource = source && source.trim() !== "" ? source : "web-dev";
      console.log("RegistrationForm: determining source", { propSource: source, finalSource });

      const payload = {
        ...validatedData,
        source: finalSource
      };
      console.log("🚀 Submitting Form Payload:", payload);

      const API_BASE = getBackendUrl();
      const response = await fetch(`${API_BASE}/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Send source
      });

      const result = await response.json();

      if (!response.ok) {
        setApiError(result?.message || "Something went wrong. Try again.");
        toast({
          title: "Submission Failed",
          description: result?.message || "Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Form submitted successfully!",
        description: "We'll get back to you soon.",
      });

      navigate("/thank-you", {
        state: { name: validatedData.name, service: validatedData.service },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof FormData;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);

        toast({
          title: "Please check the form",
          description: "Some fields require your attention.",
          variant: "destructive",
        });

        const firstErrorField = error.errors[0]?.path?.[0];
        if (firstErrorField === "name") nameRef.current?.focus();
        else if (firstErrorField === "email") emailRef.current?.focus();
        else if (firstErrorField === "cityState") cityStateRef.current?.focus();
        else if (firstErrorField === "phone") phoneRef.current?.focus();
      } else {
        setApiError("Unexpected error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleService = (serviceName: string, force?: boolean) => {
    const current = (formData.service as string[]) ?? [];
    const includes = current.includes(serviceName);

    let next: string[];
    if (typeof force === "boolean") {
      next = force
        ? includes
          ? current
          : [...current, serviceName]
        : current.filter((s) => s !== serviceName);
    } else {
      next = includes ? current.filter((s) => s !== serviceName) : [...current, serviceName];
    }

    setFormData((prev) => ({ ...prev, service: next }));
    validateField("service", next);
  };

  const formContent = (
    <div className={cn("max-w-2xl mx-auto", isEmbedded && "max-w-full")}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/60 via-primary/30 to-primary/60 p-[2px]">
          <div className={cn("w-full h-full rounded-2xl", isEmbedded ? "bg-white" : "bg-background")} />
        </div>

        <div className="relative">
          {/* Helper variables for conditional styling based on environment */}
          {(() => {
            const textMain = isEmbedded ? "text-slate-900" : "text-foreground";
            const textMuted = isEmbedded ? "text-slate-600" : "text-muted-foreground";
            const iconColor = isEmbedded ? "text-slate-500" : "text-muted-foreground";
            const placeholderColor = isEmbedded ? "placeholder:text-slate-500/70" : "placeholder:text-muted-foreground/70";
            const inputColor = isEmbedded ? "text-slate-900" : "text-foreground";
            const checkboxLabelColor = isEmbedded ? "text-slate-800" : "text-foreground/80";

            return (
              <>
          <div className={cn("p-4 sm:p-6 pb-1 sm:pb-2 text-center", isEmbedded ? "bg-slate-50/50" : "bg-gradient-to-b from-card to-background")}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={cn("font-display text-base sm:text-lg md:text-2xl font-bold mb-1", textMain)}
            >
              Get Your Free Consultation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={cn("text-xs sm:text-sm md:text-base font-semibold", textMuted)}
            >
              Transform your business with our expert digital solutions
            </motion.p>
          </div>

          {/* Form Container */}
          <div className={cn("px-3 py-2 sm:p-6", isEmbedded ? "bg-white/80 backdrop-blur-md" : "bg-card/50 backdrop-blur-sm")}>
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
              {/* Name */}
              <div className="relative w-full">
                <div className={cn("absolute left-3 top-1/2 -translate-y-1/2", iconColor)}>
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <Input
                  ref={nameRef}
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({ ...prev, name: val }));
                    validateField("name", val);
                  }}
                  className={cn("pl-10 sm:pl-12 border-border/60 focus:border-primary py-2 sm:py-2.5 text-sm sm:text-base w-full", isEmbedded ? "bg-white" : "bg-background/80", inputColor, placeholderColor)}
                  aria-label="Full name"
                  inputMode="text"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-destructive text-xs sm:text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="relative w-full">
                <div className={cn("absolute left-3 top-1/2 -translate-y-1/2", iconColor)}>
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <Input
                  ref={emailRef}
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({ ...prev, email: val }));
                    validateField("email", val);
                  }}
                  className={cn("pl-10 sm:pl-12 border-border/60 focus:border-primary py-2 sm:py-2.5 text-sm sm:text-base w-full", isEmbedded ? "bg-white" : "bg-background/80", inputColor, placeholderColor)}
                  aria-label="Email address"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-destructive text-xs sm:text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* City & State */}
              <div className="relative w-full">
                <div className={cn("absolute left-3 top-1/2 -translate-y-1/2", iconColor)}>
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <Input
                  ref={cityStateRef}
                  placeholder="Enter City & State"
                  value={formData.cityState}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData((prev) => ({ ...prev, cityState: val }));
                    validateField("cityState", val);
                  }}
                  className={cn("pl-10 sm:pl-12 border-border/60 focus:border-primary py-2 sm:py-2.5 text-sm sm:text-base w-full", isEmbedded ? "bg-white" : "bg-background/80", inputColor, placeholderColor)}
                  aria-label="City and State"
                  inputMode="text"
                  autoComplete="address-level2"
                />
                {errors.cityState && (
                  <p className="text-destructive text-xs sm:text-sm mt-1">{errors.cityState}</p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-row gap-2 w-full">
                <div className="w-auto sm:flex-shrink-0">
                  <Popover open={openCountryCode} onOpenChange={setOpenCountryCode}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCountryCode}
                        className={cn("border-border/60 py-2 sm:py-2.5 text-sm sm:text-base w-auto justify-between", isEmbedded ? "bg-white" : "bg-background/80", inputColor)}
                      >
                        <span className={inputColor}>
                          {selectedCountryCode
                            ? countryCodes.find(
                              (code) => code.value === selectedCountryCode
                            )?.value
                            : "+91"}
                        </span>
                        <ChevronDown className={cn("ml-2 h-4 w-4 shrink-0 opacity-50", iconColor)} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className={cn("w-[280px] p-0 border-border", isEmbedded ? "bg-white" : "bg-popover")} align="start">
                      <Command className={isEmbedded ? "bg-white" : ""}>
                        <CommandInput placeholder="Search country..." />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {countryCodes.map((code) => (
                              <CommandItem
                                key={code.value}
                                value={code.label}
                                onSelect={(currentValue) => {
                                  setSelectedCountryCode(code.value);
                                  setOpenCountryCode(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedCountryCode === code.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {code.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex-1 relative w-full">
                  <div className={cn("absolute left-3 top-1/2 -translate-y-1/2", iconColor)}>
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <Input
                    ref={phoneRef}
                    type="tel"
                    placeholder="Mobile no."
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "");
                      if (val.length <= 15) {
                        setFormData((prev) => ({ ...prev, phone: val }));
                        validateField("phone", val);
                      }
                    }}
                    className={cn("pl-10 sm:pl-12 border-border/60 focus:border-primary py-2 sm:py-2.5 text-sm sm:text-base w-full", isEmbedded ? "bg-white" : "bg-background/80", inputColor, placeholderColor)}
                    aria-label="Phone number"
                    autoComplete="tel-national"
                  />
                </div>
              </div>
              {errors.phone && (
                <p className="text-destructive text-xs sm:text-sm mt-1">{errors.phone}</p>
              )}

              {/* Service Selection */}
              <div className="relative w-full">
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-between pl-3 text-left font-normal border-border/60 py-2 sm:py-2.5 text-sm sm:text-base h-auto hover:bg-background/90",
                    isEmbedded ? "bg-white" : "bg-background/80",
                    inputColor,
                    !formData.service?.length && iconColor
                  )}
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  <span className={cn("flex items-center gap-2 truncate font-medium", inputColor)}>
                    <Briefcase className={cn("w-4 h-4 sm:w-5 sm:h-5", iconColor)} />
                    {formData.service?.length
                      ? formData.service.join(", ")
                      : "Select Service(s) of Interest *"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 opacity-50 transition-transform duration-200",
                      iconColor,
                      isServicesOpen && "rotate-180"
                    )}
                  />
                </Button>

                {isServicesOpen && (
                  <div className={cn("absolute z-20 w-full mt-1 backdrop-blur-md border border-border shadow-xl rounded-lg py-1 animate-in fade-in zoom-in-95 duration-200", isEmbedded ? "bg-white/95" : "bg-background/95")}>
                    {services.map((service) => (
                      <div
                        key={service}
                        className="flex items-center px-3 py-2 hover:bg-primary/10 cursor-pointer transition-colors"
                        onClick={() => toggleService(service)}
                      >
                        <div
                          className={cn(
                            "w-4 h-4 border rounded mr-2 flex items-center justify-center transition-colors",
                            formData.service?.includes(service)
                              ? "bg-primary border-primary"
                              : "border-muted-foreground/30"
                          )}
                        >
                          {formData.service?.includes(service) && (
                            <Check className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                        <span className={cn("text-sm sm:text-base select-none", inputColor)}>{service}</span>
                      </div>
                    ))}
                  </div>
                )}
                {errors.service && (
                  <p className="text-destructive text-xs sm:text-sm mt-1">{errors.service}</p>
                )}
              </div>

              <div className="relative w-full">
                <Button
                  type="button"
                  variant="outline"
                  className={cn("w-full justify-between pl-3 text-left font-normal border-border/60 py-2 sm:py-2.5 text-sm sm:text-base h-auto hover:bg-background/90", isEmbedded ? "bg-white" : "bg-background/80", inputColor)}
                  onClick={() => setIsBusinessOpen(!isBusinessOpen)}
                >
                  <span className={cn("flex items-center gap-2 truncate font-medium", inputColor)}>
                    <FileText className={cn("w-4 h-4 sm:w-5 sm:h-5", iconColor)} />
                    {"Business Category / Notes (optional)"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 opacity-50 transition-transform duration-200",
                      iconColor,
                      isBusinessOpen && "rotate-180"
                    )}
                  />
                </Button>

                {isBusinessOpen && (
                  <div className="mt-2 animate-in slide-in-from-top-2 duration-200">
                    <textarea
                      ref={notesRef}
                      placeholder="Describe your business or add any notes (optional)"
                      value={formData.businessCategory}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData((prev) => ({ ...prev, businessCategory: val }));
                        validateField("businessCategory", val);
                      }}
                      className={cn("w-full min-h-[100px] sm:min-h-[120px] resize-none p-3 rounded-md border border-border/60 focus:border-primary text-sm md:text-base outline-none", isEmbedded ? "bg-white" : "bg-background/80", inputColor, placeholderColor)}
                      aria-label="Business category or notes"
                    />
                  </div>
                )}
              </div>

              {/* Consent */}
              <div
                className="flex items-start gap-2 sm:gap-3 w-full cursor-pointer select-none pt-2"
                onClick={() => {
                  const boolVal = !Boolean(formData.consent);
                  setFormData((prev) => ({ ...prev, consent: boolVal }));
                  validateField("consent", boolVal);
                }}
              >
                <input
                  id={uniqueConsentId}
                  type="checkbox"
                  className="mt-0.5 sm:mt-1 h-4 w-4 rounded border border-border/60 flex-shrink-0 cursor-pointer accent-primary"
                  checked={Boolean(formData.consent)}
                  onChange={() => {
                    const boolVal = !Boolean(formData.consent);
                    setFormData((prev) => ({ ...prev, consent: boolVal }));
                    validateField("consent", boolVal);
                  }}
                  aria-describedby="consent-desc"
                />

                <span className={cn("text-xs sm:text-sm leading-relaxed cursor-pointer font-medium", checkboxLabelColor)}>
                  I agree to receive information regarding my submitted application and updates
                  from Avani Enterprises *
                </span>
              </div>
              {errors.consent && (
                <p className="text-destructive text-xs sm:text-sm">
                  {errors.consent}
                </p>
              )}


              {/* API ERROR */}
              {apiError && (
                <p className="text-destructive text-sm text-center mt-2 font-semibold">{apiError}</p>
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full sm:w-[300px] font-bold shadow-lg"
                  disabled={isLoading}
                  aria-label="Submit registration form"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2 text-white">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 justify-center text-white">
                      Submit
                      <Send className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
              </>
            );
          })()}
        </div>
      </motion.div>
    </div>
  );

  if (isEmbedded) {
    return formContent;
  }

  return (
    <section id="contact" className="py-6 sm:py-10 relative text-sm md:text-base">
      {/* decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {formContent}
      </div>
    </section>
  );
}
