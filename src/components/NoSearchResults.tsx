
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/providers/LanguageProvider';

interface NoSearchResultsProps {
  searchTerm: string;
}

const NoSearchResults: React.FC<NoSearchResultsProps> = ({ searchTerm }) => {
  const { language } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get message based on language
  const getMessage = () => {
    const messages = {
      en: [
        `No information found for "${searchTerm}" yet. We're adding new vendors daily! Try again...`,
        `No results for "${searchTerm}" yet. We're expanding our database every day. Try again...`,
        `Nothing found for "${searchTerm}" at the moment. Try different keywords. Try again...`,
        `Sorry, no vendors match "${searchTerm}" at this time. Check back soon! Try again...`
      ],
      lv: [
        `Vēl nav šādas informācijas par "${searchTerm}". Mēs katru dienu pievienojam jaunus pakalpojumus! Mēģiniet vēl...`,
        `Vēl nav šādas informācijas par "${searchTerm}". Pamēģiniet citus atslēgvārdus! Mēģiniet vēl...`,
        `Vēl nav šādas informācijas par "${searchTerm}". Mēs katru dienu papildinām mūsu datubāzi. Mēģiniet vēl...`,
        `Vēl nav šādas informācijas par "${searchTerm}". Pamēģiniet citu meklēšanas terminu. Mēģiniet vēl...`
      ]
    };
    
    // Get random message
    const messagesArray = messages[language as keyof typeof messages] || messages.en;
    const randomIndex = Math.floor(Math.random() * messagesArray.length);
    return messagesArray[randomIndex];
  };
  
  // Typewriter effect
  useEffect(() => {
    const fullText = getMessage();
    
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 25); // Speed of typewriter effect
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, searchTerm, language]);
  
  // Reset typewriter when search term changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [searchTerm]);
  
  return (
    <div className="typewriter text-sm text-muted-foreground mb-3 py-1 px-4 bg-background/50 border border-muted rounded-md shadow-sm w-full max-w-full overflow-visible">
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default NoSearchResults;
