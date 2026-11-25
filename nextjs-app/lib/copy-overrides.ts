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
