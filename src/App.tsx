import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook,
  Menu,
  X
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Romantic quotes for the quote system
const romanticQuotes = [
  "Love is chosen daily.",
  "In this moment, only us.",
  "Time slows when hearts align.",
  "Forever begins with a single glance.",
  "Together is our favorite place.",
  "Every love story is beautiful, but ours is my favorite.",
  "The best thing to hold onto in life is each other.",
  "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
];

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-charcoal/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('hero')}
            className="font-serif text-xl lg:text-2xl text-cream tracking-wide hover:text-gold transition-colors"
          >
            L'Amour Éternel
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <button onClick={() => scrollToSection('menu')} className="text-sm tracking-widest uppercase text-cream/80 hover:text-gold transition-colors">
              Menu
            </button>
            <button onClick={() => scrollToSection('wine')} className="text-sm tracking-widest uppercase text-cream/80 hover:text-gold transition-colors">
              Wine
            </button>
            <button onClick={() => scrollToSection('reservations')} className="text-sm tracking-widest uppercase text-cream/80 hover:text-gold transition-colors">
              Reservations
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-sm tracking-widest uppercase text-cream/80 hover:text-gold transition-colors">
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-cream"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal/98 flex flex-col items-center justify-center gap-8 lg:hidden">
          <button onClick={() => scrollToSection('menu')} className="text-2xl font-serif text-cream hover:text-gold transition-colors">
            Menu
          </button>
          <button onClick={() => scrollToSection('wine')} className="text-2xl font-serif text-cream hover:text-gold transition-colors">
            Wine
          </button>
          <button onClick={() => scrollToSection('reservations')} className="text-2xl font-serif text-cream hover:text-gold transition-colors">
            Reservations
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-2xl font-serif text-cream hover:text-gold transition-colors">
            Contact
          </button>
        </div>
      )}
    </>
  );
}

// Quote Component
function RomanticQuote({ quote, className = '' }: { quote: string; className?: string }) {
  return (
    <div className={`quote-italic text-cream/60 text-lg lg:text-xl ${className}`}>
      "{quote}"
    </div>
  );
}

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const goldBarRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const goldBar = goldBarRef.current;
    const image = imageRef.current;
    if (!section || !content || !goldBar || !image) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline();
      
      loadTl.fromTo(image, 
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }
      )
      .fromTo(goldBar,
        { y: '120vh', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.9'
      )
      .fromTo(content.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.1 },
        '-=0.6'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(content.children, { x: 0, opacity: 1 });
            gsap.set(goldBar, { x: 0, opacity: 1 });
            gsap.set(image, { scale: 1, y: 0 });
          }
        }
      });

      // Exit phase (70%-100%)
      scrollTl.fromTo(content.children,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in', stagger: 0.05 },
        0.7
      )
      .fromTo(goldBar,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(image,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-6vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToReservations = () => {
    const element = document.getElementById('reservations');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={sectionRef} className="section-pinned bg-charcoal">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-[1]">
        <img 
          src="/hero_couple.jpg" 
          alt="Romantic couple dining" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-[2] vignette" />
      
      {/* Gold Bar */}
      <div 
        ref={goldBarRef}
        className="absolute right-[6vw] top-[18vh] w-[1.2vw] h-[64vh] z-[3] gold-bar"
      />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute left-[6vw] bottom-[14vh] z-[4] max-w-[50vw]"
      >
        <p className="text-xs tracking-[0.25em] uppercase text-cream/70 mb-6">
          Paris • Candlelight • Tasting Menu
        </p>
        <h1 className="headline-display text-display-xl text-cream mb-6">
          Where Love<br />Dines
        </h1>
        <p className="text-lg lg:text-xl text-cream/80 font-light mb-10 max-w-md">
          An intimate table for two. A memory that lingers.
        </p>
        <div className="flex items-center gap-6">
          <button 
            onClick={scrollToReservations}
            className="px-8 py-4 bg-gold text-charcoal font-medium tracking-wide hover:-translate-y-0.5 transition-transform duration-300 hover:shadow-gold"
          >
            Reserve Your Table
          </button>
          <button 
            onClick={scrollToMenu}
            className="link-gold text-sm tracking-widest uppercase"
          >
            View Experience
          </button>
        </div>
      </div>
    </section>
  );
}

// Generic Pinned Section Component
interface PinnedSectionProps {
  id: string;
  image: string;
  headline: string;
  body: string;
  cta: string;
  ctaAction?: () => void;
  alignment: 'left' | 'right';
  quote?: string;
}

function PinnedSection({ 
  id, 
  image, 
  headline, 
  body, 
  cta, 
  ctaAction,
  alignment, 
  quote 
}: PinnedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const goldBarRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const goldBar = goldBarRef.current;
    const imageEl = imageRef.current;
    if (!section || !content || !goldBar || !imageEl) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(imageEl,
        { scale: 1.10, y: alignment === 'left' ? '10vh' : '-10vh', opacity: 0.6 },
        { scale: 1, y: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(goldBar,
        { y: '120vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(content.children,
        { x: alignment === 'left' ? '-40vw' : '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none', stagger: 0.02 },
        0.05
      );

      // SETTLE (30%-70%) - hold position

      // EXIT (70%-100%)
      scrollTl.fromTo(content.children,
        { x: 0, opacity: 1 },
        { x: alignment === 'left' ? '-18vw' : '18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      )
      .fromTo(goldBar,
        { x: 0, opacity: 1 },
        { x: alignment === 'left' ? '12vw' : '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(imageEl,
        { scale: 1, y: 0, opacity: 1 },
        { scale: 1.05, y: alignment === 'left' ? '-8vh' : '8vh', opacity: 0.3, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, [alignment]);

  return (
    <section id={id} ref={sectionRef} className="section-pinned bg-charcoal">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-[1]">
        <img 
          src={image} 
          alt={headline} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-[2] vignette" />
      
      {/* Gold Bar */}
      <div 
        ref={goldBarRef}
        className={`absolute ${alignment === 'left' ? 'right-[6vw]' : 'left-[6vw]'} top-[18vh] w-[1.2vw] h-[64vh] z-[3] gold-bar`}
      />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className={`absolute ${alignment === 'left' ? 'left-[6vw] text-left' : 'right-[6vw] text-right'} top-[30vh] z-[4] max-w-[44vw]`}
      >
        {quote && (
          <RomanticQuote quote={quote} className="mb-6 text-base lg:text-lg" />
        )}
        <h2 className="headline-display text-display-lg text-cream mb-8">
          {headline.split(' ').map((word, i) => (
            <span key={i} className="inline-block mr-[0.25em]">{word}</span>
          ))}
        </h2>
        <p className="text-base lg:text-lg text-cream/80 font-light mb-8 max-w-md ml-auto mr-auto leading-relaxed"
           style={{ marginLeft: alignment === 'left' ? '0' : 'auto', marginRight: alignment === 'left' ? 'auto' : '0' }}>
          {body}
        </p>
        <button 
          onClick={ctaAction}
          className="link-gold text-sm tracking-widest uppercase"
        >
          {cta}
        </button>
      </div>
    </section>
  );
}

// Menu Section (Two Column)
function MenuSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    const goldLine = goldLineRef.current;
    const imageEl = imageRef.current;
    if (!section || !leftCol || !rightCol || !goldLine || !imageEl) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE
      scrollTl.fromTo(imageEl,
        { scale: 1.08, opacity: 0.7 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(leftCol,
        { x: '-30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(rightCol,
        { x: '30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(goldLine,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, ease: 'none' },
        0.1
      );

      // EXIT
      scrollTl.fromTo(leftCol,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(rightCol,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(goldLine,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0, opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(imageEl,
        { scale: 1, opacity: 1 },
        { scale: 1.05, opacity: 0.35, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="section-pinned bg-charcoal">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-[1]">
        <img 
          src="/menu_ambiance.jpg" 
          alt="Menu ambiance" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-[2] vignette" />
      
      {/* Gold Line */}
      <div 
        ref={goldLineRef}
        className="absolute left-[6vw] bottom-[10vh] w-[88vw] h-[2px] z-[3] gold-bar-horizontal origin-left"
      />
      
      {/* Left Column - Menu */}
      <div 
        ref={leftColRef}
        className="absolute left-[6vw] top-[18vh] w-[38vw] z-[4]"
      >
        <h2 className="headline-display text-display-md text-cream mb-10">
          Taste the Menu
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-2xl text-gold mb-2">Seasonal Tasting</h3>
            <p className="text-cream/70 text-sm leading-relaxed">Seven courses, guided by the market.</p>
          </div>
          <div>
            <h3 className="font-serif text-2xl text-gold mb-2">The Chef's Table</h3>
            <p className="text-cream/70 text-sm leading-relaxed">A private view into the kitchen.</p>
          </div>
          <div>
            <h3 className="font-serif text-2xl text-gold mb-2">Anniversary Supper</h3>
            <p className="text-cream/70 text-sm leading-relaxed">A set menu with a memory to take home.</p>
          </div>
        </div>
      </div>
      
      {/* Right Column - Ambiance */}
      <div 
        ref={rightColRef}
        className="absolute right-[6vw] top-[18vh] w-[34vw] text-right z-[4]"
      >
        <h3 className="font-serif text-3xl text-cream mb-6">Ambiance</h3>
        <p className="text-cream/80 text-base leading-relaxed mb-8">
          Soft jazz, low light, and tables spaced for whispered conversation. 
          Every element designed to bring you closer.
        </p>
        <button className="link-gold text-sm tracking-widest uppercase">
          View Full Menu
        </button>
      </div>
    </section>
  );
}

// Wine Section
function WineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const goldBarRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const goldBar = goldBarRef.current;
    const imageEl = imageRef.current;
    if (!section || !content || !goldBar || !imageEl) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE
      scrollTl.fromTo(imageEl,
        { scale: 1.12, x: '-6vw', opacity: 0.6 },
        { scale: 1, x: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(goldBar,
        { y: '120vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(content.children,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none', stagger: 0.02 },
        0.05
      );

      // EXIT
      scrollTl.fromTo(content.children,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      )
      .fromTo(goldBar,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(imageEl,
        { scale: 1, x: 0, opacity: 1 },
        { scale: 1.05, x: '6vw', opacity: 0.3, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="wine" ref={sectionRef} className="section-pinned bg-charcoal">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-[1]">
        <img 
          src="/wine_pour.jpg" 
          alt="Wine pouring" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-[2] vignette" />
      
      {/* Gold Bar */}
      <div 
        ref={goldBarRef}
        className="absolute left-[6vw] top-[18vh] w-[1.2vw] h-[64vh] z-[3] gold-bar"
      />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute right-[6vw] top-[30vh] z-[4] max-w-[44vw] text-right"
      >
        <RomanticQuote quote="Time slows when hearts align." className="mb-6 text-base lg:text-lg" />
        <h2 className="headline-display text-display-lg text-cream mb-8">
          <span className="inline-block mr-[0.25em]">Sip</span>
          <span className="inline-block mr-[0.25em]">Something</span>
          <span className="inline-block">Rare</span>
        </h2>
        <p className="text-base lg:text-lg text-cream/80 font-light mb-8 max-w-md ml-auto leading-relaxed">
          A cellar built for discovery—small producers, exceptional vintages, and pairings chosen for your table.
        </p>
        <button className="link-gold text-sm tracking-widest uppercase">
          Explore the Cellar
        </button>
      </div>
    </section>
  );
}

// Plating Section
function PlatingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const goldBarRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const goldBar = goldBarRef.current;
    const imageEl = imageRef.current;
    if (!section || !content || !goldBar || !imageEl) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE
      scrollTl.fromTo(imageEl,
        { scale: 1.10, y: '10vh', opacity: 0.6 },
        { scale: 1, y: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(goldBar,
        { y: '120vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(content.children,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none', stagger: 0.02 },
        0.05
      );

      // EXIT
      scrollTl.fromTo(content.children,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      )
      .fromTo(goldBar,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(imageEl,
        { scale: 1, y: 0, opacity: 1 },
        { scale: 1.06, y: '-8vh', opacity: 0.3, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-charcoal">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-[1]">
        <img 
          src="/plating_detail.jpg" 
          alt="Plating detail" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-[2] vignette" />
      
      {/* Gold Bar */}
      <div 
        ref={goldBarRef}
        className="absolute right-[6vw] top-[18vh] w-[1.2vw] h-[64vh] z-[3] gold-bar"
      />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute left-[6vw] top-[30vh] z-[4] max-w-[44vw]"
      >
        <RomanticQuote quote="Every detail tells a story." className="mb-6 text-base lg:text-lg" />
        <h2 className="headline-display text-display-lg text-cream mb-8">
          <span className="inline-block mr-[0.25em]">Every</span>
          <span className="inline-block mr-[0.25em]">Detail,</span>
          <span className="inline-block">Considered</span>
        </h2>
        <p className="text-base lg:text-lg text-cream/80 font-light mb-8 max-w-md leading-relaxed">
          Plating is quiet poetry—color, contrast, and a sense of occasion in every dish.
        </p>
        <button className="link-gold text-sm tracking-widest uppercase">
          See the Gallery
        </button>
      </div>
    </section>
  );
}

// Reservations Section
function ReservationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const goldBarRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const goldBar = goldBarRef.current;
    const imageEl = imageRef.current;
    if (!section || !content || !goldBar || !imageEl) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE
      scrollTl.fromTo(imageEl,
        { scale: 1.10, y: '-10vh', opacity: 0.6 },
        { scale: 1, y: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(goldBar,
        { y: '120vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(content.children,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none', stagger: 0.02 },
        0.05
      );

      // EXIT
      scrollTl.fromTo(content.children,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      )
      .fromTo(goldBar,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(imageEl,
        { scale: 1, y: 0, opacity: 1 },
        { scale: 1.06, y: '-8vh', opacity: 0.3, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="reservations" ref={sectionRef} className="section-pinned bg-charcoal">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-[1]">
        <img 
          src="/reservation_table.jpg" 
          alt="Reservation table" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-[2] vignette" />
      
      {/* Gold Bar */}
      <div 
        ref={goldBarRef}
        className="absolute right-[6vw] top-[18vh] w-[1.2vw] h-[64vh] z-[3] gold-bar"
      />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute left-[6vw] top-[30vh] z-[4] max-w-[44vw]"
      >
        <RomanticQuote quote="In this moment, only us." className="mb-6 text-base lg:text-lg" />
        <h2 className="headline-display text-display-lg text-cream mb-8">
          <span className="inline-block mr-[0.25em]">Reserve</span>
          <span className="inline-block mr-[0.25em]">Your</span>
          <span className="inline-block">Table</span>
        </h2>
        <p className="text-base lg:text-lg text-cream/80 font-light mb-8 max-w-md leading-relaxed">
          Intimate seating. Limited each evening. Book ahead to secure your night.
        </p>
        <button 
          onClick={scrollToContact}
          className="px-8 py-4 bg-gold text-charcoal font-medium tracking-wide hover:-translate-y-0.5 transition-transform duration-300 hover:shadow-gold"
        >
          Request a Reservation
        </button>
      </div>
    </section>
  );
}

// Toast Section
function ToastSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const goldBarRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const goldBar = goldBarRef.current;
    const imageEl = imageRef.current;
    if (!section || !content || !goldBar || !imageEl) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE
      scrollTl.fromTo(imageEl,
        { scale: 1.12, x: '-6vw', opacity: 0.6 },
        { scale: 1, x: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(goldBar,
        { y: '120vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(content.children,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none', stagger: 0.02 },
        0.05
      );

      // EXIT
      scrollTl.fromTo(content.children,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      )
      .fromTo(goldBar,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(imageEl,
        { scale: 1, x: 0, opacity: 1 },
        { scale: 1.05, x: '6vw', opacity: 0.3, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-charcoal">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-[1]">
        <img 
          src="/toast_glasses.jpg" 
          alt="Couple toasting" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-[2] vignette" />
      
      {/* Gold Bar */}
      <div 
        ref={goldBarRef}
        className="absolute left-[6vw] top-[18vh] w-[1.2vw] h-[64vh] z-[3] gold-bar"
      />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute right-[6vw] top-[30vh] z-[4] max-w-[44vw] text-right"
      >
        <RomanticQuote quote="Together is our favorite place." className="mb-6 text-base lg:text-lg" />
        <h2 className="headline-display text-display-lg text-cream mb-8">
          <span className="inline-block mr-[0.25em]">Toast</span>
          <span className="inline-block mr-[0.25em]">to</span>
          <span className="inline-block">Us</span>
        </h2>
        <p className="text-base lg:text-lg text-cream/80 font-light mb-8 max-w-md ml-auto leading-relaxed">
          Anniversaries, proposals, or simply because. We'll prepare the glasses—you bring the reason.
        </p>
        <button className="link-gold text-sm tracking-widest uppercase">
          Plan a Celebration
        </button>
      </div>
    </section>
  );
}

// Evening Section
function EveningSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const goldBarRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const goldBar = goldBarRef.current;
    const imageEl = imageRef.current;
    if (!section || !content || !goldBar || !imageEl) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE
      scrollTl.fromTo(imageEl,
        { scale: 1.10, y: '10vh', opacity: 0.6 },
        { scale: 1, y: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(goldBar,
        { y: '120vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(content.children,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none', stagger: 0.02 },
        0.05
      );

      // EXIT
      scrollTl.fromTo(content.children,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      )
      .fromTo(goldBar,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(imageEl,
        { scale: 1, y: 0, opacity: 1 },
        { scale: 1.06, y: '-8vh', opacity: 0.3, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-charcoal">
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-[1]">
        <img 
          src="/evening_street.jpg" 
          alt="Evening in Paris" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-[2] vignette" />
      
      {/* Gold Bar */}
      <div 
        ref={goldBarRef}
        className="absolute right-[6vw] top-[18vh] w-[1.2vw] h-[64vh] z-[3] gold-bar"
      />
      
      {/* Content */}
      <div 
        ref={contentRef}
        className="absolute left-[6vw] top-[30vh] z-[4] max-w-[44vw]"
      >
        <RomanticQuote quote="Forever begins with a single glance." className="mb-6 text-base lg:text-lg" />
        <h2 className="headline-display text-display-lg text-cream mb-8">
          <span className="inline-block mr-[0.25em]">An</span>
          <span className="inline-block mr-[0.25em]">Evening</span>
          <span className="inline-block mr-[0.25em]">in</span>
          <span className="inline-block">Paris</span>
        </h2>
        <p className="text-base lg:text-lg text-cream/80 font-light mb-8 max-w-md leading-relaxed">
          The city slows. The lights glow. And the night belongs to you.
        </p>
        <button className="link-gold text-sm tracking-widest uppercase">
          Get Directions
        </button>
      </div>
    </section>
  );
}

// Contact Section (Flowing)
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [randomQuote] = useState(() => romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)]);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    if (!section || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(section.querySelectorAll('.animate-in'),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your reservation request. We will contact you within 24 hours.');
  };

  return (
    <section id="contact" ref={sectionRef} className="relative bg-burgundy py-20 lg:py-32">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy via-burgundy to-burgundy-dark opacity-50" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 animate-in">
          <RomanticQuote quote={randomQuote} className="mb-6 text-lg" />
          <h2 className="headline-display text-display-md text-cream mb-4">
            Reserve Your Table
          </h2>
          <p className="text-cream/70 text-lg">
            We reply within 24 hours. For same-day requests, please call.
          </p>
        </div>

        {/* Form Card */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-charcoal border border-cream/20 p-8 lg:p-12 mb-16 animate-in"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs tracking-widest uppercase text-cream/60 mb-2">Name</label>
              <input type="text" required className="w-full" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-cream/60 mb-2">Email</label>
              <input type="email" required className="w-full" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-cream/60 mb-2">Phone</label>
              <input type="tel" required className="w-full" placeholder="+33 1 23 45 67 89" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-cream/60 mb-2">Preferred Date</label>
              <input type="date" required className="w-full" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-cream/60 mb-2">Party Size</label>
              <select required className="w-full">
                <option value="">Select</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5+">5+ Guests</option>
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-cream/60 mb-2">Occasion</label>
              <select className="w-full">
                <option value="">Select (optional)</option>
                <option value="anniversary">Anniversary</option>
                <option value="birthday">Birthday</option>
                <option value="proposal">Proposal</option>
                <option value="date">Date Night</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-xs tracking-widest uppercase text-cream/60 mb-2">Notes</label>
            <textarea rows={4} className="w-full" placeholder="Any special requests or dietary requirements..." />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-gold text-charcoal font-medium tracking-wide hover:-translate-y-0.5 transition-transform duration-300 hover:shadow-gold"
          >
            Send Request
          </button>
        </form>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center animate-in">
          <div className="flex flex-col items-center">
            <MapPin className="w-6 h-6 text-gold mb-4" />
            <p className="text-cream/80 text-sm">12 Rue de la Paix<br />75002 Paris</p>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="w-6 h-6 text-gold mb-4" />
            <p className="text-cream/80 text-sm">+33 1 42 00 00 00</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-6 h-6 text-gold mb-4" />
            <p className="text-cream/80 text-sm">Tue–Sat: 19:00–23:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-charcoal border-t border-cream/10 py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="font-serif text-2xl text-cream">
            L'Amour Éternel
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-cream/60 hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="text-sm text-cream/60 hover:text-gold transition-colors">Terms</a>
            <a href="#" className="text-sm text-cream/60 hover:text-gold transition-colors">Careers</a>
          </div>
          
          {/* Social */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-cream/60 hover:text-gold transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-cream/60 hover:text-gold transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-cream/10 text-center">
          <p className="text-cream/40 text-sm">
            © L'Amour Éternel. Crafted for lovers of the table.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  useEffect(() => {
    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="grain-overlay">
      <Navigation />
      
      <main className="relative">
        <HeroSection />
        
        <PinnedSection 
          id="experience"
          image="/couple_dining.jpg"
          headline="An Evening to Remember"
          body="Candlelight, quiet corners, and a menu designed to be shared. We set the scene; you bring the story."
          cta="Explore the experience"
          alignment="left"
          quote="Love is chosen daily."
        />
        
        <PinnedSection 
          id="story"
          image="/couple_portrait.jpg"
          headline="A Story in Every Course"
          body="From the first pour to the last bite, each moment is composed like a scene—yours to keep."
          cta="Meet the chef"
          alignment="right"
          quote="In this moment, only us."
        />
        
        <PinnedSection 
          id="craft"
          image="/kitchen_chef.jpg"
          headline="Crafted with Passion"
          body="Seasonal ingredients, precise technique, and a team that cooks with intention—every plate is personal."
          cta="Read our story"
          alignment="left"
          quote="Every love story is beautiful, but ours is my favorite."
        />
        
        <MenuSection />
        
        <WineSection />
        
        <PlatingSection />
        
        <PinnedSection 
          id="dessert"
          image="/dessert_shared.jpg"
          headline="End on a Sweet Note"
          body="Dessert is not an afterthought—it's the final scene. Share it slowly."
          cta="Reserve a table"
          alignment="right"
          quote="The best thing to hold onto in life is each other."
        />
        
        <ReservationsSection />
        
        <ToastSection />
        
        <EveningSection />
        
        <ContactSection />
        
        <Footer />
      </main>
    </div>
  );
}

export default App;
