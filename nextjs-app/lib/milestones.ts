/**
 * Milestones shown on the About page timeline, oldest first. Each item sits
 * under the year heading in `group`. Contract values, fees and named client
 * contacts from the project profiles are deliberately left out.
 */
export type Milestone = {
  group: string;
  period: string;
  title: string;
  /** Client or partner, shown as "with ..." */
  client?: string;
  body: string;
  places?: string[];
};

export const MILESTONES: Milestone[] = [
  {
    group: '2023',
    period: '2023',
    title: 'Founded',
    body: 'EED Research Institute is established with a mandate to advance evidence-based research across WASH, energy, climate, and agriculture.',
  },
  {
    group: '2024',
    period: '2024',
    title: 'First facility grants',
    body: 'First Kawisafi Technical Assistance Facility grants disbursed; 150+ ongoing research initiatives launched across the region.',
  },
  {
    group: '2025',
    period: 'Jan – Mar 2025',
    title: 'Measuring Progress Toward SDG 7.1.1 — Phase 2',
    client: 'University of Oxford and Climate Compatible Growth (CCG)',
    body: 'A feasibility study testing a new data collection tool with energy-sector stakeholders, to measure electricity access more accurately.',
    places: ['Kenya', 'DRC', 'Senegal', 'Sierra Leone'],
  },
  {
    group: '2025',
    period: 'Sep 2025 – Mar 2026',
    title: 'Robust and Integrated Planning of Energy Systems (RIPpLES)',
    client: 'Loughborough University',
    body: 'Supporting Kenya’s county and national energy planning with robust decision-making pathways, county data guidelines and a prototype data platform.',
    places: ['Kenya'],
  },
  {
    group: '2025',
    period: 'Sep 2025 – Feb 2026',
    title: 'Measuring Progress Toward SDG 7.1.1 — Phase 3',
    client: 'University of Oxford and Climate Compatible Growth (CCG)',
    body: 'Extending the study to 25 more countries through online surveys and follow-up interviews with those who define and report energy access.',
    places: ['25 sub-Saharan African countries'],
  },
  {
    group: '2025',
    period: 'Oct 2025 – Apr 2026',
    title: 'Tri-50 Roadmap: Pathways to an Ultra-high Energy Future',
    client: 'Energy Corps',
    body: 'Case studies on how economies move from low-energy, low-income to high-energy, high-income, and a replicable model drawn from them.',
    places: ['Ethiopia', 'Bangladesh', 'Vietnam', 'Ghana'],
  },
  {
    group: '2025',
    period: 'Nov 2025 – Apr 2026',
    title: 'In Pursuit of Green Growth',
    client: 'Africa Policy Research Institute (APRI)',
    body: 'Examining how Kenya can manage green technology transfer and grow its own green technology innovation, through policy papers and roundtables.',
    places: ['Kenya'],
  },
  {
    group: '2026',
    period: 'Jul 2026 – Mar 2027',
    title: 'Supporting Kenya’s Integrated National Energy Plan (RIPpLES 2)',
    client: 'Loughborough University',
    body: 'Assessing analytical needs, expanding the county energy data platform and developing handover guidelines for the national 20-year plan.',
    places: ['Kenya'],
  },
  {
    group: '2026',
    period: 'Aug 2026 – Aug 2028',
    title: 'The Hidden Health Costs of Climate Change',
    client: 'Amref Health Africa, with Kabarak University and Community Energy Malawi',
    body: 'A 24-month study quantifying the health and economic costs of climate change, to guide equitable health system adaptation.',
    places: ['Kenya', 'Malawi'],
  },
  {
    group: 'Today',
    period: '2025 — Today',
    title: 'Active in 47 countries',
    body: 'Four key thematic pillars anchor our work, supported by a growing multidisciplinary team.',
  },
];
