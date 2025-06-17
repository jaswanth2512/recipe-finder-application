import React, { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';

const VoiceReader = ({ text, title = "Recipe Instructions", className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup: stop speech when component unmounts
      if (speechSynthesis && currentUtterance) {
        speechSynthesis.cancel();
      }
    };
  }, [speechSynthesis, currentUtterance]);

  const formatTextForSpeech = (text) => {
    if (Array.isArray(text)) {
      // If it's an array of instructions
      return text.map((instruction, index) => 
        `Step ${index + 1}: ${instruction}`
      ).join('. ');
    }
    return text;
  };

  const startReading = () => {
    if (!speechSynthesis || !text) return;

    // Stop any current speech
    speechSynthesis.cancel();

    const textToRead = formatTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(textToRead);
    
    // Configure voice settings
    utterance.rate = 0.8; // Slightly slower for better comprehension
    utterance.pitch = 1;
    utterance.volume = isMuted ? 0 : 1;

    // Set up event listeners
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentUtterance(null);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentUtterance(null);
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    setCurrentUtterance(utterance);
    speechSynthesis.speak(utterance);
  };

  const pauseReading = () => {
    if (speechSynthesis && isPlaying) {
      speechSynthesis.pause();
    }
  };

  const resumeReading = () => {
    if (speechSynthesis && isPaused) {
      speechSynthesis.resume();
    }
  };

  const stopReading = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentUtterance(null);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (currentUtterance) {
      currentUtterance.volume = isMuted ? 1 : 0;
    }
  };

  const handlePlayPause = () => {
    if (!isPlaying) {
      startReading();
    } else if (isPaused) {
      resumeReading();
    } else {
      pauseReading();
    }
  };

  if (!speechSynthesis) {
    return null; // Don't render if speech synthesis is not supported
  }

  return (
    <div className={`flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 ${className}`}>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePlayPause}
          className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors shadow-md"
          title={isPlaying ? (isPaused ? "Resume" : "Pause") : "Play"}
        >
          {isPlaying && !isPaused ? (
            <FiPause size={18} />
          ) : (
            <FiPlay size={18} className="ml-0.5" />
          )}
        </button>

        {isPlaying && (
          <button
            onClick={stopReading}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full transition-colors"
            title="Stop"
          >
            Stop
          </button>
        )}

        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
        </button>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-blue-700">🎵 Voice Reader</span>
          {isPlaying && (
            <div className="flex items-center gap-1">
              <div className="w-1 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-600">
          {isPlaying 
            ? (isPaused ? "Paused" : "Reading recipe instructions...") 
            : "Click play to hear the recipe instructions"
          }
        </p>
      </div>
    </div>
  );
};

export default VoiceReader;
