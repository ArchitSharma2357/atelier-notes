export default function ProductSkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden border border-black/10 bg-white/70">
      <div className="aspect-[0.9] bg-[#ede3d6]" />
      <div className="space-y-4 p-5">
        <div className="h-3 w-24 bg-[#e1d4c3]" />
        <div className="h-6 w-full bg-[#e8dccd]" />
        <div className="h-6 w-4/5 bg-[#e8dccd]" />
        <div className="h-4 w-full bg-[#efe5d9]" />
        <div className="h-4 w-2/3 bg-[#efe5d9]" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-20 bg-[#e8dccd]" />
          <div className="h-10 w-24 bg-[#dbcab6]" />
        </div>
      </div>
    </div>
  );
}
