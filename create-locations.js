const fs = require('fs');
const path = require('path');

const locations = [
  'Barnsley', 'Basingstoke', 'Birmingham', 'Birmingham - Erdington', 'Birmingham-Central', 
  'Birmingham-Central-Icknield Port', 'Blackburn', 'Bournemouth', 'Bradford', 'Brighton', 
  'Bristol', 'Bristol-North', 'Burnley', 'Bushey', 'Cambridge', 'Cardiff', 'Chatham', 
  'Chelmsford', 'Cheltenham', 'Chester', 'Colchester', 'Coventry', 'Crawley', 'Derby', 
  'Durham', 'Edinburgh', 'Exeter', 'Exmouth', 'Glasgow', 'Gloucester', 'Guildford', 
  'Hemel Hempstead', 'Hull', 'Ipswich', 'Leeds', 'Leicester', 'Leicester-City Centre', 
  'Liverpool', 'London Ilford-Central', 'London-Acton', 'London-Aldgate', 'London-Barnet', 
  'London-Beckenham', 'London-Bermondsey', 'London-Blackheath', 'London-Bromley', 
  'London-Central', 'London-Clapham', 'London-Croydon', 'London-Ealing', 'London-East Ham', 
  'London-Enfield', 'London-ExCeL', 'London-Finsbury Park', 'London-Hanwell', 'London-Harrow', 
  'London-Hayes-and-Southall', 'London-Holborn', 'London-Ilford', 'London-Kingston Upon Thames', 
  'London-Lewisham', 'London-Mile-End', 'London-Park Royal', 'London-Putney', 'London-Ruislip', 
  'London-Russell Square', 'London-Tottenham Court Rd', 'London-Wembley', 'London-Westminster', 
  'London-Willesden Green', 'London-Wimbledon', 'London-Wood Green', 'London-Woolwich', 
  'Ludgershall', 'Luton', 'Manchester', 'Manchester-Central', 'Middlesbrough', 'Milton Keynes', 
  'Newcastle Upon Tyne', 'Newport', 'Northampton', 'Norwich', 'Nottingham', 'Nottingham-City Centre', 
  'Nottingham-Sherwood', 'Oban', 'Oldham', 'Peterborough', 'Plymouth', 'Portsmouth', 'Preston', 
  'Reading', 'Reading-City Centre', 'Rochdale', 'Salisbury', 'Sheffield', 'Slough', 'Slough-Windsor', 
  'Southampton', 'Stoke-on-Trent', 'Sunderland', 'Swansea', 'Swindon', 'Telford', 'Walsall', 
  'Watford', 'Wiltshire'
];

// Read the Barnsley template
const template = fs.readFileSync('src/pages/areas/barnsley.tsx', 'utf8');

locations.forEach(location => {
  const slug = location.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const pageContent = template
    .replace(/BarnsleyPage/g, `${location.replace(/[^a-zA-Z]/g, '')}Page`)
    .replace(/Barnsley Training Centre/g, `${location} Training Centre`)
    .replace(/Professional SIA security training and certification services in Barnsley./g, `Professional SIA security training and certification services in ${location}.`)
    .replace(/Barnsley Training Centre/g, `${location} Training Centre`)
    .replace(/Professional training facility in Barnsley/g, `Professional training facility in ${location}`)
    .replace(/Find Us in Barnsley/g, `Find Us in ${location}`)
    .replace(/Our Barnsley training centre is conveniently located for easy access from across South Yorkshire./g, `Our ${location} training centre is conveniently located for easy access from across the region.`)
    .replace(/Professional SIA training courses delivered by certified instructors in Barnsley./g, `Professional SIA training courses delivered by certified instructors in ${location}.`)
    .replace(/Barnsley Training Centre/g, `${location} Training Centre`)
    .replace(/Barnsley/g, location);

  const filePath = `src/pages/areas/${slug}.tsx`;
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, pageContent);
    console.log(`Created: ${filePath}`);
  } else {
    console.log(`Skipped: ${filePath} (already exists)`);
  }
});

console.log('Location pages generation complete!'); 