export function sortPlayersAccordingToAttendance(players) {
  return players.sort((a, b) => {
    return a.attendance - b.attendance;
  });
}
