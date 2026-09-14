// gradeUtils.js
// Utility module: pure functions for calculating grades, classifying
// students, and searching/filtering/aggregating student arrays.
// Nothing in this file touches the DOM.

import { GRADE_WEIGHTS } from "./students.js";

/**
 * Calculate a student's weighted final grade.
 * Quiz 25%, Laboratory 35%, Prelim Exam 40%.
 * Uses object destructuring to pull the three scores off the student.
 */
export function calculateFinalGrade(student) {
  const { quiz, lab, exam } = student;
  return quiz * GRADE_WEIGHTS.quiz + lab * GRADE_WEIGHTS.lab + exam * GRADE_WEIGHTS.exam;
}

/**
 * Classify a numeric grade into an academic status band.
 */
export function getAcademicStatus(grade) {
  if (grade >= 90) {
    return "Excellent";
  } else if (grade >= 75) {
    return "Passed";
  } else if (grade >= 70) {
    return "Needs Improvement";
  } else {
    return "Failed";
  }
}

/**
 * Classify a numeric grade into a performance remark band.
 * Implemented with a switch(true) structure as required by the exam spec.
 */
export function getPerformanceRemark(grade) {
  switch (true) {
    case grade >= 90:
      return "Outstanding";
    case grade >= 85:
      return "Very Good";
    case grade >= 80:
      return "Good";
    case grade >= 75:
      return "Satisfactory";
    default:
      return "Unsatisfactory";
  }
}

/**
 * Return students whose name contains the query (case-insensitive).
 */
export function searchStudents(students, query) {
  const normalizedQuery = query.trim().toLowerCase();
  return students.filter((student) => student.name.toLowerCase().includes(normalizedQuery));
}

/**
 * Return all students when block is "All"; otherwise only students in that block.
 */
export function filterStudentsByBlock(students, block) {
  if (block === "All") {
    return students;
  }
  return students.filter((student) => student.block === block);
}

/**
 * Return all students when status is "All"; otherwise only students whose
 * computed academic status matches the selected status.
 */
export function filterStudentsByStatus(students, status) {
  if (status === "All") {
    return students;
  }
  return students.filter((student) => getAcademicStatus(calculateFinalGrade(student)) === status);
}

/**
 * Return the numeric average of the computed final grades of the supplied array.
 * Returns 0 for an empty array. Uses reduce() to aggregate.
 */
export function calculateClassAverage(students) {
  if (students.length === 0) {
    return 0;
  }
  const total = students.reduce((sum, student) => sum + calculateFinalGrade(student), 0);
  return total / students.length;
}

/**
 * Return the number of students with a final grade of 75 or higher.
 */
export function countPassingStudents(students) {
  return students.filter((student) => calculateFinalGrade(student) >= 75).length;
}

/**
 * Return the student object with the highest computed final grade.
 * Returns null for an empty array.
 */
export function getTopStudent(students) {
  if (students.length === 0) {
    return null;
  }
  return students.reduce((topStudent, currentStudent) => {
    return calculateFinalGrade(currentStudent) > calculateFinalGrade(topStudent) ? currentStudent : topStudent;
  });
}
