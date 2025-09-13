const buttons = document.querySelectorAll('.info-btn');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');

const data = {
  hiv: {
    title: "HIV",
    symptoms: "Fever, fatigue, swollen lymph nodes.",
    prevention: "Safe sex, regular testing.",
    medications: "Antiretroviral therapy.",
    vaccine: "Not available."
  },
  hpv: {
    title: "HPV",
    symptoms: "Genital warts, often asymptomatic.",
    prevention: "Vaccination, safe sex.",
    medications: "No cure, treat symptoms.",
    vaccine: "HPV vaccine."
  },
  chlamydia: {
    title: "Chlamydia",
    symptoms: "Painful urination, discharge.",
    prevention: "Safe sex, regular screening.",
    medications: "Antibiotics.",
    vaccine: "Not available."
  },
  gonorrhea: {
    title: "Gonorrhea",
    symptoms: "Discharge, painful urination.",
    prevention: "Safe sex, testing.",
    medications: "Antibiotics.",
    vaccine: "Not available."
  },
  syphilis: {
    title: "Syphilis",
    symptoms: "Rash, sores, fatigue.",
    prevention: "Safe sex, testing.",
    medications: "Antibiotics.",
    vaccine: "Not available."
  },
  endometriosis: {
    title: "Endometriosis",
    symptoms: "Severe cramps, heavy periods, infertility.",
    prevention: "No known prevention; early diagnosis helps management.",
    medications: "Pain relievers, hormone therapy.",
    vaccine: "Not applicable."
  },
  pcod: {
    title: "PCOD",
    symptoms: "Irregular periods, acne, weight gain.",
    prevention: "Healthy lifestyle, diet.",
    medications: "Hormonal treatment.",
    vaccine: "Not applicable."
  },
  pcos: {
    title: "PCOS",
    symptoms: "Irregular periods, excess hair growth.",
    prevention: "Healthy lifestyle, weight management.",
    medications: "Hormonal therapy.",
    vaccine: "Not applicable."
  },
  fibroids: {
    title: "Fibroids",
    symptoms: "Heavy periods, pelvic pain.",
    prevention: "Regular checkups.",
    medications: "Pain relief, surgery.",
    vaccine: "Not applicable."
  },
  amenorrhea: {
    title: "Amenorrhea",
    symptoms: "Absence of menstruation.",
    prevention: "Check hormonal balance.",
    medications: "Depends on cause.",
    vaccine: "Not applicable."
  },
  dysmenorrhea: {
    title: "Dysmenorrhea",
    symptoms: "Painful periods, cramps.",
    prevention: "Exercise, healthy diet.",
    medications: "Pain relief.",
    vaccine: "Not applicable."
  }
};

// Open popup
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    const info = data[id];

    document.getElementById('popup-title').textContent = info.title;
    document.getElementById('popup-symptoms').innerHTML = `<strong>Symptoms:</strong> ${info.symptoms}`;
    document.getElementById('popup-prevention').innerHTML = `<strong>Prevention:</strong> ${info.prevention}`;
    document.getElementById('popup-medications').innerHTML = `<strong>Medications:</strong> ${info.medications}`;
    document.getElementById('popup-vaccine').innerHTML = `<strong>Vaccine:</strong> ${info.vaccine}`;

    popup.classList.remove('hidden');
  });
});

// Close popup
closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});

// Close on outside click
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.add('hidden');
  }
});