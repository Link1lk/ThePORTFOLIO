/* =============================================
   STUDIO AZIZ — MAIN JS
   ============================================= */

// ── CURSOR ──────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let fx = 0, fy = 0, mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// ── NAV SCROLL ──────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE BURGER ───────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
if (burger) {
  burger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.cssText = open
      ? ''
      : 'display:flex;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(12,12,12,0.98);align-items:center;justify-content:center;gap:2rem;z-index:99;';
    burger.children[0].style.transform = open ? '' : 'rotate(45deg) translate(5px,5px)';
    burger.children[1].style.transform = open ? '' : 'rotate(-45deg) translate(5px,-5px)';
  });
}

// ── SCROLL REVEAL ───────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.index ? parseInt(entry.target.dataset.index) * 80 : 0);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// ── STAGGER CAT CARDS ───────────────────────
document.querySelectorAll('.cat-card').forEach((card, i) => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => card.classList.add('visible'), i * 120);
        obs.unobserve(card);
      }
    });
  }, { threshold: 0.1 });
  obs.observe(card);
});

// ── WORK FILTER ─────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    workCards.forEach((card, i) => {
      const matches = filter === 'all' || card.dataset.cat === filter;
      if (matches) {
        card.classList.remove('hidden');
        card.style.animationDelay = (i * 40) + 'ms';
        card.classList.add('fade-in');
        setTimeout(() => card.classList.remove('fade-in'), 600);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── CONTACT FORM → GMAIL ────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const project = form.querySelector('#project').value;
    const message = form.querySelector('#message').value.trim();

    const to      = 'hello@studioaziz.com';
    const subject = encodeURIComponent(`[Studio Aziz] ${project || 'Project Enquiry'} — ${name}`);
    const body    = encodeURIComponent(
`Name: ${name}
Email: ${email}
Project Type: ${project || 'Not specified'}

Message:
${message}

---
Sent from studioaziz.com contact form`
    );

    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${subject}&body=${body}`;
    window.open(gmailURL, '_blank');

    const btn = form.querySelector('.submit-btn');
    btn.querySelector('.btn-text').textContent = 'Opening Gmail…';
    setTimeout(() => {
      btn.querySelector('.btn-text').textContent = 'Send via Gmail';
      form.reset();
    }, 2000);
  });
}

// ── FAQ TOGGLE ──────────────────────────────
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}


// ── PROJECT POPUP ────────────────────────────
const PROJECTS = {
  'zt-delivery': {
    cat: 'Brand Identity',
    title: 'ZT Delivery',
    desc: 'Complete brand identity for ZT Delivery — a fast-delivery service built around the idea of speed made visible. The logotype fuses bold ZT letterforms with motion lines and a truck icon, communicating instant reliability. The system covers fleet vehicle wraps, scooter boxes, staff polos, branded caps, and office wall signage.',
    gradient: 'linear-gradient(135deg,#1a4d1a,#39c939)',
    tools: ['Ai', 'Ps'],
    details: [
      { label: 'Deliverables', value: 'Logo, Truck Wrap, Scooter Box, Uniform, Cap, Office Signage' },
      { label: 'Timeline', value: '1 Week' },
      { label: 'Palette', value: '#1A1A1A · #3CB944 · #FFFFFF' },
    ],
    swatches: ['#1A1A1A', '#3CB944', '#FFFFFF', '#2D8A2D'],
    mocks: [
      { label: 'Cargo Truck Wrap', img: 'images/1778341024851_delivery_cargo_truck.jpg' },
      { label: 'Scooter Box', img: 'images/1778340995569_ScooterBox.jpg' },
      { label: 'Office Wall Logo', img: 'images/1778341011176_Logo_in_Conference_Room_Mockup_1.jpg' },
      { label: 'Staff Polo — Front', img: 'images/1778341018543_Front.png', bg: '#0d0d0d' },
      { label: 'Staff Polo — Back', img: 'images/1778341018543_Back.png', bg: '#0d0d0d' },
      { label: 'Branded Cap', img: 'images/1778341004618_CAP2.png', bg: '#0d0d0d' },
    ]
  },
  'margosa': {
    cat: 'Brand Identity · Packaging',
    title: 'MARGOSA',
    desc: 'Complete brand identity for MARGOSA, a premium anti-dandruff hair care line inspired by natural neem leaves. The interlocking M monogram balances botanical elegance with scientific credibility. The system covers bottle label design, logo suite, delivery staff uniform, and a product campaign poster — all anchored in a deep forest-green and cream palette.',
    gradient: 'linear-gradient(135deg,#354024,#689063)',
    tools: ['Ai', 'Ps'],
    details: [
      { label: 'Deliverables', value: 'Logo Suite, Bottle Packaging, Campaign Poster, Staff Uniform' },
      { label: 'Timeline', value: '1 Week' },
      { label: 'Palette', value: '#354024 · #689063 · #EFEFE3' },
    ],
    swatches: ['#354024', '#689063', '#EFEFE3', '#1a2410'],
    mocks: [
      { label: 'Product Campaign', img: 'images/Affiche.png' },
      { label: 'Bottle Packaging', img: 'images/product.png', bg: '#0d0d0d' },
      { label: 'Logo — Dark', img: 'images/logoblack.png', bg: '#0d0d0d' },
      { label: 'Logo — Light', img: 'images/logowhite.png', bg: '#0d0d0d' },
      { label: 'Uniform — Front', img: 'images/front_tcheurtpng.png', bg: '#0d0d0d' },
      { label: 'Uniform — Back', img: 'images/back_tcheurt.png', bg: '#0d0d0d' },
    ]
  },
  'moonveil': {
    cat: 'Brand Identity · Social Media',
    title: 'MOONVEIL',
    desc: 'Full brand identity for MOONVEIL Parfumerie — a luxury fragrance brand where lunar mysticism meets botanical elegance. The crescent-and-lotus logo anchors a rich purple palette carried across four scent campaign posters (Coco, Jasmine, OUD, Vanilla), custom perfume bottle visuals, a product brochure, and social media ad creatives for Instagram and TikTok.',
    gradient: 'linear-gradient(135deg,#2e0f3c,#7b3fa0)',
    tools: ['Ai', 'Ps'],
    details: [
      { label: 'Deliverables', value: 'Logo Suite, Scent Posters ×4, Bottle Visuals, Brochure, Social Media Ads' },
      { label: 'Timeline', value: '2 Weeks' },
      { label: 'Palette', value: '#5C1A6E · #9B59B6 · #F5F0FA · #2A5C2A' },
    ],
    swatches: ['#5C1A6E', '#9B59B6', '#F5F0FA', '#2A5C2A'],
    mocks: [
      { label: 'Logo', img: 'images/moonveil-logo.png', bg: '#f5f0fa' },
      { label: 'Secondary Logo', img: 'images/moonveil-logosec.png', bg: '#f5f0fa' },
      { label: 'Logo Mockup — Signage', img: 'images/logo-mockup.jpg' },
      { label: 'Coco Poster', img: 'images/affiche-Coco.jpg' },
      { label: 'Jasmine Poster', img: 'images/affiche-Jasmine.jpg' },
      { label: 'OUD Poster', img: 'images/affiche-OUD.jpg' },
      { label: 'Vanilla Poster', img: 'images/affiche-vanilla.jpg' },
      { label: 'Brochure Mockup', img: 'images/mockup-brochure.jpg' },
      { label: 'Instagram Ad', img: 'images/insta.jpg' },
      { label: 'TikTok Ad', img: 'images/tiktok.jpg' },
    ]
  },
  'noire-cafe': {
    cat: 'Brand Identity',
    title: 'NOIRÉ',
    desc: 'Complete brand identity for NOIRÉ, a luxury coffee house concept. The gold-script logotype set inside a double circle mark channels old-world Parisian elegance. The system extends across matte-black takeaway cups, signage, a printed menu, cup carriers, and staff polos — every touchpoint reinforcing the same quiet opulence.',
    gradient: 'linear-gradient(135deg,#0d0d0d,#c9a84c)',
    tools: ['Ai', 'Ps'],
    details: [
      { label: 'Deliverables', value: 'Logo, Signage, Cups, Menu, Cup Carrier, Staff Uniform' },
      { label: 'Timeline', value: '4 Days' },
      { label: 'Palette', value: '#0D0D0D · #C9A84C · #F5EDD6' },
    ],
    swatches: ['#0D0D0D', '#C9A84C', '#F5EDD6', '#8B6914'],
    mocks: [
      { label: 'Store Signage', img: 'images/Sign_Mockup.png', bg: '#f0ece4' },
      { label: 'Cup — Front', img: 'images/front-coffee.png', bg: '#c9b99a' },
      { label: 'Cup — Back', img: 'images/Back-coffee.png', bg: '#c9b99a' },
      { label: 'Take Away Carrier', img: 'images/Take-Away-Paper-Cup.jpg' },
      { label: 'Staff Polo — Front', img: 'images/Gemini_Generated_Image_kbt50vkbt50vkbt5.png', bg: '#0d0d0d' },
      { label: 'Staff Polo — Back', img: 'images/Gemini_Generated_Image_ai9nlqai9nlqai9n.png', bg: '#0d0d0d' },
    ]
  },
  'golden-bite': {
    cat: 'Brand Identity',
    title: 'Golden Bite',
    desc: 'A complete food brand identity built on contrast — the boldness of street food culture fused with the refinement of luxury dining. The logotype makes the "bite" literal, with the "i" dot replaced by a chunk taken out. A matte-black-and-gold system runs across packaging, signage, and takeaway materials.',
    gradient: 'linear-gradient(135deg,#1a1400,#c9a84c)',
    tools: ['Ai', 'Ps'],
    details: [
      { label: 'Deliverables', value: 'Logo Suite, Packaging, Paper Bag, Food Truck Wrap, Signage' },
      { label: 'Timeline', value: '1 Week' },
    ],
    swatches: ['#0D0D0D', '#C9A84C', '#F5F0E8', '#E8A020'],
    mocks: [
      { label: 'Logo Signage Mockup', img: 'images/1778341420351_Logo-mockup_upscayl_3x_high-fidelity-4x.png' },
      { label: 'Paper Bag Mockup', img: 'images/Paper-bag.jpg' },
      { label: 'Logo Mark', img: 'images/BITE-logo.png', bg: '#F5F0E8' },
      { label: 'Food Packaging', img: 'images/Food-mockup.jpg' },
      { label: 'Food Truck', img: 'images/Food-truck_mockup.png', bg: '#1a1a1a' },
      { label: 'Panneau Publicitaire', img: 'images/1778341609889_panneaux.jpg' },
    ]
  },
  'noctra': {
    cat: 'Brand Identity',
    title: 'NOCTRA',
    desc: 'Complete brand identity for NOCTRA — a luxury streetwear label built on the tension between darkness and refinement. The custom logotype compresses N, C, T, R into an architectural monogram under a roof-like bar, channelling both urban grit and high-fashion restraint. The system spans apparel, street posters, packaging, and business cards.',
    gradient: 'linear-gradient(135deg,#0d0d0d,#39FF14)',
    tools: ['Ai', 'Ps'],
    details: [
      { label: 'Deliverables', value: 'Logo, Apparel, Street Posters, Packaging, Business Cards, Brand Sheet' },
      { label: 'Timeline', value: '1 Week' },
      { label: 'Palette', value: '#0D0D0D · #FEFBE3 · #7A7A7A · #39FF14' },
    ],
    swatches: ['#0D0D0D', '#FEFBE3', '#7A7A7A', '#39FF14'],
    mocks: [
      { label: 'Street Poster Campaign', img: 'images/01-Free-Vibrant-Three-Street-Poster-Mockup.jpg' },
      { label: 'Hoodie Editorial', img: 'images/poster-hoodie-fin.jpg' },
      { label: 'Hoodie Mockup', img: 'images/Hoodie.jpg' },
      { label: 'Brand Identity Sheet', img: 'images/IDENTITY-PROJET.jpg' },
      { label: 'Logo Mark', img: 'images/logo.png', bg: '#0d0d0d' },
      { label: 'Shopping Bag', img: 'images/Sans_titre_-_3-02.png', bg: '#f5f0e8' },
    ]
  },
  'noir-collective': {
    cat: 'Brand Identity',
    title: 'Noir Collective',
    desc: 'Complete brand system for a luxury streetwear label — monogram logo, brand guidelines, and a full seasonal lookbook. The system uses a stark black-and-crimson palette with hand-rendered calligraphic elements to bridge haute couture and street culture.',
    gradient: 'linear-gradient(135deg,#1a1a2e,#e94560)',
    tools: ['Ai', 'Ps'],
    details: [
      { label: 'Deliverables', value: 'Logo Suite, Brand Guide, Lookbook, Stationery' },
      { label: 'Timeline', value: '6 Weeks' },
      { label: 'Palette', value: '#0D0D0D · #E94560 · #F0EDE8' },
    ],
    swatches: ['#0D0D0D','#E94560','#F0EDE8','#8B0000'],
    mocks: [
      { label: 'Logo Mark', g: 'linear-gradient(135deg,#1a1a2e,#e94560)' },
      { label: 'Tote Mockup', g: 'linear-gradient(135deg,#0d0d0d,#333)' },
      { label: 'Lookbook Cover', g: 'linear-gradient(135deg,#e94560,#1a1a2e)' },
      { label: 'Tag Design', g: 'linear-gradient(135deg,#3a0020,#e94560)' },
    ]
  },
  'bloom-botanicals': {
    cat: 'Brand Identity',
    title: 'Bloom Botanicals',
    desc: 'Earthy yet refined identity for an organic skincare brand. Illustrated flora marks celebrate the botanical sourcing process while a warm, honeyed palette communicates natural luxury. Custom typeface pairing gives the brand an editorial quality.',
    gradient: 'linear-gradient(135deg,#f7c59f,#ef8354)',
    tools: ['Ai'],
    details: [
      { label: 'Deliverables', value: 'Logo, Illustration Set, Packaging, Brand Book' },
      { label: 'Timeline', value: '5 Weeks' },
      { label: 'Palette', value: '#F7C59F · #EF8354 · #3D2B1F' },
    ],
    swatches: ['#F7C59F','#EF8354','#3D2B1F','#FAEBD7'],
    mocks: [
      { label: 'Logo Mark', g: 'linear-gradient(135deg,#f7c59f,#ef8354)' },
      { label: 'Jar Label', g: 'linear-gradient(135deg,#FAEBD7,#f7c59f)' },
      { label: 'Flora Illustration', g: 'linear-gradient(135deg,#ef8354,#c8553d)' },
      { label: 'Brand Book', g: 'linear-gradient(135deg,#3D2B1F,#6b4226)' },
    ]
  },
  'aureum-studio': {
    cat: 'Brand Identity',
    title: 'Aureum Studio',
    desc: 'High-end architecture studio branding built on restraint. A minimalist wordmark in gold leaf paired with generous white space communicates confidence without noise. The stationery suite uses blind embossing and foil stamp for tactile luxury.',
    gradient: 'linear-gradient(135deg,#0d0d0d,#c9a84c)',
    tools: ['Ai','Ps'],
    details: [
      { label: 'Deliverables', value: 'Wordmark, Stationery Suite, Signage System' },
      { label: 'Timeline', value: '8 Weeks' },
      { label: 'Palette', value: '#0D0D0D · #C9A84C · #F5F1E8' },
    ],
    swatches: ['#0D0D0D','#C9A84C','#F5F1E8','#6b5a2e'],
    mocks: [
      { label: 'Wordmark', g: 'linear-gradient(135deg,#0d0d0d,#c9a84c)' },
      { label: 'Letterhead', g: 'linear-gradient(135deg,#F5F1E8,#e8dfc8)' },
      { label: 'Business Card', g: 'linear-gradient(135deg,#1a1612,#c9a84c)' },
      { label: 'Envelope', g: 'linear-gradient(135deg,#c9a84c,#8b6914)' },
    ]
  },
  'forma-magazine': {
    cat: 'Editorial Design',
    title: 'FORMA Magazine',
    desc: 'Art direction and full layout for a biannual architecture & design publication. A 96-page issue built from a custom 12-column grid system — every margin, baseline and image crop deliberate. Typographic hierarchy guided entirely by rhythm and proportion.',
    gradient: 'linear-gradient(135deg,#f0e6d3,#b5936b)',
    tools: ['Id','Ps'],
    details: [
      { label: 'Pages', value: '96 Pages, Biannual' },
      { label: 'Timeline', value: '10 Weeks' },
      { label: 'Palette', value: '#F0E6D3 · #B5936B · #1C1C1C' },
    ],
    swatches: ['#F0E6D3','#B5936B','#1C1C1C','#8B6914'],
    mocks: [
      { label: 'Cover', g: 'linear-gradient(135deg,#f0e6d3,#b5936b)' },
      { label: 'Spread Layout', g: 'linear-gradient(135deg,#e8dfc8,#c4a47c)' },
      { label: 'Chapter Opener', g: 'linear-gradient(135deg,#1C1C1C,#3d3020)' },
      { label: 'Typography Detail', g: 'linear-gradient(135deg,#b5936b,#8B6914)' },
    ]
  },
  'annual-report': {
    cat: 'Editorial Design',
    title: 'Annual Report 2025',
    desc: 'A 60-page corporate annual report that transforms dense financial data into a clear, engaging visual narrative. Custom infographic language, consistent icon set, and a strict typographic system make complex statistics readable and compelling.',
    gradient: 'linear-gradient(135deg,#1c1c1c,#e8e8e8)',
    tools: ['Id'],
    details: [
      { label: 'Pages', value: '60 Pages, Annual' },
      { label: 'Timeline', value: '4 Weeks' },
      { label: 'Palette', value: '#1C1C1C · #E8E8E8 · #C9A84C' },
    ],
    swatches: ['#1C1C1C','#E8E8E8','#C9A84C','#555'],
    mocks: [
      { label: 'Cover', g: 'linear-gradient(135deg,#1c1c1c,#e8e8e8)' },
      { label: 'Data Spread', g: 'linear-gradient(135deg,#2a2a2a,#c9a84c)' },
      { label: 'Infographic', g: 'linear-gradient(135deg,#e8e8e8,#aaa)' },
      { label: 'Back Cover', g: 'linear-gradient(135deg,#1c1c1c,#333)' },
    ]
  },
  'verde-cookbook': {
    cat: 'Editorial Design',
    title: 'Verde Cookbook',
    desc: 'Recipe book design with custom illustrated chapter openers, hand-lettered headings, and lush full-bleed food photography layouts. Organic, earthy tones echo the garden-to-table philosophy. A book you keep on the coffee table, not the shelf.',
    gradient: 'linear-gradient(135deg,#2d4a3e,#a8c5a0)',
    tools: ['Id','Ai'],
    details: [
      { label: 'Pages', value: '180 Pages, Hardcover' },
      { label: 'Timeline', value: '12 Weeks' },
      { label: 'Palette', value: '#2D4A3E · #A8C5A0 · #F5EDD6' },
    ],
    swatches: ['#2D4A3E','#A8C5A0','#F5EDD6','#6B8F71'],
    mocks: [
      { label: 'Cover', g: 'linear-gradient(135deg,#2d4a3e,#a8c5a0)' },
      { label: 'Chapter Opener', g: 'linear-gradient(135deg,#1a2e26,#2d4a3e)' },
      { label: 'Recipe Spread', g: 'linear-gradient(135deg,#F5EDD6,#e8d9b4)' },
      { label: 'Illustration', g: 'linear-gradient(135deg,#a8c5a0,#6B8F71)' },
    ]
  },
  'echo-festival': {
    cat: 'Poster & Print',
    title: 'Echo Festival Series',
    desc: '6-piece poster series for an electronic music festival. Distorted type treatments, duotone photographic manipulations, and neon accent colours create an immersive visual language that translates from digital screens to large-format street paste-ups.',
    gradient: 'linear-gradient(135deg,#ff006e,#3a0ca3)',
    tools: ['Ps','Ai'],
    details: [
      { label: 'Pieces', value: '6 Posters, A1 Format' },
      { label: 'Timeline', value: '3 Weeks' },
      { label: 'Palette', value: '#FF006E · #3A0CA3 · #F72585' },
    ],
    swatches: ['#FF006E','#3A0CA3','#F72585','#7209B7'],
    mocks: [
      { label: 'Poster 01', g: 'linear-gradient(135deg,#ff006e,#3a0ca3)' },
      { label: 'Poster 02', g: 'linear-gradient(135deg,#7209B7,#ff006e)' },
      { label: 'Poster 03', g: 'linear-gradient(135deg,#3a0ca3,#F72585)' },
      { label: 'Street Mockup', g: 'linear-gradient(135deg,#1a0040,#ff006e)' },
    ]
  },
  'solar-exhibition': {
    cat: 'Poster & Print',
    title: 'Solar Exhibition',
    desc: 'Exhibition poster set for a contemporary gallery exploring solar geometry. Geometric sun motifs layer with risograph-inspired colour separation and bold cropped typography. The limited two-colour palette maximises print impact.',
    gradient: 'linear-gradient(135deg,#fff3b0,#ca6702)',
    tools: ['Ai'],
    details: [
      { label: 'Pieces', value: '4 Posters + Invite Card' },
      { label: 'Timeline', value: '2 Weeks' },
      { label: 'Palette', value: '#FFF3B0 · #CA6702 · #1A0A00' },
    ],
    swatches: ['#FFF3B0','#CA6702','#1A0A00','#F4A261'],
    mocks: [
      { label: 'Main Poster', g: 'linear-gradient(135deg,#fff3b0,#ca6702)' },
      { label: 'Variant B', g: 'linear-gradient(135deg,#ca6702,#7d3f00)' },
      { label: 'Invite Card', g: 'linear-gradient(135deg,#FFF3B0,#e8d070)' },
      { label: 'Gallery Install', g: 'linear-gradient(135deg,#1A0A00,#ca6702)' },
    ]
  },
  'void-type': {
    cat: 'Poster & Print',
    title: 'VOID: Type Study',
    desc: 'A personal exploration of negative space and glitch aesthetics through typographic poster making. Each piece deconstructs a letterform until only the void remains — then rebuilds it with noise, distortion, and neon bleed.',
    gradient: 'linear-gradient(135deg,#0a0a0a,#39ff14)',
    tools: ['Ps'],
    details: [
      { label: 'Pieces', value: '9 Posters, Personal Project' },
      { label: 'Timeline', value: 'Ongoing' },
      { label: 'Palette', value: '#0A0A0A · #39FF14 · #FFFFFF' },
    ],
    swatches: ['#0A0A0A','#39FF14','#FFFFFF','#003300'],
    mocks: [
      { label: 'VOID 01', g: 'linear-gradient(135deg,#0a0a0a,#39ff14)' },
      { label: 'VOID 02', g: 'linear-gradient(135deg,#001a00,#39ff14)' },
      { label: 'VOID 03', g: 'linear-gradient(135deg,#39ff14,#0a0a0a)' },
      { label: 'Detail Shot', g: 'linear-gradient(135deg,#0a0a0a,#00aa00)' },
    ]
  },
  'petal-tea': {
    cat: 'Packaging Design',
    title: 'Petal Tea Co.',
    desc: 'Packaging for a boutique tea brand that turns every purchase into a gift. Illustrated botanical wraps celebrate each tea variety, a foil stamp logotype catches the light, and the tissue-lined unboxing experience is choreographed for social sharing.',
    gradient: 'linear-gradient(135deg,#fce4ec,#ad1457)',
    tools: ['Ai','Ps'],
    details: [
      { label: 'SKUs', value: '8 Tea Varieties, Gift Set' },
      { label: 'Timeline', value: '7 Weeks' },
      { label: 'Palette', value: '#FCE4EC · #AD1457 · #2C1810' },
    ],
    swatches: ['#FCE4EC','#AD1457','#2C1810','#F8BBD9'],
    mocks: [
      { label: 'Box Design', g: 'linear-gradient(135deg,#fce4ec,#ad1457)' },
      { label: 'Botanical Wrap', g: 'linear-gradient(135deg,#F8BBD9,#fce4ec)' },
      { label: 'Gift Set', g: 'linear-gradient(135deg,#ad1457,#6b0030)' },
      { label: 'Unboxing Detail', g: 'linear-gradient(135deg,#2C1810,#ad1457)' },
    ]
  },
  'monolith-spirits': {
    cat: 'Packaging Design',
    title: 'Monolith Spirits',
    desc: 'Premium gin bottle and box design for a craft distillery. Embossed geometric patterns catch cellar light, matte black stock with silver ink channels refined masculinity, and custom die-cut label shapes make the bottle instantly recognisable on shelf.',
    gradient: 'linear-gradient(135deg,#1b1b2f,#f6f6f6)',
    tools: ['Ai','Id'],
    details: [
      { label: 'Deliverables', value: 'Bottle Label, Gift Box, POS Display' },
      { label: 'Timeline', value: '6 Weeks' },
      { label: 'Palette', value: '#1B1B2F · #C0C0C0 · #F6F6F6' },
    ],
    swatches: ['#1B1B2F','#C0C0C0','#F6F6F6','#8B8B8B'],
    mocks: [
      { label: 'Bottle Label', g: 'linear-gradient(135deg,#1b1b2f,#f6f6f6)' },
      { label: 'Gift Box', g: 'linear-gradient(135deg,#0a0a1a,#1b1b2f)' },
      { label: 'Label Detail', g: 'linear-gradient(135deg,#C0C0C0,#f6f6f6)' },
      { label: 'Shelf Mockup', g: 'linear-gradient(135deg,#1b1b2f,#C0C0C0)' },
    ]
  },
  'forest-soap': {
    cat: 'Packaging Design',
    title: 'Forest Soap Co.',
    desc: 'Eco-friendly soap packaging that wears its values openly. Recycled kraft paper, hand-drawn woodland illustrations, and seed-paper inserts mean the packaging can literally be planted after unboxing. Zero waste without compromising on beauty.',
    gradient: 'linear-gradient(135deg,#e8f5e9,#388e3c)',
    tools: ['Ai','Ps'],
    details: [
      { label: 'SKUs', value: '6 Soap Varieties' },
      { label: 'Timeline', value: '4 Weeks' },
      { label: 'Palette', value: '#E8F5E9 · #388E3C · #3E2723' },
    ],
    swatches: ['#E8F5E9','#388E3C','#3E2723','#A5D6A7'],
    mocks: [
      { label: 'Wrap Design', g: 'linear-gradient(135deg,#e8f5e9,#388e3c)' },
      { label: 'Illustration', g: 'linear-gradient(135deg,#A5D6A7,#388e3c)' },
      { label: 'Seed Paper Insert', g: 'linear-gradient(135deg,#e8f5e9,#c8e6c9)' },
      { label: 'Full Range', g: 'linear-gradient(135deg,#388e3c,#1B5E20)' },
    ]
  }
};

// ── OPEN/CLOSE MODAL ─────────────────────────
const modal = document.getElementById('projectModal');
if (modal) {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');

  function openModal(projectKey) {
    const p = PROJECTS[projectKey];
    if (!p) return;

    document.getElementById('modalCat').textContent   = p.cat;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalDesc').textContent  = p.desc;

    // Helper: apply a mock to an element
    function applyMock(el, mock) {
      if (mock.img) {
        el.style.background = mock.bg || '#111';
        el.style.backgroundImage = `url(${mock.img})`;
        el.style.backgroundSize = 'contain';
        el.style.backgroundRepeat = 'no-repeat';
        el.style.backgroundPosition = 'center';
      } else {
        el.style.backgroundImage = '';
        el.style.backgroundSize = '';
        el.style.backgroundRepeat = '';
        el.style.backgroundPosition = '';
        el.style.background = mock.g || '#111';
      }
    }

    // Main image
    const mainImg = document.getElementById('modalMainImg');
    applyMock(mainImg, p.mocks[0]);
    mainImg.innerHTML = `<div class="mock-label">${p.mocks[0].label}</div>`;

    // Thumbnails
    const thumbs = document.getElementById('modalThumbs');
    thumbs.innerHTML = p.mocks.map((m, i) => {
      const style = m.img
        ? `background:${m.bg || '#111'};background-image:url(${m.img});background-size:contain;background-repeat:no-repeat;background-position:center;`
        : `background:${m.g};`;
      return `<div class="modal-thumb ${i === 0 ? 'active' : ''}" style="${style}" data-idx="${i}" data-project="${projectKey}">
        <div class="mock-label-sm">${m.label}</div>
      </div>`;
    }).join('');

    // Thumb click → swap main
    thumbs.querySelectorAll('.modal-thumb').forEach(th => {
      th.addEventListener('click', () => {
        const idx = parseInt(th.dataset.idx);
        const proj = PROJECTS[th.dataset.project];
        applyMock(mainImg, proj.mocks[idx]);
        mainImg.innerHTML = `<div class="mock-label">${proj.mocks[idx].label}</div>`;
        thumbs.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
        th.classList.add('active');
      });
    });

    // Details
    const detailsEl = document.getElementById('modalDetails');
    detailsEl.innerHTML = p.details.map(d => `
      <div class="modal-detail-row">
        <span class="modal-detail-label">${d.label}</span>
        <span class="modal-detail-val">${d.value}</span>
      </div>
    `).join('') + `
      <div class="modal-swatches">
        ${p.swatches.map(s => `<div class="modal-swatch" style="background:${s};" title="${s}"></div>`).join('')}
      </div>
    `;

    // Tools
    document.getElementById('modalTools').innerHTML = p.tools.map(t => `<span class="modal-tool">${t}</span>`).join('');

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.work-card[data-project]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.project));
    card.style.cursor = 'none';
  });

  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}
document.querySelectorAll('a[href*="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const hash = link.getAttribute('href').split('#')[1];
    if (!hash) return;
    const target = document.getElementById(hash);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── PAGE ENTER ANIMATION ────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
    // Trigger hero reveals on load
    document.querySelectorAll('.hero .reveal, .page-hero .reveal, .contact-hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 200 + i * 150);
    });
  });
});
