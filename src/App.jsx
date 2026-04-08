import React, { useState, useEffect, useRef } from 'react';
import { ArrowDownRight, Play, Instagram, ArrowRight, ArrowUpRight, X, Zap, MonitorPlay, Palette, Clock, Sliders, ShieldCheck, Mail, Send, Phone } from 'lucide-react';

// --- Utility: Zero-Lag Scroll Reveal ---
const useScrollReveal = (threshold = 0.05) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isIntersecting];
};

// --- Components ---

/**
 * AnimatedName Component - 100% EXACT PALMER VIDEO MATCH
 */
const AnimatedName = ({ isLoaded }) => {
  return (
    <div className="w-full flex justify-center mt-auto relative z-10 pt-10 md:pt-16 pb-6 overflow-hidden">
      <div className="relative flex justify-center w-full select-none">
        
        {/* Layer 1: Dark Grey Background Text */}
        <h2 
          className="text-[20vw] leading-[0.8] font-bold text-[#1a1a1a] tracking-tighter pb-[0.2em]"
          style={{ letterSpacing: '-0.05em' }}
        >
          Sangmesh
        </h2>
        
        {/* Layer 2: White Foreground Text Mask (Slides UP) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden flex justify-center pointer-events-none">
          <h2 
            className={`text-[20vw] leading-[0.8] font-bold text-white tracking-tighter pb-[0.2em] transform transition-transform duration-[1.8s] will-change-transform ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`}
            style={{ 
              letterSpacing: '-0.05em',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '0.15s' 
            }}
          >
            Sangmesh
          </h2>
        </div>

      </div>
    </div>
  );
};

const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1.2s] ${className} ${
        isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-12 blur-[4px]'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
};

// Work Card
const VideoCard = ({ title, category, fullVideo, videoSrc, onHover, onVideoClick }) => {
  const videoRef = useRef(null);
  const handleMouseEnter = () => { onHover(true); videoRef.current?.play().catch(() => {}); };
  const handleMouseLeave = () => { onHover(false); videoRef.current?.pause(); };

  return (
    <div 
      className="group cursor-none w-full flex flex-col gap-6 block mb-12 md:mb-24"
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
      onClick={() => onVideoClick(fullVideo)}
    >
      <div className="w-full aspect-[4/3] overflow-hidden bg-[#0a0a0a] relative rounded-3xl border border-white/5 shadow-2xl">
        <video 
          ref={videoRef} 
          src={videoSrc} 
          preload="metadata"
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30">
           <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
             <Play className="w-8 h-8 ml-1" />
           </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 px-2">
         <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">{title}</h3>
         <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-white/20" />
            <p className="text-[11px] text-neutral-400 uppercase tracking-[0.3em] font-medium">{category}</p>
         </div>
      </div>
    </div>
  );
};

// Reel Card
const ReelCard = ({ videoSrc, link, onHover, onVideoClick }) => {
  return (
    <div 
      className="group relative cursor-none w-full aspect-[9/16] rounded-3xl overflow-hidden bg-[#0d0d0d] border border-white/5 shadow-2xl block"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={() => onVideoClick(videoSrc)}
    >
      <video src={videoSrc} preload="metadata" muted loop autoPlay playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 z-10" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      
      {/* Center Play Button for the Modal */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 pointer-events-none">
         <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/50 text-white rounded-full flex items-center justify-center shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
           <Play className="w-6 h-6 ml-1" />
         </div>
      </div>

      {/* Top Right Instagram Link (Opens IG in new tab) */}
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()} // Prevents the modal from opening when clicking the IG icon
        className="absolute top-4 right-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 shadow-xl cursor-none"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Instagram className="w-5 h-5" />
      </a>
    </div>
  );
};

export default function App() {
  const cursorRef = useRef(null);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "8c0f0180-b78e-42b3-a7c2-1f1d7520fefa",
          from_name: formData.name, // Added to prevent Gmail from marking as spam
          replyto: formData.email,  // Added to ensure safe delivery routing
          ...formData
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); 
        setTimeout(() => setSubmitStatus(null), 5000); 
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => { 
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`; 
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    const loadTimer = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(loadTimer);
    };
  }, []);

  useEffect(() => {
    if (activeModalVideo || isPrivacyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeModalVideo, isPrivacyModalOpen]);

  const projects = [
    { 
      id: 1, 
      title: 'Brand For Less', 
      category: 'Airport Campaign', 
      fullVideo: '/Airport Horizontal.mp4', 
      videoSrc: '/Airport Horizontal.mp4', 
    },
    { 
      id: 2, 
      title: 'Brand For Less', 
      category: 'Interview Edit', 
      fullVideo: '/Interview Square.mp4', 
      videoSrc: '/Interview Square.mp4', 
    },
    { 
      id: 3, 
      title: 'Brand For Less', 
      category: 'Proposal Visuals', 
      fullVideo: '/Proposal Square.mp4', 
      videoSrc: '/Proposal Square.mp4', 
    },
    { 
      id: 4, 
      title: 'Mokobara', 
      category: 'Night Bag', 
      fullVideo: '/Night Bag.mp4', 
      videoSrc: '/Night Bag.mp4', 
    },
    { 
      id: 5, 
      title: 'Mokobara AI', 
      category: 'Transit Cabin Main', 
      fullVideo: '/Transit Cabin Main ( Green Screen) v2.mp4', 
      videoSrc: '/Transit Cabin Main ( Green Screen) v2.mp4', 
    }
  ];

  const reels = [
    { id: 1, videoSrc: '/Storytelling-1.mp4', link: 'https://www.instagram.com/reel/DP1UkCIk7rS/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==' },
    { id: 2, videoSrc: '/Motivation-1.mp4', link: 'https://www.instagram.com/reel/DRuafMeEXzS/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==' },
    { id: 3, videoSrc: '/Introvertlesson.mp4', link: 'https://www.instagram.com/reel/DRkPMLUib0l/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==' },
    { id: 4, videoSrc: '/Nora_Khalid.mp4', link: 'https://www.instagram.com/reel/DOsw_ldklrH/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==' },
    { id: 5, videoSrc: '/Estan_Zian.mp4', link: 'https://www.instagram.com/reel/DTNiqmKk4TO/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==' },
    { id: 6, videoSrc: '/speedramp_interior.mp4', link: 'https://www.instagram.com/reel/DNqRT2BzxFO/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==' },
    { id: 7, videoSrc: '/Challenge.mp4', link: 'https://www.instagram.com/reel/DRFjNwIEmGk/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==' },
    { id: 8, videoSrc: '/Everyday_challenge.mp4', link: 'https://www.instagram.com/reel/DSuspmBgZbE/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==' },
  ];

  const reasons = [
    { title: "Fast Delivery", desc: "Quick turnaround without compromising quality. Your project delivered on time, every time.", icon: Zap },
    { title: "Platform-Optimized Videos", desc: "Whether it's YouTube, Instagram Reels, or ads — we optimize for each platform's format and audience.", icon: MonitorPlay },
    { title: "Creative Vision", desc: "Unique artistic perspective that elevates your content above the competition.", icon: Palette },
    { title: "Constant Availability", desc: "Always accessible for revisions, feedback rounds, and last-minute changes.", icon: Clock },
    { title: "Full Post-Production", desc: "End-to-end services: editing, color grading, sound design, VFX, and motion graphics.", icon: Sliders },
    { title: "Confidential & Secure", desc: "NDA-ready workflows with secure file transfer and encrypted project storage.", icon: ShieldCheck }
  ];

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-white/20 overflow-x-hidden relative cursor-none" id="top">
      
      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed top-0 left-0 pointer-events-none z-[999] hidden md:flex items-center justify-center will-change-transform">
        <div className={`flex items-center justify-center rounded-full backdrop-blur-md border transition-all duration-300 ${isHoveringVideo ? 'w-24 h-24 bg-white/10 border-white/30' : isHoveringLink ? 'w-12 h-12 bg-white mix-blend-difference' : 'w-4 h-4 bg-white mix-blend-difference'}`}>
          {isHoveringVideo && <Play className="w-6 h-6 text-white" />}
        </div>
      </div>

      {/* PRIVACY POLICY MODAL */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out] p-4 md:p-12">
          <div 
            className="absolute inset-0 cursor-none"
            onClick={() => setIsPrivacyModalOpen(false)}
            onMouseEnter={() => setIsHoveringLink(true)} 
            onMouseLeave={() => setIsHoveringLink(false)}
          />
          <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.6)] z-10 animate-[modalIn_0.5s_ease-out]">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5 bg-[#0a0a0a] z-20">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white">Privacy Policy</h2>
              <button 
                className="w-10 h-10 bg-white/5 hover:bg-white rounded-full flex items-center justify-center text-white hover:text-black transition-colors cursor-none border border-white/10 shrink-0"
                onClick={() => setIsPrivacyModalOpen(false)}
                onMouseEnter={() => setIsHoveringLink(true)} 
                onMouseLeave={() => setIsHoveringLink(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 overflow-y-auto text-neutral-400 text-sm md:text-base leading-relaxed font-medium space-y-6 custom-scrollbar">
              <p><strong>Last Updated:</strong> March 2026</p>
              
              <div>
                <h3 className="text-white text-lg font-bold mb-2">1. Introduction</h3>
                <p>Welcome to Sangmesh's portfolio. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
              </div>

              <div>
                <h3 className="text-white text-lg font-bold mb-2">2. Information We Collect</h3>
                <p>We only collect information you voluntarily provide to us via our contact forms or direct emails. This may include your name, email address, phone number, and any project details or attachments you choose to share in your message.</p>
              </div>

              <div>
                <h3 className="text-white text-lg font-bold mb-2">3. How We Use Your Information</h3>
                <p>The information collected is used exclusively for the purpose of responding to your professional inquiries, discussing potential projects, managing ongoing contracts, and providing the video editing services you request. We do not sell, rent, or trade your personal information to third parties.</p>
              </div>

              <div>
                <h3 className="text-white text-lg font-bold mb-2">4. Data Security</h3>
                <p>We have implemented appropriate, industry-standard security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. All communication and project files are handled with strict confidentiality.</p>
              </div>

              <div>
                <h3 className="text-white text-lg font-bold mb-2">5. Third-Party Links & Services</h3>
                <p>This website may include links to third-party websites, plug-ins, and applications (such as Instagram, LinkedIn, and external video hosting like Frame.io). Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. We encourage you to read the privacy notice of every website you visit.</p>
              </div>

              <div>
                <h3 className="text-white text-lg font-bold mb-2">6. Analytics</h3>
                <p>We may use basic analytics tools to measure website traffic and performance. These tools may collect non-identifiable information such as browser type, device type, and page interactions to help us optimize the viewing experience for our creative work.</p>
              </div>

              <div>
                <h3 className="text-white text-lg font-bold mb-2">7. Contact Us</h3>
                <p>If you have any questions about this privacy policy or our privacy practices, please contact us directly at: <a href="mailto:sangmeshdumane@gmail.com" className="text-white hover:underline cursor-none" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>sangmeshdumane@gmail.com</a>.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* THEATER VIDEO MODAL */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]">
          <div 
            className="absolute inset-0 cursor-none"
            onClick={() => setActiveModalVideo(null)}
            onMouseEnter={() => setIsHoveringLink(true)} 
            onMouseLeave={() => setIsHoveringLink(false)}
          />
          <div className="relative w-[95vw] md:w-[80vw] lg:w-[70vw] aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.6)] z-10 animate-[modalIn_0.5s_ease-out]">
            <button 
              className="absolute top-4 right-4 z-50 w-12 h-12 bg-black/50 hover:bg-white shadow-xl rounded-full flex items-center justify-center text-white hover:text-black backdrop-blur-md transition-all cursor-none group border border-white/20"
              onClick={() => setActiveModalVideo(null)}
              onMouseEnter={() => setIsHoveringLink(true)} 
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <video 
              src={activeModalVideo} 
              controls 
              autoPlay 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* MAIN HERO VIEWPORT */}
      <div className="min-h-screen flex flex-col w-full relative border-b border-white/5">
        <nav 
          className={`w-full px-6 md:px-12 py-8 flex justify-between items-center z-40 relative transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
          style={{ transitionDelay: '0.8s' }}
        >
          <a href="#top" className="text-xl md:text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-none" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>
            <div className="w-6 h-6 border border-white rounded-full flex items-center justify-center"><Play className="w-3 h-3 text-white ml-0.5" /></div>
            Sangmesh
          </a>
          <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-widest font-bold text-neutral-400">
            <a href="#work" className="hover:text-white transition-colors cursor-none" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>Work</a>
            <a href="#about" className="hover:text-white transition-colors cursor-none" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>About</a>
            <a href="#contact" className="hover:text-white transition-colors cursor-none" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>Contact</a>
          </div>
          <a href="#contact" className="flex-shrink-0 inline-flex items-center justify-center gap-2 whitespace-nowrap text-nowrap px-6 py-2.5 bg-white text-black rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors cursor-none" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>
            <span>Let's Work</span> 
            <ArrowDownRight className="w-3 h-3 flex-shrink-0" />
          </a>
        </nav>

        {/* HERO CONTENT */}
        <div className="flex-1 flex flex-col justify-between px-6 md:px-12 pt-4 pb-0 w-full max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 w-full items-center my-auto">
            
            <div className="flex flex-col items-start gap-6 md:gap-8">
              <div 
                className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '0.4s' }}
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-300">Available now</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[7.8rem] font-bold tracking-tighter leading-[0.85] flex flex-col">
                <span className="overflow-hidden pb-[0.1em]">
                  <span 
                    className={`block transform transition-transform duration-[1.6s] will-change-transform ${isLoaded ? 'translate-y-0' : '-translate-y-[120%]'}`} 
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', transitionDelay: '0.5s' }}
                  >
                    I will make
                  </span>
                </span>
                <span className="overflow-hidden pb-[0.1em]">
                  <span 
                    className={`block text-neutral-500 transform transition-transform duration-[1.6s] will-change-transform ${isLoaded ? 'translate-y-0' : '-translate-y-[120%]'}`} 
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', transitionDelay: '0.6s' }}
                  >
                    you famous
                  </span>
                </span>
                <span className="overflow-hidden pb-[0.1em]">
                  <span 
                    className={`block transform transition-transform duration-[1.6s] will-change-transform ${isLoaded ? 'translate-y-0' : '-translate-y-[120%]'}`} 
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', transitionDelay: '0.7s' }}
                  >
                    online.
                  </span>
                </span>
              </h1>
              
              <p 
                className={`text-neutral-400 text-sm md:text-base leading-relaxed max-w-md font-medium transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
                style={{ transitionDelay: '0.7s' }}
              >
                I help brands and creators grow through storytelling and high-retention visuals. <span className="text-white font-bold">I engineer performance.</span>
              </p>
              
              <div 
                className={`flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
                style={{ transitionDelay: '0.8s' }}
              >
                <a href="#contact" className="w-full sm:w-auto px-10 py-4 bg-white text-black rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform cursor-none shadow-2xl" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>
                  Let's Work Together <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div 
              className={`w-full h-full min-h-[400px] lg:min-h-[500px] bg-[#0d0d0d] rounded-3xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group cursor-none shadow-2xl transform transition-all duration-[1.8s] will-change-transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-24'}`} 
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', transitionDelay: '0.2s' }}
              onMouseEnter={() => setIsHoveringVideo(true)} 
              onMouseLeave={() => setIsHoveringVideo(false)}
              onClick={() => setActiveModalVideo('/iTJ1qcoon0RZkRg95b89yuMHk8.mp4')}
            >
              <video 
                src="/iTJ1qcoon0RZkRg95b89yuMHk8.mp4" 
                muted loop autoPlay playsInline 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? 'scale-100 opacity-80 group-hover:opacity-100' : 'scale-125 opacity-0'}`} 
              />
              <div className={`relative z-10 flex flex-col items-center gap-4 group-hover:scale-110 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.8s' }}>
                <div className="w-24 h-24 rounded-full border border-white flex items-center justify-center backdrop-blur-md bg-black/20 text-white shadow-2xl"><Play className="w-8 h-8 ml-1" /></div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-white drop-shadow-md">Play Showreel</span>
              </div>
            </div>

          </div>

          <AnimatedName isLoaded={isLoaded} />

        </div>
      </div>

      <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* INTRODUCTION SECTION */}
        <section id="about" className="px-6 md:px-12 py-24 md:py-48 max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-32 items-center">
          <FadeInSection className="w-full md:w-1/2 aspect-square md:aspect-[4/5] bg-neutral-900 overflow-hidden rounded-3xl relative shadow-2xl">
            <img src="/clientimage.jpg.jpeg" alt="Sangmesh Dumane" className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 text-[11px] uppercase tracking-widest text-white font-bold">Based in Dubai, UAE</div>
          </FadeInSection>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
            <FadeInSection delay={150}>
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.0] tracking-tighter mb-8 text-white">
                I'm Sangmesh <br/>
                <span className="text-neutral-500 italic font-medium text-3xl md:text-4xl lg:text-5xl mt-2 md:mt-4 block">AI Video Creator & Video Editor</span>
              </h3>
              <div className="flex flex-col gap-6 text-neutral-400 text-sm md:text-base leading-relaxed mb-12 max-w-xl font-medium">
                <p>
                  I specialize in reels, ads, and social media content, combining AI-generated visuals with professional editing to help brands and creators produce high-quality videos without complex shoots.
                </p>
                <p>
                  With experience working on brand projects and collaborating with creative teams, I bring both creativity & structure to every project.
                </p>
                <p className="text-white">
                  Everything from a single source — concept to color grade, every detail is fine-tuned for powerful, professional results.
                </p>
              </div>
              <a href="#contact" className="px-12 py-4 rounded-full border border-white text-white hover:bg-white hover:text-black transition-all duration-500 text-[11px] font-black uppercase tracking-widest cursor-none shadow-lg" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>Contact Me</a>
            </FadeInSection>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="w-full bg-white text-black py-6 overflow-hidden flex border-y border-neutral-300">
          <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center mx-10 gap-16">
                <span className="text-[14px] font-black uppercase tracking-[0.5em]">Cinematic Mastery</span>
                <div className="w-3 h-3 bg-black rounded-full" />
                <span className="text-[14px] font-black uppercase tracking-[0.5em] text-neutral-400">Dubai Based</span>
                <div className="w-3 h-3 bg-neutral-400 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* WHY CHOOSE ME SECTION */}
        <section id="why-choose-me" className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto">
            <FadeInSection>
              <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white uppercase">
                  Why Choose <span className="text-neutral-500">Me</span>
                </h2>
                <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
                  Discover the unique advantages that set my creative services apart. Each step is crafted to deliver excellence and innovation.
                </p>
              </div>
            </FadeInSection>

            <div className="relative flex flex-col gap-4 md:gap-6">
              <div className="absolute left-[39px] md:left-[51px] top-12 bottom-12 w-[1px] bg-white/20 z-0" />

              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <FadeInSection key={index} delay={index * 100} className="relative z-10">
                    <div 
                      className="bg-[#121216] rounded-2xl p-6 md:px-8 md:py-7 flex gap-5 md:gap-8 border border-white/5 shadow-lg group hover:bg-[#1a1a1f] hover:border-white/20 transition-colors duration-300 cursor-none"
                      onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}
                    >
                      <div className="flex flex-col items-center pt-1">
                        <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                        <div className="w-[2px] h-8 bg-gradient-to-b from-white to-transparent mt-3 opacity-30 rounded-full" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg md:text-xl font-bold text-white">{reason.title}</h3>
                        <p className="text-neutral-400 text-sm md:text-sm leading-relaxed font-medium">{reason.desc}</p>
                      </div>
                    </div>
                  </FadeInSection>
                );
              })}
            </div>
          </div>
        </section>

        {/* SOCIAL MEDIA REELS */}
        <section id="reels" className="py-24 md:py-48 px-6 md:px-12 bg-[#050505] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeInSection className="mb-24">
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-6">Social Media</h2>
              <p className="text-neutral-400 max-w-md text-sm leading-relaxed uppercase tracking-widest font-medium">Engineered for maximum conversion and organic reach.</p>
            </FadeInSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
              {reels.map((reel, index) => (
                <FadeInSection key={reel.id} delay={index * 100} className={`${index % 2 === 1 ? 'md:mt-16' : ''}`}>
                  <ReelCard {...reel} onHover={setIsHoveringLink} onVideoClick={setActiveModalVideo} />
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTION WORK */}
        <section id="work" className="py-24 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
          <FadeInSection className="mb-32">
            <h2 className="text-6xl md:text-[9rem] font-bold tracking-tighter uppercase">Selected Work</h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-40 relative">
            {projects.map((proj, index) => (
              <FadeInSection key={proj.id} delay={index % 2 === 0 ? 0 : 200} className={index % 2 === 1 ? 'md:mt-64' : ''}>
                <VideoCard {...proj} onHover={setIsHoveringVideo} onVideoClick={setActiveModalVideo} />
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            
            <FadeInSection className="h-full">
              <div className="bg-[#0a0a0a] rounded-[2.5rem] p-8 md:p-14 border border-white/10 shadow-2xl flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
                
                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-12 relative z-10">Contact Information</h3>
                
                <div className="flex flex-col gap-6 mt-auto mb-auto relative z-10">
                  <a href="mailto:sangmeshdumane@gmail.com" className="flex items-center gap-6 p-6 md:p-8 rounded-3xl bg-[#121216] border border-white/5 hover:border-white/20 hover:bg-[#1a1a1f] transition-all duration-500 group cursor-none shadow-lg" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white transition-colors duration-500 shrink-0">
                      <Mail className="w-6 h-6 text-white group-hover:text-black transition-colors duration-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1.5">Email</span>
                      <span className="text-sm md:text-lg font-medium text-white break-all">sangmeshdumane@gmail.com</span>
                    </div>
                  </a>

                  <a href="https://www.instagram.com/sangmesh_verse/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 md:p-8 rounded-3xl bg-[#121216] border border-white/5 hover:border-white/20 hover:bg-[#1a1a1f] transition-all duration-500 group cursor-none shadow-lg" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white transition-colors duration-500 shrink-0">
                      <Instagram className="w-6 h-6 text-white group-hover:text-black transition-colors duration-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1.5">Instagram</span>
                      <span className="text-sm md:text-lg font-medium text-white">@sangmesh_verse</span>
                    </div>
                  </a>

                  <a href="tel:+971501870930" className="flex items-center gap-6 p-6 md:p-8 rounded-3xl bg-[#121216] border border-white/5 hover:border-white/20 hover:bg-[#1a1a1f] transition-all duration-500 group cursor-none shadow-lg" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white transition-colors duration-500 shrink-0">
                      <Phone className="w-6 h-6 text-white group-hover:text-black transition-colors duration-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1.5">Phone</span>
                      <span className="text-sm md:text-lg font-medium text-white">+971 50 187 0930</span>
                    </div>
                  </a>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={200} className="h-full">
              <div className="bg-[#0a0a0a] rounded-[2.5rem] p-8 md:p-14 border border-white/10 shadow-2xl flex flex-col h-full">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-10">Send Me a Message</h3>
                
                <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold ml-1">Your Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" className="bg-[#121216] border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-white/30 transition-colors text-sm w-full cursor-none placeholder-neutral-600 shadow-inner" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)} />
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold ml-1">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="john@example.com" className="bg-[#121216] border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-white/30 transition-colors text-sm w-full cursor-none placeholder-neutral-600 shadow-inner" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)} />
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold ml-1">Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required placeholder="How can we help?" className="bg-[#121216] border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-white/30 transition-colors text-sm w-full cursor-none placeholder-neutral-600 shadow-inner" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)} />
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold ml-1">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} required placeholder="Tell us more about your project..." rows="4" className="bg-[#121216] border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-white/30 transition-colors text-sm w-full resize-none cursor-none placeholder-neutral-600 shadow-inner" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)} />
                  </div>
                  
                  <button type="submit" disabled={isSubmitting} className={`mt-4 w-full text-black py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all cursor-none group shadow-xl ${isSubmitting ? 'bg-neutral-500 cursor-wait' : submitStatus === 'success' ? 'bg-green-500 text-white' : 'bg-white hover:bg-neutral-200'}`} onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>
                    {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent ✓' : 'Send Message'} 
                    {!isSubmitting && submitStatus !== 'success' && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>

                  {submitStatus === 'error' && (
                    <p className="text-[#ff3b1f] text-[10px] uppercase tracking-widest font-bold text-center mt-2">Something went wrong. Please email directly.</p>
                  )}
                </form>
              </div>
            </FadeInSection>

          </div>

          {/* Simple Footer Menu */}
          <FadeInSection delay={300}>
            <div className="mt-16 md:mt-32 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-neutral-500">
              <div>© 2026 Sangmesh. All rights reserved.</div>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-white transition-colors cursor-none uppercase" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>Privacy Policy</button>
                <a href="#top" className="hover:text-white transition-colors cursor-none" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>Back to Top</a>
                <a href="https://www.instagram.com/sangmesh_verse/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-none" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>Instagram</a>
                <a href="https://www.linkedin.com/in/sangmesh-dumane-506b252a7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-none" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>LinkedIn</a>
              </div>
            </div>
          </FadeInSection>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{__html: ` 
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } } 
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        html { scroll-behavior: smooth; } 
        
        /* Custom Scrollbar for Privacy Policy */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
      `}} />
    </div>
  );
}