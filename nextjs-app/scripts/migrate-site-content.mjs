/**
 * Seed the editable website pages and shared site settings in Prismic.
 *
 * Preview: node scripts/migrate-site-content.mjs
 * Stage:   PRISMIC_WRITE_TOKEN=... node scripts/migrate-site-content.mjs --apply
 *
 * The Migration API creates a draft release. Review it in Prismic before
 * publishing; the website keeps its checked-in fallback until each page is live.
 */
import { basename, resolve } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { createMigration, createWriteClient, NotFoundError } from '@prismicio/client';
import { PILLARS } from '../lib/pillars-data.ts';
import { TEAM_MEMBERS } from '../lib/team-data.ts';

const repositoryName = 'eri-website-repo';
const migration = createMigration();
const paragraph = (text) => ({ type: 'paragraph', text, spans: [] });
const heading = (text, type = 'heading2') => ({ type, text, spans: [] });
const rich = (...texts) => texts.filter(Boolean).map(paragraph);
const title = (text) => [heading(text, 'heading1')];
const slice = (slice_type, primary = {}) => ({ slice_type, variation: 'default', primary });
const web = (url) => url ? ({ link_type: 'Web', url }) : { link_type: 'Any' };
const internal = (uid) => ({
  link_type: 'Document',
  id: () => migration.getByUID('site_page', uid),
});

function asset(publicPath, alt = '') {
  if (!publicPath) return undefined;
  const cleanPath = publicPath.split('?')[0];
  const absolutePath = resolve('public', cleanPath.replace(/^\//, ''));
  if (!existsSync(absolutePath)) return undefined;
  return migration.createAsset(readFileSync(absolutePath), basename(absolutePath), {
    alt,
    tags: ['website'],
  });
}

function hero({ eyebrow, heading: heroHeading, body, image, home = false, buttonLabel, buttonUID, metrics = [], tags = [] }) {
  return slice('hero', {
    eyebrow,
    heading: title(heroHeading),
    body: rich(body),
    image: asset(image, heroHeading),
    home_style: home,
    button_label: buttonLabel,
    button_link: buttonUID ? internal(buttonUID) : { link_type: 'Any' },
    metrics,
    tags: tags.map((label) => ({ label })),
  });
}

function cta(headingText, body, buttonLabel = 'Start a conversation', buttonUID = 'contact') {
  return slice('call_to_action', {
    heading: title(headingText),
    body: rich(body),
    button_label: buttonLabel,
    button_link: internal(buttonUID),
  });
}

const home = {
  uid: 'home',
  label: 'Homepage',
  metaTitle: 'EED Research Institute — Advancing Evidence-Based Sustainability',
  metaDescription: 'EED Research Institute advances scientific inquiry in WASH, energy, climate change, and agriculture.',
  slices: [
    hero({
      heading: 'Advancing Evidence-Based Sustainability',
      body: 'EED Research Institute is a multidisciplinary organization founded in 2023, committed to advancing scientific inquiry to address complex global challenges in WASH, energy, climate change, and agriculture.',
      image: '/assets/hero/hero-home.jpg', home: true,
      buttonLabel: 'Explore Research', buttonUID: 'portfolio',
      metrics: [
        { value: '2023', label: 'Established' },
        { value: '47', label: 'Countries' },
        { value: '04', label: 'Research Pillars' },
      ],
      tags: ['Water, Sanitation & Hygiene', 'Energy', 'Climate Change', 'Agriculture'],
    }),
    slice('text_image', {
      heading: title('A research institute built for interconnected challenges'),
      body: rich(
        'EED Research Institute is a multidisciplinary organization founded in 2023 and committed to advancing scientific inquiry to address complex global challenges in WASH, energy, climate change, and agriculture.',
        'Its work focuses on impact- and mission-oriented research, knowledge exchange and translation, applied research and problem-solving, evidence-based policy support, technology development and innovation, standardization, certification and testing, and professional training.',
      ),
      image: asset('/assets/about/field-research.jpg', 'ERI Field Research'),
      image_label: 'ERI Field Research',
      button_label: 'About the Institute', button_link: internal('about'),
    }),
    slice('quote', {
      heading: title('Transforming water, energy, climate and agriculture with rigorous, field-grounded research'),
      image: asset('/assets/hero/hero-portfolio.jpg', ''),
    }),
    slice('link_list', {
      heading: title('Core Research Pillars'),
      intro: rich('Four interconnected thematic areas anchor our research, policy engagement, and community partnerships.'),
      entries: [
        ['WASH', 'Water, Sanitation, and Hygiene strategies for resilient communities.', 'wash'],
        ['Energy', 'Transitional energy frameworks and renewable infrastructure planning.', 'energy'],
        ['Climate', 'Adaptation modeling and climate finance policy analysis.', 'climate'],
        ['Agriculture', 'Sustainable food systems and land-use optimization research.', 'agriculture'],
      ].map(([rowTitle, body, uid]) => ({ title: rowTitle, body: rich(body), button_label: 'Explore →', button_link: internal(uid) })),
    }),
    slice('card_grid', {
      heading: title('Recent flagship studies'),
      intro: rich('In-depth studies driving sustainable transformation across critical sectors.'),
      columns: 'two', background: 'sunk',
      entries: [
        {
          title: 'Urban Water Resilience Index 2024',
          body: rich('A comprehensive analysis of water infrastructure stability in rapidly urbanizing regions.'),
          image: asset('/assets/research/water-resilience.jpg', 'Urban Water Resilience Index 2024'),
          label: 'Water Infrastructure', button_label: 'Learn More →', button_link: internal('portfolio'),
        },
        {
          title: 'Decentralized Solar for Rural Industry',
          body: rich('Evaluating the economic impact of off-grid renewable energy on local manufacturing hubs.'),
          image: asset('/assets/research/rural-solar.jpg', 'Decentralized Solar for Rural Industry'),
          label: 'Off-Grid Solar', button_label: 'Learn More →', button_link: internal('portfolio'),
        },
      ],
    }),
    slice('news_list'),
    slice('inquiry', {
      heading: title("Let's collaborate"),
      body: rich('Interested in collaborating or learning more about our research? Our team is ready to connect.'),
    }),
  ],
};

const about = {
  uid: 'about', label: 'About Us',
  metaTitle: 'About Us — EED Research Institute',
  metaDescription: 'EED Research Institute pioneers ecological breakthroughs that inform policy and empower communities.',
  slices: [
    hero({ eyebrow: 'The Institute', heading: 'Bridging Science and Sustainability.', body: 'The EED Research Institute is dedicated to pioneering ecological breakthroughs that inform policy and empower communities across the globe.', image: '/assets/hero/hero-about.jpg' }),
    slice('image_link_grid', {
      heading: title('Fieldwork across East and Sub-Saharan Africa'),
      intro: rich('Applied research grounded in the communities and institutions our findings are meant to serve.'),
      entries: [
        ['WASH', '/assets/about/wash-field.jpg', 'wash'],
        ['Energy', '/assets/about/energy-field.jpg', 'energy'],
        ['Climate', '/assets/about/climate-field.jpg', 'climate'],
        ['Agriculture', '/assets/about/agriculture-field.jpg', 'agriculture'],
      ].map(([itemTitle, image, uid]) => ({ title: itemTitle, image: asset(image, `${itemTitle} Fieldwork`), destination: internal(uid) })),
    }),
    slice('pillar_cards', {
      heading: title('Four pillars, one interconnected mission'),
      intro: rich('Our core thematic areas bring together empirical research, institutional analysis, and localized action.'),
      entries: [
        ['Water & Sanitation', 'WASH', '961M Access Gained', '/assets/about/wash-pillar.jpg', 'According to the 2026 UN SDG 6 Synthesis Report, over 961 million people gained access to safely managed drinking water over the past decade. Our WASH research focuses on water security, sanitation governance, and resilient water systems.', 'wash'],
        ['Clean Energy', 'Energy', '+19.5% Efficiency', '/assets/about/energy-pillar.jpg', 'Targeting universal energy access, addressing the clean cooking gap across Africa, and driving water-energy nexus efficiency gains across industrial and rural mini-grid systems.', 'energy'],
        ['Climate Resilience', 'Climate', '18% Water Stress', '/assets/about/climate-pillar.jpg', 'Tracking climate variability across vulnerable landscapes, evaluating transboundary water management, and advancing localized adaptation and climate finance mechanisms.', 'climate'],
        ['Agriculture & Food', 'Agriculture', '6% Irrigated Farmland', '/assets/about/agriculture-pillar.jpg', 'Empowering smallholders through research on micro-irrigation, water quality monitoring, and sustainable food value chains.', 'agriculture'],
      ].map(([itemTitle, badge, stat, image, body, uid]) => ({ title: itemTitle, badge, stat, image: asset(image, `${badge} Pillar`), body: rich(body), destination: internal(uid) })),
    }),
    slice('work_cards', {
      heading: title('How we work'),
      intro: rich('Four organizational competencies cut across every thematic area, from the evidence base through to implementation.'),
      entries: [
        ['Integrated Systems Modeling & Data Analytics', 'We apply advanced geospatial mapping, predictive models, and integrated resource nexus frameworks to underpin every sector.'],
        ['Policy Architecture & Institutional Capacity', 'We translate technical evidence into actionable frameworks, regulatory roadmaps, tariff structures, accountability mechanisms, and coordination protocols.'],
        ['Blended Finance & Market Systems', 'We bridge public mandates and private capital through blended finance, results-based financing, credit mechanisms, and risk mitigation instruments.'],
        ['Human-Centered Design & Adaptive Management', 'We place end users, vulnerable groups, and local communities at the core of every intervention through participatory design and inclusive evidence.'],
      ].map(([itemTitle, body]) => ({ title: itemTitle, body: rich(body) })),
    }),
    slice('timeline', {
      heading: title('Institute Milestones'),
      entries: [
        { year: '2023', title: 'Founded', body: rich('EED Research Institute is established with a mandate to advance evidence-based research across WASH, energy, climate, and agriculture.') },
        { year: '2024', title: 'First facility grants', body: rich('First Kawisafi Technical Assistance Facility grants disbursed; 150+ ongoing research initiatives launched across the region.') },
        { year: '2025 — Today', title: 'Active in 47 countries', body: rich('Four key thematic pillars anchor our work, supported by a growing multidisciplinary team.') },
      ],
    }),
    cta('Become a Partner', 'We collaborate with organizations, institutions, and changemakers to accelerate sustainable solutions through research, innovation, and shared action.', 'Contact Us'),
  ],
};

const whatWeDo = {
  uid: 'what-we-do', label: 'What We Do',
  metaTitle: 'What We Do — EED Research Institute',
  metaDescription: 'Discover EED Research Institute research initiatives and evidence-based solutions.',
  slices: [
    hero({ eyebrow: 'Our Work', heading: 'What We Do', body: 'Advancing evidence-based solutions across WASH, energy, climate change, and agriculture.', image: '/assets/hero/hero-home.jpg' }),
    slice('pillar_accordion', {
      heading: title('Four research pillars'),
      intro: rich('Our work is organised around four deliberately interconnected thematic areas.'),
      entries: [
        ['WASH', 'Water security, safely managed sanitation and hygiene behaviour, and the governance arrangements that determine whether services endure.', '/assets/about/wash-pillar.jpg', 'wash'],
        ['Energy', 'Clean cooking transitions, energy access and mini-grids, energy and climate finance, and productive use of energy.', '/assets/about/energy-pillar.jpg', 'energy'],
        ['Climate', 'Adaptation and resilience, climate finance, carbon markets and removals, and alignment of climate with development policy.', '/assets/about/climate-pillar.jpg', 'climate'],
        ['Agriculture', 'Smallholder productivity under climate risk, irrigation, land use, food systems and value chains.', '/assets/about/agriculture-pillar.jpg', 'agriculture'],
      ].map(([itemTitle, body, image, uid]) => ({ title: itemTitle, body: rich(body), image: asset(image, itemTitle), destination: internal(uid) })),
    }),
    cta('Commission research with us', 'We work with governments, funders, utilities, investors and academic partners across all four pillars.'),
  ],
};

function pillarPage(content) {
  return {
    uid: content.slug,
    label: content.h1,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    slices: [
      hero({ heading: content.h1, body: `${content.tagline}. ${content.lead}`, image: content.heroImage }),
      slice('text_columns', {
        heading: title('Why this matters'), intro: rich(content.whyMattersLead),
        left_body: rich(...content.leftParagraphs), right_body: rich(...content.rightParagraphs),
      }),
      slice('stats', { entries: content.stats }),
      slice('link_list', {
        heading: title('What we work on'), intro: rich(content.focusLead),
        entries: content.focusAreas.map((area) => ({ title: area.title, body: rich(area.body), button_label: area.meta, button_link: { link_type: 'Any' } })),
      }),
      slice('card_grid', {
        heading: title('How we work'), intro: rich(content.approachLead), columns: 'three', background: 'sunk',
        entries: content.approachCards.map((card) => ({ title: card.title, body: rich(card.body), button_link: { link_type: 'Any' } })),
      }),
      cta(content.ctaTitle, content.ctaBody),
    ],
  };
}

const team = {
  uid: 'team', label: 'Our Team',
  metaTitle: 'Our Team — EED Research Institute',
  metaDescription: 'Meet the multidisciplinary team behind EED Research Institute.',
  slices: [
    hero({ eyebrow: 'Our People', heading: 'The people behind the research', body: 'A multidisciplinary collective of researchers, scientists, and strategists dedicated to advancing sustainable ecological solutions and rigorous academic inquiry.', image: '/assets/hero/hero-team.jpg' }),
    slice('team', {
      entries: TEAM_MEMBERS.map((member) => ({
        id: member.id, name: member.name, initials: member.initials, role: member.role,
        photo: asset(member.photo, member.name), linkedin: web(member.linkedin), scholar: web(member.scholar),
        bio: rich(...(member.bio || [])),
      })),
    }),
    cta('Join our research collective', 'We are always looking for rigorous thinkers and passionate environmental advocates to contribute to our ongoing studies.', 'View Open Positions'),
  ],
};

const contact = {
  uid: 'contact', label: 'Contact Us',
  metaTitle: 'Contact Us — EED Research Institute',
  metaDescription: 'Collaborate with EED Research Institute or reach our East Africa hub in Nairobi.',
  slices: [
    hero({ eyebrow: 'Get In Touch', heading: "Let's build the evidence base together", body: 'We welcome collaboration with academic institutions, government agencies, and private sector partners to drive evidence-based solutions for global challenges.', image: '/assets/hero/hero-contact.jpg' }),
    slice('contact', {
      heading: title('Send us a message'), office_heading: 'Find us in Nairobi',
      body: rich('Visit our offices for enquiries, consultations, support, or partnership discussions.'),
      address: 'EED Advisory Limited\n50 Hamisi Road, Kileleshwa\nNairobi, Kenya\nP.O. Box 66053-00800, Nairobi',
      phone: '+254 (20) 2574927', email: 'eri@eedadvisory.com',
    }),
  ],
};

const news = {
  uid: 'news', label: 'News & Insights',
  metaTitle: 'News & Insights — EED Research Institute',
  metaDescription: 'Research commentary, policy analysis, and field perspectives from EED Research Institute.',
  slices: [
    hero({ eyebrow: 'Insights', heading: 'Perspectives from the field', body: 'Research commentary, policy analysis, and field notes from our researchers across WASH, energy, climate, and agriculture.', image: '/assets/hero/hero-news.jpg' }),
    slice('news_list'),
  ],
};

const portfolio = {
  uid: 'portfolio', label: 'Research Portfolio',
  metaTitle: 'Research Portfolio — EED Research Institute',
  metaDescription: 'An archive of applied research and policy interventions across WASH, energy, climate, and agriculture.',
  slices: [
    hero({ eyebrow: 'Research Portfolio', heading: 'An index of our applied research', body: 'Systemic analyses and policy interventions across key thematic areas, designed to foster ecological stewardship and intellectual rigor.', image: '/assets/hero/hero-portfolio.jpg' }),
    slice('publication_list'),
  ],
};

const pages = [home, about, whatWeDo, ...Object.values(PILLARS).map(pillarPage), team, contact, news, portfolio];

for (const page of pages) {
  migration.createDocument({
    type: 'site_page', uid: page.uid, lang: 'en-us',
    data: { meta_title: page.metaTitle, meta_description: page.metaDescription, slices: page.slices },
  }, page.label);
}

migration.createDocument({
  type: 'site_settings', lang: 'en-us',
  data: {
    header_logo: asset('/assets/logo/eri-logo-mark.png', 'EED Research Institute'),
    footer_logo: asset('/assets/logo/eri-logo-full.png', 'EED Research Institute'),
    navigation: [
      ['Home', 'home'], ['About Us', 'about'], ['What We Do', 'what-we-do'], ['Our Team', 'team'],
      ['Research Portfolio', 'portfolio'], ['Blogs', 'news'],
    ].map(([label, uid]) => ({ label, link: internal(uid) })),
    pillar_navigation: [
      ['WASH', 'wash'], ['Energy', 'energy'], ['Climate', 'climate'], ['Agriculture', 'agriculture'],
    ].map(([label, uid]) => ({ label, link: internal(uid) })),
    cta_label: 'Contact Us', cta_link: internal('contact'),
    footer_description: 'EED Research Institute is committed to advancing scientific inquiry to address global challenges in WASH, energy, climate change and agriculture.',
    footer_quick_links: [
      ['About Us', 'about'], ['What We Do', 'what-we-do'], ['Our Team', 'team'], ['Our Publications', 'portfolio'], ['Contact Us', 'contact'],
    ].map(([label, uid]) => ({ label, link: internal(uid) })),
    footer_information: [], footer_legal: [],
    copyright: '© 2026 EED Research Institute. All rights reserved.',
  },
}, 'Site Settings');

console.log(`Prepared ${pages.length} website pages, site settings, and ${migration._assets.size} media assets.`);

if (process.argv.includes('--apply')) {
  const writeToken = process.env.PRISMIC_WRITE_TOKEN;
  if (!writeToken) throw new Error('PRISMIC_WRITE_TOKEN is required for --apply.');
  const client = createWriteClient(repositoryName, { writeToken });
  const existingPages = await client.getAllByType('site_page');
  if (existingPages.length) throw new Error(`Found ${existingPages.length} existing site_page documents; refusing to duplicate them.`);
  try {
    await client.getSingle('site_settings');
    throw new Error('A site_settings document already exists; refusing to duplicate it.');
  } catch (error) {
    if (!(error instanceof NotFoundError)) throw error;
  }
  await client.migrate(migration, {
    reporter: (event) => {
      if (event.type === 'end') console.log(`Migration staged: ${event.data.migrated.documents} documents and ${event.data.migrated.assets} assets.`);
    },
  });
}
