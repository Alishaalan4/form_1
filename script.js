document.getElementById("jobApplicationForm").addEventListener("submit", function (event) {
    // Add an event listener for the "submit" event on the form with the ID "jobApplicationForm".
    // The anonymous function will execute when the form is submitted.
    
    event.preventDefault(); 
    // Prevent the form's default behavior, which would reload the page or redirect.

    const form = event.target; 
    // Access the form element that triggered the event.

    const formData = new FormData(form); 
    // Create a FormData object to collect all the form inputs and their values.

    const data = {}; 
    // Initialize an empty object to store processed form data.

    let isValid = true; 
    // Initialize a flag to track whether the form validation passes.

    // Validate all fields
    formData.forEach((value, key) => {
        // Iterate over each key-value pair in the FormData object.
        
        if (typeof value === "string" && !value.trim()) {
            // If the value is a string and it's empty or only whitespace:
            alert(`Please fill out the "${key.replace("_", " ")}" field.`);
            // Alert the user about the missing input, formatting the key for readability.
            
            isValid = false; 
            // Set the validation flag to false.
        } else {
            data[key] = value; 
            // Add the field's key and value to the `data` object if valid.
        }
    });

    if (!isValid) {
        // If any field is invalid, stop further processing.
        return;
    }

    // Check numeric validations
    const salary = parseFloat(data.salary); 
    // Convert the "salary" field value to a floating-point number.

    const experience = parseInt(data.experience, 10); 
    // Convert the "experience" field value to an integer.

    if (salary && salary <= 0) {
        // If salary is provided but not a positive number:
        alert("Salary must be a positive number.");
        return; 
        // Stop further execution.
    }

    if (experience < 1) {
        // If experience is less than 1 year:
        alert("Experience must be at least 1 year.");
        return; 
        // Stop further execution.
    }

    // Convert data to JSON
    const jsonData = JSON.stringify(data, null, 2); 
    // Convert the `data` object to a JSON string with indentation for readability.

    // Create a downloadable JSON file
    const blob = new Blob([jsonData], { type: "application/json" }); 
    // Create a Blob object containing the JSON data with the appropriate MIME type.

    const url = URL.createObjectURL(blob); 
    // Create a temporary URL pointing to the Blob.

    // Create a temporary link to download the file
    const a = document.createElement("a"); 
    // Dynamically create an <a> (anchor) element.

    a.href = url; 
    // Set the href of the anchor to the Blob's URL.

    a.download = "job_application.json"; 
    // Set the download attribute to specify the filename.

    document.body.appendChild(a); 
    // Add the anchor to the document so it can be clicked.

    a.click(); 
    // Programmatically click the anchor to trigger the download.

    document.body.removeChild(a); 
    // Remove the anchor from the document after the click.

    // Revoke the object URL to free memory
    URL.revokeObjectURL(url); 
    // Release the temporary Blob URL to avoid memory leaks.

    alert("Form data saved as JSON!"); 
    // Inform the user that the data has been saved successfully.
});
