export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-6 py-12 text-white">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 px-8 py-6 text-center backdrop-blur-xl">
        <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-rose-400 to-amber-300" />
        <p className="text-lg font-semibold">Sweet Delights is loading...</p>
        <p className="mt-2 text-sm text-white/60">Preparing your luxury cake experience.</p>
      </div>
    </div>
  );
}