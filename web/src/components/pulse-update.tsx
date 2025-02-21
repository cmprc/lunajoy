export function PulseUpdate({ isConnected }: { isConnected: boolean }) {
  return (
    <div
      className={`w-2 h-2 rounded-full transition-all ${
        isConnected
          ? "bg-lime-500 shadow-[0_0_12px_2px] shadow-lime-600 animate-pulse"
          : "bg-gray-400"
      }`}
    ></div>
  );
}
