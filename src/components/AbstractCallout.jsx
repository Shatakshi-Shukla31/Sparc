import React from 'react';
import { ArrowUpRight, Award, Mail, Users } from 'lucide-react';
import './abstract-callout.css';

const presentationAwards = [
  { organiser: 'STERMI', awards: ['Oral Presentation Award', 'Best Poster Award'] },
  { organiser: 'SPARC', awards: ['Additional Oral Presentation Award'] },
];

function ResearchOrbits() {
  return (
    <svg className="abstract-orbits" viewBox="0 0 320 320" fill="none" aria-hidden="true" focusable="false">
      <circle cx="160" cy="160" r="132" />
      <ellipse cx="160" cy="160" rx="132" ry="57" transform="rotate(45 160 160)" />
      <ellipse cx="160" cy="160" rx="132" ry="57" transform="rotate(-45 160 160)" />
      <circle className="abstract-orbit-node" cx="160" cy="28" r="7" />
      <circle className="abstract-orbit-node" cx="253" cy="253" r="5" />
      <circle className="abstract-orbit-node" cx="67" cy="253" r="5" />
    </svg>
  );
}

export default function AbstractCallout({ email, registrationUrl }) {
  const abstractEmail = `mailto:${email}?subject=${encodeURIComponent('SPARC 2026 - Research abstract submission')}`;

  return (
    <section className="abstract-callout" id="abstracts" aria-labelledby="abstract-heading">
      <div className="abstract-ambient abstract-ambient-one" aria-hidden="true" />
      <div className="abstract-ambient abstract-ambient-two" aria-hidden="true" />
      <div className="container abstract-container">
        <div className="abstract-section-top">
          <span className="abstract-kicker"><span aria-hidden="true" />Call for abstracts</span>
          <span className="abstract-edition">SPARC 2026<span aria-hidden="true"> / </span>20–21 December</span>
        </div>

        <div className="abstract-layout">
          <div className="abstract-copy">
            <p className="abstract-context">Medical Devices in Wound Healing</p>
            <h2 className="abstract-headline" id="abstract-heading">
              <span className="research-highlight">Present Your <span className="abstract-research-word">Research</span></span>
            </h2>
            <p className="abstract-tagline">Let your ideas stand out.</p>
            <p className="abstract-description">Share your work in medical devices and wound healing. Exchange ideas across disciplines and compete for presentation awards at SPARC 2026.</p>

            <div className="abstract-actions">
              <a className="abstract-submit" href={abstractEmail}>Submit Your Abstract<ArrowUpRight size={21} aria-hidden="true" /></a>
              <a className="abstract-register" href={registrationUrl} target="_blank" rel="noopener noreferrer">Register for the workshop<ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
            <p className="abstract-email"><Mail size={16} aria-hidden="true" /><span>Abstract submissions: <a href={`mailto:${email}`}>{email}</a></span></p>
          </div>

          <aside className="abstract-recognition" aria-labelledby="abstract-awards-heading">
            <ResearchOrbits />
            <div className="abstract-recognition-top"><span className="abstract-recognition-label">Ideas with impact</span><Award size={26} strokeWidth={1.4} aria-hidden="true" /></div>
            <h3 id="abstract-awards-heading">Research.<br /><em>Recognised.</em></h3>
            <div className="abstract-shortlist"><strong>10</strong><div><span>Top abstracts shortlisted</span><p>For jury presentations and a chance to compete for awards.</p></div></div>
            <ul className="abstract-awards" aria-label="Presentation awards">
              {presentationAwards.map(({ organiser, awards }) => (
                <li key={organiser}><span className="abstract-award-organiser">{organiser} awards</span><div>{awards.map(award => <span className="abstract-award-name" key={award}>{award}</span>)}</div></li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="abstract-eligibility">
          <span className="abstract-open-label"><Users size={19} strokeWidth={1.6} aria-hidden="true" />Open to everyone</span>
          <p>Students, clinicians, residents, scientists, researchers, and industry professionals are all welcome to submit an abstract.</p>
        </div>
      </div>
    </section>
  );
}
