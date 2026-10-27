import { mkdirSync, writeFileSync } from 'node:fs';

const text = (label) => ({ type: 'Text', config: { label } });
const rich = (label) => ({ type: 'StructuredText', config: { label, multi: 'paragraph,heading2,heading3,strong,em,hyperlink,list-item,o-list-item' } });
const heading = (label) => ({ type: 'StructuredText', config: { label, single: 'heading1,heading2' } });
const image = (label) => ({ type: 'Image', config: { label, constraint: {}, thumbnails: [] } });
const link = (label) => ({ type: 'Link', config: { label } });
const select = (label, options) => ({ type: 'Select', config: { label, options } });
const group = (label, fields) => ({ type: 'Group', config: { label, repeat: true, fields } });
const slice = (name, description, _icon, primary, items = {}) => {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  return {
    id, type: 'SharedSlice', name,
    variations: [{
      id: 'default', name: 'Default', version: '', description, docURL: '',
      imageUrl: '', primary: Object.keys(items).length
        ? { ...primary, entries: group('Entries', items) } : primary,
    }],
  };
};

const button = { button_label: text('Button label'), button_link: link('Button destination') };
const introduction = { heading: heading('Section heading'), intro: rich('Introduction') };

const choices = {
  hero: slice('Hero', 'Page title, lead copy, image, and optional button', 'image', {
    eyebrow: text('Eyebrow'), heading: heading('Page title'), body: rich('Lead copy'),
    image: image('Background image'), home_style: { type: 'Boolean', config: { label: 'Use large home hero', default_value: false } }, ...button,
    metrics: group('Hero metrics', { value: text('Value'), label: text('Label') }),
    tags: group('Hero topic strip', { label: text('Topic') }),
  }),
  text_image: slice('Text and image', 'Image beside formatted copy', 'view_agenda', {
    heading: heading('Heading'), body: rich('Body'), image: image('Image'), image_label: text('Image label'), ...button,
  }),
  text_columns: slice('Text columns', 'Introduction and two text columns', 'view_column', {
    ...introduction, left_body: rich('Left column'), right_body: rich('Right column'),
  }),
  card_grid: slice('Card grid', 'Two or three column cards with optional images and links', 'grid_view', {
    ...introduction, columns: select('Columns', ['two', 'three']), background: select('Background', ['paper', 'sunk']),
  }, {
    title: text('Card heading'), body: rich('Card body'), image: image('Card image'),
    label: text('Image label'), ...button,
  }),
  link_list: slice('Numbered link list', 'Pillars, focus areas, or other linked rows', 'format_list_numbered', introduction, {
    title: text('Row title'), body: rich('Row body'), ...button,
  }),
  stats: slice('Statistics', 'Impact band with any number of statistics', 'query_stats', { heading: heading('Optional heading') }, {
    value: text('Value'), label: text('Label'),
  }),
  image_link_grid: slice('Image link grid', 'About page fieldwork image links', 'photo_library', introduction, {
    title: text('Title'), image: image('Image'), destination: link('Destination'),
  }),
  pillar_cards: slice('Pillar cards', 'About page illustrated pillar cards', 'dashboard', introduction, {
    title: text('Title'), badge: text('Image badge'), stat: text('Statistic chip'),
    image: image('Image'), body: rich('Description'), destination: link('Destination'),
  }),
  work_cards: slice('Work cards', 'Numbered capability cards', 'view_module', introduction, {
    title: text('Title'), body: rich('Description'),
  }),
  timeline: slice('Timeline', 'Institute milestones', 'timeline', {
    heading: heading('Heading'),
  }, { year: text('Year'), title: text('Title'), body: rich('Description') }),
  pillar_accordion: slice('Pillar accordion', 'Expandable research pillar panels', 'view_carousel', introduction, {
    title: text('Pillar title'), body: rich('Description'), image: image('Background image'), destination: link('Destination'),
  }),
  quote: slice('Image statement', 'Full-width statement on an image', 'format_quote', {
    heading: heading('Statement'), image: image('Background image'),
  }),
  call_to_action: slice('Call to action', 'Heading, copy, and a button', 'campaign', {
    heading: heading('Heading'), body: rich('Body'), ...button,
  }),
  contact: slice('Contact form and office', 'Contact form beside editable office details', 'contact_mail', {
    heading: heading('Form heading'), office_heading: text('Office heading'), body: rich('Office introduction'),
    address: text('Address'), phone: text('Telephone'), email: text('Email'),
  }),
  inquiry: slice('Inquiry form', 'Short inquiry form beside editable introduction', 'mail', {
    heading: heading('Heading'), body: rich('Body'),
  }),
  team: slice('Team', 'Editable team cards and biographies', 'groups', {}, {
    id: text('Anchor ID (e.g. ida-githu)'), name: text('Name'), initials: text('Initials'),
    role: text('Role'), photo: image('Portrait'), linkedin: link('LinkedIn'),
    scholar: link('Scholar profile'), bio: rich('Biography'),
  }),
  news_list: slice('News list', 'Current Prismic blog posts with filters', 'article', {}),
  publication_list: slice('Publication list', 'Current Prismic publications with filters', 'library_books', {}),
};

for (const [id, model] of Object.entries(choices)) {
  model.id = id;
  model.name = id.split('_').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
}

const sitePage = {
  id: 'site_page', label: 'Website Page', format: 'page', repeatable: true, status: true,
  json: { Main: {
    uid: { type: 'UID', config: { label: 'Page key (see README)' } },
    meta_title: text('SEO title'), meta_description: text('SEO description'),
    slices: { type: 'Slices', fieldset: 'Page sections', config: {
      choices: Object.fromEntries(Object.entries(choices).map(([id]) => [id, { type: 'SharedSlice' }])),
    } },
  } },
};

const siteSettings = {
  id: 'site_settings', label: 'Site Settings', format: 'custom', repeatable: false, status: true,
  json: { Main: {
    header_logo: image('Header logo'), footer_logo: image('Footer logo'),
    navigation: group('Main navigation', { label: text('Label'), link: link('Destination') }),
    pillar_navigation: group('Pillar submenu', { label: text('Label'), link: link('Destination') }),
    cta_label: text('Header button label'), cta_link: link('Header button destination'),
    footer_description: text('Footer description'),
    footer_quick_links: group('Footer quick links', { label: text('Label'), link: link('Destination') }),
    footer_information: group('Footer information links', { label: text('Label'), link: link('Destination') }),
    footer_legal: group('Footer legal links', { label: text('Label'), link: link('Destination') }),
    copyright: text('Copyright line'),
  } },
};

for (const model of [sitePage, siteSettings]) {
  const dir = `customtypes/${model.id}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.json`, `${JSON.stringify(model, null, 2)}\n`);
}

for (const model of Object.values(choices)) {
  const dir = `slices/${model.name.replace(/\W+/g, '')}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/model.json`, `${JSON.stringify(model, null, 2)}\n`);
}
