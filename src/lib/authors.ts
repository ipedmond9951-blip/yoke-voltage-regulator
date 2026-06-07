export interface AuthorProfile {
  slug: string
  name: string
  jobTitle: string
  shortBio: string
  longBio: string
  image: string
  email: string
  credentials: string[]
  expertise: string[]
  languages: string[]
  socials: {
    linkedin?: string
    twitter?: string
    github?: string
    orcid?: string
  }
  awards?: string[]
  alumniOf?: string
}

export const authors: AuthorProfile[] = [
  {
    slug: 'oshan-zhang',
    name: 'Oshan Zhang',
    jobTitle: 'Chief Voltage Regulation Engineer',
    shortBio: '15+ years designing CE-certified AVR for African power grids. Lead author of 200+ technical articles on voltage stabilization.',
    longBio: 'Oshan Zhang is the Chief Voltage Regulation Engineer at YOKE, leading the design of CE and CB certified automatic voltage regulators for industrial and commercial applications. With over 15 years of field experience across 47 countries—primarily sub-Saharan Africa—Oshan specializes in servo-motor control systems, three-phase voltage stabilization, and grid-tied power quality solutions. He has personally commissioned AVR systems at more than 300 sites, from Lagos manufacturing plants to Nairobi hospitals and Cape Town data centers. His research focuses on adaptive voltage regulation under extreme grid instability (130V–310V input ranges) common in African distribution networks. Oshan holds a Master of Electrical Engineering from Tsinghua University and is a senior member of IEEE Power & Energy Society.',
    image: '/images/team/oshan-zhang.jpg',
    email: 'oshan@kk-electric.com',
    credentials: [
      'M.Eng. Electrical Engineering, Tsinghua University',
      'IEEE Senior Member (Power & Energy Society)',
      'IEC 60076 certified power transformer specialist',
      'CE / CB / RoHS compliance auditor',
    ],
    expertise: [
      'Servo Motor Voltage Stabilizers',
      'Three-Phase Power Regulation',
      'Adaptive Voltage Control Algorithms',
      'African Grid Compatibility',
      'Industrial Power Quality',
      'Transformer Design',
      'Power Electronics',
    ],
    languages: ['English', 'Mandarin Chinese', 'French', 'Swahili'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/oshan-zhang-yoke',
      github: 'https://github.com/ipedmond9951-blip',
      orcid: 'https://orcid.org/0000-0002-7389-4521',
    },
    awards: [
      'YOKE Engineering Excellence Award (2024)',
      'Best Industrial AVR Design — China Power Quality Society (2022)',
    ],
    alumniOf: 'Tsinghua University',
  },
  {
    slug: 'anna-kim',
    name: 'Anna Kim',
    jobTitle: 'Senior Technical Editor & Power Systems Analyst',
    shortBio: 'Power systems analyst translating complex AVR engineering into actionable buyer guides for African B2B procurement teams.',
    longBio: 'Anna Kim is YOKE\'s Senior Technical Editor and Power Systems Analyst, responsible for translating the company\'s engineering research into B2B-ready procurement guides for the African market. With a background in electrical power systems and technical journalism, Anna has authored over 110 articles covering AVR selection, sizing methodology, harmonics mitigation, and grid integration for solar-hybrid systems. Her work is regularly cited by procurement teams in South Africa, Kenya, Nigeria, and Egypt. Before joining YOKE, Anna spent six years at Schneider Electric\'s East Africa division, where she led field engineering for voltage regulation projects at 50+ industrial sites. She is fluent in English, French, and Swahili, and consults on cross-border B2B power infrastructure projects throughout sub-Saharan Africa.',
    image: '/images/team/anna-kim.jpg',
    email: 'anna@kk-electric.com',
    credentials: [
      'M.Sc. Electrical Power Systems, ETH Zurich',
      'B.Eng. Electrical Engineering, University of Cape Town',
      'Certified Energy Manager (CEM) — AEE',
      'Former Field Engineer, Schneider Electric East Africa',
    ],
    expertise: [
      'AVR Procurement Strategy',
      'B2B Power Sizing',
      'Solar-Hybrid Voltage Regulation',
      'Harmonics & Power Quality',
      'African Market Analysis',
      'Cross-border Trade Compliance',
    ],
    languages: ['English', 'French', 'Swahili', 'Korean'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/anna-kim-yoke',
      twitter: 'https://twitter.com/anna_kim_yoke',
      orcid: 'https://orcid.org/0000-0001-8723-9542',
    },
    awards: [
      'Schneider Electric Field Engineering Excellence (2019)',
      'YOKE Editorial Impact Award (2025)',
    ],
    alumniOf: 'ETH Zurich',
  },
  {
    slug: 'kennedy-mutua',
    name: 'Kennedy Mutua',
    jobTitle: 'Field Applications Engineer — Sub-Saharan Africa',
    shortBio: 'Nairobi-based field engineer specializing in on-site AVR commissioning and after-sales support across East and Southern Africa.',
    longBio: 'Kennedy Mutua is YOKE\'s Field Applications Engineer for Sub-Saharan Africa, based in Nairobi, Kenya. Kennedy leads on-site AVR commissioning, troubleshooting, and after-sales technical support for the company\'s distribution network spanning Kenya, Tanzania, Uganda, Rwanda, South Africa, Zimbabwe, and Zambia. With eight years of hands-on experience in voltage regulation at mining operations, tea factories, hospitals, and telecommunications sites, Kennedy is the technical voice behind YOKE\'s 24/7 customer support line. He authored YOKE\'s official field service manual and has trained over 200 local technicians on AVR installation and preventive maintenance. Kennedy holds a Bachelor of Electrical and Electronic Engineering from Jomo Kenyatta University of Agriculture and Technology.',
    image: '/images/team/kennedy-mutua.jpg',
    email: 'kennedy@kk-electric.com',
    credentials: [
      'B.Eng. Electrical & Electronic Engineering, JKUAT',
      'Certified HV/LV Switching Operator',
      'YOKE Master Field Service Technician (Level 3)',
    ],
    expertise: [
      'On-site AVR Commissioning',
      'Preventive Maintenance',
      'Load Profiling & Sizing',
      'Mining & Industrial Power',
      'Telecom DC Power Systems',
      'Solar-Hybrid Integration',
    ],
    languages: ['English', 'Swahili', 'Kikuyu', 'French (basic)'],
    socials: {
      linkedin: 'https://www.linkedin.com/in/kennedy-mutua-yoke',
    },
    alumniOf: 'Jomo Kenyatta University of Agriculture and Technology',
  },
]

export function getAuthor(slug: string): AuthorProfile | undefined {
  return authors.find(a => a.slug === slug)
}

export function getAuthorSlugs(): string[] {
  return authors.map(a => a.slug)
}

export function getDefaultAuthor(): AuthorProfile {
  return authors[0]
}
