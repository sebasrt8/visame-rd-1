// components/Termometro/QuestionStep.tsx
'use client'

import type { Question } from './Sections'

type Props = {
  question: Question
  formData: Record<string, string>
  onChange: (id: string, value: string) => void
}

export default function QuestionStep({ question, formData, onChange }: Props) {
  return (
    <div className="flex flex-col space-y-4">
      <label htmlFor={question.id} className="font-medium">
        {question.label}
      </label>

      {question.type === 'select' && question.options ? (
        <select
          id={question.id}
          value={formData[question.id]}
          onChange={(e) => onChange(question.id, e.target.value)}
          className="border rounded-md p-2 w-full"
        >
          <option value="" disabled>
            Seleccione…
          </option>
          {question.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : question.type === 'date' ? (
        <input
          id={question.id}
          type="date"
          value={formData[question.id]}
          onChange={(e) => onChange(question.id, e.target.value)}
          className="border rounded-md p-2 w-full"
        />
      ) : (
        <input
          id={question.id}
          type="text"
          value={formData[question.id]}
          onChange={(e) => onChange(question.id, e.target.value)}
          className="border rounded-md p-2 w-full"
        />
      )}
    </div>
  )
}
