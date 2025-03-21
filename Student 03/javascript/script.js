let userData = {};
let currentStep = 0;
const totalSteps = 3;

function updateProgressBar(step) {
    const progressBar = document.getElementById('progressBar');
    const percentage = (step / totalSteps) * 100;
    progressBar.style.width = `${percentage}%`;
    progressBar.innerText = `${Math.round(percentage)}%`;
}

function handleCancel(promptResult) {
    if (promptResult === null) {
        alert("Action cancelled. Please complete the profile creation.");
        return true;
    }
    return false;
}

function startProfileCreation() {
    currentStep = 0;
    updateProgressBar(currentStep + 1);
    getPersonalInfo();
}

function getPersonalInfo() {
    currentStep = 0; // Reset current step for personal info
    userData = {}; // Clear previous user data

    let userInput = prompt("Enter your username:");
    if (handleCancel(userInput)) {
        return;
    }
    if (userInput.trim().toLowerCase() === 'skip') {
        showNextAndResetButtons(getClimateActionInfo);
        return;
    }
    while (!validateUsername(userInput)) {
        alert("Invalid username format. Please enter a username without numbers.");
        userInput = prompt("Enter your username:");
        if (handleCancel(userInput)) {
            return;
        }
        if (userInput.trim().toLowerCase() === 'skip') {
            showNextAndResetButtons(getClimateActionInfo);
            return;
        }
    }
    userData.username = userInput;

    userInput = prompt("Enter your age:");
    if (handleCancel(userInput)) {
        return;
    }
    if (userInput.trim().toLowerCase() === 'skip') {
        showNextAndResetButtons(getClimateActionInfo);
        return;
    }
    while (!validateAge(userInput)) {
        alert("Invalid age format. Please enter a valid number for age.");
        userInput = prompt("Enter your age:");
        if (handleCancel(userInput)) {
            return;
        }
        if (userInput.trim().toLowerCase() === 'skip') {
            showNextAndResetButtons(getClimateActionInfo);
            return;
        }
    }
    userData.age = userInput;

    userInput = prompt("Enter your gender (1 for Male, 2 for Female):");
    if (handleCancel(userInput)) {
        return;
    }
    if (userInput.trim().toLowerCase() === 'skip') {
        showNextAndResetButtons(getClimateActionInfo);
        return;
    }
    while (!validateGender(userInput)) {
        alert("Invalid gender selection. Please enter 1 for Male or 2 for Female.");
        userInput = prompt("Enter your gender (1 for Male, 2 for Female):");
        if (handleCancel(userInput)) {
            return;
        }
        if (userInput.trim().toLowerCase() === 'skip') {
            showNextAndResetButtons(getClimateActionInfo);
            return;
        }
    }
    userData.gender = userInput === '1' ? 'Male' : 'Female';

    userInput = prompt("Enter your location:");
    if (handleCancel(userInput)) {
        return;
    }
    if (userInput.trim().toLowerCase() === 'skip') {
        showNextAndResetButtons(getClimateActionInfo);
        return;
    }
    userData.location = userInput;

    if (userData.username && userData.age && userData.gender && userData.location) {
        displayUserProfile(); // Display user profile once all fields are entered
        showNextAndResetButtons(getClimateActionInfo);
    } else {
        alert("All fields are required.");
    }
}

function getClimateActionInfo() {
    currentStep = 1; // Move to climate action info step
    updateProgressBar(currentStep + 1);

    let userInput = prompt("What brings you to climate action?");
    if (handleCancel(userInput)) {
        return;
    }
    if (userInput.trim().toLowerCase() === 'skip') {
        showNextAndResetButtons(getContactInfo);
        return;
    }
    userData.climateAction = userInput;

    userInput = prompt("Main focus area:");
    if (handleCancel(userInput)) {
        return;
    }
    if (userInput.trim().toLowerCase() === 'skip') {
        showNextAndResetButtons(getContactInfo);
        return;
    }
    userData.focusArea = userInput;

    userInput = prompt("Any previous experience?");
    if (handleCancel(userInput)) {
        return;
    }
    if (userInput.trim().toLowerCase() === 'skip') {
        showNextAndResetButtons(getContactInfo);
        return;
    }
    userData.experience = userInput;

    userInput = prompt("Commitment level (hours per week):");
    if (handleCancel(userInput)) {
        return;
    }
    if (userInput.trim().toLowerCase() === 'skip') {
        showNextAndResetButtons(getContactInfo);
        return;
    }
    userData.commitment = userInput;

    if (userData.climateAction && userData.focusArea && userData.experience && userData.commitment) {
        displayUserProfile(); // Display user profile once all fields are entered
        showNextAndResetButtons(getContactInfo);
    } else {
        alert("All fields are required.");
    }
}

function getContactInfo() {
    currentStep = 2; // Move to contact info step
    updateProgressBar(currentStep + 1);

    let userInput = prompt("Enter your email:");
    if (handleCancel(userInput)) {
        return;
    }
    if (userInput.trim().toLowerCase() === 'skip') {
        displayUserProfile();
        document.getElementById('nextButton').remove();
        document.getElementById('resetButton').style.display = 'inline';
        return;
    }
    while (!validateEmail(userInput)) {
        alert("Invalid email format. Please enter a valid email address.");
        userInput = prompt("Enter your email:");
        if (handleCancel(userInput)) {
            return;
        }
        if (userInput.trim().toLowerCase() === 'skip') {
            displayUserProfile();
            document.getElementById('nextButton').remove();
            document.getElementById('resetButton').style.display = 'inline';
            return;
        }
    }
    userData.email = userInput;

    userInput = prompt("Enter your phone number:");
    if (handleCancel(userInput)) {
        return;
    }
    if (userInput.trim().toLowerCase() === 'skip') {
        displayUserProfile();
        document.getElementById('nextButton').remove();
        document.getElementById('resetButton').style.display = 'inline';
        return;
    }
    while (!validatePhone(userInput)) {
        alert("Invalid phone number format. Please enter a valid 10-digit phone number.");
        userInput = prompt("Enter your phone number:");
        if (handleCancel(userInput)) {
            return;
        }
        if (userInput.trim().toLowerCase() === 'skip') {
            displayUserProfile();
            document.getElementById('nextButton').remove();
            document.getElementById('resetButton').style.display = 'inline';
            return;
        }
    }
    userData.phone = userInput;

    userInput = prompt("Availability (days/hours):");
    if (handleCancel(userInput)) {
        return;
    }
    if (userInput.trim().toLowerCase() === 'skip') {
        displayUserProfile();
        document.getElementById('nextButton').remove();
        document.getElementById('resetButton').style.display = 'inline';
        return;
    }
    userData.availability = userInput;

    userInput = prompt("Preferred contact method (e.g., email, phone):");
    if (handleCancel(userInput)) {
        return;
    }
    if (userInput.trim().toLowerCase() === 'skip') {
        displayUserProfile();
        document.getElementById('nextButton').remove();
        document.getElementById('resetButton').style.display = 'inline';
        return;
    }
    userData.preferredContact = userInput;

    if (userData.email && userData.phone && userData.availability && userData.preferredContact) {
        displayUserProfile(); // Display user profile once all fields are entered
        document.getElementById('nextButton').remove();
        document.getElementById('resetButton').style.display = 'inline';
        document.getElementById('submit').style.display = 'block'; // Display the submit button
    } else {
        alert("All fields are required.");
    }
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePhone(phone) {
    const phonePattern = /^\d{10}$/; // Assuming a 10-digit phone number
    return phonePattern.test(phone);
}

function validateUsername(username) {
    const usernamePattern = /^[a-zA-Z]+$/; // Only letters
    return usernamePattern.test(username);
}

function validateAge(age) {
    const agePattern = /^\d+$/; // Only numbers
    return agePattern.test(age);
}

function validateGender(gender) {
    return gender === '1' || gender === '2';
}

function showNextAndResetButtons(nextFunction) {
    const buttonsContainer = document.getElementById('buttons');
    buttonsContainer.innerHTML = '';

    const nextButton = document.createElement('button');
    nextButton.id = 'nextButton';
    nextButton.innerText = "Next";
    nextButton.onclick = () => {
        nextFunction();
    };

    const resetButton = document.createElement('button');
    resetButton.id = 'resetButton';
    resetButton.innerText = "Reset";
    resetButton.onclick = resetProfileCreation;

    buttonsContainer.appendChild(nextButton);
    buttonsContainer.appendChild(resetButton);
}

function displayUserProfile() {
    let userProfileHTML = `
        <h2>User Profile</h2>
        <hr>
        <h3>Personal Information</h3>
        <p><strong>Username:</strong> ${userData.username || ''}</p>
        <p><strong>Age:</strong> ${userData.age || ''}</p>
        <p><strong>Gender:</strong> ${userData.gender || ''}</p>
        <p><strong>Location:</strong> ${userData.location || ''}</p>
    `;

    if (userData.climateAction) {
        userProfileHTML += `
            <hr>
            <h3>Climate Action Interests</h3>
            <p><strong>Interest:</strong> ${userData.climateAction}</p>
            <p><strong>Main Focus Area:</strong> ${userData.focusArea}</p>
            <p><strong>Experience:</strong> ${userData.experience}</p>
            <p><strong>Commitment Level:</strong> ${userData.commitment} hours per week</p>
        `;
    }

    if (userData.email) {
        userProfileHTML += `
            <hr>
            <h3>Contact and Availability</h3>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Phone:</strong> ${userData.phone}</p>
            <p><strong>Availability:</strong> ${userData.availability}</p>
            <p><strong>Preferred Contact Method:</strong> ${userData.preferredContact}</p>
        `;
    }

    userProfileHTML += `
        <button onclick="editProfile()">Edit</button>
    `;

    document.getElementById('userProfile').innerHTML = userProfileHTML;
}

function resetProfileCreation() {
    userData = {};
    currentStep = 0;
    updateProgressBar(currentStep + 1);
    document.getElementById('userProfile').innerHTML = '';
    const buttonsContainer = document.getElementById('buttons');
    buttonsContainer.innerHTML = '';
}

function submitAlert() {
    alert("Submitted successfully!");
    document.getElementById("submit").style.display = "none";
    document.getElementById("buttons").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("resetButton").style.display = "none";
}

function editProfile() {
    document.getElementById('userProfile').innerHTML = ''; // Clear displayed profile
    showEditButtons();
}

function showEditButtons() {
    const editButtonsHTML = `
        <h3>Edit Profile</h3>
        <button onclick="editStep('personal')">Edit Personal Info</button>
        <button onclick="editStep('climate')">Edit Climate Action Info</button>
        <button onclick="editStep('contact')">Edit Contact Info</button>
        <button onclick="editAllSteps()">Edit All Steps</button>
    `;
    document.getElementById('buttons').innerHTML = editButtonsHTML;
}

function editStep(step) {
    document.getElementById('buttons').innerHTML = ''; // Clear previous buttons

    switch (step) {
        case 'personal':
            currentStep = 0;
            getPersonalInfo();
            break;
        case 'climate':
            currentStep = 1;
            getClimateActionInfo();
            break;
        case 'contact':
            currentStep = 2;
            getContactInfo();
            break;
        default:
            break;
    }
    updateProgressBar(currentStep + 1); // Update progress bar
    document.getElementById("submit").style.display = "block"; // Display submit button
}

function editAllSteps() {
    document.getElementById('buttons').innerHTML = ''; // Clear previous buttons
    startProfileCreation(); // Restart profile creation
}