// src/utils/scoreCalculator.ts
import { sections, Question } from '../components/Termometro/Sections';

export type FormData = Record<string, string>;

export function calculateVisaScore(form: FormData): number {
  let totalWeight = 0;
  let weightedScore = 0;

  sections.forEach(section => {
    section.questions.forEach((q: Question) => {
      if (q.condition && !q.condition(form)) return;
      const answer = form[q.id];
      const score = mapAnswerToScore(q.id, answer, form);
      totalWeight += q.weight;
      weightedScore += score * q.weight;
    });
  });

  const average = totalWeight ? weightedScore / totalWeight : 0;
  return Math.round(average);
}

export function calculateSectionScores(form: FormData): { title: string; score: number }[] {
  return sections
    .filter(section => section.questions.length > 0)
    .map(section => {
      let totalWeight = 0;
      let weightedScore = 0;
      section.questions.forEach((q: Question) => {
        if (q.condition && !q.condition(form)) return;
        const answer = form[q.id];
        if (!answer) return;
        const score = mapAnswerToScore(q.id, answer, form);
        totalWeight += q.weight;
        weightedScore += score * q.weight;
      });
      const score = totalWeight ? Math.round(weightedScore / totalWeight) : 0;
      return { title: section.title, score };
    })
    .filter(s => s.score > 0);
}

function mapAnswerToScore(id: string, value: string, form: FormData): number {
  switch (id) {
    case 'birth': {
      const age = calculateAge(new Date(value));
      if (age < 25) return 60;
      if (age < 40) return 80;
      return 70;
    }
    case 'estadocivil':
      if (value === 'Casado/a') return 100;
      if (value === 'Unión Libre') return 85;
      return 75;
    case 'nationality':
      return 70;
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
    case 'wife':
      return value ? 100 : 0;
    case 'son':
      return value === 'Si' ? 90 : 80;
    case 'home':
      return value === 'Si' ? 90 : 75;
    case 'vehicle':
      return value === 'Si' ? 85 : 80;
    case 'employed':
      if (value === 'Empleado') return 100;
      if (value === 'Independiente') return 80;
      return 50;
    case 'legalCompany':
      return value === 'Si' ? 90 : 70;
    case 'passport':
      return value === 'Si' ? 100 : 30;
    case 'hasPetition':
      return value === 'Si' ? 50 : 100;
    case 'hasPreviousVisa':
      return value === 'Si' ? 100 : 80;
    case 'visaDenied':
      return value === 'Si' ? 30 : 100;
    case 'hasTravelHistory':
      return value === 'Si' ? 100 : 80;
    case 'hasBeenArrested':
      return value === 'Si' ? 10 : 100;
    case 'deported':
      return value === 'Si' ? 10 : 100;
    case 'militaryService':
      return value === 'Si' ? 90 : 80;
    case 'lastStudie': {
      const eduScores: Record<string, number> = {
        'Ninguno': 40, 'Primaria': 50, 'Secundaria': 60,
        'Técnico': 75, 'Universidad': 90, 'Maestría': 95, 'Doctorado': 100,
      };
      return eduScores[value] ?? 70;
    }
    case 'Bank':
      return value === 'Si' ? 90 : 50;
    case 'ammountBank':
    case 'liquidnetworth':
    case 'totalnetworth': {
      const wealthScores: Record<string, number> = {
        '0-20,000': 40, '20,001-50,000': 65, '50,001-100,000': 85, '+100,000': 100,
      };
      return wealthScores[value] ?? 70;
    }
    case 'hasinvestments':
      return value === 'Si' ? 90 : 70;
    case 'ilegalactivities':
      return value === 'Si' ? 5 : 100;
    case 'relationPEP':
      return value === 'Si' ? 70 : 90;
    default:
      return 80;
  }
}

function calculateAge(birth: Date): number {
  const diffMs = Date.now() - birth.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
}
