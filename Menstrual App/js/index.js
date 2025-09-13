// Navigation
const navItems = document.querySelectorAll('.navitem');
const sections = {
  tracker: document.getElementById('tracker'),
  lifestyle: document.getElementById('lifestyle'),
  sexed: document.getElementById('sexed'),
  doctor: document.getElementById('doctor'),
  cycleissues: document.getElementById("cycleissues"),
  alerts: document.getElementById('alerts')
};

navItems.forEach(item => item.addEventListener('click', ()=>{
  navItems.forEach(n=>n.classList.remove('active'));
  item.classList.add('active');
  const target = item.dataset.target;
  Object.keys(sections).forEach(k=>{
    sections[k].classList.toggle('hidden', k !== target);
  });
}));

// Make sure this runs after the page loads
document.addEventListener("DOMContentLoaded", function() {
  flatpickr("#periodDate", {
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "F j, Y",
    allowInput: true,
    defaultDate: new Date()
  });
});

// Tracker save/load
const periodDate = document.getElementById('periodDate');
const amount = document.getElementById('amount');
const saveBtn = document.getElementById('saveBtn');
const toast = document.getElementById('toast');

function loadData(){
  try{
    const raw = localStorage.getItem('menstrualData');
    if(!raw) return;
    const data = JSON.parse(raw);
    periodDate.value = data.periodDate || '';
    amount.value = data.amount || '';
    round1.checked = !!data.round1;
    round2.checked = !!data.round2;
    round3.checked = !!data.round3;
  }catch(e){console.warn('load error',e)}
}

// Save button listener: only call saveData
saveBtn.addEventListener('click', saveData);

function showToast(msg){
  toast.textContent = msg;
  toast.style.display='block';
  setTimeout(()=>toast.style.display='none',1400);
}

// load on start
loadData();

// deep-linking via hash
const map = {"#tracker":"tracker","#lifestyle":"lifestyle","#sexed":"sexed","#doctor":"doctor","#cycleissues":"cycleissues","#alerts":"alerts"};
function goHash(){
  const key = map[location.hash] || 'tracker';
  document.querySelector(`.navitem[data-target="${key}"]`).click();
}
window.addEventListener('hashchange', goHash);
goHash();

// Save data to localStorage
function saveData() {
  const ageInputRaw = document.getElementById("age").value;
  const ageInput = parseInt(ageInputRaw);
  const flowAmountInput = document.getElementById("flowAmount").value;
  const periodDateInput = document.getElementById("periodDate").value;

  // Validation: all fields filled
  if (!periodDateInput?.trim() || !ageInputRaw?.trim() || !flowAmountInput?.trim()) {
    showToast('Please fill in all fields before saving');
    return; // stop saving
  }

  // Validation: age numeric and within 0-120
  if (isNaN(ageInput) || ageInput < 0 || ageInput > 120) {
    showToast('Age must be a number between 0 and 120');
    return; // stop saving
  }

  // Save data
  const data = {
    periodDate: periodDateInput,
    amount: flowAmountInput,
    age: ageInput
  };
  localStorage.setItem('menstrualData', JSON.stringify(data));
  showToast('Saved ✓');

  // Update lifestyle advice only if valid
  updateLifestyleAdvice();
}

// Clear form and localStorage
function clearData() {
  periodDate.value = '';
  flowAmount.value = '';
  localStorage.removeItem('menstrualData');
  showToast('Cleared');
}

// Lifestyle Advice Function
function updateLifestyleAdvice() {
  const age = parseInt(document.getElementById("age").value);
  const flow = document.getElementById("flowAmount").value;
  const periodDateInput = document.getElementById("periodDate").value;

  const lifestyleSection = document.getElementById("lifestyle");
  const adviceList = lifestyleSection.querySelector("ul");
  adviceList.innerHTML = ""; // clear previous advice

  // Validation: hide section if inputs invalid
  if (!periodDateInput?.trim() || !flow?.trim() || isNaN(age) || age < 0 || age > 120) {
    lifestyleSection.classList.add("hidden"); // hide section completely
    return;
  }

  const periodDateObj = new Date(periodDateInput);
  const today = new Date();
  const dayOfCycle = Math.floor((today - periodDateObj) / (1000 * 60 * 60 * 24)) % 28 + 1;

  // Hydration advice
  const hydration = document.createElement("li");
  hydration.textContent = "Hydration: aim for 1.5–2L/day";
  adviceList.appendChild(hydration);

  // Exercise advice based on luteal phase
  const exercise = document.createElement("li");
  if (dayOfCycle >= 1 && dayOfCycle <= 5) {
  exercise.textContent = "Menstrual phase: Gentle movement or rest if needed. Focus on stretching and relaxation.";
} else if (dayOfCycle >= 6 && dayOfCycle <= 13) {
  exercise.textContent = "Follicular phase: Moderate exercise is great. Focus on strength and cardio workouts.";
} else if (dayOfCycle >= 14 && dayOfCycle <= 28) {
  exercise.textContent = "Luteal phase: Light exercise can help ease cramps and boost mood. Yoga or walking recommended.";
} else {
  exercise.textContent = "Regular exercise is beneficial throughout the cycle.";
}
  adviceList.appendChild(exercise);

  // Sleep/mood advice
  const sleep = document.createElement("li");
  if (dayOfCycle >= 1 && dayOfCycle <= 5) {
  sleep.textContent = "Menstrual phase: Prioritize rest and good sleep to help recovery. Gentle relaxation before bed is beneficial.";
} else if (dayOfCycle >= 6 && dayOfCycle <= 13) {
  sleep.textContent = "Follicular phase: Sleep supports energy and focus. Maintain consistent bedtime and wake time.";
} else if (dayOfCycle >= 14 && dayOfCycle <= 28) {
  sleep.textContent = "Luteal phase: Track mood and sleep patterns. Aim for 7–9 hours and manage stress to reduce PMS symptoms.";
} else {
  sleep.textContent = "Maintain regular sleep and track your mood throughout the cycle.";
}

adviceList.appendChild(sleep);

  // Diet advice based on age and flow
  const diet = document.createElement("li");

if (flow === "heavy") {
  diet.textContent = "Heavy flow: Eat iron-rich foods like spinach, red meat, lentils, and beans to replenish iron.";
} else if (flow === "medium") {
  if (dayOfCycle >= 1 && dayOfCycle <= 5) {
    diet.textContent = "Medium flow during menstrual phase: Stay hydrated and eat balanced meals with protein and complex carbs.";
  } else if (dayOfCycle >= 6 && dayOfCycle <= 13) {
    diet.textContent = "Follicular phase: Focus on nutrient-dense foods and lean proteins to support energy.";
  } else {
    diet.textContent = "Luteal phase: Eat foods rich in magnesium and fiber, and avoid excess sugar to reduce PMS symptoms.";
  }
} else if (flow === "low" && age < 25) {
  diet.textContent = "Low flow and under 25: Eat high-potassium foods like bananas, avocado, and sweet potatoes to support overall health.";
} else {
  diet.textContent = "Maintain a balanced diet with fruits, vegetables, whole grains, and adequate hydration throughout the cycle.";
}

adviceList.appendChild(diet);


  // Make sure lifestyle section is visible
  lifestyleSection.classList.remove("hidden");
}

function showLifestyleSection() {
  const lifestyleSection = document.getElementById("lifestyle");
  lifestyleSection.classList.remove("hidden");
  lifestyleSection.scrollIntoView({ behavior: "smooth" });
}
// Optional: integrate checkNextPeriodAlert() here if available


// home click button
function goHome() {
  document.querySelector('.logo').addEventListener('click', () => {
  // Trigger the tracker nav item click
  document.querySelector('.navitem[data-target="tracker"]').click();

  // Optional: update the URL hash so it’s consistent
  location.hash = "#tracker";
});
}