import type { BlogPost, Publication } from './blog-types';

/**
 * Stand-in for Prismic. Shaped exactly like the eventual CMS response so
 * lib/cms.ts can swap these exports for real @prismicio/client calls later
 * without any caller needing to change. See customtypes/ for the schemas
 * these were modelled on, and the project README for how to connect a real
 * Prismic repo.
 */

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'fueling-change-sierra-leone-cooking-energy-crisis',
    title: "Fueling Change: Addressing Sierra Leone's Cooking Energy Crisis Through a Multi-fuel Strategy",
    category: 'Energy Policy',
    categoryFilter: 'energy',
    date: 'October 22, 2026',
    readTime: '8 min read',
    excerpt:
      "Cooking costs Sierra Leone about US$4.7 billion a year, and indoor air pollution is its leading cause of death. A new multi-fuel Clean Cooking Strategy repositions the sub-sector at the intersection of health, climate, and economic transformation.",
    featured: true,
    author: 'Abigael Okoko',
    authorRole: 'Research Fellow, EED Research Institute',
    leadImageLabel: 'Charcoal stove',
    imageUrl: '/assets/blog/clean-cooking-charcoal-stove.jpg',
    imageAlt: 'A cooking pot on a charcoal stove outdoors',
    body: [
      {
        type: 'lead',
        opener: 'In Sierra Leone,',
        text: 'the simple act of cooking costs the country about US$4.7 billion annually, with significant costs linked to the health sector (US$3.2 billion), women (US$1.4 billion from lost productivity), and climate (US$0.2 billion).{{cite:1}}',
      },
      {
        type: 'paragraph',
        text: 'Sierra Leone has one of the lowest access rates to clean cooking and electrification in Sub-Saharan Africa. For many years, most households have relied on traditional biomass to meet their cooking needs. These fuels are affordable, accessible, and culturally familiar. While the three-stone open fire (TSOF) and the metal charcoal stove are often the most affordable choice, they are also among the least efficient, contributing significantly to indoor air pollution (IAP) and the adverse health effects that follow.',
      },
      {
        type: 'paragraph',
        text: "Indeed, indoor air pollution is the leading cause of death in Sierra Leone. As of 2021, air pollution in the country led to 9,925 deaths annually, with indoor air pollution being the leading contributor, responsible for 8,679 of these deaths each year.{{cite:2}} Many of these premature deaths are associated with respiratory and cardiovascular disease, which is often accelerated by breathing in significant particulate matter produced by the incomplete combustion of solid biomass in a three-stone fire.{{cite:3}}",
      },
      {
        type: 'figure',
        markLabel: 'Figure 1 — Traditional and wire-mesh charcoal pots',
        caption: 'Figure 1: Left: Traditional coal pot. Right: Wire-mesh charcoal pot.',
      },
      {
        type: 'paragraph',
        text: 'The prevailing situation is driven by the fact that access to modern fuels is extremely low, reaching less than 1% of the population in Sierra Leone, necessitating heavy reliance on legacy cooking methods. Nationally, the three-stone open-fire stove is the most used cooking solution, adopted by 71.6% of households, followed by traditional cookstoves at 27.5%.',
      },
      {
        type: 'paragraph',
        text: "The adoption of clean cooking solutions remains extremely low, with only 0.48% of households using LPG and just 0.3% using biogas and improved biomass stoves.{{cite:4}} There are significant regional disparities in stove usage. Traditional cookstoves are more prevalent in urban areas, where 52.62% of households use them, compared to only 5.96% in rural areas. In contrast, rural households predominantly depend on the three-stone open-fire stove, with 93.81% relying on this method to meet their cooking needs.{{cite:5}}{{cite:6}}",
      },
      {
        type: 'blockquote',
        text: 'For far too long, the cooking sub-sector has been treated as a peripheral issue, a household chore rather than a core development priority.',
      },
      { type: 'paragraph', text: 'Yet the sector also represents a significant untapped opportunity for economic growth and sustainability.' },
      {
        type: 'paragraph',
        text: "Its lack of positioning as a key development priority stems from the absence of a strategic framework to guide the sub-sector, leaving in its place limited access to clean cooking solutions, persistent affordability and supply chain barriers, weak sector coordination, and fragile institutional arrangements. On the policy front, the country has faced setbacks stemming from misalignment within Sierra Leone's policy framework. Within the existing policy framework, there are notable inconsistencies and a lack of strategic alignment across sectoral instruments, resulting in fragmented implementation pathways and weak coordination toward achieving national clean cooking targets. In addition, the targets set out in the different policy frameworks and instruments are inconsistent and lack a clear implementation plan.",
      },
      {
        type: 'callout',
        title: 'Competing targets across instruments',
        paragraphs: [
          {
            term: 'Bioenergy Action Plan',
            text: 'sets an ambition of universal access to clean, safe, and affordable energy services, including increasing LPG penetration for cooking to 26%.',
          },
          {
            term: 'Cleaner Energy Compact of Sierra Leone',
            text: 'establishes a target of 25% LPG adoption, universal access to improved cookstoves, and a reduction of fuelwood consumption by 3 billion tons by 2030.',
          },
          {
            term: 'National Renewable Energy Action Plan (2015)',
            text: 'outlines a 25% adoption target for modern cooking solutions, encompassing a broad portfolio of technologies such as LPG, biogas, and solar cookers.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'While these targets are broadly aligned with intent, variations in scope, technology definitions, baselines, and implementation mechanisms indicate the absence of a harmonised results framework. This misalignment risks duplication of efforts, inefficient resource allocation, and challenges in monitoring and reporting progress toward national energy access and clean cooking objectives.',
      },
      { type: 'heading', text: 'A turning point' },
      {
        type: 'paragraph',
        text: 'Globally, energy for cooking is increasingly a fixture in boardrooms and development forums, and is gradually ceasing to be left at the mercy of households.',
      },
      {
        type: 'paragraph',
        text: 'The government of Sierra Leone has not been left behind and has taken a strategic step towards alignment of the sector through the development of the Sierra Leone Clean Cooking Strategy. The strategy is a multifuel strategy whose aim is to promote a mix of clean cooking technologies, such as LPG and electricity, improved cookstoves (ICS), and alternative renewable fuels such as biogas, briquettes, and pellets.',
      },
      {
        type: 'paragraph',
        text: 'The strategy challenges the traditional narrative by positioning the sub-sector at the intersection of health, climate change, and economic transformation. It serves as an overarching coordination framework, harmonising targets, technology pathways, and institutional mandates that until now have been dispersed. It also provides a unified vision, standardised definitions, and an integrated results framework to guide sector actors, streamline implementation, and keep progress coherent across national clean cooking and energy access objectives.',
      },
      {
        type: 'paragraph',
        text: 'The strategy sets out to dismantle the barriers in Sierra Leone’s cooking sector and accelerate the adoption of clean cooking solutions. To reach universal access by 2035, the country has set the pace with an ambitious multifuel policy framework anchored in a clear set of targets. The strategy recognises that the full adoption of modern fuels will be gradual and, as such, a leapfrog shift is not expected. In this context, the transition from traditional biomass to improved biomass solutions constitutes an important interim step towards cleaner and more sustainable energy use, even as households are expected to gradually adopt modern cooking solutions.',
      },
      {
        type: 'figure',
        markLabel: "Figure 2 — Sierra Leone's 2035 clean cooking targets",
        caption:
          "Figure 2: Clean cooking targets set out in Sierra Leone's National Clean Cooking Strategy. Wood ICS 43%, LPG 30%, Charcoal ICS 16%, Bioethanol 10%, Electricity 1% — converging on universal access to clean cooking by 2035.",
      },
      {
        type: 'paragraph',
        text: 'The Sierra Leone Clean Cooking strategy envisions achieving the set targets through five strategic interventions: demand-side subsidies and financing innovations; behaviour change communication; enterprise development and financing; policies, standards and regulatory frameworks; and collaboration and coordination.',
      },
      {
        type: 'figure',
        markLabel: 'Figure 3 — Five key intervention areas',
        caption: "Figure 3: Strategic intervention areas as envisioned by the Sierra Leone National Clean Cooking Strategy.",
      },
      {
        type: 'paragraph',
        text: "The strategy is expected to catalyse far greater effort towards the country's clean cooking ambitions. It is a yardstick against which Sierra Leone can measure progress in the sub-sector, and a compass that gives direction to everyone working in it while serving as a critical tool for resource mobilisation and sector development. Above all, the strategy is more than a policy document. It is a blueprint for a healthier, more equitable future, and a bridge to the kind of progress that happens at the intersection of technology, finance, and human behaviour.",
      },
      {
        type: 'paragraph',
        text: 'However, the development of the strategy is not an end in itself. With the strategy in place, the question is no longer whether Sierra Leone can achieve universal access, but how fast it is willing to move to deliver the smoke-free future Sierra Leoneans deserve. Like many developing economies, Sierra Leone can no longer afford the cost of inaction. Prioritising the transition to clean cooking is about more than exchanging stoves; it is about reclaiming the hours lost to collecting firewood and preparing food, saving hectares of forest, and protecting the very air breathed inside the home.',
      },
      {
        type: 'paragraph',
        text: 'Achieving universal access to clean cooking, therefore, calls for sustained government commitment: a conducive operational environment, dedicated financial resources, and a robust framework to track progress on an ongoing basis. It is equally a call to action for all stakeholders to work together towards a shared agenda of universal access to clean cooking in Sierra Leone. With that commitment, the clean cooking agenda will move from the periphery to the centre of national development planning. And if the strategy is implemented effectively, it stands to mark a genuine turning point for the sub-sector, one in which access to clean cooking is no longer a privilege for a few but a necessity met for all Sierra Leoneans.',
      },
      { type: 'signoff', text: 'Authored by Abigael Okoko' },
    ],
    keyTakeaways: [
      'Cooking costs Sierra Leone roughly US$4.7 billion a year, most of it borne by the health sector.',
      "Indoor air pollution is the country's leading cause of death, responsible for 8,679 deaths annually.",
      'The new strategy is deliberately multi-fuel; a leapfrog to modern fuels is not expected.',
      'Improved biomass is treated as a legitimate interim step, not a failure of ambition.',
      'Five intervention areas span subsidies, behaviour change, enterprise finance, regulation, and coordination.',
    ],
    sidebarStats: [
      {
        title: 'Annual Cost of Cooking',
        value: 'US$4.7B',
        body: 'Borne across health (US$3.2B), lost productivity for women (US$1.4B), and climate (US$0.2B).',
      },
      {
        title: 'Universal Access Target',
        value: '2035',
        body: 'The year by which the National Clean Cooking Strategy aims to reach universal access to clean cooking.',
      },
    ],
    references: [
      {
        id: 1,
        text: 'World Bank Clean Cooking Planning Tool. (2022). The state of access to clean cooking: Sierra Leone. Energy Data.',
        url: 'https://energydata.info/cleancooking/planningtool/mecs/SLE',
        urlLabel: 'energydata.info/cleancooking/planningtool/mecs/SLE',
      },
      {
        id: 2,
        text: 'Ritchie, H., & Roser, M. (2024). Indoor Air Pollution. Our World in Data.',
        url: 'https://ourworldindata.org/indoor-air-pollution',
        urlLabel: 'ourworldindata.org/indoor-air-pollution',
      },
      { id: 3, text: 'IEA. (2023). A Vision for Clean Cooking Access for All.' },
      {
        id: 4,
        text: 'World Bank. (Draft report). Sierra Leone: Beyond connections. Energy Access Diagnostic Report Based on The Multi-Tier Framework.',
      },
      {
        id: 5,
        text: 'Statistics Sierra Leone. (2018). Sierra Leone integrated household survey (SLIHS) report.',
        url: 'https://www.statistics.sl/index.php/resources/publications.html',
        urlLabel: 'statistics.sl/index.php/resources/publications.html',
      },
      {
        id: 6,
        text: 'World Bank. (Draft report). Sierra Leone: Beyond connections. Energy Access Diagnostic Report Based on The Multi-Tier Framework.',
      },
    ],
  },
];

/**
 * Research portfolio: work published by EED researchers in outside venues.
 * Each entry is a short brief that links readers to the published source.
 * Used as the fallback until these entries are published in Prismic
 * (see scripts/migrate-publications.mjs).
 */
export const PUBLICATIONS: Publication[] = [
  {
    slug: 'circular-economy-kenya-e-waste-sector',
    title: 'Potential for Circular Economy in Developing Countries: Case Study of Kenya’s E-Waste Sector',
    description:
      'The world produces close to 50 million tonnes of electrical and electronic waste each year. The likelihood of finding either electric or electronic waste in a typical homestead is irrefutable. In Kenya, only about 1% of the total e-waste generated is properly managed. This review sought to establish the state of Kenya’s e-waste sector landscape to inform its potential for circularity. It employed a rapid review approach of documentation on e-waste; policy, strategies, journal papers, and grey literature. Circularity in the e-waste sector is still at a nascent stage with limited players in the space. While the government is cognizant of the challenges in managing e-waste, policy frameworks and preparedness are still nascent. A framework is imperative in not only creating awareness but also establishing the necessary infrastructure to facilitate the collection and management of e-waste. Moreover, government and private sector partnerships will be essential in regulating the e-waste sector, especially with the emerging interest from sector players.',
    category: 'circular_economy',
    type: 'Research paper',
    publisher: 'IJISRT',
    url: 'https://www.ijisrt.com/assets/upload/files/IJISRT22AUG918_(1).pdf',
  },
  {
    slug: 'africa-water-policy-moment',
    title: 'Africa Water Policy Moment: Converging Programmes, Fragmented Delivery',
    description:
      'Africa is experiencing one of its most significant water policy moments in decades. In February 2026, African leaders adopted the African Union’s (AU) Water Vision 2063 and Policy, alongside the declaration of 2026 as the Year of Water and Sanitation. This vision recognizes water and sanitation not only as a social service, but also as catalysts for economic growth, food security, and climate resilience, calling on African governments to “position water as a strategic asset for industrialization, agriculture and energy, and an indispensable enabler of primary national development objectives.”',
    category: 'wash',
    type: 'Blog post',
    publisher: 'RWSN',
    url: 'https://rwsn.blog/2026/06/22/from-declarations-to-delivery-the-case-for-integrated-implementation-systems-in-africas-2026-water-agenda/',
  },
  {
    slug: 'nairobi-motorcycle-transit-comparison-dataset',
    title: 'Nairobi Motorcycle Transit Comparison Dataset: Fuel vs. Electric Vehicle Performance Tracking (2023)',
    description:
      'This dataset, titled “Nairobi Motorcycle Transit Comparison Dataset,” was compiled to document a simulated transition of motorcycle taxis (boda bodas) in Nairobi, Kenya, from internal combustion engine (ICE) to electric motorcycles. The data collection spanned two distinct phases. The baseline phase, conducted from November 13–26, 2023, involved 120 ICE motorcycles. The transition phase, occurring from December 10–21, 2023, included 110 ICE motorcycles as a control group and 9 electric motorcycles as a treatment group. Data were gathered in Nairobi, a major urban center in East Africa, providing a geographically specific context for the data collection. Recognising the limited availability of data on such transitions in African cities, including historical insights from Kenyan urban transport systems, this dataset provides a unique resource for researchers and policymakers.',
    category: 'energy',
    type: 'Research paper',
    publisher: 'ResearchGate',
    url: 'https://www.researchgate.net/publication/392844974_Nairobi_Motorcycle_Transit_Comparison_Dataset_Fuel_vs_Electric_Vehicle_Performance_Tracking_2023',
  },
  {
    slug: 'kenya-electricity-overcapacity-claim',
    title: 'Reviewing the Overcapacity Claim: Insights from Kenya’s Electricity Sector',
    description:
      'Typical approaches to assessing excess generation capacity in African electricity systems have considered the nameplate capacities of existing generation plants, the planned generation capacity, and peak load. However, the omission of variables such as the condition of transmission and distribution infrastructure, the age of existing power plants, and whether generation capacity is intermittent (as in the case of wind or solar) or subject to climate impacts (as in the case of hydropower) has caused such assessments to be misleading. This can result in misguided public policy and power procurement processes that are poorly matched to the needs of evolving power systems. In this paper, we analyze the case of Kenya to show how power system planning must consider these key factors that are often ignored. Far from having excess capacity as has been repeatedly reported, the Kenyan grid has limited capacity to take up additional load at present.',
    category: 'energy',
    type: 'Research paper',
    publisher: 'ScienceDirect',
    url: 'https://www.sciencedirect.com/science/article/abs/pii/S1040619024000095',
  },
  {
    slug: 'decentralized-safe-water-enterprise-kiosks',
    title: 'Leveraging a Decentralized Entrepreneurial Approach to Safe Water Supply',
    description:
      'A randomized control study design was employed to understand the impact of the safe water enterprise kiosks on the community. This involved selecting an equal number of participants from both the intervention arm (consumers who obtained water from the kiosk) and the control arm (the consumers who did not obtain water from the kiosk). The six SWE kiosks evaluated in this study are equipped with different water supply set-ups and operate in different contexts and serve different clients. The SWE kiosks were implemented in partnership with different community partners and have varying governance, and or management structures. Four of the water kiosks are owned and governed by Community-Based Organizations (CBOs) now officially registered as Water User Associations (WUAs), comprising member committees while two are managed by host institution.',
    category: 'wash',
    type: 'Evaluation study',
    publisher: 'Siemens Stiftung',
    url: 'https://www.siemens-stiftung.org/wp-content/uploads/2024/03/study-onwaterkiosks-kenya-siemensstiftung.pdf',
  },
  {
    slug: 'consistency-case-study-paris-agreement-rwanda',
    title: 'Consistency Case Study: Actions Supporting Article 2.1c of the Paris Agreement in Rwanda',
    description:
      'Rwanda’s experience managing its climate related finances provides an important starting point for conversations around the difficult questions that low-income countries face in balancing food and energy security needs while achieving just transitions toward net-zero emissions. This report offers a blueprint for other low-income countries on how to implement low-carbon strategies that can lead to increasingly ambitious climate action, including in Rwanda’s case, an internationally supported mitigation plan that would reduce GHG emissions by up to 38% in 2030. Finally, the Paris Agreement’s Global Stocktake (GST) can benefit from this case study as a proof-of-concept for how climate finance flows can be assessed in the relatively shallow financial market that characterizes most low- and low-middle income countries.',
    category: 'climate',
    type: 'Case study',
    publisher: 'ODI',
    url: 'https://odi.org/en/publications/consistency-case-study-actions-supporting-article-21c-of-the-paris-agreement-in-rwanda/',
  },
];
