// -----------------------------
// Personal Fitness Planner JS
// -----------------------------

// Workout plans based on goal
const plans = {
    strength: ["Chest & Triceps", "Back & Biceps", "Legs", "Shoulders", "Core"],
    cardio: ["Running", "Cycling", "HIIT", "Swimming", "Core Cardio"],
    weightloss: ["HIIT", "Full Body", "Cardio", "Core", "Yoga"]
};

// DOM elements
const form = document.getElementById("fitness-form");
const nameInput = document.getElementById("name");
const goalInput = document.getElementById("goal");
const daysInput = document.getElementById("days");
const equipmentInput = document.getElementById("equipment");
const workoutContainer = document.getElementById("workout-container");
const errorMessage = document.getElementById("error-message");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

let completedCount = 0;
let totalWorkouts = 0;

// Event listener for form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Clear previous plan
    workoutContainer.innerHTML = "";
    completedCount = 0;
    updateProgress();

    // Get user input
    const name = nameInput.value.trim();
    const goal = goalInput.value;
    const days = parseInt(daysInput.value);
    const equipment = equipmentInput.value;

    // Validation
    if (!name || !goal || !days || !equipment) {
        errorMessage.textContent = "Please complete all fields before submitting.";
        return;
    }

    if (days < 1 || days > 5) {
        errorMessage.textContent = "Please choose between 1 and 5 days.";
        return;
    }

    errorMessage.textContent = "";

    // Generate workouts
    const selectedPlan = plans[goal].slice(0, days);
    totalWorkouts = selectedPlan.length;

    selectedPlan.forEach((workout, index) => {
        createWorkoutCard(index + 1, workout, equipment);
    });
});

// Function to create workout cards (DOM manipulation)
function createWorkoutCard(day, workout, equipment) {
    const card = document.createElement("div");
    card.classList.add("workout-card");

    const title = document.createElement("h3");
    title.textContent = `Day ${day}`;

    const description = document.createElement("p");
    description.textContent = equipment === "yes"
        ? `Workout: ${workout} (Gym-based)`
        : `Workout: ${workout} (Bodyweight)`;

    const button = document.createElement("button");
    button.textContent = "Mark as Complete";

    // Event listener for interaction
    button.addEventListener("click", function() {
        if (!card.classList.contains("completed")) {
            card.classList.add("completed");
            button.textContent = "Completed";
            completedCount++;
            updateProgress();
        }
    });

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(button);

    workoutContainer.appendChild(card);
}

// Function to update progress bar
function updateProgress() {
    if (totalWorkouts === 0) {
        progressBar.style.width = "0%";
        progressText.textContent = "0% completed";
        return;
    }

    const percentage = Math.round((completedCount / totalWorkouts) * 100);
    progressBar.style.width = percentage + "%";
    progressText.textContent = `${percentage}% completed`;
}
