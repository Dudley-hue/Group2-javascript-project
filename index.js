
document.querySelector("#register").addEventListener("submit",
handleSubmit)


function handleSubmit(event){
    event.preventDefault()
    let studentObj = {
        firstName:event.target.fname.value,
        secondName:event.target.sname.value,
        course:event.target.course.value,
        feeBalance:0
    }
    renderOneStudent(studentObj);
    registerStudent(studentObj);
}



function renderOneStudent(stud){
    let tableRow = document.createElement('tr');
    tableRow.className = "tablerow"
    tableRow.innerHTML = `
    
    <td>${stud.firstName}</td>
    <td>${stud.secondName}</td>
    <td>${stud.course}</td>
    <td>${stud.feeBalance}</td>
    
    
    `
    document.querySelector("#studs").appendChild(tableRow)
}

// fetch data
function getAllStudents(){
    fetch('http://localhost:3000/students')
    .then(res => res.json())
    .then(student => student.forEach(stud => renderOneStudent(stud)))
}


function registerStudent(studentObj){
    
    fetch('http://localhost:3000/students',{
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body:JSON.stringify(studentObj)
    })
    .then(res => res.json())
    .then(stud => console.log(stud))

}

// initialize render
function initialize(){
    getAllStudents()
    // student.forEach(stud => renderOneStudent(stud));
}
initialize();