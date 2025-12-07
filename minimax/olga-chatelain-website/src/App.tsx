import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Blocks, 
  Target, 
  Users, 
  TrendingUp, 
  Globe, 
  Mail, 
  Linkedin, 
  MapPin,
  Phone,
  Calendar,
  ChevronDown,
  Menu,
  X,
  CheckCircle,
  Star,
  Award,
  BookOpen,
  Zap,
  Network
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'expertise', 'services', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus({ type: 'loading', message: 'Sending your message...' });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xpwzwvnr', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus({ 
          type: 'success', 
          message: 'Thank you! Your message has been sent successfully. I will get back to you soon.' 
        });
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: 'Sorry, there was an error sending your message. Please try again or contact me directly at consulting@olgachatelain.com' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-warmWhite text-warmGray">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-warmWhite/95 backdrop-blur-sm border-b border-lightOrange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-warmGray">Dr. Olga Chatelain</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'expertise', label: 'Expertise' },
                  { id: 'services', label: 'Services' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-warmOrange border-b-2 border-warmOrange'
                        : 'text-warmGray hover:text-warmOrange hover:bg-veryLightOrange'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-warmGray hover:text-warmOrange p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-warmWhite border-t border-lightOrange">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'expertise', label: 'Expertise' },
                { id: 'services', label: 'Services' },
                { id: 'experience', label: 'Experience' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                    activeSection === item.id
                      ? 'text-warmOrange bg-veryLightOrange'
                      : 'text-warmGray hover:text-warmOrange hover:bg-veryLightOrange'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-warmWhite via-warmWhiteLight to-warmWhite overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/digital_transformation_hero.png" 
            alt="Digital Transformation and AI Technology"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-warmGray">AI & Blockchain</span>
                <br />
                <span className="text-warmOrange">Expert & Digital</span>
                <br />
                <span className="text-warmGray">Transformation</span>
              </h1>
              <p className="text-xl md:text-2xl text-warmGray max-w-4xl mx-auto leading-relaxed">
                Empowering organizations through cutting-edge AI solutions, strategic digital transformation, 
                and executive coaching. Turning visionary ideas into measurable business impact.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-warmOrange text-warmWhite px-8 py-4 rounded-lg font-semibold text-lg hover:bg-warmOrange/90 transition-colors flex items-center gap-2"
              >
                <Calendar size={20} />
                Book a Consultation
              </button>
              <button
                onClick={() => scrollToSection('expertise')}
                className="border-2 border-warmOrange text-warmOrange px-8 py-4 rounded-lg font-semibold text-lg hover:bg-warmOrange hover:text-warmWhite transition-colors"
              >
                Explore Expertise
              </button>
            </div>

            <div className="flex justify-center items-center space-x-8 text-sm text-warmGray">
              <div className="flex items-center gap-2">
                <Globe className="text-warmOrange" size={16} />
                <span>5 Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-warmOrange" size={16} />
                <span>Ph.D. Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-warmOrange" size={16} />
                <span>€6.65B Project Lead</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <ChevronDown className="text-warmOrange" size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 bg-veryLightOrange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-warmOrange mb-4">About Dr. Olga Chatelain</h2>
            <p className="text-xl text-warmGray max-w-3xl mx-auto">
              Dynamic leader with deep international experience in executive coaching, 
              leadership development and digital transformation
            </p>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="prose prose-lg text-warmGray">
                <p>
                  Dynamic leader and business coach with deep international experience in executive coaching, 
                  leadership development and digital transformation. Experienced in leading and negotiating 
                  complex deals, such as IT Outsourcing "Hercules" €6.65 billion.
                </p>
                <p>
                  A certified Senior Project Manager, I coach and assess PMs, SPM's from different 
                  industries of Siemens portfolio. Skilled in developing strategic concepts, launching 
                  new programs, building high-performing, cross-functional teams, and managing 
                  executive-level stakeholders globally.
                </p>
                <p>
                  Passionate about empowering individuals and teams through coaching, while leveraging 
                  cutting-edge technologies (GenAI, blockchain) for sustainable business impact.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-center">
              {/* Professional Portrait */}
              <div className="text-center">
                <div className="relative inline-block">
                  <img 
                    src="./images/professional-portrait-replacement.jpeg" 
                    alt="Dr. Olga Chatelain - AI & Blockchain Expert & Digital Transformation - Professional Portrait"
                    className="w-64 h-64 object-cover rounded-2xl shadow-orange border-4 border-warmOrange"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-warmOrange text-warmWhite p-3 rounded-full shadow-lg">
                    <Award size={24} />
                  </div>
                </div>
                <p className="text-warmOrange font-semibold mt-6 text-lg">Ph.D. in Power Engineering</p>
                <p className="text-warmGray text-base">Siemens AG Program Manager</p>
              </div>
            </div>
          </div>

          {/* Core Competencies - Separate Section */}
          <div className="mt-12 pt-8 border-t border-lightOrange">
            <h3 className="text-2xl font-bold text-warmOrange text-center mb-8">Core Competencies</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Brain, title: 'Leadership & Executive Coaching', desc: 'Systematic business coaching with track record in executive development' },
                { icon: TrendingUp, title: 'Digital Transformation', desc: 'Leading end-to-end global digital transformation projects' },
                { icon: Network, title: 'AI & Blockchain Technology', desc: 'Implementing AI-powered solutions and blockchain innovations' },
                { icon: Target, title: 'Strategic Project Management', desc: 'Managing complex, multi-billion euro projects with measurable results' }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-warmWhite rounded-lg hover:bg-veryLightOrange/50 transition-colors shadow-sm border border-lightOrange">
                  <item.icon className="text-warmOrange flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-warmGray text-sm">{item.title}</h4>
                    <p className="text-warmGray text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-20 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-warmOrange mb-4">Areas of Expertise</h2>
            <p className="text-xl text-warmGray max-w-3xl mx-auto">
              Specialized knowledge in cutting-edge technologies and leadership development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI & Machine Learning',
                description: 'GPT-based solutions, AI-powered automation, and intelligent process optimization',
                technologies: ['GPT Integration', 'Process Automation', 'Intelligent Systems'],
                image: './images/ai_blockchain_tech.png'
              },
              {
                icon: Blocks,
                title: 'Blockchain Technology',
                description: 'Blockchain solutions for business processes, smart contracts, and digital innovation',
                technologies: ['Smart Contracts', 'Digital Innovation', 'Tech Integration'],
                image: './images/ai_blockchain_tech.png'
              },
              {
                icon: TrendingUp,
                title: 'Digital Transformation',
                description: 'End-to-end digital transformation strategies and implementation at enterprise scale',
                technologies: ['Strategy Design', 'Change Management', 'Technology Adoption'],
                image: './images/change_management.png'
              },
              {
                icon: Users,
                title: 'Executive Coaching',
                description: 'Systematic business coaching and leadership development across international organizations',
                technologies: ['Leadership Development', 'Team Coaching', 'Performance Assessment'],
                image: './images/executive_coaching.png'
              },
              {
                icon: Target,
                title: 'Project Management',
                description: 'Certified Senior Project Manager with expertise in complex, high-value projects',
                technologies: ['PMP Certified', 'Agile Methodologies', 'Risk Management'],
                image: './images/project_management.png'
              },
              {
                icon: Globe,
                title: 'Cross-cultural Competence',
                description: 'Multilingual capabilities and international business experience across 5 languages',
                technologies: ['5 Languages', 'Global Teams', 'Cultural Integration'],
                image: './images/change_management.png'
              }
            ].map((expertise, index) => (
              <div key={index} className="bg-warmWhite p-8 rounded-xl hover:bg-veryLightOrange transition-colors group shadow-sm border border-lightOrange relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-5">
                  <img 
                    src={expertise.image} 
                    alt={`${expertise.title} illustration`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <expertise.icon className="text-warmOrange mb-4 group-hover:scale-110 transition-transform" size={48} />
                  <h3 className="text-xl font-bold text-warmGray mb-3">{expertise.title}</h3>
                  <p className="text-warmGray mb-4">{expertise.description}</p>
                  <div className="space-y-2">
                    {expertise.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="inline-block bg-veryLightOrange text-warmOrange px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-warmWhiteLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-warmGray mb-4">Coaching & Consulting Services</h2>
            <p className="text-xl text-warmGray max-w-3xl mx-auto">
              Transform your organization with expert guidance in AI adoption, digital transformation, and leadership development
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: 'Executive Coaching',
                subtitle: 'Leadership Development & Performance Enhancement',
                description: 'One-on-one and team coaching sessions designed for senior executives and high-potential leaders',
                features: [
                  'Individual Leadership Assessment',
                  'Personalized Development Plans',
                  'Executive Presence Training',
                  'Strategic Thinking Enhancement',
                  'Cross-functional Leadership Skills'
                ],
                icon: Users,
                image: './images/executive_coaching.png'
              },
              {
                title: 'AI Strategy Consulting',
                subtitle: 'Artificial Intelligence Implementation & Integration',
                description: 'Comprehensive AI strategy development and implementation guidance for enterprise organizations',
                features: [
                  'AI Readiness Assessment',
                  'Technology Selection & Integration',
                  'Change Management for AI Adoption',
                  'ROI Measurement & Optimization',
                  'Ethical AI Implementation'
                ],
                icon: Brain,
                image: './images/ai_strategy_consulting.png'
              },
              {
                title: 'Digital Transformation Workshops',
                subtitle: 'Enterprise-Scale Digital Innovation',
                description: 'Intensive workshops and programs to accelerate your organization\'s digital transformation journey',
                features: [
                  'Digital Strategy Development',
                  'Process Optimization Training',
                  'Technology Adoption Workshops',
                  'Agile Implementation Training',
                  'Digital Culture Development'
                ],
                icon: TrendingUp,
                image: './images/change_management.png'
              },
              {
                title: 'Project Management Excellence',
                subtitle: 'Certified PM Training & Assessment',
                description: 'Senior Project Manager certification preparation and ongoing performance assessment',
                features: [
                  'PMP Certification Preparation',
                  'PM@Siemens Assessment',
                  'Agile Methodology Training',
                  'Risk Management Excellence',
                  'Stakeholder Management'
                ],
                icon: Target,
                image: './images/project_management.png'
              }
            ].map((service, index) => (
              <div key={index} className="bg-warmWhite p-8 rounded-xl hover:bg-warmWhiteLighter transition-colors relative overflow-hidden">
                {/* Service Image */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <img 
                    src={service.image} 
                    alt={`${service.title} illustration`}
                    className="w-full h-full object-cover rounded-bl-2xl"
                  />
                </div>
                <div className="relative z-10">
                  <service.icon className="text-warmOrange mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-warmGray mb-2">{service.title}</h3>
                  <p className="text-warmOrange font-semibold mb-4">{service.subtitle}</p>
                  <p className="text-warmGray mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-warmGray">
                        <CheckCircle className="text-warmOrange mr-3 flex-shrink-0" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="mt-6 bg-warmOrange text-warmGray px-6 py-3 rounded-lg font-semibold hover:bg-warmOrange/90 transition-colors w-full"
                >
                  Learn More
                </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center bg-warmWhite p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-warmGray mb-4">Ready to Transform Your Organization?</h3>
            <p className="text-warmGray mb-6 max-w-2xl mx-auto">
              Let's discuss how I can help you achieve your digital transformation goals and develop 
              exceptional leadership capabilities within your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-warmOrange text-warmGray px-8 py-3 rounded-lg font-semibold hover:bg-warmOrange/90 transition-colors"
              >
                Schedule Consultation
              </button>
              <a
                href="mailto:consulting@olgachatelain.com"
                className="border-2 border-warmOrange text-warmOrange px-8 py-3 rounded-lg font-semibold hover:bg-warmOrange hover:text-warmWhite transition-colors"
              >
                Email Direct
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Professional Portrait for Experience */}
            <div className="mb-8">
              <img 
                src="./images/professional-portrait-replacement.jpeg" 
                alt="Dr. Olga Chatelain - Professional Experience in AI and Digital Transformation"
                className="w-48 h-48 object-cover rounded-2xl shadow-orange mx-auto border-4 border-warmOrange"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-warmGray mb-4">Professional Experience</h2>
            <p className="text-xl text-warmGray max-w-3xl mx-auto">
              A track record of leading complex transformations and delivering exceptional results
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                period: '2022 – Present',
                title: 'Program Manager',
                company: 'Financial Digital Workplace, Enterprise Core Platforms, IT, Siemens AG',
                location: 'Munich, Germany',
                achievements: [
                  'Lead end-to-end global digital transformation projects, implementing innovative use cases (AI, GPT-based, blockchain)',
                  'Drive Tech Tax Lab initiatives, identifying and assessing cutting-edge technologies',
                  'Manage full project lifecycle from ideation to operational rollout',
                  'Develop blockchain solutions in collaboration with Institute for Tax Digitalization (IdST)'
                ],
                highlights: ['AI Implementation', 'Blockchain Innovation', 'Global Projects', 'Tax Digitalization']
              },
              {
                period: '2019 - 2022',
                title: 'Program Director',
                company: 'Business Excellence @ Application Platforms & Digital Solutions, Siemens AG',
                location: 'Munich, Germany',
                achievements: [
                  'Spearheaded development of IT APD\'s People Excellence Framework',
                  'Led innovative blockchain ecosystem development with Henkel AG and Microsoft',
                  'Managed strategic IT partnerships and vendor relationships',
                  'Executed Portfolio Review with positive saving potential'
                ],
                highlights: ['People Development', 'Blockchain Partnerships', 'Strategic Partnerships', 'Cost Optimization']
              },
              {
                period: '2016-2019',
                title: 'Head of Business Intelligence Portfolio, Marketing and Special Tasks',
                company: 'IT Global Services, Siemens AG',
                location: 'Munich, Germany',
                achievements: [
                  'Developed and managed Business Intelligence Portfolio and Analytics',
                  'Led successful IT Carveouts (Mobility Alstom, Healthineers)',
                  'Created Siemens Data Analytics and Business Intelligence Board',
                  'Designed and implemented DAshStore marketing platform'
                ],
                highlights: ['Business Intelligence', 'M&A Integration', 'Executive Leadership', 'Innovation Platform']
              },
              {
                period: '2014-2016',
                title: 'Head of Top Talent for Growth Program (TT4G)',
                company: 'Leadership & Talent Development, Human Resources, Siemens AG',
                location: 'Munich, Germany',
                achievements: [
                  'Designed High Potential development architecture for overall Siemens AG',
                  'Led TT4G program sponsored by CEO Siemens AG',
                  'Managed executive search framework contracts',
                  'Executed succession planning for Russia and Central Asia'
                ],
                highlights: ['Talent Development', 'CEO Programs', 'Succession Planning', 'International HR']
              }
            ].map((exp, index) => (
              <div key={index} className="bg-warmWhiteLight p-8 rounded-xl">
                <div className="grid lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <div className="text-warmOrange font-semibold">{exp.period}</div>
                    <div className="text-warmGray font-bold text-lg">{exp.title}</div>
                    <div className="text-warmGray">{exp.company}</div>
                    <div className="text-warmGray text-sm">{exp.location}</div>
                  </div>
                  <div className="lg:col-span-3">
                    <ul className="space-y-3 mb-4">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start text-warmGray">
                          <CheckCircle className="text-warmOrange mr-3 flex-shrink-0 mt-1" size={16} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight, highlightIndex) => (
                        <span key={highlightIndex} className="bg-warmWhite text-warmOrange px-3 py-1 rounded-full text-sm">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center bg-warmWhiteLight p-6 rounded-xl">
              <Award className="text-warmOrange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-warmGray mb-2">Academic Excellence</h3>
              <p className="text-warmGray">Ph.D. in Power Engineering, State Technical University, St. Petersburg</p>
            </div>
            <div className="text-center bg-warmWhiteLight p-6 rounded-xl">
              <BookOpen className="text-warmOrange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-warmGray mb-2">Professional Certifications</h3>
              <p className="text-warmGray">PMP Certified, Systemic Business Coach, Blockchain Technology Certificate</p>
            </div>
            <div className="text-center bg-warmWhiteLight p-6 rounded-xl">
              <Zap className="text-warmOrange mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-warmGray mb-2">Key Achievement</h3>
              <p className="text-warmGray">Led IT Outsourcing "Hercules" project worth €6.65 billion</p>
            </div>
          </div>
        </div>
      </section>



      {/* Publications & Insights Section */}
      <section className="py-20 bg-warmWhiteLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Thought Leadership Image */}
            <div className="mb-8">
              <img 
                src="./images/thought_leadership.png" 
                alt="Thought Leadership in AI and Digital Transformation"
                className="w-64 h-48 object-cover rounded-xl shadow-orange mx-auto border-4 border-warmOrange"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-warmGray mb-4">Publications & Insights</h2>
            <p className="text-xl text-warmGray max-w-3xl mx-auto">
              Thought Leadership at the Intersection of AI and Human Transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "LLMs, Bitcoin and Nvidia - Unraveling the Hype",
                date: "Nov 08",
                description: "How Nvidia Accidentally Fueled Crypto Mania and Got Burned by Its Own Success. This article debunks the myth that Nvidia's current valuation is solely due to crypto.",
                focus: "AI Technology, NVIDIA Analysis, Cryptocurrency, Blockchain Integration",
                authors: "Maria Sukhareva & Olga Chatelain",
                url: "https://msukhareva.substack.com/p/llms-bitcoin-and-nvidia-blockchain-ai"
              },
              {
                title: "The AI Paradox: It's Not the Tech — It's Us",
                date: "Oct 14",
                description: "A reflection on why every breakthrough in artificial intelligence reveals more about human limits than machine power",
                focus: "Human-centered AI approach",
                authors: " Olga Chatelain",
                url: "https://olgachatelain.substack.com/p/the-ai-paradox-its-not-the-tech-its"
              },
              {
                title: "Why Only 1/3 Clicked: The 3 Types of People You Meet in a Tech Session",
                date: "Oct 8",
                description: "What an NFT experiment revealed about personal digital boundaries",
                focus: "Human behavior in tech transformation",
                authors: " Olga Chatelain",
                url: "https://olgachatelain.substack.com/p/why-only-13-clicked-the-3-types-of"
              },
              {
                title: "The AI Alibi: When Hype Becomes the Perfect Cover",
                date: "Oct 4",
                description: "The Northern Data Scandal as a symbol of AI implementation challenges",
                focus: "Critical thinking & realistic AI consulting",
                authors: " Olga Chatelain",
                url: "https://olgachatelain.substack.com/p/the-ai-alibi-when-hype-becomes-the"
              },
              {
                title: "From Minority Report to the Orb: When Blockchain Feels Like Sci-Fi",
                date: "Sep 16",
                description: "Insights from New Kid@TUM Blockchain conference",
                focus: "Conference speaking & thought leadership",
                authors: " Olga Chatelain",
                url: "https://olgachatelain.substack.com/p/from-minority-report-to-the-orb-when"


              },
              {
                title: "The Day I Became an NFT Artist (Without Planning It)",
                date: "Sep 18",
                description: "Sometimes you don't mint the NFT — the NFT mints you",
                focus: "Practical innovation mindset",
                authors: " Olga Chatelain",
                url: "https://olgachatelain.substack.com/p/the-day-i-became-an-nft-artist-without"
              }
            ].map((publication, index) => {
              const CardContent = () => (
                <>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-warmOrange text-sm font-semibold">{publication.date}</span>
                  <div className="w-2 h-2 bg-warmOrange rounded-full group-hover:scale-110 transition-transform"></div>
                </div>
                <h3 className="text-lg font-bold text-warmGray mb-3 group-hover:text-warmOrange transition-colors">
                  {publication.title}
                </h3>
                {publication.authors && (
                  <p className="text-warmOrange text-sm font-medium mb-2">By {publication.authors}</p>
                )}
                <p className="text-warmGray text-sm mb-4 leading-relaxed">{publication.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-warmOrange text-xs px-3 py-1 bg-warmWhiteLight rounded-full">
                    {publication.focus}
                  </div>
                  <BookOpen className="text-warmGray group-hover:text-warmOrange transition-colors" size={16} />
                </div>
                </>
              );

              return (
                <div key={index} className="bg-warmWhite p-6 rounded-xl hover:bg-warmWhiteLighter transition-colors group">
                  {publication.url ? (
                    <a href={publication.url} target="_blank" rel="noopener noreferrer">
                      <CardContent />
                    </a>
                  ) : (
                    <CardContent />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center bg-warmWhite p-8 rounded-xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-warmGray mb-4">
                Explore the Intersection of Cutting-Edge Technology and Human Potential
              </h3>
              <p className="text-warmGray mb-6">
                Read more insights on my Substack: "Blockchain meets AI" - where I explore the nuanced 
                relationship between emerging technologies and human transformation in the modern workplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://substack.com/@olgachatelain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-warmOrange text-warmGray px-8 py-3 rounded-lg font-semibold hover:bg-warmOrange/90 transition-colors flex items-center gap-2"
                >
                  <BookOpen size={20} />
                  Read on Substack
                </a>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="border-2 border-warmOrange text-warmOrange px-8 py-3 rounded-lg font-semibold hover:bg-warmOrange hover:text-warmWhite transition-colors"
                >
                  Discuss Your Transformation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Contact Consultation Image */}
            <div className="mb-8">
              <img 
                src="./images/contact_consultation.png" 
                alt="Professional Consultation and Digital Transformation"
                className="w-64 h-48 object-cover rounded-xl shadow-orange mx-auto border-4 border-warmOrange"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-warmGray mb-4">Let's Start Your Transformation</h2>
            <p className="text-xl text-warmGray max-w-3xl mx-auto">
              Ready to accelerate your organization's digital transformation? Let's discuss your goals and 
              how I can help you achieve exceptional results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-warmGray mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="text-warmOrange" size={24} />
                    <div>
                      <div className="text-warmGray font-semibold">Email</div>
                      <a href="mailto:consulting@olgachatelain.com" className="text-warmGray hover:text-warmOrange transition-colors">
                        consulting@olgachatelain.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Linkedin className="text-warmOrange" size={24} />
                    <div>
                      <div className="text-warmGray font-semibold">LinkedIn</div>
                      <a 
                        href="https://www.linkedin.com/in/chatelain-olga-8b1571/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-warmGray hover:text-warmOrange transition-colors"
                      >
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="text-warmOrange" size={24} />
                    <div>
                      <div className="text-warmGray font-semibold">Location</div>
                      <div className="text-warmGray">Munich, Germany</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Globe className="text-warmOrange" size={24} />
                    <div>
                      <div className="text-warmGray font-semibold">Languages</div>
                      <div className="text-warmGray">English, German, Russian, French, Ukrainian</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-warmWhiteLight p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-warmGray mb-4">What to Expect</h4>
                <ul className="space-y-2 text-warmGray">
                  <li className="flex items-center">
                    <CheckCircle className="text-warmOrange mr-3" size={16} />
                    Initial consultation to understand your challenges
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-warmOrange mr-3" size={16} />
                    Customized strategy recommendations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-warmOrange mr-3" size={16} />
                    Implementation roadmap with clear milestones
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-warmOrange mr-3" size={16} />
                    Ongoing support and performance tracking
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-warmWhiteLight p-8 rounded-xl">
              <form 
                className="space-y-6" 
                onSubmit={handleFormSubmit}
              >
                <input type="hidden" name="_subject" value="New consultation request from Olga Chatelain website" />
                <input type="hidden" name="_cc" value="consulting@olgachatelain.com" />
                <input type="hidden" name="_next" value="#contact" />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-warmGray font-semibold mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full px-4 py-3 bg-warmWhite border border-gray-600 rounded-lg text-warmGray focus:outline-none focus:border-warmOrange transition-colors"
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-warmGray font-semibold mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full px-4 py-3 bg-warmWhite border border-gray-600 rounded-lg text-warmGray focus:outline-none focus:border-warmOrange transition-colors"
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-warmGray font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 bg-warmWhite border border-gray-600 rounded-lg text-warmGray focus:outline-none focus:border-warmOrange transition-colors"
                    placeholder="your.email@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-warmGray font-semibold mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full px-4 py-3 bg-warmWhite border border-gray-600 rounded-lg text-warmGray focus:outline-none focus:border-warmOrange transition-colors"
                    placeholder="Your company name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-warmGray font-semibold mb-2">Service Interest</label>
                  <select 
                    name="serviceInterest" 
                    className="w-full px-4 py-3 bg-warmWhite border border-gray-600 rounded-lg text-warmGray focus:outline-none focus:border-warmOrange transition-colors"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Executive Coaching">Executive Coaching</option>
                    <option value="AI Strategy Consulting">AI Strategy Consulting</option>
                    <option value="Digital Transformation Workshop">Digital Transformation Workshop</option>
                    <option value="Project Management Training">Project Management Training</option>
                    <option value="Custom Solution">Custom Solution</option>
                  </select>
                </div>
                <div>
                  <label className="block text-warmGray font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-warmWhite border border-gray-600 rounded-lg text-warmGray focus:outline-none focus:border-warmOrange transition-colors resize-none"
                    placeholder="Tell me about your transformation goals and challenges..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus.type === 'loading'}
                  className={`w-full px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2 ${
                    formStatus.type === 'loading' 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-warmOrange text-warmGray hover:bg-warmOrange/90'
                  }`}
                >
                  <Calendar size={20} />
                  {formStatus.type === 'loading' ? 'Sending...' : 'Schedule Consultation'}
                </button>
                
                {/* Success/Error Message */}
                {formStatus.type !== 'idle' && (
                  <div className={`text-center p-4 rounded-lg ${
                    formStatus.type === 'success' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : formStatus.type === 'error'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    <div className="flex items-center justify-center gap-2">
                      {formStatus.type === 'success' && <CheckCircle size={20} />}
                      {formStatus.type === 'error' && <X size={20} />}
                      {formStatus.type === 'loading' && (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      )}
                      <span>{formStatus.message}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warmWhiteLight py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-warmGray mb-4">Dr. Olga Chatelain</h3>
            <p className="text-warmGray mb-6">AI & Blockchain Expert • Digital Transformation • Executive Coach</p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="mailto:consulting@olgachatelain.com" className="text-warmGray hover:text-warmOrange transition-colors">
                <Mail size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/chatelain-olga-8b1571/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-warmGray hover:text-warmOrange transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
            <div className="border-t border-gray-600 pt-6">
              <p className="text-warmGray text-sm">
                © 2025 Dr. Olga Chatelain. All rights reserved. | Transforming organizations through AI and strategic leadership.
              </p>
            </div>

            {/* Impressum */}
            <div className="border-t border-gray-600 pt-6 mt-6">
              <h4 className="text-lg font-semibold text-warmOrange mb-4">Impressum</h4>
              <div className="text-warmGray text-sm space-y-2 text-left max-w-4xl mx-auto">
                <p><strong>Angaben gemäß § 5 DDG</strong></p>
                <p>Dr. Chatelain Consulting and Coaching<br />
                Inhaber: Dr. Olga Chatelain<br />
                [IHRE STRASSE UND HAUSNUMMER]<br />
                [IHRE POSTLEITZAHL] [ORT]</p>
                
                <p><strong>Kontakt</strong><br />
                Telefon: [IHRE TELEFONNUMMER FÜR EINE SCHNELLE KONTAKTAUFNAHME]<br />
                E-Mail: consulting@olgachatelain.com</p>
                
                <p><strong>Verbraucherstreitbeilegung</strong><br />
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: XXXX</p>
                
                <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />
                Olga Chatelain, Deutschland</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;