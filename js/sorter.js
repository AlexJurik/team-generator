export function sortPlayersAccordingToCoefficient(players) {
  return players.sort((a, b) => a.coefficient - b.coefficient);
}
