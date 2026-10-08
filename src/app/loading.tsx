export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" dir="rtl">
      <div className="text-center">
        <div className="font-mono text-accent text-2xl mb-4 animate-pulse">
          &gt; loading...
        </div>
        <div className="w-48 h-1 bg-card rounded-full overflow-hidden mx-auto">
          <div className="h-full w-1/2 bg-accent rounded-full animate-[loading_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
