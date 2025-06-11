import { useState } from 'react';
import { ChatWidget } from './components/ChatWidget';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { InteractiveTutorials } from './components/InteractiveTutorials';
import { LearningDashboard } from './components/LearningDashboard';
import { EnhancedFeedback } from './components/EnhancedFeedback';
import { Smartphone, HelpCircle, BookOpen } from 'lucide-react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { useVoiceCommands } from './hooks/useVoiceCommands';
import { useAccessibility } from './hooks/useAccessibility';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact' | 'tutorials' | 'dashboard' | 'feedback'>('home');
  const [showChat, setShowChat] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const { updateSettings, speakText } = useAccessibility();

  const handleTryChatbot = () => {
    setShowChat(true);
    speakText("Opening DigiBuddy chat assistant");
  };

  const handleVoiceToggle = (listening: boolean) => {
    setIsVoiceListening(listening);
  };

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    updateSettings({ fontSize: size });
  };

  useVoiceCommands({
    onNavigate: (page) => {
      setCurrentPage(page as any);
      speakText(`Navigating to ${page} page`);
    },
    onFontSizeChange: handleFontSizeChange,
    onOpenChat: handleTryChatbot
  });

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'tutorials':
        return <InteractiveTutorials />;
      case 'dashboard':
        return <LearningDashboard />;
      case 'feedback':
        return <EnhancedFeedback />;
      default:
        return (
          <main className="container mx-auto px-4 md:px-8 py-12">
            <section className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Learn Digital Tools with Ease</h2>
              <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
                Our AI assistant DigiBuddy helps you navigate the digital world with step-by-step guides for popular apps and services.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={handleTryChatbot}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  Try DigiBuddy
                </button>
                <button 
                  onClick={() => setCurrentPage('tutorials')}
                  className="border border-primary-500 text-primary-500 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
                >
                  Interactive Tutorials
                </button>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Featured Digital Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img src="https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?auto=compress&cs=tinysrgb&w=600" alt="WhatsApp Messaging" className="w-full h-40 object-cover rounded-md mb-3" />
                  <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Learn to send messages, make calls, and create groups.</p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Mobile Payments" className="w-full h-40 object-cover rounded-md mb-3" />
                  <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">PhonePe</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Send money, pay bills, and make online purchases.</p>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img src="https://images.pexels.com/photos/4116214/pexels-photo-4116214.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Google Maps Navigation" className="w-full h-40 object-cover rounded-md mb-3" />
                  <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Google Maps</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Navigate to destinations and create custom maps.</p>
                </div>
              </div>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 p-3 rounded-lg inline-block mb-4">
                  <Smartphone size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Learn Popular Apps</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Get step-by-step tutorials for WhatsApp, PhonePe, Google Maps, and more.
                </p>
                <button onClick={() => setCurrentPage('tutorials')} className="text-primary-500 font-medium">
                  Explore tutorials →
                </button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400 p-3 rounded-lg inline-block mb-4">
                  <HelpCircle size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Interactive Guidance</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Ask DigiBuddy questions and get instant answers tailored to your needs.
                </p>
                <button onClick={handleTryChatbot} className="text-primary-500 font-medium">
                  Ask DigiBuddy →
                </button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400 p-3 rounded-lg inline-block mb-4">
                  <BookOpen size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Track Your Progress</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Monitor your learning journey and get personalized recommendations.
                </p>
                <button onClick={() => setCurrentPage('dashboard')} className="text-primary-500 font-medium">
                  View dashboard →
                </button>
              </div>
            </section>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <AccessibilityPanel 
        onVoiceToggle={handleVoiceToggle}
        isVoiceListening={isVoiceListening}
      />
      
      <header className="bg-primary-500 text-white py-6">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone size={28} className="text-primary-200" />
              <h1 className="text-2xl font-bold">Digital Literacy Campaign</h1>
            </div>
            <nav>
              <ul className="flex items-center gap-6">
                <li>
                  <button 
                    onClick={() => setCurrentPage('home')} 
                    className={`hover:text-primary-200 transition-colors ${currentPage === 'home' ? 'text-primary-200' : ''}`}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('tutorials')} 
                    className={`hover:text-primary-200 transition-colors ${currentPage === 'tutorials' ? 'text-primary-200' : ''}`}
                  >
                    Tutorials
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('dashboard')} 
                    className={`hover:text-primary-200 transition-colors ${currentPage === 'dashboard' ? 'text-primary-200' : ''}`}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('about')} 
                    className={`hover:text-primary-200 transition-colors ${currentPage === 'about' ? 'text-primary-200' : ''}`}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('contact')} 
                    className={`hover:text-primary-200 transition-colors ${currentPage === 'contact' ? 'text-primary-200' : ''}`}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      {renderPage()}
      
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Digital Literacy Campaign</h3>
              <p className="text-sm">
                Empowering individuals with the digital skills needed in today's world.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <button 
                    onClick={() => setCurrentPage('home')} 
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('tutorials')} 
                    className="hover:text-white transition-colors"
                  >
                    Tutorials
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('dashboard')} 
                    className="hover:text-white transition-colors"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('feedback')} 
                    className="hover:text-white transition-colors"
                  >
                    Feedback
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleTryChatbot} 
                    className="hover:text-white transition-colors"
                  >
                    Try DigiBuddy
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
              <p className="text-sm">
                Email: contact@digitalliteracy.org<br />
                Phone: +91 9876543210<br />
                Address: Digital Learning Center, 123 Tech Street, Bangalore
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-sm text-center">
            © {new Date().getFullYear()} Digital Literacy Campaign. All rights reserved.
          </div>
        </div>
      </footer>
      
      <ChatWidget isOpen={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
}

export default App;