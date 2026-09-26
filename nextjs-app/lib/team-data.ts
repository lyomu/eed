export type TeamMember = {
  id: string;
  initials: string;
  name: string;
  role: string;
  photo: string;
  linkedin?: string;
  scholar?: string;
  /** Undefined for members without a biography yet (the modal shows
   *  "Full biography coming soon." for these — see .modal-bio:empty in CSS). */
  bio?: string[];
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'ida-githu',
    initials: 'IG',
    name: 'Dr. Ida Githu',
    role: 'Managing Director',
    photo: '/assets/team/ida-githu.jpg?v=grey',
    linkedin: 'https://www.linkedin.com/in/idagithu',
    bio: [
      'Ida Githu is a researcher and policy specialist whose work bridges the critical fields of water, sanitation, and hygiene (WASH), energy access, and climate change adaptation across sub-Saharan Africa.',
      'Her research is distinguished by its empirical grounding. Her extensive fieldwork spans Kenya, Somalia, Uganda, Nigeria, and Ghana, employing household surveys, water point assessments, and mixed-methods evaluations of WASH and energy programs.',
      "At EED Research Institute, Ida provides intellectual leadership for the organization's research portfolio at the WASH, energy, and climate nexus. She oversees the strategic design and execution of multi-country research programs, ensuring that evidence directly informs policy dialogue. Her thematic interests include climate-resilient water systems, green technology transfer and intellectual property frameworks in Africa, and the design of policy instruments that advance equitable, inclusive development outcomes. Through her work, she remains committed to translating rigorous data into governance solutions that serve the most vulnerable communities.",
      'She holds a Doctor of International Affairs from Johns Hopkins University, where her dissertation examined the determinants of successful community-managed piped water supplies in rural Kenya. She also earned a Master of International Public Policy from Johns Hopkins, an MSc in Water Science, Policy, and Management from the University of Oxford, and dual undergraduate degrees in Chemical Engineering and Chemistry from North Carolina State University and Meredith College, respectively.',
    ],
  },
  {
    id: 'elmah-odhiambo',
    initials: 'EO',
    name: 'Elmah Odhiambo',
    role: 'Research Coordinator',
    photo: '/assets/team/elmah-odhiambo.jpg?v=grey',
    linkedin: 'https://ke.linkedin.com/in/elmah-odhiambo-24969363',
    scholar: 'https://scholar.google.com/citations?user=F3PpIHAAAAAJ&hl=en',
    bio: [
      'Elmah Odhiambo is a multidisciplinary researcher and environmental governance scholar whose work spans WASH, policy and governance, the circular economy, disasters, and sustainable development. His career is defined by a commitment to bridging evidence-based research and practical advisory to address complex environmental and development challenges across Africa.',
      "At ERI, Elmah coordinates research from conceptualization to completion, leading projects that generate actionable insights at the WASH, energy, and climate nexus. His research portfolio includes peer-reviewed publications on plastic waste management, circular economy governance, and policy issues — with notable work examining Kenya's e-waste sector and the country's plastic carrier bags ban. His scholarship is distinguished by its direct policy relevance and its grounding in real-world governance challenges.",
      'In addition to his research role, he serves as an Adjunct Lecturer at the Cooperative University of Kenya, where he teaches courses on disaster risk reduction, ecosystem management and conservation, energy resource management, and sustainable development.',
      'He holds an MSc in Environmental Governance from the University of Nairobi, Kenya. Elmah is also a certified Environmental Management Systems (EMS) Auditor.',
    ],
  },
  {
    id: 'winnie-musivo',
    initials: 'WM',
    name: 'Dr. Winnie Musivo',
    role: 'Director (Partnerships and Strategy)',
    photo: '/assets/team/winnie-musivo.jpg?v=grey',
    linkedin: 'https://www.linkedin.com/in/winnie-musivo-b7b346a4/',
    bio: [
      "Winnie Musivo is a lead researcher in development, climate, and energy finance in the Global South, studying public and private capital needs, flows, and use; the governance of energy transitions; and the socio-economic impacts of climate and energy interventions. At EED Research Institute, she leads research on the future of energy systems and technologies for industrialisation and development outcomes, markets and investments in emerging economies, and data-led climate transition pathways.",
      "In her leadership role as the Director of Partnerships and Strategy at ERI, she fosters partnerships and institutional growth to expand ERI's reach and impact. She steers ERI's coordination with EED Advisory and its network of academic, research, and funding partners, sets fundraising strategy, and builds the collaborations that connect rigorous research to the resources and platforms it needs to shape policy and influence.",
      "Winnie also holds a Postdoctoral Research position at the University of Oxford's Institute for Innovation, Science and Society (InSIS), conducting research on geothermal energy and Carbon Dioxide Removal (CDR) and producing academic and policy outputs.",
      'Earlier in her career, Winnie was a Senior Consultant for portfolio and impact reporting at KawiSafi Ventures, a US$67 million clean energy fund. As a Senior Associate at EED Advisory, she led energy and climate finance research for clients including the IFC, WRI, the Energy for Growth Hub, AfDB, and AECF’s SIDA-funded REACT SSA Fund. Her research and advisory work spans Kenya, Rwanda, Uganda, Mozambique, and Nigeria, with further reform-focused engagements across 14 countries in Sub-Saharan Africa.',
      'She holds a PhD in Development, Climate and Energy Finance from the University of Sheffield, where she developed a mathematical methodology for evaluating sustainable investments. She has an MSc in Environmental Change and International Development from the University of Sheffield, and a BSc in Geospatial Engineering from the University of Nairobi.',
    ],
  },
  {
    id: 'abigael-okoko',
    initials: 'AO',
    name: 'Dr. Abigael Okoko',
    role: 'Research Fellow',
    photo: '/assets/team/abigael-okoko.jpg?v=grey',
    linkedin: 'https://www.linkedin.com/in/abigael-okoko-phd-2279ba59/',
    scholar: 'https://scholar.google.com/citations?view_op=new_articles&hl=en&imq=Abigael+Okoko',
    bio: [
      'Abigael Okoko is an Environmental Planning and Management professional with over a decade of experience bridging research, policy, and practice to expand energy access and clean cooking solutions across East Africa. Her work is distinguished by a commitment to designing evidence-based energy transitions that are both sustainable and people-centered.',
      'As a Research Fellow at ERI, she leads major research initiatives on energy access and low-carbon transitions, overseeing projects that generate rigorous evidence to guide national and regional energy policy. Prior to joining ERI, she spearheaded the energy domain at the Nuvoni Centre for Innovation Research, where she coordinated field studies on mini-grids and electric cooking in off-grid communities. Her work at Nuvoni produced actionable insights that continue to influence energy programming across East Africa.',
      'Abigael is also a seasoned academic and capacity builder. She lectured at Masinde Muliro University of Science and Technology (MMUST) and Great Lakes University of Kisumu (GLUK), where she taught and mentored students in environmental planning, energy policy, and sustainable development. Her peer-reviewed research on biomass energy value chains and carbon footprints has been published in reputable journals and continues to inform clean cooking policy and practice.',
      'Abigael holds a PhD in Environmental Planning from the University of Nairobi, Kenya, where she developed a strong foundation in the policy and planning frameworks that shape energy access and environmental sustainability. This academic grounding informs her applied research and her ability to translate complex technical evidence into actionable policy recommendations.',
    ],
  },
  {
    id: 'cheikh-mbodji',
    initials: 'CM',
    name: 'Dr. Cheikh Mbodji',
    role: 'Research Fellow',
    photo: '/assets/team/cheikh-mbodji.jpg?v=grey',
    linkedin: 'https://www.linkedin.com/in/cheikh-ahmadou-mbodji-phd-827967136/',
    bio: [
      "Cheikh is an accomplished renewable energy researcher with extensive experience spanning West and East Africa as well as Europe. His work has taken him to Senegal, Burkina Faso, Mali, Côte d'Ivoire, Togo, Gambia, Rwanda, Kenya, Burundi, Germany, and Austria — a geographic breadth that reflects his deep commitment to advancing sustainable energy transitions across diverse contexts.",
      'His research is distinguished by its policy relevance and its grounding in real-world market dynamics. Cheikh has published numerous articles in leading scientific journals, including Elsevier and Springer, and has contributed influential knowledge products such as the state-of-the-market report on PUE technologies in Burkina Faso. His scholarship combines technical depth with actionable insights for policymakers and practitioners.',
      'Cheikh brings a unique ability to navigate complex stakeholder environments, working effectively with governments, private sector actors, development partners, and local communities. His deep understanding of policy frameworks, market dynamics, and data-driven insights enables him to develop actionable strategies that drive impact and foster sustainable energy transitions. With a passion for distributed renewable energy and inclusive energy solutions, he remains committed to advancing energy access as a cornerstone of equitable, climate-resilient development across Africa and beyond.',
      'He holds a PhD in Bioenergy, alongside advanced degrees in Renewable Energies and Applied Physics from Gaston Berger University. This combination of scientific rigor and applied research expertise enables him to bridge the gap between technical innovation and practical implementation. He has spearheaded impactful initiatives, including productive use of energy (PUE) market development, energy sector audits, and green financing mechanisms for organizations such as USAID, Deloitte, IFC, and AECF.',
    ],
  },
  {
    id: 'carl-ngaira',
    initials: 'CN',
    name: 'Carl Ngaira',
    role: 'Executive Assistant',
    photo: '/assets/team/carl-ngaira.jpg?v=grey',
    linkedin: 'https://www.linkedin.com/in/carl-ngaira-56b76215b/',
    // No bio yet — matches the original site, which has no <template> for him.
  },
];
