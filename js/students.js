// students.js
// Data module: holds the raw student records used throughout the dashboard.
// This module owns the data only — no calculations or DOM work happen here.

export const students = [
  { id: 1, name: "Cliford Carlos", block: "31-ITE-01", quiz: 88, lab: 92, exam: 85 },
  { id: 2, name: "Jiroh Dancel", block: "31-ITE-01", quiz: 74, lab: 80, exam: 77 },
  { id: 3, name: "Russel Jims", block: "31-ITE-02", quiz: 95, lab: 94, exam: 96 },
  { id: 4, name: "Cyrus Petila", block: "31-ITE-02", quiz: 68, lab: 72, exam: 70 },
  { id: 5, name: "John Kai Ocuhma", block: "31-ITE-03", quiz: 82, lab: 87, exam: 84 },
  { id: 6, name: "Angelica Toolagan", block: "31-ITE-03", quiz: 59, lab: 65, exam: 61 }
];

// Grade weights used by gradeUtils.js. Exported here so there is a single
// source of truth for the weighting scheme.
export const GRADE_WEIGHTS = {
  quiz: 0.25,
  lab: 0.35,
  exam: 0.4
};
