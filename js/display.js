// display.js
// Display module: responsible only for putting data on the page.
// No data comes from here and no filtering/searching decisions are made here.

import {
  calculateFinalGrade,
  getAcademicStatus,
  getPerformanceRemark,
  calculateClassAverage,
  countPassingStudents,
  getTopStudent
} from "./gradeUtils.js";

const studentListEl = document.getElementById("studentList");
const classAverageEl = document.getElementById("classAverage");
const passingCountEl = document.getElementById("passingCount");
const displayedCountEl = document.getElementById("displayedCount");
const topStudentEl = document.getElementById("topStudent");
const messageAreaEl = document.getElementById("messageArea");

const STATUS_CLASS_MAP = {
  Excellent: "status-excellent",
  Passed: "status-passed",
  "Needs Improvement": "status-needs-improvement",
  Failed: "status-failed"
};

/**
 * Render one student-card per supplied student. Shows "No students found"
 * when the result set is empty.
 */
export function displayStudents(students) {
  studentListEl.innerHTML = "";

  if (students.length === 0) {
    displayMessage("No students found");
    return;
  }

  displayMessage("");

  students.forEach((student) => {
    const { id, name, block, quiz, lab, exam } = student;
    const finalGrade = calculateFinalGrade(student);
    const status = getAcademicStatus(finalGrade);
    const remark = getPerformanceRemark(finalGrade);
    const statusClass = STATUS_CLASS_MAP[status] || "";

    const card = document.createElement("article");
    card.className = `student-card ${statusClass}`;
    card.dataset.studentId = id;

    card.innerHTML = `
      <header class="student-card__header">
        <h3 class="student-card__name">${name}</h3>
        <span class="student-card__block">${block}</span>
      </header>
      <dl class="student-card__scores">
        <div><dt>Quiz</dt><dd>${quiz}</dd></div>
        <div><dt>Lab</dt><dd>${lab}</dd></div>
        <div><dt>Exam</dt><dd>${exam}</dd></div>
      </dl>
      <div class="student-card__grade">
        <span class="student-card__grade-value">${finalGrade.toFixed(2)}</span>
        <span class="student-card__grade-label">Final Grade</span>
      </div>
      <div class="student-card__tags">
        <span class="tag tag--status">${status}</span>
        <span class="tag tag--remark">${remark}</span>
      </div>
    `;

    studentListEl.appendChild(card);
  });
}

/**
 * Update the class average, passing count, displayed count, and top student
 * name based on the currently displayed result set.
 */
export function displaySummary(students) {
  const average = calculateClassAverage(students);
  const passingCount = countPassingStudents(students);
  const topStudent = getTopStudent(students);

  classAverageEl.textContent = average.toFixed(2);
  passingCountEl.textContent = passingCount;
  displayedCountEl.textContent = students.length;
  topStudentEl.textContent = topStudent ? topStudent.name : "—";
}

/**
 * Show a message in the message area. An empty string clears it.
 */
export function displayMessage(message) {
  messageAreaEl.textContent = message;
}
