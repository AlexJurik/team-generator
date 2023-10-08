export function sortPlayersAccordingToAttendance(players) {
  return players.sort((a, b) => a.attendance - b.attendance);
}

export function sortPlayersAccordingToCoefficient(players) {
  return players.sort((a, b) => a.coefficient - b.coefficient);
}
