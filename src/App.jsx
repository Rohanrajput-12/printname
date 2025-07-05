import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const [names, setNames] = useState([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [progress, setProgress] = useState(0);
  const countRef = useRef(0);
  const bottomRef = useRef(null);
  const intervalRef = useRef(null);
  const maxCount = 100001;
  const audioRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem("auth");
    if (!isAuth) {
      navigate("/");
    }
  }, []);

//   useEffect(() => {
//   if (audioRef.current) {
//     audioRef.current.volume = 1; // Set a soft volume
//     audioRef.current.play().catch((e) => {
//       console.log("Autoplay prevented:", e);
//     });
//   }
// }, []);

  const handleLogout = () => {
  localStorage.removeItem("auth");
  window.speechSynthesis.cancel(); // Stop any ongoing voice
  navigate("/");
};

  const speakNow = (text) => {
    const voices = window.speechSynthesis.getVoices();

    const hindiFemaleVoice =
      voices.find((v) => v.name.includes("Google हिन्दी")) ||
      voices.find((v) => v.name.includes("Microsoft Kalpana")) ||
      voices.find((v) => v.lang === "hi-IN");

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = hindiFemaleVoice || voices[0];
    utterance.lang = "hi-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1.2;
    utterance.volume = 0.5;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    console.log("Available voices:", voices);
  }, []);

  const startPrinting = () => {
    if (isPrinting) return;
    setIsPrinting(true);
    setNames([]);
    setProgress(0);
    countRef.current = 0;

        if (audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.play();
    }

    intervalRef.current = setInterval(() => {
      if (countRef.current >= maxCount) {
        clearInterval(intervalRef.current);
        setIsPrinting(false);
        return;
      }

      countRef.current += 1;
      setNames((prev) => [...prev, "Radha"]);
      setProgress(((countRef.current / maxCount) * 100).toFixed(2));
      speakNow("Radha");
    }, 1000);
  };

  const stopPrinting = () => {
    setIsPrinting(false);
    clearInterval(intervalRef.current);
    window.speechSynthesis.cancel();

       if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0; 
  }
  };


  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [names]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-[360px] h-[360px] rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-300 flex flex-col relative animate-pop-in">

        {/* Image as background INSIDE the card only */}
        <img
          src="/radhekrishn.jpg"
          alt="Radhe Krishna"
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 "
        />
        <audio
          ref={audioRef}
          src="/kriahnflute.mp3"
          loop
          autoPlay
          hidden
        />

        {/* Foreground content on top of the image */}
        <div className="flex flex-col w-full h-full relative z-10 bg-white/60 backdrop-blur-sm">

          {/* Header */}
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-center text-lg shadow">
            📱 Naam Jap - Printer
          </div>

          {/* Buttons */}
          <div className="flex gap-2 px-4 mt-3">
            <button
              onClick={startPrinting}
              disabled={isPrinting}
              className={`w-full py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isPrinting
                  ? "bg-gray-300 text-gray-600"
                  : "bg-blue-600 text-white active:scale-95 shadow-md"
              }`}
            >
              🚀 Start
            </button>
            <button
              onClick={stopPrinting}
              disabled={!isPrinting}
              className={`w-full py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                !isPrinting
                  ? "bg-gray-300 text-gray-600"
                  : "bg-red-500 text-white active:scale-95 shadow-md"
              }`}
            >
              🛑 Stop
            </button>
            <button
                onClick={() => {
                  if (audioRef.current) {
                    if (isMusicPlaying) {
                      audioRef.current.pause();
                    } else {
                      audioRef.current.play();
                    }
                    setIsMusicPlaying(!isMusicPlaying);
                  }
                }}
                className="absolute top-2 right-2 bg-white/80 text-black text-xs px-3 py-1 rounded-full shadow-md"
              >
                {isMusicPlaying ? "🔇 Mute" : "🔊 Play"}
              </button>
          </div>
           <div className="px-4 mt-2">
          <button
            onClick={handleLogout}
            className="w-full py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-gray-800 text-white hover:bg-black active:scale-95 shadow-md"
          >
            🔓 Logout
          </button>
          </div>
         

          {/* Progress Info */}
          <div className="px-4 text-xs text-gray-600 mt-2">
            Progress: {countRef.current} / {maxCount} • {progress}%
          </div>

          {/* Progress Bar */}
          <div className="mx-4 mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          

          {/* Name List */}
          <div className="flex-1 overflow-y-auto px-4 py-2 custom-scroll text-xs text-gray-800">
            {names.map((name, idx) => (
              <div key={idx} className="fade-in-item">
                {idx + 1}. {name}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
