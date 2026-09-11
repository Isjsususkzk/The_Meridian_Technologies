import { useState } from 'react';

interface Props {
  onLogoClick: () => void;
  onNavigate: (page: 'corporate' | 'terminal' | 'narrative' | 'cipher' | 'final') => void;
  discoveredClues: string[];
  addClue: (clue: string) => void;
}

export default function CorporateSite({ onLogoClick, onNavigate, discoveredClues, addClue }: Props) {
  const [showAbout, setShowAbout] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [footerClicks, setFooterClicks] = useState(0);

  const handleFooterClick = () => {
    const next = footerClicks + 1;
    setFooterClicks(next);
    if (next >= 5) {
      addClue('footer_secret');
      onNavigate('cipher');
    }
  };

  const employees = [
    { name: 'Dr. James Mitchell', role: 'CEO & Founder', year: '1994', img: '👨‍💼' },
    { name: 'Sarah Chen', role: 'VP of Research', year: '1995', img: '👩‍💼' },
    { name: 'Robert Kaine', role: 'CTO', year: '1996', img: '🧑‍💻' },
    { name: '[REDACTED]', role: 'Former Director', year: '1997-1998', img: '👤' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-serif">
      {/* Retro Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div 
              className="cursor-pointer select-none"
              onClick={onLogoClick}
              title="Meridian Technologies"
            >
              <h1 className="text-2xl font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                ◈ MERIDIAN TECHNOLOGIES
              </h1>
              <p className="text-xs text-blue-200 italic">Innovative Solutions Since 1994</p>
            </div>
            <nav className="hidden md:flex gap-6 text-sm">
              <button onClick={() => setShowAbout(true)} className="hover:text-yellow-300 transition-colors">About Us</button>
              <button className="hover:text-yellow-300 transition-colors">Services</button>
              <button className="hover:text-yellow-300 transition-colors">Contact</button>
              {/* Hidden link - barely visible */}
              <button 
                onClick={() => { addClue('nav_secret'); onNavigate('terminal'); }}
                className="text-blue-900 hover:text-blue-800 transition-colors text-[1px] leading-none"
                title=""
              >
                ·
              </button>
            </nav>
          </div>
        </div>
        {/* Marquee - very 90s */}
        <div className="bg-blue-950 py-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-xs text-blue-300">
            ★ Welcome to Meridian Technologies ★ Your trusted partner in data solutions ★ 
            ISO 9001 Certified ★ Serving clients worldwide since 1994 ★ 
            7.83 ★ 7.83 ★ 7.83 ★ ECHO ★ ECHO ★ ECHO ★
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-white border-2 border-blue-200 rounded-lg p-8 mb-8 shadow-sm">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Welcome to Meridian Technologies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At Meridian Technologies, we believe in the power of data to transform businesses. 
            Founded in 1994 by Dr. James Mitchell, our company has grown from a small research 
            laboratory into a leading provider of innovative technology solutions.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our team of dedicated professionals works tirelessly to develop cutting-edge solutions 
            in data processing, network infrastructure, and advanced computing systems. We serve 
            clients across multiple industries with customized solutions tailored to their needs.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-6">
            <p className="text-sm text-blue-800 italic">
              "The future belongs to those who can hear the signal in the noise." — Dr. J. Mitchell, 1996
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-blue-900 mb-2">Data Analytics</h3>
            <p className="text-sm text-gray-600">
              Advanced data processing and analysis solutions for enterprise clients.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-bold text-blue-900 mb-2">Network Solutions</h3>
            <p className="text-sm text-gray-600">
              Secure network infrastructure design and implementation services.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow relative">
            <div className="text-3xl mb-3">🔬</div>
            <h3 className="font-bold text-blue-900 mb-2">Research Division</h3>
            <p className="text-sm text-gray-600">
              Cutting-edge research in computational systems and signal processing.
            </p>
            {/* Hidden clickable element */}
            <div 
              className="absolute top-1 right-1 w-2 h-2 bg-transparent hover:bg-red-500 rounded-full cursor-pointer transition-colors"
              onClick={() => { addClue('research_div'); onNavigate('narrative'); }}
              title=""
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white border-2 border-blue-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Our Leadership Team</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {employees.map((emp, i) => (
              <div 
                key={i}
                className={`text-center p-4 rounded-lg border cursor-pointer transition-all ${
                  emp.name === '[REDACTED]' 
                    ? 'border-red-200 bg-red-50 hover:bg-red-100' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => {
                  setSelectedEmployee(emp.name);
                  if (emp.name === '[REDACTED]') addClue('redacted_employee');
                }}
              >
                <div className="text-4xl mb-2">{emp.img}</div>
                <p className="font-bold text-sm text-gray-800">{emp.name}</p>
                <p className="text-xs text-gray-500">{emp.role}</p>
                <p className="text-xs text-gray-400">{emp.year}</p>
              </div>
            ))}
          </div>
          
          {/* Employee detail popup */}
          {selectedEmployee && (
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded p-4">
              {selectedEmployee === '[REDACTED]' ? (
                <div>
                  <p className="text-red-700 font-mono text-sm">
                    ⚠️ FILE ACCESS RESTRICTED<br/>
                    Subject: ██████████ ██████<br/>
                    Former Title: Director of Project ECHO<br/>
                    Status: <span className="animate-pulse text-red-500">TERMINATED</span><br/>
                    Last Activity: 03/15/1998 03:33:33 AM<br/>
                    <span className="text-xs text-gray-400 mt-2 block">
                      Note: All records pertaining to this individual have been sealed by order of the board.
                      Access requires Level 7 clearance. Try the cipher decoder...
                    </span>
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-gray-800">{selectedEmployee}</p>
                  <p className="text-sm text-gray-600">
                    {selectedEmployee === 'Dr. James Mitchell' && 'Founder and visionary. Led Meridian from its inception in a small Cambridge laboratory to its current position as an industry leader.'}
                    {selectedEmployee === 'Sarah Chen' && 'Joined in 1995. Oversees all research operations and has published 47 papers in computational biology.'}
                    {selectedEmployee === 'Robert Kaine' && 'Chief Technology Officer since 1996. Architect of our proprietary MeridianOS platform.'}
                  </p>
                </div>
              )}
              <button 
                onClick={() => setSelectedEmployee(null)}
                className="mt-2 text-xs text-blue-600 underline"
              >
                Close
              </button>
            </div>
          )}
        </section>

        {/* "News" section with hidden message */}
        <section className="bg-white border-2 border-blue-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Company News</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <p className="text-xs text-gray-400">December 1998</p>
              <p className="text-gray-700">Meridian Technologies announces Q4 expansion into European markets.</p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <p className="text-xs text-gray-400">September 1998</p>
              <p className="text-gray-700">New partnership with federal agencies for advanced signal processing research.</p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <p className="text-xs text-gray-400">March 1998</p>
              <p className="text-gray-700 text-red-900">
                Internal restructuring of Research Division. All Project E█O materials transferred to secure storage. 
                Staff reassignment pending.
                <span className="text-[8px] text-gray-300 ml-2 select-all">
                  THE_TRUTH_IS_AT_FREQUENCY_7.83
                </span>
              </p>
            </div>
            <div className="pb-4">
              <p className="text-xs text-gray-400">January 1998</p>
              <p className="text-gray-700">Dr. Mitchell receives Innovation Award for contributions to data science.</p>
            </div>
          </div>
        </section>

        {/* Visitor Counter - very 90s */}
        <div className="text-center mb-8">
          <div className="inline-block bg-black text-green-400 font-mono px-4 py-2 rounded text-sm">
            👁️ Visitors: {Math.floor(Math.random() * 1000) + 1247}
          </div>
        </div>
      </main>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl font-bold text-blue-900 mb-4">About Meridian Technologies</h3>
            <p className="text-gray-700 text-sm mb-4">
              Meridian Technologies was founded in 1994 with a mission to advance the field of 
              computational data processing. Our research division, established in 1995, has been 
              at the forefront of signal analysis and pattern recognition.
            </p>
            <p className="text-gray-700 text-sm mb-4">
              We currently employ over 200 professionals across our offices in Cambridge, MA and 
              our European headquarters in London.
            </p>
            <p className="text-xs text-gray-400 italic">
              "Every signal has a source. Every pattern has a meaning." — Company Motto
            </p>
            <button 
              onClick={() => setShowAbout(false)}
              className="mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-200 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm">© 1994-1998 Meridian Technologies. All Rights Reserved.</p>
          <p className="text-xs mt-2 text-blue-400">
            147 Innovation Drive, Cambridge, MA 02139 | (617) 555-0147
          </p>
          <p 
            className="text-xs mt-4 text-blue-800 cursor-pointer hover:text-blue-600 transition-colors select-none"
            onClick={handleFooterClick}
          >
            Site maintained by: webmaster@meridian-tech.internal
          </p>
          {/* Hidden text - same color as background */}
          <p className="text-[1px] text-blue-900 mt-2 select-all">
            IF_YOU_CAN_READ_THIS_YOU_FOUND_THE_FOOTER_SECRET_GO_TO_CIPHER_DECODER
          </p>
        </div>
      </footer>
    </div>
  );
}
