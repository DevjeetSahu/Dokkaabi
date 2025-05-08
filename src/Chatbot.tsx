import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Mic } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  audioUrl?: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const sendMessage = async (text: string) => {
    if (!text) return;

    const userMsg: Message = { id: Date.now(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://127.0.0.1:2900/api/tts", {
        text,
      });

      const botText = `Echo: ${text}`;
      const botMsg: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: botText,
      };

      if (res.data.audio_url) {
        botMsg.audioUrl = res.data.audio_url;
        // Add URL to the visible text too, for clarity during testing
        botMsg.text += `\n🔊 [Audio URL](${res.data.audio_url})`;
        // new Audio(res.data.audio_url).play();
      }

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("TTS error", err);
    }
  };

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:2900/ws/stt/1"); // ✅ Make sure this is your actual STT WebSocket endpoint
    wsRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("📩 Raw WebSocket data:", event.data);
      try {
        const data = JSON.parse(event.data);

        if (data.transcript) {
          console.log("📝 Transcript:", data.transcript);
          setInput(data.transcript); // optional: update UI input
        }

        if (data.event === "ai_response_ready" && data.ai_response) {
          console.log("🤖 AI Response:", data.ai_response.text);
        }
      } catch (e) {
        console.error("❌ Error parsing WebSocket message", e, event.data);
      }
    };


    socket.onerror = (err) => {
      console.error("❗ WebSocket error", err);
    };

    socket.onclose = (e) => {
      console.log(`❌ WebSocket disconnected (code: ${e.code})`);
    };

    return () => {
      socket.close();
      console.log("🧹 WebSocket cleanup");
    };
  }, []);



  const toggleRecording = async () => {
    if (!recording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      audioChunksRef.current = [];
      mr.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mr.onstop = async () => {
        
        const form = new FormData();
        const response = await fetch("/voice.wav"); // must be in `public/` folder
        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: "audio/wav" });
        form.append("audio_file", blob, "voice.wav");
        
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(arrayBuffer); // Send audio data to backend
          console.log("📤 Sent audio data to WebSocket");
        } else {
          console.warn("❌ WebSocket not open");
        }
        // try {
        //   const res = await axios.post(
        //     "http://127.0.0.1:2900/api/stt/prerecorded/1",
        //     form,
        //     { headers: { "Content-Type": "multipart/form-data" } }
        //   );
        //   if (res.data.transcript) {
        //     const userMsg: Message = {
        //       id: Date.now(),
        //       sender: "user",
        //       text: res.data.transcript,
        //     };

        //     const botMsg: Message = {
        //       id: Date.now() + 1,
        //       sender: "bot",
        //       text: `Echo: ${res.data.ai_response?.text}`,
        //     };

        //     setMessages((prev) => [...prev, userMsg, botMsg]);
        //   }
        // } catch (err) {
        //   console.error("STT error", err);
        // }
      };
      mr.start();
      setRecording(true);
    } else {
      mediaRecorderRef.current?.stop();
      setRecording(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative h-[calc(100vh-120px)] flex flex-col bg-zinc-900"
    >
      {/* Message Area */}
      {messages.length > 0 ? (
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-sm sm:max-w-xl p-3 rounded-lg text-sm text-white break-words ${
                msg.sender === "user"
                  ? "bg-zinc-700 self-end"
                  : "bg-zinc-800 self-start"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center px-4 text-center">
          <div className="text-zinc-400 text-lg sm:text-xl">
            Ask something to get started...
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div
        className={`${
          messages.length > 0
            ? "sticky bottom-0 px-4 sm:px-6 py-4 border-t border-zinc-800 bg-zinc-900"
            : "absolute bottom-1/2 translate-y-1/2 px-4 sm:px-6"
        } z-10 w-full flex flex-wrap gap-2 sm:gap-3 items-center`}
      >
        {/* Mic Button */}
        <button
          onClick={toggleRecording}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border font-medium transition text-white ${
            recording
              ? "bg-red-600 border-red-400 hover:bg-red-700"
              : "bg-[#1A1A1C] border-zinc-700 hover:bg-[#252528]"
          }`}
          style={{
            minWidth: "90px",
            fontSize: "0.875rem",
            height: "44px",
          }}
        >
          <Mic size={18} className="shrink-0" />
          <span className="hidden sm:inline">
            {recording ? "Stop" : "Speak"}
          </span>
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Type a message..."
          className="flex-1 min-w-0 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none"
          style={{ height: "44px" }}
        />

        {/* Send Button */}
        <button
          onClick={() => sendMessage(input)}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold rounded-lg hover:opacity-90 transition"
          style={{ height: "44px" }}
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}
