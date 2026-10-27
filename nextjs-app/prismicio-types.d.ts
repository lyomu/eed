import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Item in *Blog Post → Key Takeaways*
 */
export interface BlogPostDocumentDataKeyTakeawaysItem {
	/**
	 * Text field in *Blog Post → Key Takeaways*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.key_takeaways[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
}

/**
 * Item in *Blog Post → Sidebar stats*
 */
export interface BlogPostDocumentDataSidebarStatsItem {
	/**
	 * Title field in *Blog Post → Sidebar stats*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.sidebar_stats[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Value field in *Blog Post → Sidebar stats*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.sidebar_stats[].value
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	value: prismic.KeyTextField;
	
	/**
	 * Description field in *Blog Post → Sidebar stats*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.sidebar_stats[].body
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	body: prismic.KeyTextField;
}

/**
 * Item in *Blog Post → References*
 */
export interface BlogPostDocumentDataReferencesItem {
	/**
	 * Citation text field in *Blog Post → References*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.references[].text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	text: prismic.KeyTextField;
	
	/**
	 * Source URL field in *Blog Post → References*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.references[].url
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Content for Blog Post documents
 */
interface BlogPostDocumentData {
	/**
	 * Title field in *Blog Post*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Excerpt field in *Blog Post*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.excerpt
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	excerpt: prismic.RichTextField;
	
	/**
	 * Category field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.category
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	category: prismic.KeyTextField;
	
	/**
	 * Read time field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.read_time
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	read_time: prismic.KeyTextField;
	
	/**
	 * Author name field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.author_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	author_name: prismic.KeyTextField;
	
	/**
	 * Author role field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.author_role
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	author_role: prismic.KeyTextField;
	
	/**
	 * Lead image label field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.lead_image_label
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	lead_image_label: prismic.KeyTextField;
	
	/**
	 * Publish date field in *Blog Post*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.date
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	date: prismic.DateField;
	
	/**
	 * Category filter field in *Blog Post*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.category_filter
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	category_filter: prismic.SelectField<"energy" | "wash" | "climate" | "agriculture">;
	
	/**
	 * Hero image field in *Blog Post*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.hero_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	hero_image: prismic.ImageField<never>;
	
	/**
	 * Featured field in *Blog Post*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: blog_post.featured
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	featured: prismic.BooleanField;
	
	/**
	 * Body field in *Blog Post*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.body
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Key Takeaways field in *Blog Post*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.key_takeaways[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	key_takeaways: prismic.GroupField<Simplify<BlogPostDocumentDataKeyTakeawaysItem>>;
	
	/**
	 * Sidebar stats field in *Blog Post*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.sidebar_stats[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	sidebar_stats: prismic.GroupField<Simplify<BlogPostDocumentDataSidebarStatsItem>>;
	
	/**
	 * References field in *Blog Post*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.references[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	references: prismic.GroupField<Simplify<BlogPostDocumentDataReferencesItem>>;
}

/**
 * Blog Post document from Prismic
 *
 * - **API ID**: `blog_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPostDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<BlogPostDocumentData>, "blog_post", Lang>;

/**
 * Content for Research Publication documents
 */
interface ResearchPublicationDocumentData {
	/**
	 * Title field in *Research Publication*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: research_publication.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *Research Publication*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: research_publication.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Funder / client field in *Research Publication*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: research_publication.funder
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	funder: prismic.KeyTextField;
	
	/**
	 * Category filter field in *Research Publication*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: research_publication.category
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	category: prismic.SelectField<"energy" | "wash" | "climate" | "agriculture">;
	
	/**
	 * Display tag field in *Research Publication*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. Energy
	 * - **API ID Path**: research_publication.tag
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tag: prismic.KeyTextField;
	
	/**
	 * Publication date field in *Research Publication*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: research_publication.publication_date
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	publication_date: prismic.DateField;
	
	/**
	 * PDF / external document link field in *Research Publication*
	 *
	 * - **Field Type**: Link to Media
	 * - **Placeholder**: *None*
	 * - **API ID Path**: research_publication.document
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link-to-media
	 */
	document: prismic.LinkToMediaField<prismic.FieldState, never>;
	
	/**
	 * Body field in *Research Publication*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: research_publication.body
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * Research Publication document from Prismic
 *
 * - **API ID**: `research_publication`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ResearchPublicationDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<ResearchPublicationDocumentData>, "research_publication", Lang>;

type SitePageDocumentDataSlicesSlice = HeroSlice | TextImageSlice | TextColumnsSlice | CardGridSlice | LinkListSlice | StatsSlice | ImageLinkGridSlice | PillarCardsSlice | WorkCardsSlice | TimelineSlice | PillarAccordionSlice | QuoteSlice | CallToActionSlice | ContactSlice | InquirySlice | TeamSlice | NewsListSlice | PublicationListSlice

/**
 * Content for Website Page documents
 */
interface SitePageDocumentData {
	/**
	 * SEO title field in *Website Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_page.meta_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * SEO description field in *Website Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_page.meta_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Page sections field in *Website Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<SitePageDocumentDataSlicesSlice>;
}

/**
 * Website Page document from Prismic
 *
 * - **API ID**: `site_page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SitePageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<SitePageDocumentData>, "site_page", Lang>;

/**
 * Item in *Site Settings → Main navigation*
 */
export interface SiteSettingsDocumentDataNavigationItem {
	/**
	 * Label field in *Site Settings → Main navigation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.navigation[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Destination field in *Site Settings → Main navigation*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.navigation[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *Site Settings → Pillar submenu*
 */
export interface SiteSettingsDocumentDataPillarNavigationItem {
	/**
	 * Label field in *Site Settings → Pillar submenu*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.pillar_navigation[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Destination field in *Site Settings → Pillar submenu*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.pillar_navigation[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *Site Settings → Footer quick links*
 */
export interface SiteSettingsDocumentDataFooterQuickLinksItem {
	/**
	 * Label field in *Site Settings → Footer quick links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.footer_quick_links[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Destination field in *Site Settings → Footer quick links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.footer_quick_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *Site Settings → Footer information links*
 */
export interface SiteSettingsDocumentDataFooterInformationItem {
	/**
	 * Label field in *Site Settings → Footer information links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.footer_information[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Destination field in *Site Settings → Footer information links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.footer_information[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *Site Settings → Footer legal links*
 */
export interface SiteSettingsDocumentDataFooterLegalItem {
	/**
	 * Label field in *Site Settings → Footer legal links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.footer_legal[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Destination field in *Site Settings → Footer legal links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.footer_legal[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Content for Site Settings documents
 */
interface SiteSettingsDocumentData {
	/**
	 * Header logo field in *Site Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.header_logo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	header_logo: prismic.ImageField<never>;
	
	/**
	 * Footer logo field in *Site Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.footer_logo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	footer_logo: prismic.ImageField<never>;
	
	/**
	 * Main navigation field in *Site Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.navigation[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	navigation: prismic.GroupField<Simplify<SiteSettingsDocumentDataNavigationItem>>;
	
	/**
	 * Pillar submenu field in *Site Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.pillar_navigation[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	pillar_navigation: prismic.GroupField<Simplify<SiteSettingsDocumentDataPillarNavigationItem>>;
	
	/**
	 * Header button label field in *Site Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.cta_label
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_label: prismic.KeyTextField;
	
	/**
	 * Header button destination field in *Site Settings*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.cta_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Footer description field in *Site Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.footer_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	footer_description: prismic.KeyTextField;
	
	/**
	 * Footer quick links field in *Site Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.footer_quick_links[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	footer_quick_links: prismic.GroupField<Simplify<SiteSettingsDocumentDataFooterQuickLinksItem>>;
	
	/**
	 * Footer information links field in *Site Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.footer_information[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	footer_information: prismic.GroupField<Simplify<SiteSettingsDocumentDataFooterInformationItem>>;
	
	/**
	 * Footer legal links field in *Site Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.footer_legal[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	footer_legal: prismic.GroupField<Simplify<SiteSettingsDocumentDataFooterLegalItem>>;
	
	/**
	 * Copyright line field in *Site Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: site_settings.copyright
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	copyright: prismic.KeyTextField;
}

/**
 * Site Settings document from Prismic
 *
 * - **API ID**: `site_settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SiteSettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SiteSettingsDocumentData>, "site_settings", Lang>;

export type AllDocumentTypes = BlogPostDocument | ResearchPublicationDocument | SitePageDocument | SiteSettingsDocument;

/**
 * Primary content in *CallToAction → Default → Primary*
 */
export interface CallToActionSliceDefaultPrimary {
	/**
	 * Heading field in *CallToAction → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: call_to_action.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *CallToAction → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: call_to_action.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Button label field in *CallToAction → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: call_to_action.default.primary.button_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	button_label: prismic.KeyTextField;
	
	/**
	 * Button destination field in *CallToAction → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: call_to_action.default.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for CallToAction Slice
 *
 * - **API ID**: `default`
 * - **Description**: Heading, copy, and a button
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CallToActionSliceDefault = prismic.SharedSliceVariation<"default", Simplify<CallToActionSliceDefaultPrimary>, never>;

/**
 * Slice variation for *CallToAction*
 */
type CallToActionSliceVariation = CallToActionSliceDefault

/**
 * CallToAction Shared Slice
 *
 * - **API ID**: `call_to_action`
 * - **Description**: Heading, copy, and a button
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CallToActionSlice = prismic.SharedSlice<"call_to_action", CallToActionSliceVariation>;

/**
 * Item in *CardGrid → Default → Primary → Entries*
 */
export interface CardGridSliceDefaultPrimaryEntriesItem {
	/**
	 * Card heading field in *CardGrid → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.entries[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Card body field in *CardGrid → Default → Primary → Entries*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.entries[].body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Card image field in *CardGrid → Default → Primary → Entries*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.entries[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Image label field in *CardGrid → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.entries[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Button label field in *CardGrid → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.entries[].button_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	button_label: prismic.KeyTextField;
	
	/**
	 * Button destination field in *CardGrid → Default → Primary → Entries*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.entries[].button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *CardGrid → Default → Primary*
 */
export interface CardGridSliceDefaultPrimary {
	/**
	 * Section heading field in *CardGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Introduction field in *CardGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.intro
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	intro: prismic.RichTextField;
	
	/**
	 * Columns field in *CardGrid → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.columns
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	columns: prismic.SelectField<"two" | "three">;
	
	/**
	 * Background field in *CardGrid → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.background
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	background: prismic.SelectField<"paper" | "sunk">;
	
	/**
	 * Entries field in *CardGrid → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: card_grid.default.primary.entries[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	entries: prismic.GroupField<Simplify<CardGridSliceDefaultPrimaryEntriesItem>>;
}

/**
 * Default variation for CardGrid Slice
 *
 * - **API ID**: `default`
 * - **Description**: Two or three column cards with optional images and links
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CardGridSliceDefault = prismic.SharedSliceVariation<"default", Simplify<CardGridSliceDefaultPrimary>, never>;

/**
 * Slice variation for *CardGrid*
 */
type CardGridSliceVariation = CardGridSliceDefault

/**
 * CardGrid Shared Slice
 *
 * - **API ID**: `card_grid`
 * - **Description**: Two or three column cards with optional images and links
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CardGridSlice = prismic.SharedSlice<"card_grid", CardGridSliceVariation>;

/**
 * Primary content in *Contact → Default → Primary*
 */
export interface ContactSliceDefaultPrimary {
	/**
	 * Form heading field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Office heading field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.office_heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	office_heading: prismic.KeyTextField;
	
	/**
	 * Office introduction field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Address field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.address
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	address: prismic.KeyTextField;
	
	/**
	 * Telephone field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.phone
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	phone: prismic.KeyTextField;
	
	/**
	 * Email field in *Contact → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.default.primary.email
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	email: prismic.KeyTextField;
}

/**
 * Default variation for Contact Slice
 *
 * - **API ID**: `default`
 * - **Description**: Contact form beside editable office details
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ContactSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Contact*
 */
type ContactSliceVariation = ContactSliceDefault

/**
 * Contact Shared Slice
 *
 * - **API ID**: `contact`
 * - **Description**: Contact form beside editable office details
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContactSlice = prismic.SharedSlice<"contact", ContactSliceVariation>;

/**
 * Item in *Hero → Default → Primary → Hero metrics*
 */
export interface HeroSliceDefaultPrimaryMetricsItem {
	/**
	 * Value field in *Hero → Default → Primary → Hero metrics*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.metrics[].value
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	value: prismic.KeyTextField;
	
	/**
	 * Label field in *Hero → Default → Primary → Hero metrics*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.metrics[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
}

/**
 * Item in *Hero → Default → Primary → Hero topic strip*
 */
export interface HeroSliceDefaultPrimaryTagsItem {
	/**
	 * Topic field in *Hero → Default → Primary → Hero topic strip*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.tags[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
}

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Eyebrow field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Page title field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Lead copy field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Background image field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Use large home hero field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: hero.default.primary.home_style
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	home_style: prismic.BooleanField;
	
	/**
	 * Button label field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.button_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	button_label: prismic.KeyTextField;
	
	/**
	 * Button destination field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Hero metrics field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.metrics[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	metrics: prismic.GroupField<Simplify<HeroSliceDefaultPrimaryMetricsItem>>;
	
	/**
	 * Hero topic strip field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.tags[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	tags: prismic.GroupField<Simplify<HeroSliceDefaultPrimaryTagsItem>>;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Page title, lead copy, image, and optional button
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Page title, lead copy, image, and optional button
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Item in *ImageLinkGrid → Default → Primary → Entries*
 */
export interface ImageLinkGridSliceDefaultPrimaryEntriesItem {
	/**
	 * Title field in *ImageLinkGrid → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_link_grid.default.primary.entries[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Image field in *ImageLinkGrid → Default → Primary → Entries*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_link_grid.default.primary.entries[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Destination field in *ImageLinkGrid → Default → Primary → Entries*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_link_grid.default.primary.entries[].destination
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	destination: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *ImageLinkGrid → Default → Primary*
 */
export interface ImageLinkGridSliceDefaultPrimary {
	/**
	 * Section heading field in *ImageLinkGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_link_grid.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Introduction field in *ImageLinkGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_link_grid.default.primary.intro
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	intro: prismic.RichTextField;
	
	/**
	 * Entries field in *ImageLinkGrid → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_link_grid.default.primary.entries[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	entries: prismic.GroupField<Simplify<ImageLinkGridSliceDefaultPrimaryEntriesItem>>;
}

/**
 * Default variation for ImageLinkGrid Slice
 *
 * - **API ID**: `default`
 * - **Description**: About page fieldwork image links
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageLinkGridSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ImageLinkGridSliceDefaultPrimary>, never>;

/**
 * Slice variation for *ImageLinkGrid*
 */
type ImageLinkGridSliceVariation = ImageLinkGridSliceDefault

/**
 * ImageLinkGrid Shared Slice
 *
 * - **API ID**: `image_link_grid`
 * - **Description**: About page fieldwork image links
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageLinkGridSlice = prismic.SharedSlice<"image_link_grid", ImageLinkGridSliceVariation>;

/**
 * Primary content in *Inquiry → Default → Primary*
 */
export interface InquirySliceDefaultPrimary {
	/**
	 * Heading field in *Inquiry → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: inquiry.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *Inquiry → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: inquiry.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * Default variation for Inquiry Slice
 *
 * - **API ID**: `default`
 * - **Description**: Short inquiry form beside editable introduction
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type InquirySliceDefault = prismic.SharedSliceVariation<"default", Simplify<InquirySliceDefaultPrimary>, never>;

/**
 * Slice variation for *Inquiry*
 */
type InquirySliceVariation = InquirySliceDefault

/**
 * Inquiry Shared Slice
 *
 * - **API ID**: `inquiry`
 * - **Description**: Short inquiry form beside editable introduction
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type InquirySlice = prismic.SharedSlice<"inquiry", InquirySliceVariation>;

/**
 * Item in *LinkList → Default → Primary → Entries*
 */
export interface LinkListSliceDefaultPrimaryEntriesItem {
	/**
	 * Row title field in *LinkList → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_list.default.primary.entries[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Row body field in *LinkList → Default → Primary → Entries*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_list.default.primary.entries[].body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Button label field in *LinkList → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_list.default.primary.entries[].button_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	button_label: prismic.KeyTextField;
	
	/**
	 * Button destination field in *LinkList → Default → Primary → Entries*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_list.default.primary.entries[].button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *LinkList → Default → Primary*
 */
export interface LinkListSliceDefaultPrimary {
	/**
	 * Section heading field in *LinkList → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_list.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Introduction field in *LinkList → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_list.default.primary.intro
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	intro: prismic.RichTextField;
	
	/**
	 * Entries field in *LinkList → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: link_list.default.primary.entries[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	entries: prismic.GroupField<Simplify<LinkListSliceDefaultPrimaryEntriesItem>>;
}

/**
 * Default variation for LinkList Slice
 *
 * - **API ID**: `default`
 * - **Description**: Pillars, focus areas, or other linked rows
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type LinkListSliceDefault = prismic.SharedSliceVariation<"default", Simplify<LinkListSliceDefaultPrimary>, never>;

/**
 * Slice variation for *LinkList*
 */
type LinkListSliceVariation = LinkListSliceDefault

/**
 * LinkList Shared Slice
 *
 * - **API ID**: `link_list`
 * - **Description**: Pillars, focus areas, or other linked rows
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type LinkListSlice = prismic.SharedSlice<"link_list", LinkListSliceVariation>;

/**
 * Default variation for NewsList Slice
 *
 * - **API ID**: `default`
 * - **Description**: Current Prismic blog posts with filters
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type NewsListSliceDefault = prismic.SharedSliceVariation<"default", Record<string, never>, never>;

/**
 * Slice variation for *NewsList*
 */
type NewsListSliceVariation = NewsListSliceDefault

/**
 * NewsList Shared Slice
 *
 * - **API ID**: `news_list`
 * - **Description**: Current Prismic blog posts with filters
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type NewsListSlice = prismic.SharedSlice<"news_list", NewsListSliceVariation>;

/**
 * Item in *PillarAccordion → Default → Primary → Entries*
 */
export interface PillarAccordionSliceDefaultPrimaryEntriesItem {
	/**
	 * Pillar title field in *PillarAccordion → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_accordion.default.primary.entries[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *PillarAccordion → Default → Primary → Entries*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_accordion.default.primary.entries[].body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Background image field in *PillarAccordion → Default → Primary → Entries*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_accordion.default.primary.entries[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Destination field in *PillarAccordion → Default → Primary → Entries*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_accordion.default.primary.entries[].destination
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	destination: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *PillarAccordion → Default → Primary*
 */
export interface PillarAccordionSliceDefaultPrimary {
	/**
	 * Section heading field in *PillarAccordion → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_accordion.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Introduction field in *PillarAccordion → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_accordion.default.primary.intro
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	intro: prismic.RichTextField;
	
	/**
	 * Entries field in *PillarAccordion → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_accordion.default.primary.entries[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	entries: prismic.GroupField<Simplify<PillarAccordionSliceDefaultPrimaryEntriesItem>>;
}

/**
 * Default variation for PillarAccordion Slice
 *
 * - **API ID**: `default`
 * - **Description**: Expandable research pillar panels
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PillarAccordionSliceDefault = prismic.SharedSliceVariation<"default", Simplify<PillarAccordionSliceDefaultPrimary>, never>;

/**
 * Slice variation for *PillarAccordion*
 */
type PillarAccordionSliceVariation = PillarAccordionSliceDefault

/**
 * PillarAccordion Shared Slice
 *
 * - **API ID**: `pillar_accordion`
 * - **Description**: Expandable research pillar panels
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PillarAccordionSlice = prismic.SharedSlice<"pillar_accordion", PillarAccordionSliceVariation>;

/**
 * Item in *PillarCards → Default → Primary → Entries*
 */
export interface PillarCardsSliceDefaultPrimaryEntriesItem {
	/**
	 * Title field in *PillarCards → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_cards.default.primary.entries[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Image badge field in *PillarCards → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_cards.default.primary.entries[].badge
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	badge: prismic.KeyTextField;
	
	/**
	 * Statistic chip field in *PillarCards → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_cards.default.primary.entries[].stat
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	stat: prismic.KeyTextField;
	
	/**
	 * Image field in *PillarCards → Default → Primary → Entries*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_cards.default.primary.entries[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Description field in *PillarCards → Default → Primary → Entries*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_cards.default.primary.entries[].body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Destination field in *PillarCards → Default → Primary → Entries*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_cards.default.primary.entries[].destination
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	destination: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *PillarCards → Default → Primary*
 */
export interface PillarCardsSliceDefaultPrimary {
	/**
	 * Section heading field in *PillarCards → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_cards.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Introduction field in *PillarCards → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_cards.default.primary.intro
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	intro: prismic.RichTextField;
	
	/**
	 * Entries field in *PillarCards → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pillar_cards.default.primary.entries[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	entries: prismic.GroupField<Simplify<PillarCardsSliceDefaultPrimaryEntriesItem>>;
}

/**
 * Default variation for PillarCards Slice
 *
 * - **API ID**: `default`
 * - **Description**: About page illustrated pillar cards
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PillarCardsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<PillarCardsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *PillarCards*
 */
type PillarCardsSliceVariation = PillarCardsSliceDefault

/**
 * PillarCards Shared Slice
 *
 * - **API ID**: `pillar_cards`
 * - **Description**: About page illustrated pillar cards
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PillarCardsSlice = prismic.SharedSlice<"pillar_cards", PillarCardsSliceVariation>;

/**
 * Default variation for PublicationList Slice
 *
 * - **API ID**: `default`
 * - **Description**: Current Prismic publications with filters
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PublicationListSliceDefault = prismic.SharedSliceVariation<"default", Record<string, never>, never>;

/**
 * Slice variation for *PublicationList*
 */
type PublicationListSliceVariation = PublicationListSliceDefault

/**
 * PublicationList Shared Slice
 *
 * - **API ID**: `publication_list`
 * - **Description**: Current Prismic publications with filters
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PublicationListSlice = prismic.SharedSlice<"publication_list", PublicationListSliceVariation>;

/**
 * Primary content in *Quote → Default → Primary*
 */
export interface QuoteSliceDefaultPrimary {
	/**
	 * Statement field in *Quote → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: quote.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Background image field in *Quote → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: quote.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Default variation for Quote Slice
 *
 * - **API ID**: `default`
 * - **Description**: Full-width statement on an image
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type QuoteSliceDefault = prismic.SharedSliceVariation<"default", Simplify<QuoteSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Quote*
 */
type QuoteSliceVariation = QuoteSliceDefault

/**
 * Quote Shared Slice
 *
 * - **API ID**: `quote`
 * - **Description**: Full-width statement on an image
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type QuoteSlice = prismic.SharedSlice<"quote", QuoteSliceVariation>;

/**
 * Item in *Stats → Default → Primary → Entries*
 */
export interface StatsSliceDefaultPrimaryEntriesItem {
	/**
	 * Value field in *Stats → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats.default.primary.entries[].value
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	value: prismic.KeyTextField;
	
	/**
	 * Label field in *Stats → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats.default.primary.entries[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
}

/**
 * Primary content in *Stats → Default → Primary*
 */
export interface StatsSliceDefaultPrimary {
	/**
	 * Optional heading field in *Stats → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Entries field in *Stats → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stats.default.primary.entries[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	entries: prismic.GroupField<Simplify<StatsSliceDefaultPrimaryEntriesItem>>;
}

/**
 * Default variation for Stats Slice
 *
 * - **API ID**: `default`
 * - **Description**: Impact band with any number of statistics
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type StatsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<StatsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Stats*
 */
type StatsSliceVariation = StatsSliceDefault

/**
 * Stats Shared Slice
 *
 * - **API ID**: `stats`
 * - **Description**: Impact band with any number of statistics
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type StatsSlice = prismic.SharedSlice<"stats", StatsSliceVariation>;

/**
 * Item in *Team → Default → Primary → Entries*
 */
export interface TeamSliceDefaultPrimaryEntriesItem {
	/**
	 * Anchor ID (e.g. ida-githu) field in *Team → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.entries[].id
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	id: prismic.KeyTextField;
	
	/**
	 * Name field in *Team → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.entries[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Initials field in *Team → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.entries[].initials
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	initials: prismic.KeyTextField;
	
	/**
	 * Role field in *Team → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.entries[].role
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	role: prismic.KeyTextField;
	
	/**
	 * Portrait field in *Team → Default → Primary → Entries*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.entries[].photo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo: prismic.ImageField<never>;
	
	/**
	 * LinkedIn field in *Team → Default → Primary → Entries*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.entries[].linkedin
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	linkedin: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Scholar profile field in *Team → Default → Primary → Entries*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.entries[].scholar
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	scholar: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Biography field in *Team → Default → Primary → Entries*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.entries[].bio
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	bio: prismic.RichTextField;
}

/**
 * Primary content in *Team → Default → Primary*
 */
export interface TeamSliceDefaultPrimary {
	/**
	 * Entries field in *Team → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: team.default.primary.entries[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	entries: prismic.GroupField<Simplify<TeamSliceDefaultPrimaryEntriesItem>>;
}

/**
 * Default variation for Team Slice
 *
 * - **API ID**: `default`
 * - **Description**: Editable team cards and biographies
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TeamSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TeamSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Team*
 */
type TeamSliceVariation = TeamSliceDefault

/**
 * Team Shared Slice
 *
 * - **API ID**: `team`
 * - **Description**: Editable team cards and biographies
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TeamSlice = prismic.SharedSlice<"team", TeamSliceVariation>;

/**
 * Primary content in *TextColumns → Default → Primary*
 */
export interface TextColumnsSliceDefaultPrimary {
	/**
	 * Section heading field in *TextColumns → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_columns.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Introduction field in *TextColumns → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_columns.default.primary.intro
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	intro: prismic.RichTextField;
	
	/**
	 * Left column field in *TextColumns → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_columns.default.primary.left_body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	left_body: prismic.RichTextField;
	
	/**
	 * Right column field in *TextColumns → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_columns.default.primary.right_body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	right_body: prismic.RichTextField;
}

/**
 * Default variation for TextColumns Slice
 *
 * - **API ID**: `default`
 * - **Description**: Introduction and two text columns
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextColumnsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TextColumnsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *TextColumns*
 */
type TextColumnsSliceVariation = TextColumnsSliceDefault

/**
 * TextColumns Shared Slice
 *
 * - **API ID**: `text_columns`
 * - **Description**: Introduction and two text columns
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextColumnsSlice = prismic.SharedSlice<"text_columns", TextColumnsSliceVariation>;

/**
 * Primary content in *TextImage → Default → Primary*
 */
export interface TextImageSliceDefaultPrimary {
	/**
	 * Heading field in *TextImage → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_image.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *TextImage → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_image.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Image field in *TextImage → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_image.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Image label field in *TextImage → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_image.default.primary.image_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	image_label: prismic.KeyTextField;
	
	/**
	 * Button label field in *TextImage → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_image.default.primary.button_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	button_label: prismic.KeyTextField;
	
	/**
	 * Button destination field in *TextImage → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_image.default.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for TextImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: Image beside formatted copy
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextImageSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TextImageSliceDefaultPrimary>, never>;

/**
 * Slice variation for *TextImage*
 */
type TextImageSliceVariation = TextImageSliceDefault

/**
 * TextImage Shared Slice
 *
 * - **API ID**: `text_image`
 * - **Description**: Image beside formatted copy
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextImageSlice = prismic.SharedSlice<"text_image", TextImageSliceVariation>;

/**
 * Item in *Timeline → Default → Primary → Entries*
 */
export interface TimelineSliceDefaultPrimaryEntriesItem {
	/**
	 * Year field in *Timeline → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: timeline.default.primary.entries[].year
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	year: prismic.KeyTextField;
	
	/**
	 * Title field in *Timeline → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: timeline.default.primary.entries[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *Timeline → Default → Primary → Entries*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: timeline.default.primary.entries[].body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * Primary content in *Timeline → Default → Primary*
 */
export interface TimelineSliceDefaultPrimary {
	/**
	 * Heading field in *Timeline → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: timeline.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Entries field in *Timeline → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: timeline.default.primary.entries[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	entries: prismic.GroupField<Simplify<TimelineSliceDefaultPrimaryEntriesItem>>;
}

/**
 * Default variation for Timeline Slice
 *
 * - **API ID**: `default`
 * - **Description**: Institute milestones
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TimelineSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TimelineSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Timeline*
 */
type TimelineSliceVariation = TimelineSliceDefault

/**
 * Timeline Shared Slice
 *
 * - **API ID**: `timeline`
 * - **Description**: Institute milestones
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TimelineSlice = prismic.SharedSlice<"timeline", TimelineSliceVariation>;

/**
 * Item in *WorkCards → Default → Primary → Entries*
 */
export interface WorkCardsSliceDefaultPrimaryEntriesItem {
	/**
	 * Title field in *WorkCards → Default → Primary → Entries*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: work_cards.default.primary.entries[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *WorkCards → Default → Primary → Entries*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: work_cards.default.primary.entries[].body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * Primary content in *WorkCards → Default → Primary*
 */
export interface WorkCardsSliceDefaultPrimary {
	/**
	 * Section heading field in *WorkCards → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: work_cards.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Introduction field in *WorkCards → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: work_cards.default.primary.intro
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	intro: prismic.RichTextField;
	
	/**
	 * Entries field in *WorkCards → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: work_cards.default.primary.entries[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	entries: prismic.GroupField<Simplify<WorkCardsSliceDefaultPrimaryEntriesItem>>;
}

/**
 * Default variation for WorkCards Slice
 *
 * - **API ID**: `default`
 * - **Description**: Numbered capability cards
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type WorkCardsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<WorkCardsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *WorkCards*
 */
type WorkCardsSliceVariation = WorkCardsSliceDefault

/**
 * WorkCards Shared Slice
 *
 * - **API ID**: `work_cards`
 * - **Description**: Numbered capability cards
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type WorkCardsSlice = prismic.SharedSlice<"work_cards", WorkCardsSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			BlogPostDocument,
			BlogPostDocumentData,
			BlogPostDocumentDataKeyTakeawaysItem,
			BlogPostDocumentDataSidebarStatsItem,
			BlogPostDocumentDataReferencesItem,
			ResearchPublicationDocument,
			ResearchPublicationDocumentData,
			SitePageDocument,
			SitePageDocumentData,
			SitePageDocumentDataSlicesSlice,
			SiteSettingsDocument,
			SiteSettingsDocumentData,
			SiteSettingsDocumentDataNavigationItem,
			SiteSettingsDocumentDataPillarNavigationItem,
			SiteSettingsDocumentDataFooterQuickLinksItem,
			SiteSettingsDocumentDataFooterInformationItem,
			SiteSettingsDocumentDataFooterLegalItem,
			AllDocumentTypes,
			CallToActionSlice,
			CallToActionSliceDefaultPrimary,
			CallToActionSliceVariation,
			CallToActionSliceDefault,
			CardGridSlice,
			CardGridSliceDefaultPrimaryEntriesItem,
			CardGridSliceDefaultPrimary,
			CardGridSliceVariation,
			CardGridSliceDefault,
			ContactSlice,
			ContactSliceDefaultPrimary,
			ContactSliceVariation,
			ContactSliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimaryMetricsItem,
			HeroSliceDefaultPrimaryTagsItem,
			HeroSliceDefaultPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			ImageLinkGridSlice,
			ImageLinkGridSliceDefaultPrimaryEntriesItem,
			ImageLinkGridSliceDefaultPrimary,
			ImageLinkGridSliceVariation,
			ImageLinkGridSliceDefault,
			InquirySlice,
			InquirySliceDefaultPrimary,
			InquirySliceVariation,
			InquirySliceDefault,
			LinkListSlice,
			LinkListSliceDefaultPrimaryEntriesItem,
			LinkListSliceDefaultPrimary,
			LinkListSliceVariation,
			LinkListSliceDefault,
			NewsListSlice,
			NewsListSliceVariation,
			NewsListSliceDefault,
			PillarAccordionSlice,
			PillarAccordionSliceDefaultPrimaryEntriesItem,
			PillarAccordionSliceDefaultPrimary,
			PillarAccordionSliceVariation,
			PillarAccordionSliceDefault,
			PillarCardsSlice,
			PillarCardsSliceDefaultPrimaryEntriesItem,
			PillarCardsSliceDefaultPrimary,
			PillarCardsSliceVariation,
			PillarCardsSliceDefault,
			PublicationListSlice,
			PublicationListSliceVariation,
			PublicationListSliceDefault,
			QuoteSlice,
			QuoteSliceDefaultPrimary,
			QuoteSliceVariation,
			QuoteSliceDefault,
			StatsSlice,
			StatsSliceDefaultPrimaryEntriesItem,
			StatsSliceDefaultPrimary,
			StatsSliceVariation,
			StatsSliceDefault,
			TeamSlice,
			TeamSliceDefaultPrimaryEntriesItem,
			TeamSliceDefaultPrimary,
			TeamSliceVariation,
			TeamSliceDefault,
			TextColumnsSlice,
			TextColumnsSliceDefaultPrimary,
			TextColumnsSliceVariation,
			TextColumnsSliceDefault,
			TextImageSlice,
			TextImageSliceDefaultPrimary,
			TextImageSliceVariation,
			TextImageSliceDefault,
			TimelineSlice,
			TimelineSliceDefaultPrimaryEntriesItem,
			TimelineSliceDefaultPrimary,
			TimelineSliceVariation,
			TimelineSliceDefault,
			WorkCardsSlice,
			WorkCardsSliceDefaultPrimaryEntriesItem,
			WorkCardsSliceDefaultPrimary,
			WorkCardsSliceVariation,
			WorkCardsSliceDefault
		}
	}
}