// app/tutorial/page.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const steps = [
  {
    title: 'Bienvenido al Termómetro Migratorio',
    description: 'Conoce tu probabilidad de obtener una visa a EE.UU. con solo responder unas preguntas.',
    image: '/turorial/onboarding1.jpeg',
  },
  {
    title: 'Aplica con Estrategia, No con Suerte',
    description: 'Usamos lógica de expertos migratorios para mostrarte tu nivel de preparación.',
    image: '/turorial/onboarding1.jpeg',
  },
  {
    title: '100% Gratuito y Sin Riesgo',
    description: 'No necesitas pagar ni enviar documentos. Todo es anónimo y sin compromiso.',
    image: '/turorial/onboarding1.jpeg',
  },
  {
    title: '¡Listo para Comenzar!',
    description: 'Solo necesitas 5 minutos. Asegúrate de tener tus datos básicos a mano.',
    image: '/turorial/onboarding1.jpeg',
  },
]

export default function TutorialPage() {
  const [step, setStep] = useState(0)
  const isLast = step === steps.length - 1

  return (
    <div className="max-w-xl mx-auto py-12 px-4 text-center">
      <div className="mb-8">
        <Image
          src={steps[step].image}
          alt={steps[step].title}
          width={300}
          height={200}
          className="mx-auto rounded-xl"
        />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
        {steps[step].title}
      </h2>
      <p className="text-gray-600 text-base md:text-lg mb-6">
        {steps[step].description}
      </p>

      <div className="flex justify-center gap-4">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
          >
            Atrás
          </button>
        )}
        {!isLast ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Siguiente
          </button>
        ) : (
          <Link
            href="/termometro"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Empezar Evaluación
          </Link>
        )}
      </div>
    </div>
  )
}