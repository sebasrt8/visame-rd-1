'use client';

import { Section } from './Sections';

type SidebarProps = {
  sections: Section[];
  currentSectionIndex: number;
};

export default function Sidebar({
  sections,
  currentSectionIndex,
}: SidebarProps) {
  return (
    <aside className="bg-blue-600 p-6 space-y-4 w-full lg:w-1/3">
      <h2 className="text-white text-center font-semibold">VISA B1/B2</h2>
      {sections.map((s, idx) => {
        const active = idx === currentSectionIndex;
        return (
          <div
            key={s.id}
            className={`flex items-center gap-3 bg-white rounded-lg shadow p-4 cursor-pointer transition ${
              active
                ? 'border-l-4 border-blue-600 bg-blue-50'
                : 'opacity-80 hover:opacity-100'
            }`}
          >
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {s.id}
            </span>
            <span className={active ? 'text-blue-800 font-medium' : 'text-gray-800'}>
              {s.title}
            </span>
          </div>
        );
      })}
    </aside>
  );
}
