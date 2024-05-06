document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector("form");
    registerForm.addEventListener("submit", handleSubmit);

    async function handleSubmit(event) {
        event.preventDefault();

        // Get form input values
        const fullName = document.querySelector("#fullname").value.trim();
        const email = document.querySelector("#email").value.trim();
        const gender = document.querySelector("#gender").value.trim();
        const course = document.querySelector("#course").value.trim();

        // Validate input (you can add more validation if needed)
        if (fullName === '' || email === '' || gender === '' || course === '') {
            alert("Please fill out all fields.");
            return;
        }

        // Create student object
        const studentObj = {
            fullName: fullName,
            email: email,
            gender: gender,
            course: course,
            feeBalance: 0 // Assuming fee balance starts at 0
        };

        try {
            // Call function to register student
            await registerStudent(studentObj);
            alert("Student registered successfully!");
            registerForm.reset();
        } catch (error) {
            console.error('Error:', error);
            // Show an error message to the user
            // alert("An error occurred. Please try again later.");
        }
    }

    async function registerStudent(studentObj) {
        try {
            const response = await fetch('http://localhost:3000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentObj),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        } catch (error) {
            throw new Error('Error sending data to server');
        }
    }
});
