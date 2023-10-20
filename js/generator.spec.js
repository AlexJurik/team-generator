import { generateTeams } from "./generator";
import { Player } from "./player";

const dummyPlayers = [
  new Player(1, "John", 1),
  new Player(2, "Jane", 1),
  new Player(3, "Bob", 2),
  new Player(4, "Alice", 2),
  new Player(5, "Mike", 2),
  new Player(6, "Emily", 3),
];

const dummyPlayer = new Player(7, "Tom", 3);

describe("generateTeams", () => {
  it("should throw an error if there are not enough players to form the desired number of teams", () => {
    const teamsCount = 3;
    expect(() => generateTeams([dummyPlayer], teamsCount)).toThrowError(
      "Not enough players to form the desired number of teams",
    );
  });

  it("should split even count of players into even count of teams", () => {
    const teamsCount = 2;
    const playersPerTeam = dummyPlayers.length / teamsCount;
    const teams = generateTeams(dummyPlayers, teamsCount);
    expect(teams.length).toBe(teamsCount);
    expect(teams[0].length).toBe(1);
    expect(teams[1].length).toBe(playersPerTeam);
  });

  it("should split odd count of players into event count of teams", () => {
    const copyOfDummyPlayers = [...dummyPlayers];
    copyOfDummyPlayers.push(dummyPlayer);
    const teamsCount = 2;
    const firstTeamPlayersCount = 4;
    const secondTeamPlayersCount = 3;
    const teams = generateTeams(copyOfDummyPlayers, teamsCount);
    expect(teams.length).toBe(teamsCount);
    expect(teams[0].length).toBe(firstTeamPlayersCount);
    expect(teams[1].length).toBe(secondTeamPlayersCount);
  });

  it("should split odd count of players into odd count of teams", () => {
    const copyOfDummyPlayers = [...dummyPlayers];
    copyOfDummyPlayers.push(dummyPlayer);
    const teamsCount = 3;
    const firstTeamPlayersCount = 3;
    const secondTeamPlayersCount = 2;
    const thirdTeamPlayersCount = 2;
    const teams = generateTeams(copyOfDummyPlayers, teamsCount);
    expect(teams.length).toBe(teamsCount);
    expect(teams[0].length).toBe(firstTeamPlayersCount);
    expect(teams[1].length).toBe(secondTeamPlayersCount);
    expect(teams[2].length).toBe(thirdTeamPlayersCount);
  });

  it("should split even count of players into odd count of teams", () => {
    const teamsCount = 3;
    const playersPerTeam = dummyPlayers.length / teamsCount;
    const teams = generateTeams(dummyPlayers, teamsCount);
    expect(teams.length).toBe(teamsCount);
    expect(teams[0].length).toBe(playersPerTeam);
    expect(teams[1].length).toBe(playersPerTeam);
    expect(teams[2].length).toBe(playersPerTeam);
  });

  it("should split equal count of players to equal count of teams", () => {
    const teamsCount = dummyPlayers.length;
    const playersPerTeam = dummyPlayers.length / teamsCount;
    const teams = generateTeams(dummyPlayers, teamsCount);
    expect(teams.length).toBe(teamsCount);
    expect(teams[0].length).toBe(playersPerTeam);
    expect(teams[1].length).toBe(playersPerTeam);
    expect(teams[2].length).toBe(playersPerTeam);
    expect(teams[3].length).toBe(playersPerTeam);
    expect(teams[4].length).toBe(playersPerTeam);
    expect(teams[5].length).toBe(playersPerTeam);
  });
});
