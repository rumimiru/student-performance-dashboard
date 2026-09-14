import {
    calculateFinalGrade,
    getAcademicStatus,
    getPerformanceRemark,
    calculateClassAverage,
    countPassingStudents,
    getTopStudent
} from "./gradeUtils.js";

export function displayStudents(students) {
    const studentList = document.getElementById("studentList");

    studentList.innerHTML = "";

    if (students.length === 0) {
        displayMessage("No students found");
        return;
    }

    students.forEach(student => {
        const { id, name, block, quiz, lab, exam } = student;

        const finalGrade = calculateFinalGrade(student);
        const academicStatus = getAcademicStatus(finalGrade);
        const performanceRemark = getPerformanceRemark(finalGrade);

        const card = document.createElement("article");
        card.className = "student-card";

        card.innerHTML = `
            <div class="student-header">
                <h3>${name}</h3>
                <span class="student-id">ID: ${id}</span>
            </div>

            <p><strong>Block:</strong> ${block}</p>

            <div class="scores">
                <div>
                    <span>Quiz</span>
                    <strong>${quiz}</strong>
                </div>

                <div>
                    <span>Laboratory</span>
                    <strong>${lab}</strong>
                </div>

                <div>
                    <span>Exam</span>
                    <strong>${exam}</strong>
                </div>
            </div>

            <div class="result">
                <p>
                    <strong>Final Grade:</strong>
                    ${finalGrade.toFixed(2)}
                </p>

                <p>
                    <strong>Academic Status:</strong>
                    ${academicStatus}
                </p>

                <p>
                    <strong>Performance Remark:</strong>
                    ${performanceRemark}
                </p>
            </div>
        `;

        studentList.appendChild(card);
    });

    displayMessage("");
}

export function displaySummary(students) {
    const classAverage = calculateClassAverage(students);
    const passingCount = countPassingStudents(students);
    const displayedCount = students.length;
    const topStudent = getTopStudent(students);

    document.getElementById("classAverage").textContent =
        classAverage.toFixed(2);

    document.getElementById("passingCount").textContent =
        passingCount;

    document.getElementById("displayedCount").textContent =
        displayedCount;

    document.getElementById("topStudent").textContent =
        topStudent
            ? `${topStudent.name} (${calculateFinalGrade(topStudent).toFixed(2)})`
            : "None";
}

export function displayMessage(message) {
    const messageArea = document.getElementById("messageArea");

    messageArea.textContent = message;
}