const studentNameInput = document.getElementById('add-student-name');
const addStudentBtn = document.getElementById('add-student-btn');

studentNameInput.addEventListener('keyup', addNewStudent);
addStudentBtn.addEventListener('click', addNewStudent);

const students = [
	{
		name: 'Ion Popescu',
		medieNote: 8.5,
		note: [9, 8, 7, 9, 8],
	},
	{
		name: 'Elena Ionescu',
		medieNote: 9.2,
		note: [10, 9, 9, 8, 9],
	},
	{
		name: 'Andrei Georgescu',
		medieNote: 7.8,
		note: [8, 7, 6, 8, 9],
	},
	{
		name: 'Maria Dumitrescu',
		medieNote: 8.0,
		note: [7, 8, 8, 9, 6],
	},
	{
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
         <td><button>Vezi/Adauga note</button></td>
         <td><button>X</button></td>
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
