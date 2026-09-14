// main.js
// Entry point: wires the data module, grade utilities, and display module
// to the page's controls. Owns all event listeners.

import { students } from "./students.js";
import { searchStudents, filterStudentsByBlock, filterStudentsByStatus } from "./gradeUtils.js";
import { displayStudents, displaySummary } from "./display.js";

const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

/**
 * Read the three controls, apply search + block filter + status filter
 * together, and return the resulting student array.
 */
function getFilteredResults() {
  const query = searchInput.value;
  const block = blockFilter.value;
  const status = statusFilter.value;

  const searched = searchStudents(students, query);
  const byBlock = filterStudentsByBlock(searched, block);
  const byStatus = filterStudentsByStatus(byBlock, status);

  return byStatus;
}

/**
 * Recompute the current result set from the controls and refresh the UI.
 */
function renderCurrentResults() {
  const results = getFilteredResults();
  displayStudents(results);
  displaySummary(results);
}

function handleApply() {
  renderCurrentResults();
}

function handleReset() {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";
  displayStudents(students);
  displaySummary(students);
}

applyBtn.addEventListener("click", handleApply);
resetBtn.addEventListener("click", handleReset);
searchInput.addEventListener("input", renderCurrentResults);
blockFilter.addEventListener("change", renderCurrentResults);
statusFilter.addEventListener("change", renderCurrentResults);

// Initial render: show all six records and the initial summary immediately.
displayStudents(students);
displaySummary(students);
