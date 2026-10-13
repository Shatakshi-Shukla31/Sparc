import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, ArrowDown, CalendarDays, MapPin, Menu, X, Download, Mail, Phone, Microscope, HeartPulse, Handshake, FlaskConical, CircuitBoard, Users, ChevronDown, Check, Copy, Plus, ExternalLink, Plane, TrainFront, GraduationCap } from 'lucide-react';
import { event, speakers, activities, themes, faqs, createCalendarFile } from './event';
import './styles.css';

const icons = { lectures: GraduationCap, devices: CircuitBoard, hands: Microscope, network: Handshake, healing: HeartPulse, cells: FlaskConical };
const nav = [['About', 'about'], ['Programme', 'programme'], ['Speakers', 'speakers'], ['Venue', 'venue'], ['Contact', 'contact']];

function Brand() {
  return <a className="brand" href="#home" aria-label="SPARC 2026 home"><img className="brand-sparc-logo" src="/images/sparc-logo.png" alt="SPARC — Scheme for Promotion of Academic and Research Collaboration" /><span className="brand-edition">2026<small>INDO–US</small></span></a>;
}

function Dialog({ open, onClose, label, children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (open && !element.open) { element.showModal(); document.body.style.overflow = 'hidden'; }
    if (!open && element.open) { element.close(); document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  return <dialog ref={ref} aria-label={label} className={`dialog ${className}`} onCancel={onClose} onClick={e => { if (e.target === ref.current) onClose(); }}><div className="dialog-inner"><button className="icon-button dialog-close" aria-label="Close dialog" onClick={onClose}><X size={22} /></button>{children}</div></dialog>;
}

function EnquiryDialog({ open, onClose }) {
  const [draft, setDraft] = useState(null);
  const [copied, setCopied] = useState(false);
  function prepare(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const body = `Dear SPARC 2026 Organising Team,\n\nI would like to enquire about attending the Indo–US SPARC International Workshop & Conference on Medical Devices in Wound Healing, 20–21 December 2026, at IIT Ropar.\n\nName: ${values.name}\nEmail: ${values.email}\nInstitution / organisation: ${values.institution}\nParticipant category: ${values.category}\n\n${values.message || 'Please share registration arrangements, availability, and any applicable fees.'}\n\nThank you,\n${values.name}`;
    setDraft({ body, href: `mailto:${event.email}?subject=${encodeURIComponent('SPARC 2026 — Registration enquiry')}&body=${encodeURIComponent(body)}` });
  }
  async function copyDraft() {
    try { await navigator.clipboard.writeText(draft.body); setCopied(true); } catch { setCopied(false); }
  }
  function close() { onClose(); setTimeout(() => { setDraft(null); setCopied(false); }, 180); }
  return <Dialog open={open} onClose={close} label="Registration enquiry">
    <span className="eyebrow">BE PART OF SPARC 2026</span><h2>Let’s meet at<br /><em>IIT Ropar.</em></h2>
    {!draft ? <><p className="dialog-intro">Prepare an email to the organising team. They will confirm availability, registration details, and any fees.</p><form onSubmit={prepare} className="enquiry-form">
      <label>Full name <span>*</span><input name="name" autoComplete="name" required maxLength={100} placeholder="Your full name" /></label>
      <label>Email address <span>*</span><input type="email" name="email" autoComplete="email" required maxLength={160} placeholder="you@institution.edu" /></label>
      <label>Institution / organisation <span>*</span><input name="institution" autoComplete="organization" required maxLength={160} placeholder="Your institution or organisation" /></label>
      <label>You are a… <span>*</span><select name="category" required defaultValue=""><option value="" disabled>Select participant category</option><option>Student / research scholar</option><option>Researcher / faculty</option><option>Clinician / healthcare professional</option><option>Engineer / industry professional</option><option>Other participant</option></select></label>
      <label className="form-wide">Anything you’d like to ask?<textarea name="message" rows={3} maxLength={2000} placeholder="Registration, accommodation, or workshop questions…" /></label>
      <p className="form-note form-wide"><Mail size={15} /> Your details go into an email draft. Nothing is submitted through this website.</p>
      <button className="button button-dark form-wide" type="submit">Prepare email enquiry <ArrowUpRight size={18} /></button>
    </form></> : <div className="draft-result"><div className="draft-check"><Check size={26} /></div><h3>Your enquiry draft is ready.</h3><p>Open your email app, review the message, and send it to <strong>{event.email}</strong>. Your place is confirmed only by the organisers.</p><details><summary>Review your message <ChevronDown size={16} /></summary><pre>{draft.body}</pre></details><a className="button button-dark" href={draft.href}>Open your email app <ArrowUpRight size={18} /></a><button className="button button-quiet" onClick={copyDraft}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'Message copied' : 'Copy message'}</button><button className="text-button" onClick={() => setDraft(null)}>Edit your details</button></div>}
  </Dialog>;
}

function SpeakerDirectory({ onSelect }) {
  const [category, setCategory] = useState('All speakers');
  const [query, setQuery] = useState('');
  const [failedPhotos, setFailedPhotos] = useState(new Set());
  const categories = ['All speakers', 'Academic & research', 'Clinical & healthcare', 'Industry'];
  const matching = speakers.filter(person => (category === 'All speakers' || person.category === category) && `${person.name} ${person.institution}`.toLowerCase().includes(query.trim().toLowerCase()));
  const portraits = matching.filter(person => person.image && !failedPhotos.has(person.id));
  const names = matching.filter(person => !person.image || failedPhotos.has(person.id));
  function failed(id) { setFailedPhotos(previous => new Set([...previous, id])); }
  return <div className="speaker-directory">
    <div className="speaker-toolbar"><div className="speaker-filters" role="group" aria-label="Filter speakers by community">{categories.map(label => <button key={label} aria-pressed={category === label} onClick={() => setCategory(label)}>{label}<span>{label === 'All speakers' ? speakers.length : speakers.filter(person => person.category === label).length}</span></button>)}</div><label className="speaker-search"><span>Find a speaker</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Name or institution" /></label></div>
    <p className="speaker-result-count" role="status">{matching.length} {matching.length === 1 ? 'speaker' : 'speakers'}{query.trim() && ` matching “${query.trim()}”`}</p>
    {portraits.length > 0 && <div className="speaker-grid">{portraits.map(person => <button className="speaker-card" data-speaker-id={person.id} key={person.id} onClick={() => onSelect(person)} aria-label={`View details for ${person.name}`}><div className="speaker-image"><span className="speaker-portrait"><img src={person.image} alt={person.name} loading="lazy" style={{ objectPosition: person.photoPosition || 'center 25%' }} onError={() => failed(person.id)} /></span><span className="speaker-open"><ArrowUpRight size={23} /></span></div><div className="speaker-content"><span className="speaker-tag">{person.tag}</span><h3>{person.name}</h3><p>{person.institution}</p>{person.role && <span className="speaker-role">{person.role}</span>}</div></button>)}</div>}
    {names.length > 0 && <div className="speaker-name-section"><h3>Also joining the workshop</h3><div className="speaker-name-list">{names.map(person => <button key={person.id} className="speaker-name-card" data-speaker-id={person.id} onClick={() => onSelect(person)} aria-label={`View details for ${person.name}`}><span>{person.name}</span><ArrowUpRight size={20} /></button>)}</div></div>}
    {matching.length === 0 && <p className="speaker-empty">No speakers match your search. Try another name or institution.</p>}
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [speaker, setSpeaker] = useState(null);
  const [programmeTab, setProgrammeTab] = useState('activities');
  const [faqOpen, setFaqOpen] = useState(0);
  const [showCredits, setShowCredits] = useState(false);
  const tabRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const closeMenu = e => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeMenu);
    return () => window.removeEventListener('keydown', closeMenu);
  }, []);
  function enquire() { setMenuOpen(false); if (event.registrationUrl) window.open(event.registrationUrl, '_blank', 'noopener,noreferrer'); else setEnquiryOpen(true); }
  function saveDate() {
    const url = URL.createObjectURL(new Blob([createCalendarFile()], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'SPARC-2026.ics'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function tabKey(e, index) {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 1 : 1 - index;
      setProgrammeTab(next === 0 ? 'activities' : 'themes'); tabRefs.current[next].focus();
    }
  }
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <div className="institution-bar"><div className="container institution-bar-inner"><span>An initiative under <strong>SPARC, Ministry of Education</strong></span><a href="https://www.iitrpr.ac.in/" target="_blank" rel="noreferrer">Indian Institute of Technology Ropar <ArrowUpRight size={13} /></a></div></div>
    <header className="site-header"><div className="container header-inner"><Brand /><nav aria-label="Main navigation" id="main-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'}>{nav.map(([title, id]) => <a href={`#${id}`} key={id} className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{title}</a>)}<button className="button button-dark mobile-enquire" onClick={enquire}>Registration enquiry <ArrowUpRight size={17} /></button></nav><button className="button button-dark header-enquire" onClick={enquire}>Registration enquiry <ArrowUpRight size={17} /></button><button className="menu-button icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div></header>
    <main id="main-content">
      <section className="hero" id="home">
        <div className="hero-grid" aria-hidden="true" />
        <div className="container hero-inner"><div className="hero-copy">
          <div className="hero-kicker"><span className="status-dot" /> INDO–US INTERNATIONAL COLLABORATION</div>
          <div className="hero-logo-panel"><img src="/images/sparc-logo.png" alt="SPARC" /><span>MINISTRY OF EDUCATION<br />GOVERNMENT OF INDIA</span></div>
          <h1>SPARC <em>2026.</em></h1><p className="hero-event-type">Indo–US International<br />Workshop & Conference</p><p className="hero-topic">Medical Devices in Wound Healing</p>
          <p className="hero-description">Bridging biomedical engineering and clinical translation for the next generation of wound healing technologies.</p>
          <div className="hero-meta"><span><CalendarDays size={20} />20–21 December 2026</span><span><MapPin size={20} />IIT Ropar, India</span></div>
          <div className="hero-actions"><button className="button button-mint" onClick={enquire}>Enquire to attend <ArrowUpRight size={20} /></button><a className="hero-secondary" href="#programme">Explore the workshop <ArrowDown size={18} /></a></div>
          <div className="hero-organisers"><span>JOINTLY ORGANISED BY</span><p>IIT Ropar <span>×</span> PGIMER Chandigarh</p></div>
        </div><div className="device-showcase"><div className="device-showcase-heading"><span>ENGINEERING FOR BETTER HEALING</span><CircuitBoard size={22} /></div>
          <figure className="device-primary"><img src="/images/wound-monitoring-device.jpeg" alt="A wearable medical device applied to the body, from the supplied workshop reference" fetchPriority="high" /><figcaption><span>Medical device technologies</span><ArrowUpRight size={22} /></figcaption></figure>
          <div className="device-secondary-grid"><figure><img src="/images/therapeutic-device.jpeg" alt="Therapeutic device positioned on the skin" /><figcaption>Therapeutic devices</figcaption></figure><figure><img src="/images/bioelectronic-device.jpeg" alt="Illustration of a bioelectronic device interacting with skin tissue" /><figcaption>Bioelectronic approaches</figcaption></figure></div>
          <div className="device-showcase-bottom"><span><Handshake size={19} /> Indo–US knowledge exchange</span><button onClick={saveDate} aria-label="Add SPARC 2026 to your calendar"><CalendarDays size={19} /> Save the dates</button></div>
        </div></div>
        <div className="container hero-bottom"><span>ENGINEERING BETTER OUTCOMES, TOGETHER.</span><a href="#about">Discover SPARC 2026 <ArrowDown size={16} /></a></div>
      </section>

      <section className="partners" aria-label="Organising and supporting institutions"><div className="container partners-inner"><div className="partners-label">COLLABORATION<br /><strong>at the core.</strong></div><a href="https://www.iitrpr.ac.in/" target="_blank" rel="noreferrer" className="partner partner-iit"><img src="/images/iit-ropar-logo.png" alt="Indian Institute of Technology Ropar" /></a><a href="https://pgimer.edu.in/" target="_blank" rel="noreferrer" className="partner partner-pgimer"><img src="/images/pgimer-logo.png" alt="PGIMER Chandigarh" /><span>PGIMER<br /><small>CHANDIGARH</small></span></a><a href="https://www.pitt.edu/" target="_blank" rel="noreferrer" className="partner partner-pitt"><img src="/images/pittsburgh-logo.png" alt="University of Pittsburgh" /></a><a href="https://sparc.iitkgp.ac.in/" target="_blank" rel="noreferrer" className="partner partner-sparc"><img src="/images/sparc-logo.png" alt="SPARC — Scheme for Promotion of Academic and Research Collaboration" /></a><a href="https://www.education.gov.in/" target="_blank" rel="noreferrer" className="partner partner-ministry"><img src="/images/ministry-logo.png" alt="Ministry of Education, Government of India" /></a></div></section>

      <section id="about" className="section about-section"><div className="container"><div className="section-heading about-heading"><div><span className="eyebrow"><span /> THE WORKSHOP</span><h2>From the laboratory.<br /><em>Closer to healing.</em></h2></div><span className="section-index">01 / ABOUT</span></div><div className="about-layout"><div className="about-image"><img src="/images/wound-research.png" alt="Illustration of tissue repair and wound healing technologies from the workshop flyer" loading="lazy" /><span className="image-caption"><FlaskConical size={16} /> A shared focus on wound healing innovation</span><div className="about-image-corner"><HeartPulse size={28} /></div></div><div className="about-copy"><p className="lead">Better wound care begins when different disciplines come together.</p><p>The Indo–US SPARC International Workshop & Conference on Medical Devices in Wound Healing brings researchers, clinicians, engineers, students, and industry professionals together to explore advances in wound management.</p><p>Jointly organised by the Department of Biomedical Engineering, IIT Ropar, and PGIMER Chandigarh under SPARC, Ministry of Education, SPARC 2026 connects scientific discovery with clinical needs through lectures, demonstrations, and hands-on learning.</p><div className="about-facts"><div><strong>02</strong><span>Days of learning<br />& collaboration</span></div><div><strong>04</strong><span>Connected<br />research themes</span></div><div><strong>INDO–US</strong><span>International<br />knowledge exchange</span></div></div><a className="inline-link" href={event.flyerUrl} download><Download size={17} /> Download the workshop flyer <ArrowUpRight size={17} /></a></div></div><div className="audience-strip"><span>MADE FOR CURIOUS MINDS</span><div>{['Researchers', 'Clinicians', 'Engineers', 'Students', 'Industry professionals'].map(label => <span key={label}>{label}</span>)}</div></div></div></section>

      <section id="programme" className="section programme-section"><div className="container"><div className="section-heading"><div><span className="eyebrow"><span /> IDEAS IN ACTION</span><h2>Learn. Explore.<br /><em>Make connections.</em></h2></div><div className="section-heading-aside"><p>A programme that brings biomedical engineering and clinical practice into the same conversation.</p><button className="inline-link" onClick={saveDate}><CalendarDays size={17} /> Save 20–21 December <ArrowUpRight size={17} /></button></div></div><div className="programme-toolbar"><div className="programme-tabs" role="tablist" aria-label="Explore the workshop">{[['activities', 'Workshop activities'], ['themes', 'Research themes']].map(([id, label], index) => <button key={id} ref={el => tabRefs.current[index] = el} id={`tab-${id}`} role="tab" aria-selected={programmeTab === id} aria-controls={`panel-${id}`} tabIndex={programmeTab === id ? 0 : -1} onClick={() => setProgrammeTab(id)} onKeyDown={e => tabKey(e, index)}>{label}<span>{programmeTab === id ? <ArrowUpRight size={16} /> : <Plus size={16} />}</span></button>)}</div><span className="programme-status"><span /> Detailed timetable to be announced</span></div><div className="programme-grid" role="tabpanel" id={`panel-${programmeTab}`} aria-labelledby={`tab-${programmeTab}`} tabIndex={0}>{(programmeTab === 'activities' ? activities : themes).map((item, index) => { const Icon = icons[item.icon]; return <article className="programme-card" key={item.title}><div className="programme-card-top"><span className="programme-icon"><Icon size={27} strokeWidth={1.4} /></span><span className="card-number">0{index + 1}</span></div><span className="card-label">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p><span className="card-bottom-line" /></article>; })}</div><div className="technology-gallery" aria-label="Workshop research imagery"><figure><img src="/images/bioelectronic-research.jpeg" alt="Illustration of electrical stimulation and wound research" loading="lazy" /><figcaption>Medical device research</figcaption></figure><figure><img src="/images/regenerative-scaffold.jpeg" alt="Illustration of a biomaterial scaffold and skin regeneration" loading="lazy" /><figcaption>Regenerative healing</figcaption></figure><figure><img src="/images/biomaterial-research.png" alt="Microscopy and material samples from the supplied workshop reference" loading="lazy" /><figcaption>Biomaterials & translation</figcaption></figure></div><div className="programme-note"><span><Users size={19} /> Different perspectives. A common purpose.</span><p>Knowledge exchange, practical learning, and collaboration for better wound management technologies.</p></div></div></section>

      <section id="speakers" className="section speakers-section"><div className="container"><div className="section-heading"><div><span className="eyebrow"><span /> PEOPLE BEHIND THE IDEAS</span><h2>Meet our<br /><em>invited speakers.</em></h2></div><div className="section-heading-aside"><p>An Indo–US community of researchers, clinicians, and industry leaders. Explore all 26 invited speakers below.</p><span className="section-index">03 / SPEAKERS</span></div></div><SpeakerDirectory onSelect={setSpeaker} /><div className="convenors"><div><span className="eyebrow">YOUR WORKSHOP CONVENORS</span><p>Connecting the research and clinical communities.</p></div><a className="convenor" href={`mailto:${event.email}?subject=SPARC%202026%20enquiry%20for%20Dr.%20Durba%20Pal`}><img src="/images/durba-pal.png" alt="Dr. Durba Pal" loading="lazy" /><div><strong>Dr. Durba Pal</strong><span>IIT Ropar</span></div><ArrowUpRight size={18} /></a><a className="convenor" href={`mailto:${event.email}?subject=SPARC%202026%20enquiry%20for%20Dr.%20Ashu%20Rastogi`}><img src="/images/ashu-rastogi.png" alt="Dr. Ashu Rastogi" loading="lazy" /><div><strong>Dr. Ashu Rastogi</strong><span>PGIMER Chandigarh</span></div><ArrowUpRight size={18} /></a></div></div></section>

      <section id="venue" className="venue-section"><div className="venue-image"><img src="/images/clinical-wound-care.jpeg" alt="Clinical wound dressing application, from the supplied workshop reference" loading="lazy" /><div className="venue-image-overlay" /><div className="venue-photo-label"><HeartPulse size={19} /> CONNECTING ENGINEERING WITH CLINICAL CARE</div></div><div className="venue-content"><span className="eyebrow"><span /> THE PLACE WE COME TOGETHER</span><h2>Meet us at<br /><em>IIT Ropar.</em></h2><p>Join us at the Indian Institute of Technology Ropar, where the workshop brings biomedical engineering and clinical perspectives together.</p><div className="venue-address"><MapPin size={21} /><div><strong>Indian Institute of Technology Ropar</strong><span>Rupnagar, Punjab 140001, India</span><small>Specific workshop room to be confirmed by organisers.</small></div></div><div className="venue-travel"><div><Plane size={19} /><span>Arriving by air<strong>Chandigarh International Airport</strong></span></div><div><TrainFront size={19} /><span>Arriving by rail<strong>Rupnagar Railway Station</strong></span></div></div><a className="button button-dark" href={event.mapsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={18} /></a><a className="venue-accommodation" href={`mailto:${event.email}?subject=SPARC%202026%20—%20Accommodation%20enquiry`}>Ask about accommodation <ArrowUpRight size={15} /></a></div></section>

      <section className="section faq-section"><div className="container faq-layout"><div><span className="eyebrow"><span /> A LITTLE MORE INFORMATION</span><h2>Before<br /><em>you join us.</em></h2><p>Need something else?<br /><a href={`mailto:${event.email}`}>Talk to the organising team <ArrowUpRight size={15} /></a></p></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${faqOpen === index ? 'is-open' : ''}`} key={question}><h3><button aria-expanded={faqOpen === index} aria-controls={`faq-${index}`} id={`faq-button-${index}`} onClick={() => setFaqOpen(faqOpen === index ? null : index)}>{question}<span>{faqOpen === index ? <X size={19} /> : <Plus size={19} />}</span></button></h3><div id={`faq-${index}`} role="region" aria-labelledby={`faq-button-${index}`} hidden={faqOpen !== index}><p>{answer}</p></div></div>)}</div></div></section>

      <section id="contact" className="contact-section"><div className="container contact-inner"><div className="contact-copy"><span className="eyebrow">20–21 DECEMBER 2026 · IIT ROPAR</span><h2>Better healing<br />starts with <em>us.</em></h2><p>Bring your questions. Share your perspective.<br />Be part of the conversation at SPARC 2026.</p><button className="button button-mint" onClick={enquire}>Send a registration enquiry <ArrowUpRight size={19} /></button></div><div className="contact-details"><span className="contact-details-title">LET’S CONNECT</span><a href={`mailto:${event.email}`}><span className="contact-icon"><Mail size={22} /></span><div><small>Email the organising team</small><strong>{event.email}</strong></div><ArrowUpRight size={19} /></a><a href={`tel:${event.phone.replace(/[^+\d]/g, '')}`}><span className="contact-icon"><Phone size={21} /></span><div><small>Call IIT Ropar</small><strong>{event.phone}</strong></div><ArrowUpRight size={19} /></a><a href={event.flyerUrl} download><span className="contact-icon"><Download size={22} /></span><div><small>Take the details with you</small><strong>Download workshop flyer</strong></div><ArrowDown size={19} /></a></div></div></section>
    </main>
    <footer className="footer"><div className="container footer-main"><Brand /><p>Indo–US Workshop on<br />Medical Devices in Wound Healing</p><div className="footer-links"><a href="#about">About</a><a href="#programme">Programme</a><a href="#speakers">Speakers</a><a href="#contact">Contact</a></div><button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUpRight size={22} /></button></div><div className="container footer-bottom"><span>© 2026 SPARC Workshop. IIT Ropar & PGIMER Chandigarh.</span><span>Under SPARC, Ministry of Education <span className="footer-dot">·</span> <button onClick={() => setShowCredits(true)}>Sources & image credits</button></span></div></footer>
    <EnquiryDialog open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    <Dialog open={!!speaker} onClose={() => setSpeaker(null)} label={speaker ? `About ${speaker.name}` : 'Speaker details'} className="speaker-dialog">{speaker && <>{speaker.image && <img className="speaker-dialog-photo" src={speaker.image} alt={speaker.name} onError={e => { e.currentTarget.style.display = 'none'; }} />}<span className="eyebrow">INVITED SPEAKER</span><h2>{speaker.name}</h2><p className="speaker-dialog-institution">{speaker.institution}</p><p>{speaker.detail}</p>{speaker.link && <a className="inline-link" href={speaker.link} target="_blank" rel="noreferrer">Visit professional website <ExternalLink size={16} /></a>}</>}</Dialog>
    <Dialog open={showCredits} onClose={() => setShowCredits(false)} label="Sources and image credits" className="credits-dialog"><span className="eyebrow">ACKNOWLEDGEMENTS</span><h2>Sources &<br /><em>image credits.</em></h2><p>Event dates, convenors, contact details, institutional logos, and the original downloadable flyer come from the supplied workshop materials. SPARC denotes the Scheme for Promotion of Academic and Research Collaboration under the Ministry of Education.</p><p>Device images and the expanded speaker list come from the two supplied international workshop and speaker presentations. Portraits are reproduced from the supplied slides wherever available.</p><p>Additional portraits: <a href="https://improvians.com/about-us.html" target="_blank" rel="noreferrer">Pratik Baldota, Improvians</a>; <a href="https://drbharatkotru.com/about-us/" target="_blank" rel="noreferrer">Dr. Bharat Kotru’s professional website</a>; <a href="https://icsio.csio.res.in/csio.ems/emp_profile.aspx?id=931" target="_blank" rel="noreferrer">Dr. Sanjeev Soni, CSIR–CSIO</a>.</p><p>Navigation inspiration: <a href="https://sites.google.com/iitrpr.ac.in/biomanthan/home" target="_blank" rel="noreferrer">Bio-MANTHAN, IIT Ropar <ExternalLink size={13} /></a>. This website uses MDWH event details and an original layout.</p><p>Travel entry points were checked against IIT Ropar’s visitor information. Enquiries open an email draft and are confirmed by the organising team.</p></Dialog>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
