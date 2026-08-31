import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { BackendSystemCanvas } from "../components/BackendSystemCanvas";
import { activities, journey, projects, skillGroups, socialLinks } from "../lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanjay C — Backend-Focused Full-Stack Developer" },
      { name: "description", content: "Explore Sanjay C's backend-focused full-stack portfolio: APIs, authentication, databases, security, real-time systems, and two end-to-end projects." },
      { property: "og:title", content: "Sanjay C — Backend-Focused Full-Stack Developer" },
      { property: "og:description", content: "A portfolio of backend systems, secure APIs, real-time applications, and modern full-stack experiences." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Sanjay C", address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" }, email: `mailto:${socialLinks.email}`, url: socialLinks.linkedin, sameAs: [socialLinks.github, socialLinks.linkedin], jobTitle: "Backend-Focused Full-Stack Developer" }) }],
  }),
  ssr: false,
  component: PortfolioPage,
});

function SectionLabel({ number, children }: { number: string; children: string }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-vermilion">{number} — {children}</p>;
}

function GithubPlaceholder() {
  return (
    <a href="#" onClick={(event) => event.preventDefault()} className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-vermilion" aria-label="GitHub repository link to be added">
      <Github className="size-3.5" aria-hidden="true" /> View on GitHub
    </a>
  );
}

function PortfolioPage() {
  const [activeSkill, setActiveSkill] = useState<keyof typeof skillGroups>("Backend");

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-paper text-ink">
      <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-5 md:px-8">
          <a href="#top" className="font-mono text-sm font-medium tracking-tight text-ink">Sanjay C <span className="text-vermilion">/ 05</span></a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {[["about", "About"], ["skills", "Skills"], ["work", "Work"], ["journey", "Journey"], ["contact", "Contact"]].map(([href, label]) => <a key={href} href={`#${href}`} className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink">{label}</a>)}
          </nav>
          <a href="#contact" className="rounded-md bg-vermilion px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ink">Contact</a>
        </div>
      </header>

      <section className="journal-grid border-b border-ink/10 bg-paper" aria-labelledby="hero-heading">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <div className="rise mb-6 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                <span className="inline-block size-2 bg-vermilion" />
                <span>Engineering Journal · Vol. 02</span>
                <span className="text-ink-faint">Bengaluru</span>
              </div>
              <h1 id="hero-heading" className="rise max-w-[16ch] font-display text-[2.7rem] leading-[1.02] text-ink md:text-[4.2rem]" style={{ animationDelay: "60ms" }}>Backend systems,<br />drawn in ink<span className="text-vermilion">.</span></h1>
              <p className="rise mt-7 max-w-[42ch] font-sans text-base leading-relaxed text-ink-soft md:text-lg" style={{ animationDelay: "120ms" }}>I&apos;m Sanjay C — a Computer Science Engineering student who builds backend systems: APIs, authentication, databases, and modern full-stack experiences.</p>
              <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "180ms" }}>
                <a href="#work" className="rounded-md bg-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-vermilion">View projects</a>
                <a href="#contact" className="rounded-md px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-ink ring-1 ring-ink/25 transition-colors hover:ring-ink/50">Contact me</a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-5 font-mono text-xs text-ink-soft">
                <a href={socialLinks.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"><Github className="size-3.5" aria-hidden="true" /> GitHub</a>
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"><Linkedin className="size-3.5" aria-hidden="true" /> LinkedIn</a>
                <a href={`tel:${socialLinks.phone.replaceAll(" ", "")}`} className="text-ink-faint transition-colors hover:text-ink">{socialLinks.phone}</a>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rise relative mx-auto max-w-[500px] rounded-xl bg-paper-2 p-4 ring-1 ring-ink/15 md:p-6" style={{ animationDelay: "240ms" }}>
                <div className="absolute -left-2 -top-2 h-6 w-10 -rotate-6 bg-acid/40" />
                <div className="absolute -right-2 top-24 h-6 w-10 rotate-3 bg-vermilion/30" />
                <div className="mb-1 flex items-center justify-between px-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft"><span>Fig. 01 — request path</span><span className="text-ink-faint">interactive</span></div>
                <div className="h-[390px] w-full"><BackendSystemCanvas /></div>
                <p className="border-t border-ink/15 px-2 pt-4 font-mono text-[10px] leading-relaxed text-ink-soft">A well-instrumented request, from handshake to query.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-paper-2" aria-labelledby="about-heading">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel number="02">About</SectionLabel>
              <h2 id="about-heading" className="mt-5 max-w-[20ch] font-display text-3xl leading-tight text-ink md:text-4xl">A student who reads systems like a notebook.</h2>
              <p className="mt-6 max-w-[42ch] font-sans text-base leading-relaxed text-ink-soft">Computer Science Engineering student specialising in IoT, Cybersecurity &amp; Blockchain. My hands-on work centres on backend engineering — REST APIs, JWT authentication, caching, and the security around them.</p>
              <div className="mt-8 grid grid-cols-1 gap-px bg-ink/15 ring-1 ring-ink/15 sm:grid-cols-2">
                <div className="bg-paper-2 p-5"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">2024 — Present</p><p className="mt-2 font-display text-lg text-ink">B.E. Computer Science</p><p className="mt-1 font-sans text-sm text-ink-soft">B.M.S. College of Engineering</p><p className="mt-3 font-mono text-xs text-vermilion">CGPA 8.0 / 10</p></div>
                <div className="bg-paper-2 p-5"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">2022 — 2024</p><p className="mt-2 font-display text-lg text-ink">Pre-University</p><p className="mt-1 font-sans text-sm text-ink-soft">Shree Vijaya PU College</p><p className="mt-3 font-mono text-xs text-vermilion">97%</p></div>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="mb-5 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft"><span>Technical focus</span><span className="text-ink-faint">notebook</span></div>
              <ul className="divide-y divide-ink/10 border-y border-ink/10 font-sans text-base">
                {["Node.js · Express.js · REST APIs", "PostgreSQL · MongoDB · Redis", "JWT · Authorization · Caching", "Postman · Jest · API testing", "Data Structures · Networks · Linux", "Ethical hacking · CTF practice"].map((item, index) => <li key={item} className="flex items-center justify-between py-4"><span className="text-ink">{item}</span><span className="font-mono text-xs text-ink-soft">0{index + 1}</span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="bg-paper" aria-labelledby="skills-heading">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"><div><SectionLabel number="03">Skills</SectionLabel><h2 id="skills-heading" className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">Tools, grouped by what they do.</h2></div><p className="max-w-[34ch] font-sans text-sm leading-relaxed text-ink-soft">Select a layer to see the stack. No proficiency bars — just the relationships that matter.</p></div>
          <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label="Skill categories">
            {(Object.keys(skillGroups) as Array<keyof typeof skillGroups>).map((group) => <button key={group} type="button" role="tab" aria-selected={activeSkill === group} onClick={() => setActiveSkill(group)} className={`rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${activeSkill === group ? "bg-ink text-paper" : "text-ink ring-1 ring-ink/25 hover:ring-ink/50"}`}>{group}</button>)}
          </div>
          <div className="mt-8 rounded-xl bg-paper-2 p-6 ring-1 ring-ink/15 md:p-8" role="tabpanel">
            <div className="flex items-center justify-between gap-4"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Active layer — {activeSkill}</p><span className="font-mono text-[10px] text-ink-faint">{skillGroups[activeSkill].length} tools</span></div>
            <div className="mt-5 flex flex-wrap gap-2.5">{skillGroups[activeSkill].map((skill, index) => <span key={skill} className={`rounded-md bg-paper px-4 py-2 font-sans text-sm text-ink ring-1 ring-ink/10 ${index === 0 ? "ring-vermilion/40" : ""}`}>{skill}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="work" className="bg-paper-2" aria-labelledby="work-heading">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <SectionLabel number="04">Selected work</SectionLabel>
          <h2 id="work-heading" className="mt-4 max-w-[24ch] font-display text-3xl leading-tight text-ink md:text-4xl">Two dossiers from the notebook.</h2>
          {projects.map((project, index) => <article key={project.title} className="mt-12 grid grid-cols-1 gap-8 border-t border-ink/15 pt-10 lg:grid-cols-12">
            <div className={`lg:col-span-6 ${index === 1 ? "lg:order-2" : ""}`}>
              <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft"><span className="text-vermilion">Dossier {project.number}</span><span className="text-ink-faint">{project.subtitle}</span></div>
              <h3 className="mt-4 font-display text-4xl leading-none text-ink md:text-5xl">{project.title}</h3>
              <p className="mt-5 max-w-[46ch] font-sans text-base leading-relaxed text-ink-soft">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="rounded-md bg-paper px-3 py-1.5 font-mono text-xs text-ink ring-1 ring-ink/10">{technology}</span>)}</div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">{project.capabilities.map((capability) => <span key={capability}>+ {capability}</span>)}</div>
              <div className="mt-7"><GithubPlaceholder /></div>
            </div>
            <div className={`lg:col-span-6 ${index === 1 ? "lg:order-1" : ""}`}>
              <div className="relative h-full min-h-[280px] rounded-xl bg-paper p-7 ring-1 ring-ink/15"><div className={`absolute ${index === 0 ? "-bottom-2 left-8 -rotate-3 bg-acid/40" : "-right-2 top-8 rotate-6 bg-vermilion/30"} h-5 w-9`} /><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">{project.visualLabel}</p><div className="mt-7 flex flex-col gap-4 font-mono text-xs text-ink">{project.visualSteps.map((step, stepIndex) => <div key={step} className={`flex items-center gap-3 ${stepIndex > 0 ? "ml-5 border-l border-dashed border-ink/30 pl-6" : ""}`}><span className={`size-2 rounded-full ${stepIndex === 1 ? "bg-vermilion" : stepIndex === 3 ? "bg-acid" : "bg-ink/40"}`} />{step}</div>)}</div><div className="mt-8 border-t border-ink/10 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">Architecture note · visual summary</div></div>
            </div>
          </article>)}
        </div>
      </section>

      <section id="journey" className="bg-paper" aria-labelledby="journey-heading">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
          <SectionLabel number="05">Engineering journey</SectionLabel>
          <h2 id="journey-heading" className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">The path so far.</h2>
          <div className="relative mt-12 max-w-3xl"><div className="absolute bottom-2 left-[7px] top-2 w-px bg-ink/25" /><ol className="space-y-10">{journey.map((item) => <li key={item.title} className="relative pl-10"><span className={`absolute left-0 top-1.5 size-3.5 rounded-full border-2 border-paper ${item.tone === "vermilion" ? "bg-vermilion" : item.tone === "acid" ? "bg-acid" : "bg-ink"}`} /><p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">{item.period}</p><p className="mt-1 font-display text-xl text-ink">{item.title}</p><p className="mt-1 max-w-[60ch] font-sans text-sm text-ink-soft">{item.detail}</p></li>)}</ol></div>
        </div>
      </section>

      <section id="resume" className="bg-paper-2" aria-labelledby="resume-heading">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20"><div className="grid grid-cols-1 gap-8 lg:grid-cols-12"><div className="lg:col-span-5"><SectionLabel number="06">Resume</SectionLabel><div className="mt-6 rounded-xl bg-paper p-7 ring-1 ring-ink/15"><h2 id="resume-heading" className="font-display text-2xl text-ink">Profile summary</h2><p className="mt-3 font-sans text-sm leading-relaxed text-ink-soft">Backend-focused full-stack developer and CSE student. Focused on Node.js, Express, REST APIs, PostgreSQL, Redis, authentication, authorization, caching, security tooling, and full-stack project development.</p><div className="mt-5 border-t border-ink/15 pt-5"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">Resume available privately</p><button type="button" disabled className="mt-3 inline-flex cursor-not-allowed items-center gap-2 rounded-md px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint ring-1 ring-ink/20"><span className="size-1.5 rounded-full bg-vermilion" />Request download</button></div></div></div><div className="lg:col-span-6 lg:col-start-7"><SectionLabel number="07">Evidence</SectionLabel><div className="mt-6 rounded-xl bg-paper p-7 ring-1 ring-ink/15"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Certification</p><p className="mt-3 font-display text-2xl leading-tight text-ink">Python for Networking, AI, ML &amp; Deep Learning</p><p className="mt-3 font-sans text-sm text-ink-soft">2-Week Value Added Course · Dec. 8–22, 2025</p><p className="mt-1 font-sans text-sm text-ink-soft">CSE (IoT, Cybersecurity &amp; Blockchain), BMSCE</p><p className="mt-1 font-sans text-sm text-ink-soft">BMSCE IEEE Student Branch &amp; Sensored Club</p><div className="mt-7 border-t border-ink/10 pt-5"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Activities</p><div className="mt-4 flex flex-wrap gap-2.5">{activities.map((activity) => <span key={activity} className="rounded-full px-4 py-2 font-sans text-sm text-ink ring-1 ring-ink/20">{activity}</span>)}</div></div></div></div></div></div>
      </section>

      <ContactSection />

      <footer className="bg-ink text-paper"><div className="mx-auto max-w-[1200px] px-5 py-8 md:px-8"><div className="flex flex-col gap-3 border-t border-paper/15 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/65 md:flex-row md:items-center md:justify-between"><span>Sanjay C — Engineering Journal</span><span>Bengaluru, Karnataka</span><span className="text-vermilion">Vol. 02</span></div></div></footer>
    </main>
  );
}

function ContactSection() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${String(data.get("name") ?? "")}`);
    const body = encodeURIComponent(`Name: ${String(data.get("name") ?? "")}\nEmail: ${String(data.get("email") ?? "")}\n\n${String(data.get("message") ?? "")}`);
    setSent(true);
    window.location.href = `mailto:${socialLinks.email}?subject=${subject}&body=${body}`;
  };

  return <section id="contact" className="bg-paper" aria-labelledby="contact-heading"><div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24"><div className="grid grid-cols-1 gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><SectionLabel number="08">Contact</SectionLabel><h2 id="contact-heading" className="mt-5 font-display text-4xl leading-[1.05] text-ink md:text-5xl">Let&apos;s build something.</h2><div className="mt-8 space-y-4 font-sans text-sm"><a href={`mailto:${socialLinks.email}`} className="flex items-center gap-3 text-ink transition-colors hover:text-vermilion"><Mail className="size-4" aria-hidden="true" />{socialLinks.email}<ArrowUpRight className="size-3" aria-hidden="true" /></a><a href={`tel:${socialLinks.phone.replaceAll(" ", "")}`} className="flex items-center gap-3 text-ink transition-colors hover:text-vermilion"><Phone className="size-4" aria-hidden="true" />{socialLinks.phone}</a><span className="flex items-center gap-3 text-ink-soft"><MapPin className="size-4" aria-hidden="true" />Bengaluru, Karnataka</span><a href={socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-ink transition-colors hover:text-vermilion"><Github className="size-4" aria-hidden="true" />github.com/Sanjay-Git-0510</a><a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-ink transition-colors hover:text-vermilion"><Linkedin className="size-4" aria-hidden="true" />linkedin.com/in/sanjay-c-374360330</a></div></div><div className="lg:col-span-6 lg:col-start-7"><form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-paper-2 p-6 ring-1 ring-ink/15 md:p-7"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">Write a note</p><label className="block"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Name</span><input required name="name" type="text" className="mt-1.5 w-full border-b border-ink/25 bg-transparent py-2 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-vermilion" placeholder="Your name" /></label><label className="block"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Email</span><input required name="email" type="email" className="mt-1.5 w-full border-b border-ink/25 bg-transparent py-2 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-vermilion" placeholder="you@company.com" /></label><label className="block"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">Message</span><textarea required name="message" rows={4} className="mt-1.5 w-full resize-none border-b border-ink/25 bg-transparent py-2 font-sans text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-vermilion" placeholder="Tell me about the project" /></label><button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-vermilion px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ink"><Send className="size-3.5" aria-hidden="true" /> {sent ? "Opening email" : "Send via email"}</button><p className="font-mono text-[10px] text-ink-faint">Opens your mail client — no backend yet.</p></form></div></div></div></section>;
}