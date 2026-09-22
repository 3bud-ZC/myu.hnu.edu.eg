import { CourseRecord, TermRecord, TranscriptSummary } from '../types/transcript';

export const GPA_SCALE_RULES = [
  { grade: 'A', minMark: 90, maxMark: 100, points: 4.00, description: 'Excellent' },
  { grade: 'A-', minMark: 85, maxMark: 89, points: 3.70, description: 'Very Good' },
  { grade: 'B+', minMark: 80, maxMark: 84, points: 3.30, description: 'Very Good' },
  { grade: 'B', minMark: 75, maxMark: 79, points: 3.00, description: 'Good' },
  { grade: 'B-', minMark: 70, maxMark: 74, points: 2.70, description: 'Good' },
  { grade: 'C+', minMark: 65, maxMark: 69, points: 2.30, description: 'Satisfactory' },
  { grade: 'C', minMark: 60, maxMark: 64, points: 2.00, description: 'Pass' },
  { grade: 'D', minMark: 50, maxMark: 59, points: 1.00, description: 'Conditional Pass' },
  { grade: 'F', minMark: 0, maxMark: 49, points: 0.00, description: 'Fail' },
];

export const ACADEMIC_LEVELS = [
  { level: 1, name: 'First Year (Freshman)', creditHours: '0 - 33 hours' },
  { level: 2, name: 'Second Year (Sophomore)', creditHours: '34 - 67 hours' },
  { level: 3, name: 'Third Year (Junior)', creditHours: '68 - 101 hours' },
  { level: 4, name: 'Fourth Year (Senior)', creditHours: '102+ hours' },
];

export const DEMO_TERMS: TermRecord[] = [
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
        marks: 75.0,
        grade: 'B',
        points: 3.0,
        status: 'Pass',
      },
      {
        code: 'THS115',
        name: 'Electronic circuits & devices',
        creditHours: 3,
        marks: 68.0,
        grade: 'C+',
        points: 2.3,
        status: 'Pass',
      },
      {
        code: 'THS116',
        name: 'General anatomy & histology for technologists',
        creditHours: 3,
        marks: 72.0,
        grade: 'B-',
        points: 2.4, // 2.4 * 3 = 7.2 quality points
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
    ],
  },
  {
    id: 'term-fall-2025',
    term: 'FALL',
    year: '2025 / 2026',
    status: 'Posted',
    courses: [
      {
        code: 'ENG101',
        name: 'English for Medical Purposes',
        creditHours: 2,
        marks: 82.0,
        grade: 'B+',
        points: 3.3, // 6.6 quality points
        status: 'Pass',
      },
      {
        code: 'COMP101',
        name: 'Computer Applications in Healthcare',
        creditHours: 2,
        marks: 77.0,
        grade: 'B',
        points: 3.0, // 6.0 quality points
        status: 'Pass',
      },
      {
        code: 'BIO101',
        name: 'Introduction to Health Technologies',
        creditHours: 2,
        marks: 78.0,
        grade: 'B',
        points: 3.0, // 6.0 quality points
        status: 'Pass',
      },
    ],
  },
];

/**
 * Calculates GPA and summaries strictly from the local course data.
 */
export function calculateAcademicSummary(terms: TermRecord[]): {
  summary: TranscriptSummary;
  termStats: Record<string, { termGpa: number; earnedHours: number; attemptedHours: number }>;
} {
  let totalQualityPoints = 0;
  let totalAttemptedGpaHours = 0;
  let totalEarnedHours = 0;

  const termStats: Record<string, { termGpa: number; earnedHours: number; attemptedHours: number }> = {};

  terms.forEach((term) => {
    if (term.status !== 'Posted' || term.courses.length === 0) {
      termStats[term.id] = { termGpa: 0, earnedHours: 0, attemptedHours: 0 };
      return;
    }

    let termQP = 0;
    let termAttempted = 0;
    let termEarned = 0;

    term.courses.forEach((c) => {
      termAttempted += c.creditHours;
      const pts = c.points ?? 0;
      termQP += pts * c.creditHours;

      if (c.status === 'Pass') {
        termEarned += c.creditHours;
      }
    });

    const termGpa = termAttempted > 0 ? Number((termQP / termAttempted).toFixed(2)) : 0;
    termStats[term.id] = {
      termGpa,
      earnedHours: termEarned,
      attemptedHours: termAttempted,
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
      cumulativeGpa, // Target ~2.10 (35.7 / 17 = 2.10)
      gradeLetter,
      earnedHours: totalEarnedHours, // 13 hrs (6 from Fall + 7 from Spring)
      attemptedHours: totalAttemptedGpaHours, // 17 hrs
      level,
      totalQualityPoints,
    },
    termStats,
  };
}

export const ACADEMIC_DATA = calculateAcademicSummary(DEMO_TERMS);
