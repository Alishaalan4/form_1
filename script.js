document.getElementById("jobApplicationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    let isValid = true;

    // Validate all fields
    formData.forEach((value, key) => {
        if (typeof value === "string" && !value.trim()) {
            alert(`Please fill out the "${key.replace("_", " ")}" field.`);
            isValid = false;
        } else {
            data[key] = value; // Add value as is, without trimming non-strings
        }
    });

    if (!isValid) {
        return;
    }

    // Check numeric validations
    const salary = parseFloat(data.salary);
    const experience = parseInt(data.experience, 10);

    if (salary && salary <= 0) {
        alert("Salary must be a positive number.");
        return;
    }

    if (experience < 1) {
        alert("Experience must be at least 1 year.");
        return;
    }

    // Convert data to JSON
    const jsonData = JSON.stringify(data, null, 2);

    // Create a downloadable JSON file
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to download the file
    const a = document.createElement("a");
    a.href = url;
    a.download = "job_application.json"; // Filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke the object URL to free memory
    URL.revokeObjectURL(url);

    alert("Form data saved as JSON!");
});
