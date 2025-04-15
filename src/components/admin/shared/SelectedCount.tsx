const SelectedCount = ({ count }: { count: number }) => {
  return (
    <div className="flex h-8 items-center justify-center gap-1 border px-3 text-sm text-slate-700">
      <span className="font-medium">{count}</span> Selected
    </div>
  );
};

export default SelectedCount;
