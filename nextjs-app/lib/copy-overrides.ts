/**
 * Website copy that replaces the text currently stored in Prismic, keyed by
 * page uid. Applied by SitePage before rendering, so the approved wording
 * shows up without editing each Prismic document. Once the same text has been
 * published in Prismic, delete the matching entry here.
 *
 * Source: "Updated Website contents" copy document (Sections 1–4).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Content = any;

const paragraph = (text: string) => ({ type: 'paragraph', text, spans: [] });
const heading1 = (text: string) => ({ type: 'heading1', text, spans: [] });
const rich = (...texts: string[]) => texts.map(paragraph);

type EntryCopy = { title?: string; body?: string };

type SliceCopy = {
  heading?: string;
  body?: string[];
  /** Replacement text for link_list entries, matched on their current title. */
  entries?: Record<string, EntryCopy>;
};

type PillarSlide = {
  headline: string;
  challenge: string;
  /** Heading above the three figures when the slide gives one (Climate Change only). */
  figuresHeading?: string;
  stats: { value: string; label: string }[];
  source: string;
  approach: string;
};

/** Content of the four pillar slides (the "Refer to the PPT" rows). */
const PILLAR_SLIDES: Record<string, PillarSlide> = {
  wash: {
    headline: 'Water security is about services that last, not just systems that are built',
    challenge:
      'Across Africa, a borehole that runs dry each season, a piped scheme that fails after handover or waste that is never safely managed can all count as access while households remain without dependable service. A changing climate makes once-reliable sources increasingly seasonal.',
    stats: [
      { value: '167M', label: 'people in sub-Saharan Africa rely on limited drinking water services' },
      { value: '16%', label: 'of rural households have water on premises (33% overall)' },
      { value: '192M', label: 'people in the region still practise open defecation' },
    ],
    source: 'Figures: WHO/UNICEF JMP 2025, sub-Saharan Africa, 2024',
    approach:
      'At ERI, we look beyond infrastructure to the institutions, incentives and relationships that keep services running: tariffs, spare-parts supply chains, clear mandates and community governance. We generate evidence and practical pathways for WASH systems that are inclusive, financially viable and climate-resilient.',
  },
  energy: {
    headline: 'Energy access is a system, and clean cooking is where it matters most',
    challenge:
      'Clean cooking is often treated as a household concern, yet it carries health, gender, environmental and development consequences. Burning solid biomass in traditional stoves pollutes indoor air, a major driver of premature deaths. In sub-Saharan Africa, population growth is outpacing gains in access.',
    stats: [
      { value: '563M', label: 'of the 655 million people without electricity live in sub-Saharan Africa' },
      { value: '22%', label: 'of people in sub-Saharan Africa have access to clean cooking' },
      { value: '2.0B', label: 'people worldwide still depend on polluting fuels' },
    ],
    source: 'Figures: Tracking SDG7 2026 (IRENA, IEA, UN, World Bank, WHO)',
    approach:
      'At ERI, we treat energy as a system linking households, enterprises, institutions and finance. The transition will not be a single leap to modern fuels, so improved biomass remains an interim option. We research how policies, markets, technologies and consumer realities can support realistic, inclusive multi-fuel transitions.',
  },
  climate: {
    headline: 'Climate resilience is built system by system, and it has to be financed',
    challenge:
      'Climate vulnerability continue to persist, with the most vulnerable populations across Sub-Saharan Africa bearing a disproportionate burden. Adaptation remains underfunded and locally led adaptation even more so. Closing the funding gap requires more than commitments – it demands financing, and the tools and political will to act',
    figuresHeading: 'The finance gap',
    stats: [
      { value: '~1/4', label: 'of climate finance goes to adaptation, down from one third in 2020' },
      { value: '~2/3', label: 'goes to mitigation, mostly energy and transport' },
      { value: '$1.3T', label: 'a year needed from all sources by 2035' },
    ],
    source: 'Figures: UN SDG Report 2026, Goal 13 (OECD data)',
    approach:
      'At ERI, we study climate change through the water, energy and food systems people depend on, not as a stand-alone issue. We examine how adaptation works in practice: a water supply that withstands variability, a crop calendar aligned with shifting rainfall, an energy system that keeps running through floods and other shocks.',
  },
  agriculture: {
    headline: 'Resilient food systems connect farms, climate, water and markets',
    challenge:
      'Shifting rainfall, prolonged dry spells and extreme weather disrupt planting calendars, grazing patterns and harvests. Food insecurity in sub-Saharan Africa has risen sharply since 2015, from just under 50 percent of the population.',
    stats: [
      { value: '>2/3', label: 'of people in sub-Saharan Africa were moderately or severely food insecure in 2024' },
      { value: '22.3%', label: "of the region's population faced hunger in 2024" },
      { value: '44%', label: 'of women in the region achieve minimum dietary diversity, the lowest globally' },
    ],
    source: 'Figures: FAO, Tracking progress on food and agriculture-related SDG indicators 2025',
    approach:
      'At ERI, we treat agriculture as part of a wider system. We research which technologies and practices work in specific contexts, how markets and finance can be more inclusive, and how policy can support resilient livelihoods. We generate evidence and support implementation across the value chain, from production to market access, linking adaptation, water and energy.',
  },
};

/**
 * Pillar pages: the slide's headline replaces the hero heading, and the page
 * body becomes The challenge, the three figures, then Our approach. The
 * existing focus-area, method and call-to-action sections are kept after them.
 */
function applyPillarSlide(slide: PillarSlide, slices: Content[]): Content[] {
  const out: Content[] = [];
  for (const s of slices) {
    if (s.slice_type === 'hero') {
      out.push({ ...s, primary: { ...s.primary, heading: [heading1(slide.headline)] } });
    } else if (s.slice_type === 'text_columns') {
      out.push({
        ...s,
        primary: { ...s.primary, heading: [heading1('The challenge')], intro: rich(slide.challenge), left_body: [], right_body: [] },
      });
    } else if (s.slice_type === 'stats') {
      out.push({
        ...s,
        primary: {
          ...s.primary,
          heading: slide.figuresHeading ? [heading1(slide.figuresHeading)] : [],
          entries: slide.stats,
          source: slide.source,
        },
      });
      out.push({
        slice_type: 'text_columns',
        id: `${s.id || 'stats'}-approach`,
        primary: { heading: [heading1('Our approach')], intro: rich(slide.approach), left_body: [], right_body: [] },
      });
    } else {
      out.push(s);
    }
  }
  return out;
}

const COPY: Record<string, Partial<Record<string, SliceCopy>>> = {
  // Section 1: Home page
  home: {
    hero: {
      heading: "Research to inform Africa's resilient futures",
      body: [
        "ERI is a Pan-African research institute committed to rigorous scientific inquiry into Africa's most complex and overlooked development challenges. Across our thematic areas and their varied nexus points, we apply governance, economic, social, and technical perspectives to emerging challenges",
      ],
    },
    text_image: {
      body: [
        'We produce contextually grounded empirical evidence, translate knowledge into actionable pathways, and support implementation across the interconnected fields of energy, WASH, climate change, and agriculture. We champion a future where sustainable, adaptive, and resilient systems drive prosperity, equity, and justice.',
      ],
    },
    link_list: {
      entries: {
        WASH: {
          body: 'Our work supports resilient WASH solutions that respond to the needs of households, communities, and institutions, particularly in underserved and climate-vulnerable settings.',
        },
        Energy: {
          body: 'We generate evidence that informs inclusive policies, investment decisions, and practical implementation around energy access, productive energy use to decentralized renewable energy and energy transition planning.',
        },
        Climate: {
          title: 'Climate Change',
          body: 'We contribute to, and inform climate resilience through climate-risk analysis, adaptation planning, mitigation opportunities, climate finance, and the integration of climate considerations into energy, WASH, and agricultural systems.',
        },
        Agriculture: {
          body: 'We strengthen agricultural systems through evidence on productivity, food security, market access, natural-resource management, and climate resilience.',
        },
      },
    },
  },
  // Section 2: About Us; What We Do
  about: {
    hero: {
      heading: 'Turning local insight into lasting change',
      body: [
        'We champion a future where sustainable, adaptive, and resilient systems drive prosperity, equity, and justice.',
      ],
    },
  },
  // Section 2 (cont.): the What We Do accordion uses the new pillar name
  'what-we-do': {
    pillar_accordion: { entries: { Climate: { title: 'Climate Change' } } },
  },
  // Section 3: Our team
  team: {
    hero: {
      body: [
        'Our team brings deep contextual knowledge and lived experience to every inquiry, so we can navigate complex systems and tailor solutions with a precision that externally designed research often misses.',
      ],
    },
  },
  // Section 4: Research Portfolio
  portfolio: {
    hero: {
      heading: 'An Index of Our Applied Research',
      body: [
        'Applied research that connects evidence to implementation, supporting resilient systems and equitable development across Africa.',
      ],
    },
  },
};

/** Returns the page's slices with the approved copy swapped in. */
export function applyCopyOverrides(uid: string, slices: Content[]): Content[] {
  if (PILLAR_SLIDES[uid]) slices = applyPillarSlide(PILLAR_SLIDES[uid], slices);
  const pageCopy = COPY[uid];
  if (!pageCopy) return slices;
  return slices.map((slice) => {
    const copy = pageCopy[slice.slice_type];
    if (!copy) return slice;
    const primary = { ...slice.primary };
    if (copy.heading) primary.heading = [heading1(copy.heading)];
    if (copy.body) primary.body = rich(...copy.body);
    if (copy.entries && Array.isArray(primary.entries)) {
      primary.entries = primary.entries.map((entry: Content) => {
        const replacement = copy.entries?.[entry.title];
        if (!replacement) return entry;
        return {
          ...entry,
          ...(replacement.title ? { title: replacement.title } : {}),
          ...(replacement.body ? { body: rich(replacement.body) } : {}),
        };
      });
    }
    return { ...slice, primary };
  });
}
