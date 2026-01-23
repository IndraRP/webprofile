import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BootScreenProps = {
  isVisible: boolean;
};

const bootLogs = [
  "Initializing core modules",
  "Mounting virtual filesystem",
  "Loading environment variables",
  "Authenticating user session",
  "Establishing secure channel",
  "Syncing UI components",
  "Optimizing rendering pipeline",
  "Finalizing system boot",
];

export default function BootScreen({ isVisible }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const totalDuration = 10000; // 5 detik
    const tickRate = 100;
    const steps = totalDuration / tickRate;
    const increment = 100 / steps;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(prev + increment, 100);
      });
    }, tickRate);

    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < bootLogs.length - 1 ? prev + 1 : prev));
    }, totalDuration / bootLogs.length);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_3px] opacity-10" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-lg px-6 font-mono text-cyan-400">
            {/* Header */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs tracking-[0.3em] opacity-60"
            >
              SYSTEM BOOT · INDRAPRATAMA OS v3.0
            </motion.p>

            {/* Logs */}
            <div className="mt-4 space-y-1 text-sm">
              {bootLogs.slice(0, logIndex + 1).map((log, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  &gt; {log}
                </motion.p>
              ))}
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="h-2 w-full bg-slate-800 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm">
                <span>BOOTING</span>
                <span className="text-cyan-300">{Math.floor(progress)}%</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  ▋
                </motion.span>
              </div>
            </div>

            {/* Desktop recommendation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 2 }}
              className="mt-6 text-xs text-slate-400"
            >
              ⚠ Best experienced on desktop or laptop display
            </motion.p>

            {/* Footer */}
            <p className="mt-4 text-xs text-slate-500">
              crafted by IndraPratama
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
