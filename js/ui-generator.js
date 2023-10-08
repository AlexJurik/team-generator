export function generateTeams(players) {
  const selectedPlayers = [];

  // Collect the selected players
  for (const player of players) {
    const checkbox = document.getElementById(player.identifier);
    if (checkbox.checked) {
      selectedPlayers.push(player.name);
    }
  }

  // Perform your team generation logic here
  // You can create an algorithm to generate teams based on the selected players

  // For demonstration, let's display the selected players as teams
  const teamResult = document.getElementById("teamResult");
  teamResult.innerHTML = selectedPlayers.join("<br>");
}
