const studentNameInput = document.getElementById('add-student-name');
const addStudentBtn = document.getElementById('add-student-btn');
const gradesTableContainer = document.querySelector('.grades-table-container');

studentNameInput.addEventListener('keyup', addNewStudent);
addStudentBtn.addEventListener('click', addNewStudent);

let selectedStudent;

const students = [
	{
		id: '1',
		name: 'Ion Popescu',
		medieNote: 8.5,
		note: [9, 8, 7, 9, 8],
	},
	{
		id: '2',
		name: 'Elena Ionescu',
		medieNote: 9.2,
		note: [10, 9, 9, 8, 9],
	},
	{
		id: '3',
		name: 'Andrei Georgescu',
		medieNote: 7.8,
		note: [8, 7, 6, 8, 9],
	},
	{
		id: '4',
		name: 'Maria Dumitrescu',
		medieNote: 8.0,
		note: [7, 8, 8, 9, 6],
	},
	{
		id: '5',
		name: 'Cristina Moldovan',
		medieNote: 9.7,
		note: [10, 10, 9, 9, 9],
	},
];

window.addEventListener('load', addStudentsToTable);

function addNewStudent(e) {
	if (e.key === 'Enter' || e.target.id == 'add-student-btn') {
		const name = studentNameInput.value;
		students.push({ name: name, medieNote: 0, note: [] });
		addStudentsToTable();
	}
}

function addStudentsToTable() {
	document.getElementById('students-table-body').innerHTML = students
		.map(
			(student) => `
      <tr>
         <td>${student.name}</td>
         <td>${student.medieNote}</td>
         <td><button id=${student.id} class="show-grades">Vezi/Adauga note</button></td>
         <td><button  class="delete-student">X</button></td>
      </tr>
   `
		)
		.join('');
}

const sortAscByNameBtn = document.getElementById('sort-name-asc');
const sortDescByNameBtn = document.getElementById('sort-name-desc');

sortAscByNameBtn.addEventListener('click', sortStudentsByNameAsc);
sortDescByNameBtn.addEventListener('click', sortStudentsByNameDesc);

function sortStudentsByNameAsc() {
	students.sort((student1, student2) =>
		student1.name.localeCompare(student2.name)
	);
	addStudentsToTable();
}

function sortStudentsByNameDesc() {
	students.sort((student1, student2) =>
		student2.name.localeCompare(student1.name)
	);
	addStudentsToTable();
}

const sortAscByMedieBtn = document.getElementById('sort-medie-asc');
const sortDescByMedieBtn = document.getElementById('sort-medie-desc');

sortAscByMedieBtn.addEventListener('click', sortStudentsByMedieAsc);
sortDescByMedieBtn.addEventListener('click', sortStudentsByMedieDesc);

function sortStudentsByMedieAsc() {
	students.sort(
		(student1, student2) => student1.medieNote - student2.medieNote
	);
	console.log(students);
	addStudentsToTable();
}

function sortStudentsByMedieDesc() {
	students.sort(
		(student1, student2) => student2.medieNote - student1.medieNote
	);
	addStudentsToTable();
}

const studentsTableBody = document.getElementById('students-table-body');
const gradesTableBody = document.getElementById('grades-table');

studentsTableBody.addEventListener('click', handleStudentsActions);
gradesTableBody.addEventListener('click', handleGradesActions);

function handleStudentsActions(e) {
	if (e.target.classList.contains('delete-student')) {
		e.target.parentNode.parentNode.remove();
	} else if (e.target.classList.contains('show-grades')) {
		const buttonId = e.target.id;
		gradesTableContainer.classList.remove('hide-grades');

		selectedStudent = students.find((student) => buttonId === student.id);
		gradesTableBody.innerHTML = selectedStudent.note
			.map(
				(grade, index) =>
					`
			<tr>
				<td>${grade}</td>
				<td>
					<button id=${index} class="delete-grade">X</button>
				</td>
			</tr>
			`
			)
			.join('');

		console.log(selectedStudent);
	}
}

function handleGradesActions(e) {
	if (e.target.classList.contains('delete-grade')) {
		const gradeIndex = Number(e.target.id);
		console.log('grade index = ', gradeIndex);
		selectedStudent.note.splice(gradeIndex, 1);
		console.log(selectedStudent.note);
		gradesTableBody.innerHTML = selectedStudent.note
			.map(
				(grade, index) =>
					`
		<tr>
			<td>${grade}</td>
			<td>
				<button id=${index} class="delete-grade">X</button>
			</td>
		</tr>
		`
			)
			.join('');
	}
}

const gradeInput = document.getElementById('grade-input');
const addGradeBtn = document.getElementById('add-grade-btn');

addGradeBtn.addEventListener('click', addGrade);

function addGrade() {
	const grade = Number(gradeInput.value);
	selectedStudent.note.push(grade);
	gradesTableBody.innerHTML = selectedStudent.note
		.map(
			(grade, index) =>
				`
			<tr>
				<td>${grade}</td>
				<td>
					<button id=${index} class="delete-grade">X</button>
				</td>
			</tr>
			`
		)
		.join('');
}

const hideGradesBtn = document.getElementById('hide-grades');
hideGradesBtn.addEventListener('click', hideGradesContainer);

function hideGradesContainer() {
	gradesTableContainer.classList.add('hide-grades');
}
