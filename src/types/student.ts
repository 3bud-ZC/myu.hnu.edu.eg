export interface StudentProfile {
  id: string;
  username: string;
  fullNameArabic: string;
  initials: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nationalIdMasked: string;
  gender: string;
  email: string;
  phone: string;
  schoolId: string;
  schoolName: string;
  gradeId: string;
  academicYear: string;
  lastLogin: string;
  lastSynced: string;
}

export interface AuthUser {
  studentId: string;
  username: string;
  fullNameArabic: string;
  isAuthenticated: boolean;
}
