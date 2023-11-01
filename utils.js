export function addStudentRowsToTable(students, tableBodyElement) {
	tableBodyElement.innerHTML = students
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

export function addNewRowToStudentsTable(student, tableBodyElement) {
	tableBodyElement.innerHTML += `
      <tr>
         <td>${student.name}</td>
         <td>${student.medieNote}</td>
         <td><button id=${student.id} class="show-grades">Vezi/Adauga note</button></td>
         <td><button  class="delete-student">X</button></td>
      </tr>
   `;
}

export function sortStudents(students, sortingOrder, by, tableBodyElement) {
	if (sortingOrder === 'ASC') {
		students.sort((student1, student2) => {
			if (typeof student1[by] === 'string') {
				return student1[by].localeCompare(student2[by]);
			} else if (typeof student1[by] === 'number') {
				return student1[by] - student2[by];
			}
		});
	} else if (sortingOrder === 'DESC') {
		students.sort((student1, student2) => {
			if (typeof student1[by] === 'string') {
				return student2[by].localeCompare(student1[by]);
			} else if (typeof student1[by] === 'number') {
				return student2[by] - student1[by];
			}
		});
	}
	addStudentRowsToTable(students, tableBodyElement);
}

export function updateGradesTable(student, gradesTableBody) {
	gradesTableBody.innerHTML = student.note
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
