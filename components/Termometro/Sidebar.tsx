'use client';

import { Section } from './Sections';

type SidebarProps = {
  sections: Section[];
  currentSectionIndex: number;
  completedSections: boolean[];
};

export default function Sidebar({ sections, currentSectionIndex, completedSections }: SidebarProps) {
  return (
    <aside className="bg-blue-600 p-5 space-y-2 w-full lg:w-1/3 rounded-tl-2xl rounded-bl-2xl">
      <h2 className="text-white text-center font-bold text-base mb-3 tracking-wide">VISA B1/B2</h2>
      {sections.map((s, idx) => {
        const active = idx === currentSectionIndex;
        const done   = completedSections[idx] ?? false;
        return (
          <div
            key={s.id}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
              active ? 'bg-white shadow-md' : done ? 'bg-white/90' : 'bg-white/50'
            }`}
          >
            <span className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold transition-colors ${
              done  ? 'bg-green-500 text-white' :
              active ? 'bg-blue-600 text-white' :
                       'bg-gray-200 text-gray-500'
            }`}>
              {done ? '✓' : s.id}
            </span>
            <span className={`text-sm leading-tight ${
              active ? 'text-blue-800 font-semibold' :
              done   ? 'text-gray-700'               :
                       'text-gray-400'
            }`}>
              {s.title}
            </span>
          </div>
        );
      })}
    </aside>
  );
}
