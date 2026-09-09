import React, { useState, useEffect } from 'react';

// --- SHARED COMPONENTS ---

const SectionHeader = ({ title, subtitle, light }) => (
  <div className="mb-12 lg:mb-20 relative reveal px-4 text-center lg:text-left">
    <h2 className={`text-2xl lg:text-4xl font-light tracking-tight uppercase ${light ? 'text-white' : 'text-brand-dark'}`}>
      {title}
    </h2>
    <div className="h-1.5 w-16 bg-brand-accent mt-3 mx-auto lg:mx-0"></div>
    {subtitle && (
      <p className={`mt-6 text-base lg:text-lg font-medium leading-relaxed ${light ? 'text-slate-300' : 'text-brand-muted'} lg:whitespace-nowrap`}>
        {subtitle}
      </p>
    )}
  </div>
);

// RESTORED: Original grid and aspect ratio
const PhotoGallery = ({ count, label = "Project Photos", images = [] }) => {
  const items = images.length > 0 ? images : [...Array(count)];
  return (
    /* This grid logic ensures 2 photos = 2 columns, 3 photos = 3 columns */
    <div className={`grid ${items.length === 1 ? 'grid-cols-1' : items.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2 mt-6`}>
      {items.map((item, i) => {
        const isObject = typeof item === 'object' && item !== null;
        const src = isObject ? item.url : item;
        const position = isObject ? item.pos : "object-top"; 
        const zoom = isObject && item.zoom ? item.zoom : "scale-100"; 

        return (
          <div key={i} className="bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center aspect-video relative overflow-hidden group">
            {src && src !== "IMAGE_URL_HERE" ? (
              <img 
                src={src} 
                className={`w-full h-full object-cover ${position} ${zoom} transition-transform duration-500 group-hover:opacity-90`} 
                alt={label}
              />
            ) : (
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

// RESTORED: Original padding and layout
const ExperienceCard = ({ title, organization, period, highlights, photosCount, isCurrent, images = [] }) => (
  <div className={`relative pl-12 pb-16 border-l-2 ${isCurrent ? 'border-brand-accent' : 'border-slate-200'} last:pb-0 reveal`}>
    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white ${isCurrent ? 'border-brand-accent' : 'border-slate-300'}`}>
      {isCurrent && <div className="absolute inset-1 bg-brand-accent rounded-full animate-pulse"></div>}
    </div>
    <div className="flex flex-col lg:flex-row lg:gap-12">
      <div className="flex-1">
        <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em] mb-2 block">{period}</span>
        <h3 className="text-2xl font-bold text-brand-dark mb-1">{title}</h3>
        <p className="text-sm font-bold text-brand-muted uppercase tracking-widest mb-6">{organization}</p>
        <ul className="space-y-3 mb-8">
          {highlights.map((item, i) => (
            <li key={i} className="text-brand-primary text-sm flex items-start gap-3">
              <span className="text-brand-accent mt-1.5">•</span> {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:w-1/2">
        <PhotoGallery count={photosCount} images={images} label="Event / Role Photos" />
      </div>
    </div>
  </div>
);

const CertificationCard = ({ title, issuer, category }) => (
  <div className="bg-white border border-slate-200 p-6 lg:p-8 hover:border-brand-accent transition-all duration-500 flex flex-col h-full shadow-sm reveal">
    <div className="mb-4">
      <span className="text-[9px] font-bold text-brand-accent uppercase tracking-widest">{category}</span>
    </div>
    <div className="flex-grow">
      <h3 className="text-base lg:text-lg font-bold text-brand-dark mb-2 leading-snug">{title}</h3>
      <p className="text-xs font-bold text-brand-muted uppercase tracking-wider">{issuer}</p>
    </div>
    <div className="mt-6 pt-6 border-t border-slate-100">
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Credential Verifiable</span>
    </div>
  </div>
);

const ProjectCard = ({ title, tagline, description, role, tags, category, link }) => (
  <div className="bg-white border border-slate-200 p-8 lg:p-10 flex flex-col h-full shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group reveal">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
       <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em]">{category}</span>
       <span className="text-[9px] font-bold text-brand-muted uppercase tracking-[0.1em] border border-slate-100 px-3 py-1">Role: {role}</span>
    </div>
    <div className="flex-grow">
        <h3 className="text-xl lg:text-2xl font-bold mb-2 text-brand-dark leading-tight">{title}</h3>
        <p className="text-brand-accent font-serif italic text-base mb-6">{tagline}</p>
        <p className="text-brand-muted text-sm leading-relaxed mb-6">{description}</p>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold text-brand-dark uppercase tracking-widest hover:text-brand-accent transition-colors mb-8 group/link">
            View Project Details
            <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        )}
    </div>
    <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-2 mt-auto">
      {tags.map(tag => (
        <span key={tag} className="text-[9px] font-bold bg-slate-50 border border-slate-200 px-3 py-1.5 uppercase tracking-tighter text-brand-primary">{tag}</span>
      ))}
    </div>
  </div>
);

const App = () => {
  // Smooth Reveal Effect logic
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entries[0].isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative font-sans text-brand-dark selection:bg-brand-accent/30">
      {/* Background Smoothness Style Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* BACKGROUND DECOR (Animated) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
        <div className="absolute top-[5%] left-[-10%] w-[600px] lg:w-[1000px] h-[600px] lg:h-[1000px] bg-brand-accent/20 rounded-full blur-[100px] lg:blur-[160px] animate-drift"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] lg:w-[1200px] h-[600px] lg:h-[1200px] bg-brand-primary/20 rounded-full blur-[120px] lg:blur-[200px] animate-drift-slow"></div>
        <div className="absolute top-[40%] right-[15%] w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] animate-drift" style={{ animationDelay: '-10s' }}></div>
        <div className="particle-field"></div>
        <div className="light-sweep"></div>
      </div>

      {/* NAVIGATION */}
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto h-20 lg:h-24 px-6 lg:px-8 flex items-center justify-between">
          <div className="flex flex-col flex-shrink-0">
            <span className="text-xl lg:text-2xl font-bold tracking-tighter uppercase leading-none">Savina<span className="text-brand-accent">.</span>V</span>
            <span className="text-[8px] font-bold tracking-[0.4em] text-brand-muted uppercase mt-1">Think. Lead. Inspire.</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 text-[10px] font-bold tracking-[0.2em] uppercase">
            <a href="#home" className="hover:text-brand-accent transition-colors">Home</a>
            <a href="#about" className="hover:text-brand-accent transition-colors">About</a>
            <a href="#achievements" className="hover:text-brand-accent transition-colors">Achievements</a>
            <a href="#experience" className="hover:text-brand-accent transition-colors">Experience</a>
            <a href="#skills" className="hover:text-brand-accent transition-colors">Skills</a>
            <a href="#certifications" className="hover:text-brand-accent transition-colors">Certifications</a>
            <a href="#projects" className="hover:text-brand-accent transition-colors">Projects</a>
            <a href="#contact" className="hover:text-brand-accent transition-colors text-brand-accent">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-brand-dark focus:outline-none"
          >
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all"></div>
            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
            <div className="w-6 h-0.5 bg-current"></div>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 py-6 px-8 flex flex-col space-y-4 text-[10px] font-bold tracking-[0.2em] uppercase animate-in fade-in slide-in-from-top-4">
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#achievements" onClick={() => setIsMenuOpen(false)}>Achievements</a>
            <a href="#experience" onClick={() => setIsMenuOpen(false)}>Experience</a>
            <a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a>
            <a href="#certifications" onClick={() => setIsMenuOpen(false)}>Certifications</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-brand-accent">Contact</a>
          </div>
        )}
      </nav>

      <main className="relative z-10 overflow-x-hidden">
        
        {/* --- 1. HOME --- */}
        <section id="home" className="min-h-[90vh] flex items-center py-12 lg:py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full reveal">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              
              <div className="order-2 lg:order-1 text-center lg:text-left">
                <h1 className="text-5xl md:text-7xl lg:text-[8.5rem] font-black text-brand-dark leading-[1.1] lg:leading-[0.8] mb-6 lg:mb-10 tracking-tighter uppercase">
                  Savina <br /> 
                  <span className="text-brand-accent font-serif italic font-normal block tracking-tight capitalize text-4xl md:text-6xl lg:text-8xl lg:-mt-4 lg:ml-2">
                    Visvanathan
                  </span>
                </h1>
                <div className="h-1 w-24 bg-brand-dark mb-8 lg:mb-10 mx-auto lg:mx-0"></div>
                <p className="text-lg lg:text-2xl text-brand-primary leading-relaxed max-w-xl mb-10 lg:mb-12 font-medium italic opacity-90 mx-auto lg:mx-0 text-center lg:text-left">
                  "Where Business, Technology and People come together, I turn ideas into solutions that matter."
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6">
                  <a href="/CV.pdf" download="Savina_Visvanathan_CV.pdf" className="px-8 lg:px-10 py-4 lg:py-5 bg-brand-dark text-white text-[9px] lg:text-[10px] font-bold tracking-[0.2em] lg:tracking-[0.3em] hover:bg-brand-accent transition-all shadow-lg flex items-center gap-2">
                    DOWNLOAD CV
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </a>
                  <a href="#contact" className="px-8 lg:px-10 py-4 lg:py-5 border-2 border-brand-dark text-brand-dark text-[9px] lg:text-[10px] font-bold tracking-[0.2em] lg:tracking-[0.3em] hover:bg-brand-dark hover:text-white transition-all text-center">LET'S CONNECT</a>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center relative">
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-lg">
                  <div className="aura-ring"></div>
                  
                  <div className="aspect-[3/4] bg-slate-100 border-4 lg:border-8 border-white shadow-2xl grayscale-0 lg:grayscale lg:hover:grayscale-0 transition-all duration-1000 overflow-hidden z-10 relative">
                    <img src="images/profile.jpeg" alt="Savina" className="w-full h-full object-cover object-top" />
                  </div>
                  
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- 2. ABOUT ME --- */}
         <section id="about" className="pt-16 pb-0 lg:pt-32 lg:pb-0 bg-slate-50/60 backdrop-blur-md border-t border-slate-200 relative">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <SectionHeader title="About Me" subtitle="Three disciplines. One curiosity: understanding how things work, why people behave the way they do, and how ideas can create meaningful change." />
            
            {/* Changed from lg:grid-cols-2 to lg:grid-cols-3 to give the Bio more horizontal room */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
              
              {/* Column 1: Biography & Career Direction (Takes up 2 parts of the grid) */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 lg:p-14 border border-slate-200 shadow-sm reveal">
                  <h3 className="text-[10px] lg:text-xs font-bold mb-10 text-brand-dark uppercase tracking-[0.3em] border-b border-brand-accent pb-4 inline-block">
                    Biography & Career Direction
                  </h3>
                  
                  <div className="space-y-6 text-brand-primary leading-relaxed text-base lg:text-lg opacity-90 text-justify">
                    <p>
                      I’m a Business Information Systems undergraduate at the University of Sri Jayewardenepura, with a 3.97/4.00 GPA and an academic journey spanning Business, Technology, Finance, and Psychology.
                    </p>
                    <p>
                      I’ve always been curious about how things work, and even more curious about how they could work better. I enjoy looking beyond the obvious problem, understanding what people actually need, and turning those insights into practical solutions. Whether I’m working on a project, coordinating a team, or analysing a system, I’m drawn to the space where business, technology and people come together.
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100 space-y-6 text-brand-muted leading-relaxed text-sm lg:text-base text-justify">
                    <p>
                      My career interests lie in Business Analysis, Project Management, Digital Transformation, and technology-driven business improvement. I want to help organisations use technology and increasingly, AI, not simply because it is available, but because it creates meaningful value. For me, AI should amplify human judgement, creativity, productivity, and problem-solving, not replace the thinking behind them.
                    </p>
                    <p>
                      I want to build a career around that balance: understanding the human problem, thinking critically about the business need, and using technology intelligently to create a better solution. Ultimately, I hope to become someone organisations can rely on to connect what the business needs with what technology makes possible.
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 2: Academic Qualifications (Takes up 1 part of the grid) */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold mb-6 text-brand-dark uppercase tracking-[0.3em] px-2 reveal">
                  Academic Qualifications
                </h3>
                {[
                  { title: "BSc (Hons) Business Information Systems (R)", inst: "University of Sri Jayewardenepura" },
                  { title: "Diploma in International Business & Finance", inst: "University of the West of Scotland" },
                  { title: "Dual Diploma in Psychology + Counselling (R)", inst: "Universal Collge of Applied & General Studies" }
                ].map((edu, index) => (
                  <div key={index} className="p-6 lg:p-8 bg-white border border-slate-200 border-l-[4px] border-l-brand-accent shadow-sm group hover:bg-brand-dark transition-all duration-500 reveal">
                    <h4 className="font-bold text-brand-dark text-md lg:text-lg mb-2 group-hover:text-white transition-colors leading-tight">
                      {edu.title}
                    </h4>
                    <p className="text-[9px] text-brand-accent uppercase tracking-[0.1em] font-bold group-hover:text-brand-accent transition-colors">
                      {edu.inst}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* --- 3. ACHIEVEMENTS --- */}
      
        <section id="achievements" className="pt-16 pb-16 lg:pt-24 lg:pb-24 bg-white/60 backdrop-blur-md relative relative">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <SectionHeader title="Achievements" subtitle="Milestones that shaped my Confidence, Curiosity, and Drive to keep growing." />
            
            {/* Main High-Impact Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="p-8 lg:p-10 border border-slate-200 bg-[#F9F7F2] relative group reveal">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent"></div>
                <p className="text-[9px] font-bold text-brand-accent uppercase tracking-[0.2em] mb-4">G.C.E. Advanced Level 2022</p>
                <h4 className="text-xl lg:text-2xl font-bold text-brand-dark leading-tight">District 2nd</h4>
                <p className="text-[10px] text-brand-muted mt-2 font-bold uppercase">Nuwara Eliya District — Commerce Stream</p>
                <p className="text-[10px] text-brand-accent mt-1 uppercase font-bold tracking-tighter">Lyceum International School</p>
              </div>

              <div className="p-8 lg:p-10 border border-slate-200 bg-slate-50 reveal">
                <p className="text-[9px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-4">Lyceum International School - Nuwara Eliya</p>
                <h4 className="text-xl lg:text-2xl font-bold text-brand-dark leading-tight">Best A/L Commerce Student</h4>
              </div>

              <div className="p-8 lg:p-10 border border-slate-200 bg-slate-50 reveal">
                <p className="text-[9px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-4">Lyceum International School - Nuwara Eliya</p>
                <h4 className="text-2xl font-bold text-brand-dark leading-tight text-brand-dark">Best English Orator</h4>
              </div>
            </div>

            {/* NEW: Additional Awards Summary Bar */}
            <div className="mt-12 p-6 border-t border-dashed border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 reveal">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-brand-accent"></div>
                <p className="text-[10px] font-bold text-brand-dark uppercase tracking-[0.2em]">Additional Recognitions</p>
              </div>
              <p className="text-xs text-brand-muted italic max-w-2xl text-center md:text-right leading-relaxed">
                Recipient of multiple academic and extracurricular awards throughout my school career, 
                including subject prizes and leadership commendations that complement the primary milestones listed above.
              </p>
            </div>

          </div>
        </section>



        {/* --- 4. EXPERIENCE --- */}
        <section id="experience" className="py-16 lg:py-32 bg-white/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <SectionHeader title="Experience" subtitle="From coordinating people and projects to taking the lead, each experience has shaped how I work, communicate, and create impact." />
            <div className="max-w-5xl mx-auto mb-20 lg:mb-32">
              <ExperienceCard 
                isCurrent period="2026/2027" title="Secretary" organization="ISACA Student Group USJ"
                highlights={["Directing administrative and operational leadership of the student group.", "Acting as a primary liaison between the executive board and student body.", "Coordinating relevant organizational activities and events."]}
                images={[{ url: "/images/Secratary1.jpeg", pos: "object-center" }, { url: "/images/Secretary2.jpeg", pos: "object-center" }]}
              />
              <ExperienceCard 
                period="2025/2026" title="Assistant Secretary" organization="ISACA Student Group USJ"
                highlights={["Providing critical executive committee support and coordination.", "Managing organizational communication and project documentation."]}
                images={["/images/assistant2.jpeg"]}
              />
              <ExperienceCard 
                period="2024/2025" title="Partnerships Manager" organization="Cyber Summit 2024/25 — ISACA Student Group USJ"
                highlights={["Partnership coordination and stakeholder communication.", "Supporting external collaborations and event coordination."]}
                images={[{ url: "/images/cs25-1.jpeg", pos: "object-center" }, { url: "/images/cs25-2.jpeg", pos: "object-center" }]}
              />
              <ExperienceCard 
                period="2024/2025" title="Finance Squad Leader" organization="ISACA Student Group USJ"
                highlights={["Financial coordination and team leadership.", "Managing budget-related responsibilities."]}
                images={[{ url: "/images/finance1.jpeg", pos: "object-top" }, { url: "/images/finance2.jpeg", pos: "object-center", zoom: "scale-[1.2]" }]}
              />
              <ExperienceCard 
                period="Event Representation" title="Representative" organization="ISACA Student Group USJ"
                highlights={["Represented ISG-USJ at the Horizon Campus inauguration.", "Organizational representation and networking."]}
                images={[{ url: "/images/horizon3.jpeg", pos: "object-top" }, { url: "/images/horizon2.jpeg", pos: "object-center" }]}
              />
              <ExperienceCard 
                period="Academic Project" title="President" organization="CSR Project AURORA"
                highlights={["Leading project planning, team coordination and execution.", "Directing community engagement and medical support distribution."]}
                images={[{ url: "/images/aurora1.jpeg", pos: "object-center" }, { url: "/images/aurora2.jpeg", pos: "object-bottom" }, { url: "/images/aurora3.jpeg", pos: "object-center" }, { url: "/images/aurora4.jpeg", pos: "object-bottom" }, { url: "/images/aurora5.jpeg", pos: "object-center" }]}
              />
            </div>

            <div className="pt-16 lg:pt-24 border-t border-slate-100">
               <h3 className="text-[10px] lg:text-xs font-bold mb-12 lg:mb-16 text-brand-dark uppercase tracking-[0.4em] text-center">Event Hosting & Public Speaking</h3>
               <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                  <div className="p-6 lg:p-8 bg-slate-50 border border-slate-200 reveal">
                    <h4 className="text-lg font-bold text-brand-dark">BIS Welcome</h4>
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1 mb-4">Event Host / Department of IT, FMSC, USJ</p>
                    <p className="text-sm text-brand-muted leading-relaxed mb-4">Hosted welcoming events for incoming students to the Department of Information Technology.</p>
                    <PhotoGallery count={2} images={[{ url: "/images/welcome.jpeg", pos: "object-[40%_30%]" }, "/images/biswelcome2.jpeg"]} label="Hosting Photos" />
                  </div>
                  <div className="p-6 lg:p-8 bg-slate-50 border border-slate-200 reveal">
                    <h4 className="text-lg font-bold text-brand-dark">Cyber Summit 2026</h4>
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1 mb-4">Compere & Facilitator</p>
                    <p className="text-sm text-brand-muted leading-relaxed mb-4">Served as the official Compere for high-level industry stakeholders, academia and students.</p>
                    <PhotoGallery count={2} images={["/images/cs26-1.jpeg", "/images/cs26-2.jpeg"]} label="Summit Photos" />
                  </div>
                  <div className="p-6 lg:p-8 bg-slate-50 border border-slate-200 reveal">
                    <h4 className="text-lg font-bold text-brand-dark">Cybersecurity Awareness Session</h4>
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1 mb-4">Event Host / Govt. Officers Session</p>
                    <p className="text-sm text-brand-muted leading-relaxed mb-4">Hosted a specialized session for government officers at Maharagama Divisional Secretariat.</p>
                    <PhotoGallery count={2} images={[{ url: "/images/awareness1.jpeg", pos: "object-center" }, { url: "/images/awareness2.jpeg", pos: "object-[40%_50%]" }]} label="Awareness Photos" />
                  </div>
                  <div className="p-6 lg:p-8 bg-slate-50 border border-slate-200 reveal">
                    <h4 className="text-lg font-bold text-brand-dark">Cybersecurity in Action</h4>
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1 mb-4">Host / Knowledge Session</p>
                    <p className="text-sm text-brand-muted leading-relaxed mb-4">Moderated cybersecurity-focused sessions aimed at bridging digital security knowledge gaps.</p>
                    <PhotoGallery count={2} images={["/images/action1.jpeg", "/images/action2.jpeg"]} label="Session Photos" />
                  </div>
               </div>
            </div>
          </div>
        </section>

        
        {/* --- 5. SKILLS --- */}
        <section id="skills" className="py-16 lg:py-32 bg-brand-dark text-white relative overflow-hidden">
          {/* Background Grid Accent */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="grid grid-cols-12 h-full">
              {[...Array(144)].map((_, i) => <div key={i} className="border border-white/20"></div>)}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <SectionHeader title="Skill Set" subtitle="Bringing together Business Thinking, Technology, and People Skills to turn ideas into practical solutions." light />
            
            <div className="grid md:grid-cols-3 gap-10 lg:gap-20">
              {/* Technical & Analytical */}
              <div className="bg-white/5 p-8 lg:p-10 border border-white/10 backdrop-blur-sm reveal">
                <h3 className="font-bold uppercase tracking-[0.3em] text-xs text-brand-accent mb-12 border-b border-brand-accent/30 pb-4">Technical & Analytical Skills</h3>
                <ul className="space-y-6 text-slate-300 text-sm font-medium">
                  <li>[#] Business Process Analysis</li>
                  <li>[#] Requirements Engineering</li>
                  <li>[#] Data Analysis & Visualization</li>
                  <li>[#] Systems Analysis & Design</li>
                  <li>[#] Problem Solving & Critical Thinking</li>
                </ul>
              </div>

              {/* Business & Management */}
              <div className="bg-white/5 p-8 lg:p-10 border border-white/10 backdrop-blur-sm reveal">
                <h3 className="font-bold uppercase tracking-[0.3em] text-xs text-brand-accent mb-12 border-b border-brand-accent/30 pb-4">Business, Management & Soft Skills</h3>
                <ul className="space-y-6 text-slate-300 text-sm font-medium">
                  <li>[#] Strategic Organizational Leadership</li>
                  <li>[#] Public Speaking & Professional Oratory</li>
                  <li>[#] Stakeholder Relationship Management</li>
                  <li>[#] Presentation & Facilitation</li>
                  <li>[#] Collaborative Team Coordination</li>
                </ul>
              </div>

              {/* Tools & Tech */}
              <div className="bg-white/5 p-8 lg:p-10 border border-white/10 backdrop-blur-sm reveal">
                <h3 className="font-bold uppercase tracking-[0.3em] text-xs text-brand-accent mb-12 border-b border-brand-accent/30 pb-4">Tools & Technologies</h3>
                <ul className="space-y-6 text-slate-300 text-sm font-medium">
                  <li>[#] MySQL | Python</li>
                  <li>[#] HTML / CSS / JavaScript</li>
                  <li>[#] Version Control - Git</li>
                  <li>[#] SPSS | RapidMiner</li>
                  <li>[#] Power BI | Enterprise Suites</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- 6. CERTIFICATIONS --- */}
        <section id="certifications" className="py-16 lg:py-32 bg-slate-50/60 backdrop-blur-md border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <SectionHeader title="Certifications" subtitle="Expanding my knowledge beyond the classroom through continuous learning in Technology, Cybersecurity, Data, and Project Management." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <CertificationCard category="Project Management" title="Foundations of Project Management" issuer="University of Moratuwa" />
              <CertificationCard category="Cybersecurity" title="Deloitte Australia — Cyber Job Simulation" issuer="Forage" />
              <CertificationCard category="Technology" title="PwC US — Technology Consulting Job Simulation" issuer="Forage" />
              <CertificationCard category="Technology" title="Introduction to IoT and Digital Transformation" issuer="Cisco" />
              <CertificationCard category="Cybersecurity" title="Cybersecurity Fundamentals" issuer="APNIC" />
              <CertificationCard category="Data & Analytics" title="Learning Data Analytics" issuer="LinkedIn" />
              <CertificationCard category="Emerging Tech" title="What Is Generative AI?" issuer="LinkedIn" />
            </div>
          </div>
        </section>

        {/* --- 7. PROJECTS --- */}
        <section id="projects" className="py-16 lg:py-32 bg-[#F9F7F2]/60 backdrop-blur-md border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-8">
            <SectionHeader title="Academic Projects" subtitle="Turning real-world problems into practical solutions through Technology, Analysis, and Collaboration." />
            <div className="grid md:grid-cols-2 gap-10">
              <ProjectCard 
                category="Decision Support Systems" title="SolveMate" tagline="Chemical Compatibility Platform" role="Project Manager" 
                description="Designed a specialized decision support system for Identifying compatible polymer-solvent pairs using the Hansen Solubility model." 
                tags={['Project Management', 'MySQL', 'Systems Analysis']} 
                link="https://github.com/Department-of-IT-FMSC-USJ/oop-project-final-solvemate.git" 
              />
              <ProjectCard 
                category="Social Impact" title="Project AURORA" tagline="CSR Empowerment" role="President" 
                description="A high-impact CSR initiative supporting those adversely affected by the Covidd-19 pandemic; elderly, female adolescents, pregnant mothers and a single mother." 
                tags={['Holistic Management', 'Leadership', 'Stakeholder Communication']} 
                link="https://www.instagram.com/aurora.csr?igsi=MWE3d2VlZXRta3g4MQ==" 
              />
              <ProjectCard 
                category="Healthcare" title="MedFlex" tagline="Digital Health Coordination" role="Full Stack Developer" 
                description="A robust system designed to streamline communication between healthcare providers and patients with high data integrity." 
                tags={['Web Development', 'UI/UX Design', 'Architecture']} 
                link="https://github.com/LEOQuester/MedFlex-Latest" 
              />
              <ProjectCard 
                category="Finance" title="Budget Buddy" tagline="Personal Finance Architecture" role="Requirements Engineer" 
                description="Developed a user-centric financial platform focused on eliciting complex requirements for automated tracking and goal-setting." 
                tags={['User Research', 'Analysis', 'Logic Design']} 
                link="https://github.com/Nayanthi-Weerasuriya/budget_buddy" 
              />
            </div>
          </div>
        </section>

        {/* --- 8. CONTACT --- */}
        {/* --- 8. CONTACT --- */}
        <section id="contact" className="py-16 lg:py-32 bg-white/60 backdrop-blur-md relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12 lg:mb-20 flex flex-col items-center text-center reveal">
              <h2 className="text-2xl lg:text-3xl font-light tracking-tight uppercase text-brand-dark">
                Contact Me
              </h2>
              <div className="h-1.5 w-16 bg-brand-accent mt-3 mx-auto"></div>
              
              {/* Wrapped in a container to ensure mobile safety while maintaining one-line desktop view */}
              <div className="mt-8 space-y-2 w-full overflow-hidden">
                <p className="text-sm lg:text-lg font-medium text-brand-muted lg:whitespace-nowrap text-center">
                  Open to Internship Opportunities, Academic Collaborations, and Professional Networking.
                </p>
                <p className="text-xs lg:text-base text-brand-muted lg:whitespace-nowrap text-center italic opacity-80">
                  Eager to learn from new perspectives, contribute to meaningful work, and build connections that go beyond the classroom.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 max-w-5xl mx-auto">
              {[
                { label: 'Direct Communication', val: 'savina.visvanathan@gmail.com', href: 'mailto:savina.visvanathan@gmail.com' },
                { label: 'Direct Call / WhatsApp', val: '+94 71 998 0118', href: 'tel:+94719980118' },
                { label: 'Professional Presence', val: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/savina-visvanathan-9bab01304' },
                { label: 'Technical Portfolio', val: 'GitHub Profile', href: 'https://github.com/Savina2302' }
              ].map((item, i) => (
                <div key={i} className="p-8 lg:p-10 bg-white/90 border border-slate-200 hover:border-brand-accent transition-all duration-300 group reveal shadow-sm flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em] mb-4">{item.label}</p>
                  <a 
                    href={item.href} 
                    target={item.href.startsWith('http') ? '_blank' : ''} 
                    rel="noopener noreferrer"
                    className="text-base lg:text-xl font-bold text-brand-dark group-hover:text-brand-accent transition-colors break-all underline underline-offset-4"
                  >
                    {item.val}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-16 lg:py-24 border-t border-slate-100 bg-white text-center">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="h-0.5 w-16 bg-brand-accent mx-auto mb-10"></div>
              <p className="text-[12px] font-bold text-brand-dark uppercase tracking-[0.5em] mb-6">Savina Visvanathan</p>
              <p className="text-[9px] text-brand-muted uppercase tracking-[0.3em] leading-relaxed mx-auto font-medium lg:whitespace-nowrap">
                Bridging the Gap Between Business, Technology & People.
              </p>
              <p className="text-[9px] text-slate-300 mt-12 uppercase tracking-[0.2em] font-bold">
                &copy; {new Date().getFullYear()} Professional Portfolio. All Rights Reserved.
              </p>
            </div>
        </footer>
      </main>
    </div>
  );
};

export default App;

