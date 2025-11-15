import React from "react";

const Breadcrumbs: React.FC = () => {
  return (
    <nav className="mb-4 text-[11px] text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1">
        <li className="cursor-pointer hover:text-zinc-300">Home</li>
        <li className="text-zinc-600">/</li>
        <li className="cursor-pointer hover:text-zinc-300">Pleasanton</li>
        <li className="text-zinc-600">/</li>
        <li className="text-zinc-300">Harvest Park feed</li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;