import React from 'react';

// --- SHARED COMPONENTS ---

const SectionHeader = ({ title, subtitle, light }) => (
  <div className="mb-12 lg:mb-20 relative">
    <h2 className={`text-2xl lg:text-4xl font-light tracking-tight uppercase ${light ? 'text-white' : 'text-brand-dark'}`}>
      {title}
    </h2>
    <div className="h-1.5 w-16 bg-brand-accent mt-3"></div>
    {subtitle && (
      <p className={`mt-6 text-base lg:text-lg font-medium leading-relaxed ${light ? 'text-slate-300' : 'text-brand-muted'} max-w-full lg:whitespace-nowrap overflow-hidden text-ellipsis`}>
        {subtitle}
      </p>
    )}
  </div>
);

const PhotoGallery = ({ count, label = "Project Photos", images = [] }) => {
  const items = images.length > 0 ? images : [...Array(count)];
  return (
    <div className={`grid ${items.length === 1 ? 'grid-cols-1' : items.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2 mt-6`}>
      {items.map((item, i) => {
        const isObject = typeof item === 'object' && item !== null;
        const src = isObject ? item.url : item;
        const position = isObject ? item.pos : "object-top"; 
        // New: Default to scale-100 (normal size) if zoom isn't provided
        const zoom = isObject && item.zoom ? item.zoom : "scale-100"; 

        return (
          <div key={i} className="bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center aspect-video relative overflow-hidden group">
            {src && src !== "IMAGE_URL_HERE" ? (
              <img 
                src={src} 
                className={`w-full h-full object-cover ${position} ${zoom} transition-transform duration-500 group-hover:opacity-90`} 
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

const ExperienceCard = ({ title, organization, period, highlights, photosCount, isCurrent, images = [] }) => (
  <div className={`relative pl-12 pb-16 border-l-2 ${isCurrent ? 'border-brand-accent' : 'border-slate-200'} last:pb-0`}>
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
  <div className="bg-white border border-slate-200 p-8 hover:border-brand-accent transition-all duration-300 flex flex-col h-full shadow-sm">
    <div className="mb-4">
      <span className="text-[9px] font-bold text-brand-accent uppercase tracking-widest">{category}</span>
    </div>
    <div className="flex-grow">
      <h3 className="text-lg font-bold text-brand-dark mb-2 leading-snug">{title}</h3>
      <p className="text-xs font-bold text-brand-muted uppercase tracking-wider">{issuer}</p>
    </div>
    <div className="mt-8 pt-6 border-t border-slate-100">
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Credential Verifiable</span>
    </div>
  </div>
);

const ProjectCard = ({ title, tagline, description, role, tags, category, link }) => (
  <div className="bg-white border border-slate-200 p-10 flex flex-col h-full shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group">
    <div className="mb-6 flex items-center justify-between">
       <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em]">{category}</span>
       <span className="text-[9px] font-bold text-brand-muted uppercase tracking-[0.1em] border border-slate-100 px-3 py-1">Role: {role}</span>
    </div>
    
    <div className="flex-grow">
        <h3 className="text-2xl font-bold mb-2 text-brand-dark leading-tight">{title}</h3>
        <p className="text-brand-accent font-serif italic text-base mb-6">{tagline}</p>
        <p className="text-brand-muted text-sm leading-relaxed mb-6">{description}</p>
        
        {/* NEW LINK ADDITION */}
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
  return (
    <div className="min-h-screen relative font-sans text-brand-dark">
      
      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[5%] right-[-10%] w-[700px] h-[700px] bg-brand-primary/5 rounded-full blur-[150px] animate-float" style={{animationDelay: '5s'}}></div>
      </div>

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto h-24 px-8 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tighter uppercase leading-none">Savina<span className="text-brand-accent">.</span>V</span>
            <span className="text-[8px] font-bold tracking-[0.4em] text-brand-muted uppercase mt-1">Think. Lead. Inspire.</span>
          </div>
          <div className="flex items-center overflow-x-auto no-scrollbar space-x-4 lg:space-x-8 text-[9px] lg:text-[10px] font-bold tracking-[0.1em] lg:tracking-[0.2em] uppercase whitespace-nowrap pb-2 lg:pb-0">
            <a href="#home" className="hover:text-brand-accent transition-colors">Home</a>
            <a href="#about" className="hover:text-brand-accent transition-colors">About</a>
            <a href="#experience" className="hover:text-brand-accent transition-colors">Experience</a>
            <a href="#skills" className="hover:text-brand-accent transition-colors">Skills</a>
            <a href="#certifications" className="hover:text-brand-accent transition-colors">Certifications</a>
            <a href="#projects" className="hover:text-brand-accent transition-colors">Projects</a>
            <a href="#contact" className="hover:text-brand-accent transition-colors text-brand-accent">Contact</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        
        
        {/* --- 1. HOME --- */}
        
        <section id="home" className="min-h-[90vh] flex items-center py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              
              {/* Left Side: Text Content with Redesigned Name Fonts */}
              <div className="order-2 lg:order-1">
                <h1 className="text-5xl md:text-7xl lg:text-[8.5rem] font-black text-brand-dark leading-[0.8] mb-10 tracking-tighter uppercase">
  Savina <br /> 
  <span className="text-brand-accent font-serif italic font-normal block tracking-tight capitalize text-4xl md:text-6xl lg:text-8xl lg:-mt-4 lg:ml-2">
    Visvanathan
  </span>
</h1>
                
                <div className="h-1 w-24 bg-brand-dark mb-10"></div>
                <p className="text-xl lg:text-2xl text-brand-primary leading-relaxed max-w-xl mb-12 font-medium italic opacity-90">
                  "Bridging business, technology and human behaviour to design practical digital solutions."
                </p>
                <div className="flex flex-wrap gap-6">
                  <a href="#experience" className="px-10 py-5 bg-brand-dark text-white text-[10px] font-bold tracking-[0.3em] hover:bg-brand-accent transition-all shadow-lg">VIEW EXPERIENCE</a>
                  <a href="#contact" className="px-10 py-5 border-2 border-brand-dark text-brand-dark text-[10px] font-bold tracking-[0.3em] hover:bg-brand-dark hover:text-white transition-all">LET'S CONNECT</a>
                </div>
              </div>

              {/* Right Side: Image & GPA Badge (Unchanged) */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
                <div className="relative w-full max-w-md lg:max-w-lg">
                  <div className="aspect-[3/4] bg-slate-100 border-8 border-white shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden z-10 relative">
                    <img 
                      src="/images/profile1.png" 
                      alt="Savina" 
                      className="object-cover object-top w-full h-full" 
                    />
                  </div>

                  <div className="absolute top-10 -right-4 lg:top-20 lg:-right-10 bg-brand-dark p-6 lg:p-10 shadow-2xl z-20 w-fit h-fit flex flex-col items-start transform hover:scale-105 transition-transform duration-500">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 whitespace-nowrap">Merit Standing</p>
                    <p className="text-4xl lg:text-5xl font-serif text-brand-accent flex items-baseline gap-2">
                      3.97 <span className="text-sm font-sans text-white font-bold tracking-normal uppercase">GPA</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- 2. ABOUT ME --- */}
        <section id="about" className="py-16 lg:py-32 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-8">
            <SectionHeader title="About Me" subtitle="A multi-disciplinary trajectory across Information Systems, International Finance, and Psychology." />
            
            <div className="grid lg:grid-cols-2 gap-24 items-start">
              {/* Column 1: Biography */}
              <div className="space-y-8">
                <div className="bg-white p-12 border border-slate-200 shadow-sm">
                  <h3 className="text-xs font-bold mb-8 text-brand-dark uppercase tracking-[0.3em] border-b border-brand-accent pb-4 inline-block">Biography & Career Direction</h3>
                  
                  <p className="text-brand-primary leading-relaxed text-lg mb-6 opacity-90 text-justify">
                    I am a high-achieving Business Information Systems undergraduate at the University of Sri Jayewardenepura, with a 3.97/4.00 GPA and an interdisciplinary academic background spanning Business, Technology, Finance and Psychology.  
                    My strengths lie in understanding business problems, analysing stakeholder requirements, translating those requirements into functional system designs, and connecting business objectives with practical technology solutions.
                  </p>

                  <p className="text-brand-muted leading-relaxed mb-10 text-justify">
                    I am particularly interested in building a career in Business Analysis, Systems Analysis, Digital Transformation, and Technology-Driven Business Improvement. I aim to work at the intersection of Business and Technology, helping organizations identify inefficiencies, improve processes, adopt appropriate digital solutions, and make better technology-related decisions.
                  </p>
                  
                  
                </div>
              </div>

              {/* Column 2: Academic Qualifications */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold mb-6 text-brand-dark uppercase tracking-[0.3em]">Academic Qualifications</h3>
                {[
                  { title: "BSc (Hons) Business Information Systems (R)", inst: "University of Sri Jayewardenepura" },
                  { title: "Diploma in International Business & Finance", inst: "University of the West of Scotland (ICBS)" },
                  { title: "Dual Diploma in Psychology + Counselling & Applied Psychology (R)", inst: "Universal College of Applied & General Studies" }
                ].map((edu, index) => (
                  <div key={index} className="p-10 bg-white border border-slate-200 border-l-[6px] border-l-brand-accent shadow-sm group hover:bg-brand-dark transition-all duration-500">
                    <h4 className="font-bold text-brand-dark text-xl mb-2 group-hover:text-white transition-colors">{edu.title}</h4>
                    <p className="text-[10px] text-brand-accent uppercase tracking-[0.2em] font-bold">{edu.inst}</p>
                  </div>
                ))}
              </div>
            </div> {/* End of Grid */}
          </div> {/* End of max-w-7xl Container */}
        </section>

        {/* --- 3. ACHIEVEMENTS --- */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-8">
            <SectionHeader title="Academic & Leadership Achievements" subtitle="Recognitions of excellence from Lyceum International School - Nuwara Eliya." />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-10 border border-slate-200 bg-[#F9F7F2] relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent"></div>
                <p className="text-[9px] font-bold text-brand-accent uppercase tracking-[0.2em] mb-4">G.C.E. Advanced Level 2022</p>
                <h4 className="text-2xl font-bold text-brand-dark leading-tight">District 2nd</h4>
                <p className="text-[10px] text-brand-muted mt-2 font-bold uppercase">Nuwara Eliya District — Commerce Stream</p>
                <p className="text-[10px] text-brand-accent mt-1 uppercase font-bold tracking-tighter">Lyceum International School</p>
              </div>
              <div className="p-10 border border-slate-200 bg-slate-50">
                <p className="text-[9px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-4">Lyceum International School - Nuwara Eliya</p>
                <h4 className="text-2xl font-bold text-brand-dark leading-tight">Best A/L Commerce Student</h4>
              </div>
              <div className="p-10 border border-slate-200 bg-slate-50">
                <p className="text-[9px] font-bold text-brand-muted uppercase tracking-[0.2em] mb-4">Lyceum International School - Nuwara Eliya</p>
                <h4 className="text-2xl font-bold text-brand-dark leading-tight">Best English Orator</h4>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. EXPERIENCE & EVENT HOSTING --- */}
        <section id="experience" className="py-16 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <SectionHeader title="Experience" subtitle="A record of leadership, organizational excellence, and strategic stakeholder engagement." />
            <div className="max-w-5xl mx-auto mb-32">
              <ExperienceCard 
                isCurrent period="2026/2027" title="Secretary" organization="ISACA Student Group USJ"
                highlights={["Directing administrative and operational leadership of the student group", "Acting as a primary liaison between the executive board and student body", "Coordinating relevant organizational activities and events"]}
                images={[
  { url: "/images/Secratary1.jpeg", pos: "object-center" }, 
  { url: "/images/Secretary2.jpeg", pos: "object-center" } 
]}
              />
              <ExperienceCard 
                period="2025/2026" title="Assistant Secretary" organization="ISACA Student Group USJ"
                highlights={["Providing critical executive committee support and coordination", "Managing organizational communication and project documentation", "Supporting key events and strategic initiatives"]}
                images={["/images/assistant2.jpeg"]}
              />
              <ExperienceCard 
                period="2024/2025" title="Partnerships Manager" organization="Cyber Summit 2024/25 — ISACA Student Group USJ"
                highlights={["Partnership coordination", "Stakeholder communication", "Supporting external collaborations", "Event coordination"]}
                images={[
                  { url: "/images/cs25-1.jpeg", pos: "object-center" },
                  { url: "/images/cs25-2.jpeg", pos: "object-center" }]}
              />
              <ExperienceCard 
                period="2024/2025" title="Finance Squad Leader" organization="ISACA Student Group USJ"
                highlights={["Financial coordination and team leadership", "Managing budget-related responsibilities and fiscal tracking", "Supporting financial activities of the student group"]}
                images={[
                  { url: "/images/finance1.jpeg", pos: "object-top", zoom: "scale-100"}, { url: "/images/finance2.jpeg", pos: "object-center", zoom: "scale-[1.20]"}]}
              />
              <ExperienceCard 
                period="Event Representation" title="Representative" organization="ISACA Student Group USJ"
                highlights={["Represented ISG-USJ at the inauguration of the ISACA Student Group of Horizon Campus", "Organizational representation", "Professional networking", "Stakeholder engagement"]}
                images={[
                  { url: "/images/horizon3.jpeg", pos: "object-top"}, { url: "/images/horizon2.jpeg", pos: "object-center"}]}
              />
              <ExperienceCard 
  period="Academic Project" 
  title="President" 
  organization="CSR Project AURORA"
  highlights={[
    "Leading project planning, execution, and team coordination",
    "Directing stakeholder communication and community engagement",
    "Managing medical support and sustainable livelihood distribution"
  ]}
  images={[
    { url: "/images/aurora1.jpeg", pos: "object-center" }, 
    { url: "/images/aurora2.jpeg", pos: "object-bottom" }, 
    { url: "/images/aurora3.jpeg", pos: "object-center" }, 
    { url: "/images/aurora4.jpeg", pos: "object-bottom" }, 
    { url: "/images/aurora5.jpeg", pos: "object-center" }
  ]}
/>
              
            </div>

            <div className="pt-24 border-t border-slate-100">
               <h3 className="text-xs font-bold mb-16 text-brand-dark uppercase tracking-[0.4em] text-center">Event Hosting & Public Speaking</h3>
               <div className="grid md:grid-cols-2 gap-10">
                  <div className="p-8 bg-slate-50 border border-slate-200">
                    <h4 className="text-lg font-bold text-brand-dark">BIS Welcome</h4>
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1 mb-4">Event Host / Department of IT, FMSC, USJ</p>
                    <p className="text-sm text-brand-muted leading-relaxed">Hosted welcoming events for incoming students to the Department of Information Technology, Faculty of Management Studies and Commerce.</p>
                    <PhotoGallery 
  count={2} 
  images={[
    { url: "/images/welcome.jpeg", pos: "object-[40%_30%]" }, 
    "/images/biswelcome2.jpeg"
  ]} 
  label="Hosting Photos" 
/>
                  </div>
                  <div className="p-8 bg-slate-50 border border-slate-200">
                    <h4 className="text-lg font-bold text-brand-dark">Cyber Summit 2026</h4>
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1 mb-4">Compere & Facilitator</p>
                    <p className="text-sm text-brand-muted leading-relaxed">Served as the official Compere, facilitating the summit flow and speaker introductions for high-level industry stakeholders.</p>
                    <PhotoGallery count={2} images={["/images/cs26-1.jpeg", "/images/cs26-2.jpeg"]} label="Summit Photos" />
                  </div>
                  <div className="p-8 bg-slate-50 border border-slate-200">
                    <h4 className="text-lg font-bold text-brand-dark">Cybersecurity Awareness Session</h4>
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1 mb-4">Event Host / Govt. Officers Session</p>
                    <p className="text-sm text-brand-muted leading-relaxed">Hosted a specialized session for government officers at the Maharagama Divisional Secretariat focused on digital safety.</p>
                    <PhotoGallery 
  count={2} 
  images={[
    { url: "/images/awareness1.jpeg", pos: "object-center" }, 
    { url: "/images/awareness2.jpeg", pos: "object-[40%_50%]" }
  ]} 
  label="Awareness Photos" 
/>
                  </div>
                  <div className="p-8 bg-slate-50 border border-slate-200">
                    <h4 className="text-lg font-bold text-brand-dark">Cybersecurity in Action</h4>
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1 mb-4">Host / Knowledge Session</p>
                    <p className="text-sm text-brand-muted leading-relaxed">Moderated and hosted cybersecurity-focused sessions aimed at bridging knowledge gaps in digital security.</p>
                    <PhotoGallery count={2} images={["/images/action1.jpeg", "/images/action2.jpeg"]} label="Session Photos" />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* --- 5. SKILLS --- */}
        <section id="skills" className="py-16 lg:py-32 bg-brand-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="grid grid-cols-12 h-full">
              {[...Array(144)].map((_, i) => <div key={i} className="border border-white/20"></div>)}
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <SectionHeader title="Skill Set" subtitle="Comprehensive skill set at the intersection of Business, Technology & Human Behaviour." light />
            <div className="grid md:grid-cols-3 gap-20">
              <div className="bg-white/5 p-10 border border-white/10 backdrop-blur-sm">
                <h3 className="font-bold uppercase tracking-[0.3em] text-xs text-brand-accent mb-12 border-b border-brand-accent/30 pb-4">Technical & Analytical Skills</h3>
                <ul className="space-y-6 text-slate-300 text-sm font-medium">
                  <li>[#] Business Process Analysis</li>
                  <li>[#] Requirements Engineering</li>
                  <li>[#] Data Analysis & Visualization</li>
                  <li>[#] Systems Analysis & Design</li>
                  <li>[#] Problem Solving & Critical Thinking</li>
                </ul>
              </div>
              <div className="bg-white/5 p-10 border border-white/10 backdrop-blur-sm">
                <h3 className="font-bold uppercase tracking-[0.3em] text-xs text-brand-accent mb-12 border-b border-brand-accent/30 pb-4">Business, Management & Soft Skills</h3>
                <ul className="space-y-6 text-slate-300 text-sm font-medium">
                  <li>[#] Strategic Organizational Leadership</li>
                  <li>[#] Public Speaking & Professional Oratory</li>
                  <li>[#] Stakeholder Relationship Management</li>
                  <li>[#] Presentation & Facilitation</li>
                  <li>[#] Collaborative Team Coordination</li>
                </ul>
              </div>
              <div className="bg-white/5 p-10 border border-white/10 backdrop-blur-sm">
                <h3 className="font-bold uppercase tracking-[0.3em] text-xs text-brand-accent mb-12 border-b border-brand-accent/30 pb-4">Tools & Technologies</h3>
                <ul className="space-y-6 text-slate-300 text-sm font-medium">
                  <li>[#] MySQL</li>
                  <li>[#] Python</li>
                  <li>[#] HTML / CSS / JavaScript</li>
                  <li>[#] Version Control - Git</li>
                  <li>[#] SPSS</li>
                  <li>[#] RapidMiner</li>
                  <li>[#] Power BI</li>
                  <li>[#] Enterprise Documentation Suites</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- 6. CERTIFICATIONS --- */}
        <section id="certifications" className="py-16 lg:py-32 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-8">
            <SectionHeader title="Certifications" subtitle="Specialized training in Cybersecurity, Data, and Project Management." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CertificationCard category="Project Management" title="Foundations of Project Management" issuer="University of Moratuwa" />
              <CertificationCard category="Cybersecurity" title="Deloitte Australia — Cyber Job Simulation" issuer="Forage" />
              <CertificationCard category="Technology" title="PwC US — Technology Consulting Job Simulation" issuer="Forage" />
              <CertificationCard category="Technology" title="Introduction to IoT and Digital Transformation" issuer="Cisco Networking Academy" />
              <CertificationCard category="Cybersecurity" title="Cybersecurity Fundamentals" issuer="APNIC" />
              <CertificationCard category="Data & Analytics" title="Learning Data Analytics" issuer="LinkedIn Learning" />
              <CertificationCard category="Emerging Technology" title="What Is Generative AI?" issuer="LinkedIn Learning" />
            </div>
          </div>
        </section>

        
        {/* --- 7. PROJECTS --- */}
        <section id="projects" className="py-16 lg:py-32 bg-[#F9F7F2] border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-8">
            <SectionHeader title="Academic Projects" subtitle="Systems engineering, requirements analysis, and digital innovation." />
            <div className="grid md:grid-cols-2 gap-10">
              <ProjectCard 
                category="Decision Support Systems" title="SolveMate" tagline="Chemical Compatibility Platform" role="Lead Systems Analyst" 
                description="Designed a specialized decision support system for Identifying compatible polymer-solvent pairs using the Hansen Solubility model." 
                tags={['Spring Boot', 'MySQL', 'Systems Analysis']} 
                link="https://github.com/Department-of-IT-FMSC-USJ/oop-project-final-solvemate.git" // Replace with your link
              />
              <ProjectCard 
                category="Social Impact" title="Project AURORA" tagline="CSR Empowerment" role="President" 
                description="A high-impact CSR initiative supporting elderly populations and providing sustainable livelihood equipment to single mothers." 
                tags={['Management', 'Leadership', 'Stakeholder Communication']} 
                link="https://www.instagram.com/aurora.csr?igsi=MWE3d2VlZXRta3g4MQ==" // Replace with your link
              />
              <ProjectCard 
                category="Healthcare" title="MedFlex" tagline="Digital Health Coordination" role="Systems Architect" 
                description="A robust system designed to streamline communication between healthcare providers and patients with high data integrity." 
                tags={['Workflow Optimization', 'UI/UX Design', 'Architecture']} 
                link="https://github.com/LEOQuester/MedFlex-Latest" // Replace with your link
              />
              <ProjectCard 
                category="Finance" title="Budget Buddy" tagline="Personal Finance Architecture" role="Requirements Engineer" 
                description="Developed a user-centric financial platform focused on eliciting complex requirements for automated tracking and goal-setting." 
                tags={['User Research', 'Analysis', 'Logic Design']} 
                link="https://github.com/Nayanthi-Weerasuriya/budget_buddy" // Replace with your link
              />
            </div>
          </div>
        </section>

        {/* --- 8. CONTACT --- */}
        {/* --- 8. CONTACT --- */}
        <section id="contact" className="py-16 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            {/* Centered Header with one-line justified text */}
            <div className="mb-20 flex flex-col items-center text-center">
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl uppercase text-brand-dark">
                Contact Me
              </h2>
              <div className="h-1.5 w-16 bg-brand-accent mt-3 mx-auto"></div>
              <p className="mt-6 text-lg font-medium text-brand-muted mx-auto whitespace-nowrap text-justify">
                Open to Internship Opportunities, Academic Collaborations, and Professional Networking.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
              {/* Email Card */}
              <div className="p-10 bg-slate-50 border border-slate-200 hover:border-brand-accent transition-colors group">
                <p className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em] mb-4">Direct Communication</p>
                <a href="mailto:savina.visvanathan@gmail.com" className="text-xl lg:text-2xl font-bold text-brand-dark group-hover:text-brand-accent transition-colors break-all">
                  savina.visvanathan@gmail.com
                </a>
              </div>

              {/* Phone Card */}
              <div className="p-10 bg-slate-50 border border-slate-200 hover:border-brand-accent transition-colors group">
                <p className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em] mb-4">Direct Call / WhatsApp</p>
                <a href="tel:+94719980118" className="text-xl lg:text-2xl font-bold text-brand-dark group-hover:text-brand-accent transition-colors">
                  +94 71 998 0118
                </a>
              </div>

              {/* LinkedIn Card */}
              <div className="p-10 bg-slate-50 border border-slate-200 hover:border-brand-accent transition-colors group">
                <p className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em] mb-4">Professional Presence</p>
                <a href="https://www.linkedin.com/in/savina-visvanathan-9bab01304" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-brand-dark group-hover:text-brand-accent transition-colors underline underline-offset-4 break-all">
                  linkedin.com/in/savina-visvanathan-9bab01304
                </a>
              </div>

              {/* GitHub Card */}
              <div className="p-10 bg-slate-50 border border-slate-200 hover:border-brand-accent transition-colors group">
                <p className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em] mb-4">Technical Portfolio</p>
                <a href="https://github.com/Savina2302" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-brand-dark group-hover:text-brand-accent transition-colors underline underline-offset-4">
                  github.com/Savina2302
                </a>
              </div>
            </div>
          </div> 
          {/* ^ This closing div above is the one that was missing! */}
        </section>

        {/* FOOTER */}
        {/* --- FINAL FOOTER --- */}
        <footer className="py-24 border-t border-slate-100 bg-white text-center">
            <div className="max-w-7xl mx-auto px-8">
              <div className="h-0.5 w-16 bg-brand-accent mx-auto mb-10"></div>
              <p className="text-[12px] font-bold text-brand-dark uppercase tracking-[0.5em] mb-6">Savina Visvanathan</p>
              
              {/* Removed max-w-sm and added whitespace-nowrap */}
              <p className="text-[9px] text-brand-muted uppercase tracking-[0.3em] leading-relaxed mx-auto font-medium whitespace-nowrap">
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