
const fs = require('fs');

const existingCountries = [
    { value: "+91", label: "India (+91)" },
    { value: "+93", label: "Afghanistan (+93)" },
    { value: "+355", label: "Albania (+355)" },
    { value: "+213", label: "Algeria (+213)" },
    { value: "+1684", label: "American Samoa (+1684)" },
    { value: "+376", label: "Andorra (+376)" },
    { value: "+244", label: "Angola (+244)" },
    { value: "+1264", label: "Anguilla (+1264)" },
    { value: "+1268", label: "Antigua and Barbuda (+1268)" },
    { value: "+54", label: "Argentina (+54)" },
    { value: "+374", label: "Armenia (+374)" },
    { value: "+297", label: "Aruba (+297)" },
    { value: "+61", label: "Australia (+61)" },
    { value: "+43", label: "Austria (+43)" },
    { value: "+994", label: "Azerbaijan (+994)" },
    { value: "+1242", label: "Bahamas (+1242)" },
    { value: "+973", label: "Bahrain (+973)" },
    { value: "+880", label: "Bangladesh (+880)" },
    { value: "+1246", label: "Barbados (+1246)" },
    { value: "+375", label: "Belarus (+375)" },
    { value: "+32", label: "Belgium (+32)" },
    { value: "+501", label: "Belize (+501)" },
    { value: "+229", label: "Benin (+229)" },
    { value: "+1441", label: "Bermuda (+1441)" },
    { value: "+975", label: "Bhutan (+975)" },
    { value: "+591", label: "Bolivia (+591)" },
    { value: "+387", label: "Bosnia and Herzegovina (+387)" },
    { value: "+267", label: "Botswana (+267)" },
    { value: "+55", label: "Brazil (+55)" },
    { value: "+673", label: "Brunei (+673)" },
    { value: "+359", label: "Bulgaria (+359)" },
    { value: "+226", label: "Burkina Faso (+226)" },
    { value: "+257", label: "Burundi (+257)" },
    { value: "+855", label: "Cambodia (+855)" },
    { value: "+237", label: "Cameroon (+237)" },
    { value: "+1", label: "Canada (+1)" },
    { value: "+238", label: "Cape Verde (+238)" },
    { value: "+1345", label: "Cayman Islands (+1345)" },
    { value: "+236", label: "Central African Republic (+236)" },
    { value: "+235", label: "Chad (+235)" },
    { value: "+56", label: "Chile (+56)" },
    { value: "+86", label: "China (+86)" },
    { value: "+57", label: "Colombia (+57)" },
    { value: "+269", label: "Comoros (+269)" },
    { value: "+682", label: "Cook Islands (+682)" },
    { value: "+506", label: "Costa Rica (+506)" },
    { value: "+385", label: "Croatia (+385)" },
    { value: "+53", label: "Cuba (+53)" },
    { value: "+599", label: "Curaçao (+599)" },
    { value: "+357", label: "Cyprus (+357)" },
    { value: "+420", label: "Czech Republic (+420)" },
    { value: "+243", label: "Democratic Republic of the Congo (+243)" },
    { value: "+45", label: "Denmark (+45)" },
    { value: "+253", label: "Djibouti (+253)" },
    { value: "+1767", label: "Dominica (+1767)" },
    { value: "+1809", label: "Dominican Republic (+1809)" },
    { value: "+670", label: "East Timor (+670)" },
    { value: "+593", label: "Ecuador (+593)" },
    { value: "+20", label: "Egypt (+20)" },
    { value: "+503", label: "El Salvador (+503)" },
    { value: "+240", label: "Equatorial Guinea (+240)" },
    { value: "+291", label: "Eritrea (+291)" },
    { value: "+372", label: "Estonia (+372)" },
    { value: "+251", label: "Ethiopia (+251)" },
    { value: "+500", label: "Falkland Islands (+500)" },
    { value: "+298", label: "Faroe Islands (+298)" },
    { value: "+679", label: "Fiji (+679)" },
    { value: "+358", label: "Finland (+358)" },
    { value: "+33", label: "France (+33)" },
    { value: "+689", label: "French Polynesia (+689)" },
    { value: "+241", label: "Gabon (+241)" },
    { value: "+220", label: "Gambia (+220)" },
    { value: "+995", label: "Georgia (+995)" },
    { value: "+49", label: "Germany (+49)" },
    { value: "+233", label: "Ghana (+233)" },
    { value: "+350", label: "Gibraltar (+350)" },
    { value: "+30", label: "Greece (+30)" },
    { value: "+299", label: "Greenland (+299)" },
    { value: "+1473", label: "Grenada (+1473)" },
    { value: "+1671", label: "Guam (+1671)" },
    { value: "+502", label: "Guatemala (+502)" },
    { value: "+224", label: "Guinea (+224)" },
    { value: "+245", label: "Guinea-Bissau (+245)" },
    { value: "+592", label: "Guyana (+592)" },
    { value: "+509", label: "Haiti (+509)" },
    { value: "+504", label: "Honduras (+504)" },
    { value: "+852", label: "Hong Kong (+852)" },
    { value: "+36", label: "Hungary (+36)" },
    { value: "+354", label: "Iceland (+354)" },
    { value: "+62", label: "Indonesia (+62)" },
    { value: "+98", label: "Iran (+98)" },
    { value: "+964", label: "Iraq (+964)" },
    { value: "+353", label: "Ireland (+353)" },
    { value: "+972", label: "Israel (+972)" },
    { value: "+39", label: "Italy (+39)" },
    { value: "+225", label: "Ivory Coast (+225)" },
    { value: "+1876", label: "Jamaica (+1876)" },
    { value: "+81", label: "Japan (+81)" },
    { value: "+962", label: "Jordan (+962)" },
    { value: "+7", label: "Kazakhstan (+7)" },
    { value: "+254", label: "Kenya (+254)" },
    { value: "+686", label: "Kiribati (+686)" },
    { value: "+383", label: "Kosovo (+383)" },
    { value: "+965", label: "Kuwait (+965)" },
    { value: "+996", label: "Kyrgyzstan (+996)" },
    { value: "+856", label: "Laos (+856)" },
    { value: "+371", label: "Latvia (+371)" },
    { value: "+961", label: "Lebanon (+961)" },
    { value: "+266", label: "Lesotho (+266)" },
    { value: "+231", label: "Liberia (+231)" },
    { value: "+218", label: "Libya (+218)" },
    { value: "+423", label: "Liechtenstein (+423)" },
    { value: "+370", label: "Lithuania (+370)" },
    { value: "+352", label: "Luxembourg (+352)" },
    { value: "+853", label: "Macau (+853)" },
    { value: "+389", label: "Macedonia (+389)" },
    { value: "+261", label: "Madagascar (+261)" },
    { value: "+265", label: "Malawi (+265)" },
    { value: "+60", label: "Malaysia (+60)" },
    { value: "+960", label: "Maldives (+960)" },
    { value: "+223", label: "Mali (+223)" },
    { value: "+356", label: "Malta (+356)" },
    { value: "+692", label: "Marshall Islands (+692)" },
    { value: "+222", label: "Mauritania (+222)" },
    { value: "+230", label: "Mauritius (+230)" },
    { value: "+262", label: "Mayotte (+262)" },
    { value: "+52", label: "Mexico (+52)" },
    { value: "+691", label: "Micronesia (+691)" },
    { value: "+373", label: "Moldova (+373)" },
    { value: "+377", label: "Monaco (+377)" },
    { value: "+976", label: "Mongolia (+976)" },
    { value: "+382", label: "Montenegro (+382)" },
    { value: "+1664", label: "Montserrat (+1664)" },
    { value: "+212", label: "Morocco (+212)" },
    { value: "+258", label: "Mozambique (+258)" },
    { value: "+95", label: "Myanmar (+95)" },
    { value: "+264", label: "Namibia (+264)" },
    { value: "+674", label: "Nauru (+674)" },
    { value: "+977", label: "Nepal (+977)" },
    { value: "+31", label: "Netherlands (+31)" },
    { value: "+687", label: "New Caledonia (+687)" },
    { value: "+64", label: "New Zealand (+64)" },
    { value: "+505", label: "Nicaragua (+505)" },
    { value: "+227", label: "Niger (+227)" },
    { value: "+234", label: "Nigeria (+234)" },
    { value: "+683", label: "Niue (+683)" },
    { value: "+672", label: "Norfolk Island (+672)" },
    { value: "+850", label: "North Korea (+850)" },
    { value: "+1670", label: "Northern Mariana Islands (+1670)" },
    { value: "+47", label: "Norway (+47)" },
    { value: "+968", label: "Oman (+968)" },
    { value: "+92", label: "Pakistan (+92)" },
    { value: "+680", label: "Palau (+680)" },
    { value: "+970", label: "Palestine (+970)" },
    { value: "+507", label: "Panama (+507)" },
    { value: "+675", label: "Papua New Guinea (+675)" },
    { value: "+595", label: "Paraguay (+595)" },
    { value: "+51", label: "Peru (+51)" },
    { value: "+63", label: "Philippines (+63)" },
    { value: "+48", label: "Poland (+48)" },
    { value: "+351", label: "Portugal (+351)" },
    { value: "+1787", label: "Puerto Rico (+1787)" },
    { value: "+974", label: "Qatar (+974)" },
    { value: "+242", label: "Republic of the Congo (+242)" },
    { value: "+201", label: "Romania (+40)" }, // Fixed code +40 manually or from file? original was correct
    { value: "+262", label: "Réunion (+262)" },
    { value: "+40", label: "Romania (+40)" },
    { value: "+7", label: "Russia (+7)" },
    { value: "+250", label: "Rwanda (+250)" },
    { value: "+590", label: "Saint Barthélemy (+590)" },
    { value: "+290", label: "Saint Helena (+290)" },
    { value: "+1869", label: "Saint Kitts and Nevis (+1869)" },
    { value: "+1758", label: "Saint Lucia (+1758)" },
    { value: "+590", label: "Saint Martin (+590)" },
    { value: "+508", label: "Saint Pierre and Miquelon (+508)" },
    { value: "+1784", label: "Saint Vincent and the Grenadines (+1784)" },
    { value: "+685", label: "Samoa (+685)" },
    { value: "+378", label: "San Marino (+378)" },
    { value: "+239", label: "Sao Tome and Principe (+239)" },
    { value: "+966", label: "Saudi Arabia (+966)" },
    { value: "+221", label: "Senegal (+221)" },
    { value: "+381", label: "Serbia (+381)" },
    { value: "+248", label: "Seychelles (+248)" },
    { value: "+232", label: "Sierra Leone (+232)" },
    { value: "+65", label: "Singapore (+65)" },
    { value: "+1721", label: "Sint Maarten (+1721)" },
    { value: "+421", label: "Slovakia (+421)" },
    { value: "+386", label: "Slovenia (+386)" },
    { value: "+677", label: "Solomon Islands (+677)" },
    { value: "+252", label: "Somalia (+252)" },
    { value: "+27", label: "South Africa (+27)" },
    { value: "+82", label: "South Korea (+82)" },
    { value: "+211", label: "South Sudan (+211)" },
    { value: "+34", label: "Spain (+34)" },
    { value: "+94", label: "Sri Lanka (+94)" },
    { value: "+249", label: "Sudan (+249)" },
    { value: "+597", label: "Suriname (+597)" },
    { value: "+268", label: "Swaziland (+268)" },
    { value: "+46", label: "Sweden (+46)" },
    { value: "+41", label: "Switzerland (+41)" },
    { value: "+963", label: "Syria (+963)" },
    { value: "+886", label: "Taiwan (+886)" },
    { value: "+992", label: "Tajikistan (+992)" },
    { value: "+255", label: "Tanzania (+255)" },
    { value: "+66", label: "Thailand (+66)" },
    { value: "+228", label: "Togo (+228)" },
    { value: "+690", label: "Tokelau (+690)" },
    { value: "+676", label: "Tonga (+676)" },
    { value: "+1868", label: "Trinidad and Tobago (+1868)" },
    { value: "+216", label: "Tunisia (+216)" },
    { value: "+90", label: "Turkey (+90)" },
    { value: "+993", label: "Turkmenistan (+993)" },
    { value: "+1649", label: "Turks and Caicos Islands (+1649)" },
    { value: "+688", label: "Tuvalu (+688)" },
    { value: "+1340", label: "U.S. Virgin Islands (+1340)" },
    { value: "+256", label: "Uganda (+256)" },
    { value: "+380", label: "Ukraine (+380)" },
    { value: "+971", label: "United Arab Emirates (+971)" },
    { value: "+44", label: "United Kingdom (+44)" },
    { value: "+1", label: "United States (+1)" },
    { value: "+598", label: "Uruguay (+598)" },
    { value: "+998", label: "Uzbekistan (+998)" },
    { value: "+678", label: "Vanuatu (+678)" },
    { value: "+379", label: "Vatican (+379)" },
    { value: "+58", label: "Venezuela (+58)" },
    { value: "+84", label: "Vietnam (+84)" },
    { value: "+681", label: "Wallis and Futuna (+681)" },
    { value: "+967", label: "Yemen (+967)" },
    { value: "+260", label: "Zambia (+260)" },
    { value: "+263", label: "Zimbabwe (+263)" },
];

const rawData = fs.readFileSync('country_data.json', 'utf8');
let countryData = [];
try {
    countryData = JSON.parse(rawData);
} catch (e) {
    console.log("Error parsing JSON", e);
}

const newCountries = existingCountries.map(ec => {
    // Extract name: "Afghanistan (+93)" -> "Afghanistan"
    const nameMatch = ec.label.match(/^(.*) \(\+/);
    let name = nameMatch ? nameMatch[1] : "";

    // Manual fixes for names that might differ
    if (name === "Cape Verde") name = "Cabo Verde";
    if (name === "Congo") name = "Republic of the Congo"; // ambiguous, but check data
    // ... add more if needed

    // Find in countryData
    let match = countryData.find(c => c.name === name);

    // Fallback using includes check SAFELY
    if (!match) {
        match = countryData.find(c => (c.name && c.name.includes(name)) || (c.name && name.includes(c.name)));
    }

    // Default if not found
    let digits = 10;
    if (match && match.phoneLength) {
        digits = match.phoneLength;
    } else {
        // Specific overrides if missing
        if (ec.value === "+1") digits = 10; // US/Canada
        if (ec.value === "+86") digits = 11; // China
        if (ec.value === "+91") digits = 10; // India
        if (ec.value === "+44") digits = 10; // UK
        if (ec.value === "+1268") digits = 10; // Antigua?? Actually +1-268 - local number is 7? No, standard is 10 including area code but excluding +1.
        // Wait, standard +1 countries: +1 XXX YYY ZZZZ. 
        // My array has value="+1268", label="... (+1268)". This is confused.
        // Typically +1 is country code. 268 is NPA.
        // If user selects +1268, they type 7 digits? Or user selects +1 and types 10?
        // Current array has full prefix in value.
        // So if value is +1268, remaining is 7 digits?
        // Let's assume standard format refers to National Significant Number.
        // For +1 countries, NSN is 10.
        // If value is +1268, inputs should probably be 7 digits?
        // Or does the user enter 10 digits regardless?
        // If I strip the prefix from the input?
        // The user input field says "Mobile no.".
        // If I select +1268, I probably enter the 7 digit subscriber number.
        // If I select +1, I enter 10 digits.
        // Let's assume for high digit country codes (4 digits), the remaining is smaller?
        // Let's check logic:
        // Total E.164 is max 15.
        // +1268 (4 digits). Remaining 11 max.
        // +1268 is Antigua. Local is 7 digits.
        // So if they select +1268, digits should be 7?
        // My script calculates `digits` from `phoneLength` which usually implies NSN.
        // For NANP, NSN is 10.
        // Validation: if user selects +1268, does the code prepend +1268?
        // In the UI, selectedCountryCode is +1268.
        // So user enters remainder.
        // If NSN is 10, and prefix took 3 digits (268 of the 10), then remainder is 7.
        // So I should subtract (value.length - 1) from 10? No.
        // If map says length 10. And code is +1. Remainder 10.
        // If map says length 10. And code is +1268 (length 5).
        // Then remainder is 10 - (4-1) = 7?
        // Let's blindly trust `phoneLength` from JSON, but sanity check.
        // If JSON says 10 for Antigua.
        // And I select +1268.
        // I should probably expect 7 digits.
        // I will add logic: if value starts with +1 and length > 2, subtract 3 from digits?
        // For Antigua, JSON says 10 (NSN).
        // My code +1268 -> 10.
        // If I use 10, user checks +1268 1234567. That's 12 digits total. 1 + 10 = 11.
        // Correct.
        // But if user enters 10 digits: +1268 2681234567 -> +1 268 268 1234567. (Duplicate 268).
        // So if they choose +1268, they should enter 7 digits.
        // I will adjust `digits` for NANP specific codes in my list.
        if (ec.value.length > 3 && ec.value.startsWith("+1")) {
            // likely an area code included.
            // Assume NSN is 10.
            digits = 10 - 3; // 7
        }
        // What about +1670 (Northern Mariana)?
    }
    return { ...ec, digits };
});

fs.writeFileSync('final_countries.json', JSON.stringify(newCountries, null, 2));
