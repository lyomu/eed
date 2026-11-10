export type PillarStat = { value: string; label: string };
export type PillarFocusArea = { title: string; body: string; meta: string };
export type PillarApproachCard = { title: string; body: string };

export type PillarSlug = 'wash' | 'energy' | 'climate' | 'agriculture';

export type PillarContent = {
  slug: PillarSlug;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  breadcrumbCurrent: string;
  h1: string;
  tagline: string;
  lead: string;
  whyMattersLead: string;
  leftParagraphs: string[];
  rightParagraphs: string[];
  stats: PillarStat[];
  focusLead: string;
  focusAreas: PillarFocusArea[];
  approachLead: string;
  approachCards: PillarApproachCard[];
  ctaTitle: string;
  ctaBody: string;
};

export const PILLARS: Record<PillarSlug, PillarContent> = {
  wash: {
    slug: 'wash',
    metaTitle: 'WASH — EED Research Institute',
    metaDescription:
      'ERI research on water security, safely managed sanitation, hygiene behaviour, and the governance arrangements that determine whether WASH services last.',
    heroImage: '/assets/hero/hero-wash.jpg',
    breadcrumbCurrent: 'WASH',
    h1: 'Water, Sanitation and Hygiene',
    tagline: 'Securing Sustainable Water Futures',
    lead: 'Research on water security, sanitation services and hygiene behaviour across sub-Saharan Africa — and on the governance arrangements that decide whether those services still work years after they are built.',
    whyMattersLead:
      'Access to water and sanitation is the foundation on which health, education and economic participation rest. It remains out of reach for billions.',
    leftParagraphs: [
      'According to the 2026 UN SDG 6 Synthesis Report, over 961 million people have gained access to safely managed drinking water and 1.2 billion to safely managed sanitation over the past decade. However, 2.2 billion people still lack safely managed drinking water, and meeting 2030 targets requires an 8-fold acceleration in the current rate of progress for drinking water and a 6-fold increase for sanitation.',
      'The headline access figures also understate the problem, because access is not the same as service. A borehole that is dry for three months of the year, a piped scheme that fails eighteen months after handover, or a latrine whose contents are never safely treated all count as infrastructure delivered while leaving households without a reliable service.',
    ],
    rightParagraphs: [
      'That gap is why our WASH research concentrates as much on institutions as on infrastructure. Whether a water point still functions after the implementing programme has closed depends on tariff setting, spare-part supply chains, the clarity of the mandate held by the responsible authority, and whether the community managing it has the standing to enforce payment.',
      'Climate variability now sits underneath all of it. Sources that were dependable within living memory are becoming seasonal, and rainfall patterns that infrastructure was designed around are shifting. Water security is increasingly a question of resilience rather than coverage.',
    ],
    stats: [
      { value: '961m', label: 'Gained safely managed drinking water access (SDG 6.1)' },
      { value: '1.2bn', label: 'Gained safely managed sanitation access (SDG 6.2)' },
      { value: '8x', label: 'Acceleration needed to meet 2030 drinking water target' },
    ],
    focusLead: 'Four competencies within this thematic area.',
    focusAreas: [
      {
        title: 'Water Access, Security & Climate Resilience',
        body: 'Reliable access to safe water, and the resilience of supply systems to drought, flood and shifting rainfall patterns.',
        meta: 'Water security',
      },
      {
        title: 'WASH Policy, Governance & Institutional Reform',
        body: 'The mandates, regulation and institutional arrangements that decide whether services are delivered and then sustained.',
        meta: 'Governance',
      },
      {
        title: 'Circular Water Economy & Wastewater Management',
        body: 'Treatment, reuse and resource recovery — moving wastewater from a disposal problem to a recoverable input.',
        meta: 'Circular economy',
      },
      {
        title: 'Sanitation Markets & Inclusive Service Delivery',
        body: 'Viable sanitation service chains and business models that reach low-income and underserved households.',
        meta: 'Sanitation',
      },
    ],
    approachLead: 'Our WASH evidence is generated in the field and designed from the outset to be usable in policy processes.',
    approachCards: [
      {
        title: 'Household surveys',
        body: 'Structured data collection on service levels, expenditure, reliability and coping behaviour, sampled to support statements about a population rather than anecdotes about a site.',
      },
      {
        title: 'Water point assessments',
        body: 'Direct inspection of functionality, yield, water quality and management arrangements, which is the only way to distinguish infrastructure that exists from infrastructure that works.',
      },
      {
        title: 'Mixed-methods evaluation',
        body: 'Quantitative measurement paired with interviews and focus groups, so that a result is accompanied by an explanation of the mechanism behind it.',
      },
      {
        title: 'Policy and regulatory analysis',
        body: 'Reading strategies, standards and regulations against one another to locate the contradictions, gaps and unfunded mandates that stall implementation.',
      },
      {
        title: 'Institutional assessment',
        body: 'Mapping who holds which mandate, how they are financed and to whom they answer — usually where the explanation for a stalled programme is found.',
      },
      {
        title: 'Geospatial analysis',
        body: 'Spatial data on settlement, water resources and infrastructure, used to examine coverage, distance to service and the equity of how provision is distributed.',
      },
    ],
    ctaTitle: 'Work with us on WASH',
    ctaBody: 'We collaborate with government agencies, utilities, academic partners and funders on research that is meant to be used.',
  },

  energy: {
    slug: 'energy',
    metaTitle: 'Energy — EED Research Institute',
    metaDescription:
      'ERI research on clean cooking transitions, energy access, energy and climate finance, and the productive use of energy across Africa.',
    heroImage: '/assets/hero/hero-energy.jpg',
    breadcrumbCurrent: 'Energy',
    h1: 'Energy Access and Transitions',
    tagline: "Powering Africa's Economic Growth",
    lead: 'Research on how households and enterprises actually get energy, what it costs them, and which financing and policy arrangements move a transition from ambition to delivery.',
    whyMattersLead:
      'Energy is the input on which industrialisation, health services and modern livelihoods depend. Across much of Africa it is neither reliable nor clean.',
    leftParagraphs: [
      'Sustainable Development Goal 7 aims to ensure access to affordable, reliable and modern energy services for all by 2030. In Africa, 900 million people still lack access to clean cooking solutions and about 600 million do not have access to reliable electricity. Concurrently, the 2026 UN SDG 6 Synthesis Report highlights that global water-use efficiency across energy and economic sectors grew by 19.5% between 2015 and 2022, underscoring the deep link between water management and sustainable energy systems.',
      'Cooking is the part of the problem most often treated as a household matter rather than a development priority, and it carries the heaviest health burden. Incomplete combustion of solid biomass in traditional stoves drives indoor air pollution, which is a leading cause of premature death in several of the countries where we work.',
    ],
    rightParagraphs: [
      'The transition will not be a single leap to modern fuels. Improved biomass solutions are an interim step that large numbers of households will occupy for years, which makes a multi-fuel framing more useful than a binary one — a point our published work on Sierra Leone’s clean cooking strategy develops in detail.',
      'Capital is the other constraint. Whether a mini-grid, a cooking enterprise or a geothermal project reaches financial close depends on how risk is priced and which instruments are available, so our energy research runs from household demand through to the structure of the finance behind supply.',
    ],
    stats: [
      { value: '900m', label: 'Without clean cooking in Africa (SDG 7)' },
      { value: '600m', label: 'Without reliable electricity in Africa (SDG 7)' },
      { value: '+19.5%', label: 'Global water-use efficiency gain in economic sectors (SDG 6.4)' },
    ],
    focusLead: 'Five competencies within this thematic area.',
    focusAreas: [
      {
        title: 'Systems Modeling, Digitalization & Foresight',
        body: 'Scenario modelling and digital tools for planning generation, networks and demand under uncertainty.',
        meta: 'Modelling',
      },
      {
        title: 'Market Design, Regulation & Utility Reform',
        body: 'Tariffs, market structure, licensing and the utility reforms that determine whether the sector is financially viable.',
        meta: 'Market design',
      },
      {
        title: 'Energy Finance, Risk & Asset Management',
        body: 'How projects are appraised, financed and de-risked, and how assets are managed across their operating life.',
        meta: 'Finance',
      },
      {
        title: 'Critical Minerals Supply Chains & Circularity',
        body: 'The minerals underpinning the transition, and the circularity and value-addition opportunities along their chains.',
        meta: 'Minerals',
      },
      {
        title: 'Just Transition Governance & Socio-Economic Policy',
        body: 'The distributional consequences of transition — employment, livelihoods and the governance needed to manage them.',
        meta: 'Just transition',
      },
    ],
    approachLead: 'Our energy work combines household evidence, market assessment and financial analysis.',
    approachCards: [
      {
        title: 'Household surveys',
        body: 'Structured data collection sampled to support statements about a population rather than anecdotes about a site, covering service levels, expenditure and coping behaviour.',
      },
      {
        title: 'Mixed-methods evaluation',
        body: 'Quantitative measurement paired with interviews and focus groups, so a result arrives with an explanation of the mechanism behind it.',
      },
      {
        title: 'Policy and regulatory analysis',
        body: 'Reading strategies, standards and regulations against one another to locate the contradictions, gaps and unfunded mandates that stall implementation.',
      },
      {
        title: 'Market and sector assessment',
        body: 'State-of-the-market analysis covering supply chains, distributors, pricing and the regulatory conditions that determine whether a technology can reach scale.',
      },
      {
        title: 'Energy finance analysis',
        body: 'Appraisal of instruments, capital flows and investment structures, including methodologies for evaluating the sustainability of an investment rather than its return alone.',
      },
      {
        title: 'Technology and performance assessment',
        body: 'Technical evaluation of stoves, systems and installations against the conditions of actual use, which frequently diverge from laboratory or datasheet conditions.',
      },
    ],
    ctaTitle: 'Work with us on energy',
    ctaBody: 'We partner with governments, funders, investors and enterprises on research that informs strategy and unlocks finance.',
  },

  climate: {
    slug: 'climate',
    metaTitle: 'Climate — EED Research Institute',
    metaDescription:
      'ERI research on climate adaptation and resilience, climate finance, carbon markets and removals, and the alignment of climate policy with development goals.',
    heroImage: '/assets/hero/hero-climate.jpg',
    breadcrumbCurrent: 'Climate',
    h1: 'Climate Change and Adaptation',
    tagline: "Advancing Africa's Climate Response",
    lead: 'Research on what a changing climate is already doing to livelihoods, which adaptation measures hold up under scrutiny, and how climate finance and policy can be made to reach the people carrying the most risk.',
    whyMattersLead:
      'Climate change is not a future scenario for the communities we work with. It is a present change in the conditions their livelihoods were built around.',
    leftParagraphs: [
      'The 2026 UN SDG 6 Synthesis Report confirms that climate variability is driving worsening water stress worldwide, with global water stress averaging 18% and acute stress hotspots across Northern Africa and Western Asia. In addition, around 50% of reporting countries suffer from freshwater ecosystem degradation, while negative river flow trends have increased across all regions.',
      'Those numbers mean little to nothing among pastoralists, fisherfolk and small-scale farmer groups who are already experiencing rapid societal and livelihood changes driven by climate variability alongside other confounding factors. The lived signal arrives as a failed season, a moved grazing route or a source that no longer holds through the dry months.',
    ],
    rightParagraphs: [
      'This is why our climate research is grounded in specific systems — water, energy, food — rather than treated as a separate sector. Adaptation is rarely a climate project; it is a water supply that tolerates variability, a crop calendar that matches shifted rainfall, or an energy system that keeps working through a flood.',
      'Finance is the persistent bottleneck. Adaptation is chronically underfunded relative to mitigation, and locally led adaptation more so again. Understanding how climate finance is structured, appraised and disbursed is inseparable from understanding whether adaptation actually happens.',
    ],
    stats: [
      { value: '18%', label: 'Global average water stress level driven by climate (SDG 6.4)' },
      { value: '50%', label: 'Countries with degraded freshwater ecosystems (SDG 6.6)' },
      { value: '59%', label: 'Transboundary basin areas with operational water cooperation (SDG 6.5)' },
    ],
    focusLead: 'Three competencies within this thematic area.',
    focusAreas: [
      {
        title: 'Climate Adaptation, Resilience & Risk Management',
        body: 'Exposure and vulnerability assessment, and adaptation measures that hold up against real operating constraints.',
        meta: 'Adaptation',
      },
      {
        title: 'Mitigation, Decarbonization & Net-Zero Pathways',
        body: 'Emissions pathways and the sectoral measures that make decarbonisation commitments achievable rather than aspirational.',
        meta: 'Mitigation',
      },
      {
        title: 'Climate Finance, Carbon Markets & Results-Based Payments',
        body: 'Where climate capital originates, how carbon markets are governed, and how results-based instruments perform in practice.',
        meta: 'Finance',
      },
    ],
    approachLead: 'Our climate research pairs empirical field evidence with policy and financial analysis.',
    approachCards: [
      {
        title: 'Household surveys',
        body: 'Structured data collection sampled to support statements about a population rather than anecdotes about a site, covering service levels, expenditure and coping behaviour.',
      },
      {
        title: 'Mixed-methods evaluation',
        body: 'Quantitative measurement paired with interviews and focus groups, so a result arrives with an explanation of the mechanism behind it.',
      },
      {
        title: 'Policy and regulatory analysis',
        body: 'Reading strategies, standards and regulations against one another to locate the contradictions, gaps and unfunded mandates that stall implementation.',
      },
      {
        title: 'Climate risk and vulnerability analysis',
        body: 'Assessment of exposure and sensitivity for specific livelihoods and systems, kept at a resolution that can inform an actual planning decision.',
      },
      {
        title: 'Climate finance tracking',
        body: 'Tracing flows and instruments to establish what has been committed, what has been disbursed and what reached local level — three quantities that routinely differ.',
      },
      {
        title: 'Geospatial and scenario analysis',
        body: 'Spatial and scenario methods used to examine how projected change intersects with settlement, water availability and land use.',
      },
    ],
    ctaTitle: 'Work with us on climate',
    ctaBody: 'We collaborate with governments, research institutions and funders on adaptation, climate finance and policy alignment.',
  },

  agriculture: {
    slug: 'agriculture',
    metaTitle: 'Agriculture — EED Research Institute',
    metaDescription:
      'ERI research on smallholder productivity under climate risk, irrigation and water for agriculture, land use, and food systems and value chains.',
    heroImage: '/assets/hero/hero-agriculture.jpg',
    breadcrumbCurrent: 'Agriculture',
    h1: 'Agriculture and Food Systems',
    tagline: 'Building Resilient Agricultural Systems',
    lead: 'Research on the livelihoods of smallholder farmers under rising climate pressure, and on the water, land and market systems that determine whether their production is viable.',
    whyMattersLead:
      'Agriculture is how most households in sub-Saharan Africa live. It is also the sector most directly exposed to climate variability.',
    leftParagraphs: [
      'Agriculture is the main source of livelihood for most households in sub-Saharan Africa, employing more than 60% of the total population and contributing about 23% of the region’s total Gross Domestic Product. It is not a peripheral sector; it is the economic base.',
      'It is also almost entirely rainfed. Only 6% of farmland in the region has access to irrigation, tying agricultural output to shifting rainfall patterns. According to the 2026 UN SDG 6 Synthesis Report, global water-use efficiency increased by 19.5% between 2015 and 2022, while 56% of monitored water bodies maintain good ambient water quality — critical benchmarks for sustaining agricultural productivity and food security.',
    ],
    rightParagraphs: [
      'That combination — high economic dependence, minimal irrigation and rising variability — is why we treat agriculture as a water and climate question as much as an agronomic one. The productive constraint is frequently not the seed or the practice but the reliability of water and the absence of any mechanism to absorb a bad season.',
      'Markets complete the picture. Yield gains that cannot be stored, moved or sold do not translate into income, so our agricultural research follows the chain from field conditions through post-harvest handling to the terms on which smallholders reach a buyer.',
    ],
    stats: [
      { value: '6%', label: 'Of SSA farmland with access to irrigation' },
      { value: '+19.5%', label: 'Global water-use efficiency gain (SDG 6.4)' },
      { value: '56%', label: 'Monitored water bodies with good ambient quality (SDG 6.3)' },
    ],
    focusLead: 'Four competencies within this thematic area.',
    focusAreas: [
      {
        title: 'Climate-Smart Agricultural Systems & Sustainable Intensification',
        body: 'Raising productivity while managing climate risk and the condition of the soil and water base it depends on.',
        meta: 'Climate-smart',
      },
      {
        title: 'Post-Harvest Handling, Storage & Loss Reduction',
        body: 'Losses between field and market, and the handling, storage and cold-chain measures that reduce them.',
        meta: 'Post-harvest',
      },
      {
        title: 'Inclusive Market Access & Agri-Food Value Chains',
        body: 'How smallholders reach buyers, and where value accrues along agri-food chains.',
        meta: 'Markets',
      },
      {
        title: 'Food Security, Nutrition & Resilient Livelihoods',
        body: 'Availability, access and nutritional outcomes, and the livelihood resilience that underpins them.',
        meta: 'Food security',
      },
    ],
    approachLead: 'Our agricultural research is field-based and follows systems across sectoral boundaries.',
    approachCards: [
      {
        title: 'Household surveys',
        body: 'Structured data collection sampled to support statements about a population rather than anecdotes about a site, covering service levels, expenditure and coping behaviour.',
      },
      {
        title: 'Mixed-methods evaluation',
        body: 'Quantitative measurement paired with interviews and focus groups, so a result arrives with an explanation of the mechanism behind it.',
      },
      {
        title: 'Policy and regulatory analysis',
        body: 'Reading strategies, standards and regulations against one another to locate the contradictions, gaps and unfunded mandates that stall implementation.',
      },
      {
        title: 'Farm and household-level assessment',
        body: 'Production, input use, labour and income data collected at the level where agricultural decisions are actually made.',
      },
      {
        title: 'Value chain analysis',
        body: 'Tracing a commodity from field to buyer to establish where value accrues, where losses occur and which actors hold the leverage.',
      },
      {
        title: 'Geospatial and land-use analysis',
        body: 'Spatial analysis of cropping, water availability and land-use change, used to examine pressure and competition over time.',
      },
    ],
    ctaTitle: 'Work with us on agriculture',
    ctaBody: 'We work with agricultural agencies, research partners and funders on productivity, water and food-system research.',
  },
};
