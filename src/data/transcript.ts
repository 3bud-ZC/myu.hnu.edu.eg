import { CourseRecord, TermRecord, TranscriptSummary } from '../types/transcript';

export const GPA_SCALE_RULES = [
  { grade: 'A', minMark: 90, maxMark: 100, points: 4.00, description: 'Excellent' },
  { grade: 'A-', minMark: 85, maxMark: 89, points: 3.70, description: 'Very Good' },
  { grade: 'B+', minMark: 80, maxMark: 84, points: 3.30, description: 'Very Good' },
  { grade: 'B', minMark: 75, maxMark: 79, points: 3.00, description: 'Good' },
  { grade: 'B-', minMark: 70, maxMark: 74, points: 2.70, description: 'Good' },
  { grade: 'C+', minMark: 65, maxMark: 69, points: 2.80, description: 'Satisfactory' },
  { grade: 'C', minMark: 60, maxMark: 64, points: 2.00, description: 'Pass' },
  { grade: 'D', minMark: 50, maxMark: 59, points: 2.00, description: 'Conditional Pass' },
  { grade: 'F', minMark: 0, maxMark: 49, points: 0.00, description: 'Fail' },
];

export const ACADEMIC_LEVELS = [
  { level: 1, name: 'First Year (Freshman)', creditHours: '0 - 33 hours' },
  { level: 2, name: 'Second Year (Sophomore)', creditHours: '34 - 67 hours' },
  { level: 3, name: 'Third Year (Junior)', creditHours: '68 - 101 hours' },
  { level: 4, name: 'Fourth Year (Senior)', creditHours: '102+ hours' },
];

export const STUDENT_TERMS: TermRecord[] = [
  {
    id: 'term-fall-2026',
    term: 'FALL',
    year: '2026 / 2027',
    status: 'Grades Not Posted',
    courses: [],
  },
  {
    id: 'term-spring-2025',
    term: 'SPRING',
    year: '2025 / 2026',
    status: 'Posted',
    courses: [
      {
        code: 'THS1110',
        name: 'Professional ethics',
        creditHours: 1,
        marks: 88.0,
        grade: 'A-',
        points: 3.70,
        status: 'Pass',
      },
      {
        code: 'THS115',
        name: 'Electronic circuits & devices',
        creditHours: 3,
        marks: 85.0,
        grade: 'A-',
        points: 3.70,
        status: 'Pass',
      },
      {
        code: 'THS116',
        name: 'General anatomy & histology for technologists',
        creditHours: 3,
        marks: 84.0,
        grade: 'B+',
        points: 3.30,
        status: 'Pass',
      },
      {
        code: 'THS117',
        name: 'General physiology for technologists',
        creditHours: 2,
        marks: 40.0,
        grade: 'F',
        points: 0.0,
        status: 'Fail',
      },
      {
        code: 'THS118',
        name: 'General Microbiology',
        creditHours: 2,
        marks: 58.0,
        grade: 'F',
        points: 0.0,
        status: 'Fail',
      },
      {
        code: 'THS119',
        name: 'General Chemistry',
        creditHours: 2,
        marks: 86.0,
        grade: 'A-',
        points: 3.70,
        status: 'Pass',
      },
      {
        code: 'UN114',
        name: 'Academic reading & writing (2)',
        creditHours: 2,
        marks: 87.0,
        grade: 'A-',
        points: 3.70,
        status: 'Pass',
      },
      {
        code: 'UN30',
        name: 'Social Issues',
        creditHours: 2,
        marks: 85.0,
        grade: 'A-',
        points: 3.65,
        status: 'Pass',
      },
    ],
  },
  {
    id: 'term-fall-2025',
    term: 'FALL',
    year: '2025 / 2026',
    status: 'Posted',
    courses: [
      {
        code: 'THS101',
        name: 'Basic physics',
        creditHours: 2,
        marks: 51.0,
        grade: 'F',
        points: 0.0,
        status: 'Fail',
      },
      {
        code: 'THS102',
        name: 'Mathematics',
        creditHours: 2,
        marks: null,
        grade: 'FW',
        points: 0.0,
        status: 'Fail',
        notes: 'أقل من 30 (18.75%) Written: رسوب جزئي',
      },
      {
        code: 'THS103',
        name: 'Introduction to electrical engineering',
        creditHours: 3,
        marks: 110.0,
        grade: 'C+',
        points: 2.80,
        status: 'Pass',
      },
      {
        code: 'THS104',
        name: 'Mechanics',
        creditHours: 2,
        marks: 44.0,
        grade: 'F',
        points: 0.0,
        status: 'Fail',
      },
      {
        code: 'UN101',
        name: 'Academic reading & writing (1)',
        creditHours: 2,
        marks: 58.0,
        grade: 'D',
        points: 2.00,
        status: 'Pass',
      },
      {
        code: 'UN102',
        name: 'Computer skills',
        creditHours: 2,
        marks: 59.0,
        grade: 'D',
        points: 2.00,
        status: 'Pass',
      },
      {
        code: 'UN103',
        name: 'Critical thinking',
        creditHours: 2,
        marks: 60.0,
        grade: 'D',
        points: 2.00,
        status: 'Pass',
      },
    ],
  },
];

export const DEMO_TERMS = STUDENT_TERMS;

export interface TermStatistics {
  termGpa: number;
  earnedHours: number;
  attemptedHours: number;
  qualityPoints: number;
  cumulativeGpaAtTerm: number;
  cumulativeEarnedAtTerm: number;
}

/**
 * Calculates GPA and summaries strictly from the local course data.
 */
export function calculateAcademicSummary(terms: TermRecord[]): {
  summary: TranscriptSummary;
  termStats: Record<string, TermStatistics>;
} {
  let totalQualityPoints = 0;
  let totalAttemptedGpaHours = 0;
  let totalEarnedHours = 0;

  const termStats: Record<string, TermStatistics> = {};

  // Compute from chronological order: Fall 2025 -> Spring 2025 -> Fall 2026
  const chronological = [...terms].reverse();
  let runningQP = 0;
  let runningAttempted = 0;
  let runningEarned = 0;

  chronological.forEach((term) => {
    if (term.status !== 'Posted' || term.courses.length === 0) {
      termStats[term.id] = {
        termGpa: 0,
        earnedHours: 0,
        attemptedHours: 0,
        qualityPoints: 0,
        cumulativeGpaAtTerm: runningAttempted > 0 ? Number((runningQP / runningAttempted).toFixed(2)) : 0,
        cumulativeEarnedAtTerm: runningEarned,
      };
      return;
    }

    let termQP = 0;
    let termAttempted = 0;
    let termEarned = 0;

    term.courses.forEach((c) => {
      termAttempted += c.creditHours;
      const pts = c.points ?? 0;
      if (c.status === 'Pass') {
        termQP += pts * c.creditHours;
        termEarned += c.creditHours;
      }
    });

    const termGpa = termAttempted > 0 ? Number((termQP / termAttempted).toFixed(2)) : 0;

    runningQP += termQP;
    runningAttempted += termAttempted;
    runningEarned += termEarned;

    termStats[term.id] = {
      termGpa,
      earnedHours: termEarned,
      attemptedHours: termAttempted,
      qualityPoints: Number(termQP.toFixed(2)),
      cumulativeGpaAtTerm: Number((runningQP / runningAttempted).toFixed(2)),
      cumulativeEarnedAtTerm: runningEarned,
    };

    totalQualityPoints += termQP;
    totalAttemptedGpaHours += termAttempted;
    totalEarnedHours += termEarned;
  });

  const cumulativeGpa =
    totalAttemptedGpaHours > 0
      ? Number((totalQualityPoints / totalAttemptedGpaHours).toFixed(2))
      : 0;

  // Grade mapping
  let gradeLetter = 'F';
  if (cumulativeGpa >= 3.7) gradeLetter = 'A';
  else if (cumulativeGpa >= 3.0) gradeLetter = 'B';
  else if (cumulativeGpa >= 2.0) gradeLetter = 'C';
  else if (cumulativeGpa >= 1.0) gradeLetter = 'D';

  // Academic level (Level 1: 0-33 hrs, Level 2: 34-67 hrs)
  let level = 1;
  if (totalEarnedHours >= 102) level = 4;
  else if (totalEarnedHours >= 68) level = 3;
  else if (totalEarnedHours >= 34) level = 2;
  else level = 1;

  return {
    summary: {
      cumulativeGpa,
      gradeLetter,
      earnedHours: totalEarnedHours,
      attemptedHours: totalAttemptedGpaHours,
      level,
      totalQualityPoints: Number(totalQualityPoints.toFixed(2)),
    },
    termStats,
  };
}

export const ACADEMIC_DATA = calculateAcademicSummary(STUDENT_TERMS);
