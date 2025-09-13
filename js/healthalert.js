// function checkNextPeriodAlert() {
//   const periodInput = document.getElementById("periodDate").value;
//   const alertsContainer = document.getElementById("alertsContent");

//   if (!periodInput) return;

//   const periodDate = new Date(periodInput);
//   const nextPeriod = new Date(periodDate);
//   nextPeriod.setMonth(nextPeriod.getMonth() + 1); // assume same day next month

//   const today = new Date();
//   const oneWeekBefore = new Date(nextPeriod);
//   oneWeekBefore.setDate(oneWeekBefore.getDate() - 7);

//   // clear previous alert
//   alertsContainer.innerHTML = "";

//   // if today is >= oneWeekBefore but before nextPeriod
//   if (today >= oneWeekBefore && today < nextPeriod) {
//     const alertDiv = document.createElement("div");
//     alertDiv.className = "health-alert";
//     alertDiv.innerHTML = "🩸 Your next period is coming in one week. Prepare accordingly!";
//     alertsContainer.appendChild(alertDiv);
//   } else {
//     alertsContainer.innerHTML = "No alerts right now.";
//   }
// }

// // Run when the save button is clicked
document.getElementById("saveBtn").addEventListener("click", () => {
  checkNextPeriodAlert();
});

function getNextPeriodDate() {
  const periodInput = document.getElementById("periodDate").value;
  if (!periodInput) {
    alert("Please enter your period start date first.");
    return;
  }
  const periodDate = new Date(periodInput);
  const nextPeriod = new Date(periodDate);
  nextPeriod.setMonth(nextPeriod.getMonth() + 1); // same day next month

  // Format date nicely
  const options = { year: "numeric", month: "long", day: "numeric" };
  alert(`Your next period is expected on: ${nextPeriod.toLocaleDateString(undefined, options)}`);
}

// Event listener for button
document.getElementById("nextPeriodBtn").addEventListener("click", getNextPeriodDate);


// book appointment
function bookAppointment() {
  // Example: popup with info
  alert("Click OK to go to appointment form.");
  // You can replace this with a modal or redirect to booking page

   setTimeout(() => {
    window.location.href = "https://forms.gle/ZDLmfBpBkr2Ffv2A6";
  });
}