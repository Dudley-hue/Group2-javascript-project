document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("tbody");
    const searchInput = document.getElementById("searchInput");
    let allStudents = []; // Store all students from API

    // Load existing data from API
    loadStudentsFromAPI();

    function loadStudentsFromAPI() {
        fetchStudents()
            .then(data => {
                allStudents = data.students; // Store all students
                renderStudents(allStudents); // Display all students
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("An error occurred while fetching data. Please try again later.");
            });
    }

    async function fetchStudents() {
        const response = await fetch("db.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }

    function renderStudents(students) {
        tableBody.innerHTML = ""; // Clear existing rows
        students.forEach(student => {
            addStudentToTable(student);
        });
        attachEditDeleteListeners(); 
    }

    function addStudentToTable(student) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${student.id}</td>
            <td>${student.fullName}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.gender}</td>
            <td>${student.feeBalance}</td>
            <td class="action-buttons">
                <button class="edit-button" id="edit-button-${student.id}">Edit</button>
                <button class="delete-button" id="delete-button-${student.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    }

    function attachEditDeleteListeners() {
        tableBody.addEventListener("click", event => {
            const targetButton = event.target;
            if (targetButton.classList.contains("edit-button")) {
                const studentId = targetButton.id.split("-")[2]; 
                // Call edit function with studentId
                editStudent(studentId);
            } else if (targetButton.classList.contains("delete-button")) {
                const studentId = targetButton.id.split("-")[2]; 
                // Call delete function with studentId
                deleteStudent(studentId);
            }
        });
    }

    function editStudent(studentId) {
        console.log(`Editing student with ID: ${studentId}`);
    }

    function deleteStudent(studentId) {
        console.log(`Deleting student with ID: ${studentId}`);
    }

    // Search students based on full name
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.trim().toLowerCase();
        const filteredStudents = allStudents.filter(student =>
            student.fullName.toLowerCase().includes(searchText)
        );
        renderStudents(filteredStudents); // Display filtered students
    });
    function addStudent(student) {
    
    }
});
