const webhookURL = "YOUR_DISCORD_WEBHOOK_URL";

const rewardsList = [
  "M4 Glacier", "Pharaoh Suit", "M4 Fool", "AKM Glacier", "Glacier Set"
];

function switchSection(section) {
  document.getElementById("generatorSection").style.display = section === 'generator' ? 'block' : 'none';
  document.getElementById("rewardsSection").style.display = section === 'rewards' ? 'block' : 'none';
}

function generateUC() {
  const gameId = document.getElementById("gameId").value.trim();
  const ucAmount = document.getElementById("ucAmount").value.trim();
  const output = document.getElementById("output");

  if (!/^\d+$/.test(gameId) || ucAmount <= 0) {
    output.style.color = "red";
    output.innerText = "Enter valid Game ID and UC amount.";
    return;
  }

  output.style.color = "#10b981";
  output.innerText = "Processing request...";

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `New UC Request:\nGame ID: ${gameId}\nUC Amount: ${ucAmount}` })
  })
  .then(() => {
    setTimeout(() => {
      output.innerText = `Success! ${ucAmount} UC sent to Game ID: ${gameId}.`;
    }, 1500);
  });
}

// Build rewards grid
window.onload = () => {
  const grid = document.getElementById("rewardsGrid");
  rewardsList.forEach(reward => {
    const item = document.createElement("div");
    item.className = "reward-item";
    item.innerHTML = `<img src="assets/${reward}.jpg" alt="${reward}"><p>${reward}</p>`;
    item.onclick = () => claimReward(reward);
    grid.appendChild(item);
  });
};

function claimReward(reward) {
  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
