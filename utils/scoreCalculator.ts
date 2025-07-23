// src/utils/scoreCalculator.ts
import { sections, Question } from '../components/Termometro/Sections';

/**
 * FormData: respuestas del usuario, clave=id de pregunta, valor=respuesta
 */
export type FormData = Record<string, string>;

/**
 * Calcula un puntaje de 0 a 100 basado en una matriz de riesgo experta.
 */
export function calculateVisaScore(form: FormData): number {
  let totalWeight = 0;
  let weightedScore = 0;

  sections.forEach(section => {
    section.questions.forEach((q: Question) => {
      // Si tiene condición y no se cumple, omitimos
      if (q.condition && !q.condition(form)) return;
      const answer = form[q.id];
      // Pasamos todo el form para casos que dependen de múltiples campos
      const score = mapAnswerToScore(q.id, answer, form);
      totalWeight += q.weight;
      weightedScore += score * q.weight;
    });
  });

  // Normalizamos a escala 0-100
  const average = totalWeight ? weightedScore / totalWeight : 0;
  return Math.round(average);
}

/**
 * Mapea cada respuesta a un valor de 0-100 según criterio experto.
 */
function mapAnswerToScore(id: string, value: string, form: FormData): number {
  switch (id) {
    // ==== Datos Personales ==== 
    case 'birthDate': {
      const age = calculateAge(new Date(value));
      if (age < 25) return 60;
      if (age < 40) return 80;
      return 70;
    }
    case 'civilStatus':
      return value === 'Casado/a' ? 100 : 80;
    case 'nationality':
      // RD tiene menor aprobación estadística
      return 70;

    // ==== Contacto Migratorio ==== 
    case 'departureDate':
    case 'returnDate': {
      const dep = form['departureDate'] ? new Date(form['departureDate']) : null;
      const ret = form['returnDate'] ? new Date(form['returnDate']) : null;
      if (dep && ret) {
        const diff = (ret.getTime() - dep.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 15 && diff >= 0 ? 100 : 70;
      }
      return 0;
    }
    case 'whoPays':
      return value === 'Yo' ? 90 : 80;
    case 'contactInUSA':
      return ['Familiar', 'Amigo'].includes(value) ? 100 : 70;

    // ==== Información Familiar ==== 
    case 'spouseName':
      return value ? 100 : 0;
    case 'hasChildren':
      return value === 'Sí' ? 90 : 80;

    // ==== Experiencia Laboral ==== 
    case 'employed':
      return value === 'Empleado' ? 100 : 70;

    // ==== Información Migratoria ==== 
    case 'hasPetition':
      return value === 'Sí' ? 50 : 100;
    case 'hasPreviousVisa':
      return value === 'Sí' ? 100 : 80;
    case 'visaDenied':
      return value === 'Sí' ? 30 : 100;
    case 'hasTravelHistory':
      return value === 'Sí' ? 100 : 80;

    // ==== Default: valor medio ====
    default:
      return 80;
  }
}

/**
 * Calcula la edad a partir de la fecha de nacimiento
 */
function calculateAge(birth: Date): number {
  const diffMs = Date.now() - birth.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
}
