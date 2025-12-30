export const MapSkeleton = () => {
  return (
    <div className="relative w-full max-w-3xl mx-auto min-h-[100vh] mt-10 mb-20 animate-pulse opacity-30">
      {/* Mocking a vertical path of nodes */}
      <div className="absolute left-1/2 top-[10%] -translate-x-1/2 w-1 h-[80%] border-l-2 border-dashed border-slate-700" />
      
      {[10, 30, 50, 70, 90].map((top, i) => (
        <div 
          key={i}
          className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700"
          style={{ top: `${top}%` }}
        />
      ))}
      
      {/* Mock branching nodes */}
      <div className="absolute left-[30%] top-[30%] -translate-x-1/2 w-10 h-10 rounded-full bg-slate-800" />
      <div className="absolute left-[70%] top-[30%] -translate-x-1/2 w-10 h-10 rounded-full bg-slate-800" />
    </div>
  );
};