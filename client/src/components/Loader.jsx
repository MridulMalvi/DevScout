export default function Loader({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="card animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-3/5 rounded-lg bg-white/5" />
              <div className="h-4 w-2/5 rounded-lg bg-white/5" />
              <div className="flex gap-3 mt-2">
                <div className="h-3 w-20 rounded-full bg-white/5" />
                <div className="h-3 w-16 rounded-full bg-white/5" />
                <div className="h-3 w-14 rounded-full bg-white/5" />
              </div>
              <div className="h-4 w-full rounded-lg bg-white/5 mt-2" />
              <div className="h-4 w-4/5 rounded-lg bg-white/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
