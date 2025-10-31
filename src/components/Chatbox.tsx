import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBrandWhatsapp, IconSend, IconX } from "@tabler/icons-react";

const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "6282131211769"; // Ganti dengan nomor WhatsApp kamu

  const handleSend = () => {
    if (!message.trim()) return;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(waUrl, "_blank");

    setMessage("");
    setOpen(false);
  };

  return (
    <>
      {/* Tombol Chat Mengambang */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-28 right-6 z-50 flex items-center gap-2 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-5 py-3 rounded-full shadow-lg shadow-green-900/30 border border-green-700/50 transition"
        whileHover={{ scale: 1.05, y: -3 }}
      >
        <IconBrandWhatsapp size={22} />
        <span className="font-semibold">Chat</span>
      </motion.button>

      {/* Popup Chat */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background blur */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Card Chat */}
            <motion.div
              key="chatbox"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="fixed bottom-20 right-6 w-80 bg-[#0f172a]/90 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl shadow-black/50 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center bg-gradient-to-r from-green-600 to-emerald-700 px-4 py-3">
                <h2 className="text-white font-semibold text-lg flex items-center gap-2">
                  <IconBrandWhatsapp size={20} />
                  Chat with Me
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  <IconX size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-300 text-sm"
                >
                  👋 Hi there! Feel free to send me a message on WhatsApp.
                </motion.div>

                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-slate-800/80 text-gray-200 placeholder-gray-500 text-sm p-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                ></textarea>

                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold py-2.5 rounded-lg transition-all"
                >
                  <IconSend size={18} />
                  Send
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBox;
