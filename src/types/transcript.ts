export interface CourseRecord {
  code: string;
  name: string;
  creditHours: number;
  marks: number | null;
  grade: string;
  points: number | null; // Grade points per credit hour (0.0 to 4.0) or null if fail/withdrawn
  status: 'Pass' | 'Fail';
  notes?: string;
}

export interface TermRecord {
  id: string;
  term: 'FALL' | 'SPRING' | 'SUMMER';
  year: string;
  status: 'Posted' | 'Grades Not Posted';
  courses: CourseRecord[];
}

export interface TranscriptSummary {
  cumulativeGpa: number;
  gradeLetter: string;
  earnedHours: number;
  attemptedHours: number;
  level: number;
  totalQualityPoints: number;
}
