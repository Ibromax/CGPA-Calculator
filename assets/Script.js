document.addEventListener('DOMContentLoaded', () => {
    createSubjectInputs();

    // Recreate input fields based on user input
    document.getElementById('numSubjects').addEventListener('input', createSubjectInputs);
});

function createSubjectInputs() {
    const numSubjects = parseInt(document.getElementById('numSubjects').value);
    const subjectInputs = document.getElementById('subjectInputs');
    subjectInputs.innerHTML = '';

    for (let i = 0; i < numSubjects; i++) {
        subjectInputs.innerHTML += `
            <div class="mb-3">
                <div class="row g-2">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Course Name" required>
                    </div>
                    <div class="col">
                        <input type="number" class="form-control" placeholder="Credit" min="1" required>
                    </div>
                    <div class="col">
                        <select class="form-control" required>
                            <option value="" disabled selected>Select Grade</option>
                            <option value="5">A</option>
                            <option value="4">B</option>
                            <option value="3">C</option>
                            <option value="2">D</option>
                            <option value="1">E</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    }
}

function calculateCGPA() {
    const numSubjects = parseInt(document.getElementById('numSubjects').value);
    const subjectInputs = document.querySelectorAll('#subjectInputs .row');

    let totalCredits = 0;
    let totalPoints = 0;

    subjectInputs.forEach(subject => {
        const inputs = subject.querySelectorAll('input, select');
        const credit = parseFloat(inputs[1].value);
        const grade = parseFloat(inputs[2].value);

        if (!isNaN(credit) && !isNaN(grade)) {
            totalCredits += credit;
            totalPoints += credit * grade;
        }
    });

    const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;

    // Display the result
    const resultContainer = document.getElementById('result');
    if (!resultContainer) {
        const resultDiv = document.createElement('div');
        resultDiv.id = 'result';
        resultDiv.className = 'mt-3 text-center';
        resultDiv.innerHTML = `<h3>Your CGPA is: ${cgpa}</h3>`;
        document.querySelector('.card-body').appendChild(resultDiv);
    } else {
        resultContainer.innerHTML = `<h3>Your CGPA is: ${cgpa}</h3>`;
    }
}
