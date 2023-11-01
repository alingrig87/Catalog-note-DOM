import { students } from './data/students.js';
import {
	addStudentRowsToTable,
	addNewRowToStudentsTable,
	sortStudents,
	updateGradesTable,
} from './utils.js';

const studentNameInput = document.getElementById('add-student-name');
const addStudentBtn = document.getElementById('add-student-btn');
const gradesTableContainer = document.querySelector('.grades-table-container');
const studentTableBody = document.getElementById('students-table-body');

studentNameInput.addEventListener('keyup', addNewStudent);
addStudentBtn.addEventListener('click', addNewStudent);

let selectedStudent;

window.addEventListener('load', () =>
	addStudentRowsToTable(students, studentTableBody)
);

// BUG - Adding grades to new students(added from input) doesn't work
function addNewStudent(e) {
	if (e.key === 'Enter' || e.target.id == 'add-student-btn') {
		const student = { name: studentNameInput.value, medieNote: 0, note: [] };
		addNewRowToStudentsTable(student, studentTableBody);
	}
}

const sortAscByNameBtn = document.getElementById('sort-name-asc');
const sortDescByNameBtn = document.getElementById('sort-name-desc');

sortAscByNameBtn.addEventListener('click', () =>
	sortStudents(students, 'ASC', 'name', studentTableBody)
);
sortDescByNameBtn.addEventListener('click', () =>
	sortStudents(students, 'DESC', 'name', studentTableBody)
);

const sortAscByMedieBtn = document.getElementById('sort-medie-asc');
const sortDescByMedieBtn = document.getElementById('sort-medie-desc');

sortAscByMedieBtn.addEventListener('click', () =>
	sortStudents(students, 'ASC', 'medieNote', studentTableBody)
);
sortDescByMedieBtn.addEventListener('click', () =>
	sortStudents(students, 'DESC', 'medieNote', studentTableBody)
);

const studentsTableBody = document.getElementById('students-table-body');
const gradesTableBody = document.getElementById('grades-table');

studentsTableBody.addEventListener('click', handleStudentsActions);
gradesTableBody.addEventListener('click', handleGradesActions);

function handleStudentsActions(e) {
	if (e.target.classList.contains('delete-student')) {
		e.target.parentNode.parentNode.remove();
		// TO REMOVE STUDENT FROM ARRAY
	} else if (e.target.classList.contains('show-grades')) {
		const buttonId = e.target.id;
		gradesTableContainer.classList.remove('hide-grades');

		selectedStudent = students.find((student) => buttonId === student.id);
		updateGradesTable(selectedStudent, gradesTableBody);
	}
}

function handleGradesActions(e) {
	if (e.target.classList.contains('delete-grade')) {
		const gradeIndex = Number(e.target.id);
		selectedStudent.note.splice(gradeIndex, 1);
		// calculate and update students table
		updateGradesTable(selectedStudent, gradesTableBody);
	}
}

const gradeInput = document.getElementById('grade-input');
const addGradeBtn = document.getElementById('add-grade-btn');

addGradeBtn.addEventListener('click', addGrade);

function addGrade() {
	const grade = Number(gradeInput.value);
	selectedStudent.note.push(grade);
	// calculateAverage
	// selectedStudent.medieNote =
	updateGradesTable(selectedStudent, gradesTableBody);
}

const hideGradesBtn = document.getElementById('hide-grades');
hideGradesBtn.addEventListener('click', hideGradesContainer);

function hideGradesContainer() {
	gradesTableContainer.classList.add('hide-grades');
}
