// utils/recommendations.ts

export interface Recommendation {
    /** rango inclusivo */
    minScore: number
    maxScore: number
    title: string
    tips: string[]
  }
  
  export const recommendationMatrix: Recommendation[] = [
    {
      minScore:   0,
      maxScore:  49,
      title: 'Bajo rendimiento – Necesitas mejorar',
      tips: [
        'Revisa tus lazos familiares y contactos en EE.UU.: un sponsor sólido ayuda.',
        'Acorta la duración de tu viaje; estancias muy largas despiertan sospechas.',
        'Asegura prueba de empleo estable y antigüedad laboral.',
        'Demuestra solvencia financiera: extractos bancarios y patrimonio.',
        'Si aplicaste antes y te negaron, incluye nueva evidencia (invitaciones, reservas).'
      ]
    },
    {
      minScore:  50,
      maxScore:  74,
      title: 'Puntuación media – Estás cerca',
      tips: [
        'Refuerza tu carta de invitación o reserva de hotel para demostrar propósito de viaje.',
        'Incluye comprobantes de vínculos fuertes en RD: propiedades, familia directa.',
        'Aporta documentación extra de tu solvencia: inversiones, cuentas bancarias.',
        'Si tienes historial de viajes, adjunta sellos de entradas y salidas previas.',
        'Aclara tu situación laboral con contrato o carta de tu empleador actual.'
      ]
    },
    {
      minScore:  75,
      maxScore: 100,
      title: 'Alto rendimiento – ¡Bien hecho!',
      tips: [
        'Tu perfil luce sólido: mantén todo en orden el día de la entrevista.',
        'Lleva original y copia de tus documentos clave (pasaporte, cédula, contratos).',
        'Prepara respuestas claras sobre el propósito y la duración de tu viaje.',
        'Confirma que tu sponsor tenga fondos suficientes y prueba de parentesco.',
        'Revisa el proceso de cita y presenta recibos de pago de la tarifa de solicitud.'
      ]
    }
  ]
  
  /**
   * Busca la recomendación que cubra tu score.
   */
  export function getRecommendation(score: number): Recommendation {
    return (
      recommendationMatrix.find(r => score >= r.minScore && score <= r.maxScore) ??
      {
        minScore: 0,
        maxScore: 100,
        title: 'Resultados mixtos',
        tips: ['Revisa tu información y vuelve a intentarlo.']
      }
    )
  }
  