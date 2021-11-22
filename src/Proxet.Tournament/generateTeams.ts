import { readFileSync } from "fs";
import { createInterface } from "readline";
import { Teams, Player, PlayerArr } from "./interfaces-types";

const VEHICLE_TYPES = 3;

export const generateTeams = (filePath: string): Teams => {
  const teams: Teams = {
    team1: [],
    team2: [],
  };

  const playersByVehicleType: PlayerArr = {
    type1: [],
    type2: [],
    type3: [],
  };

  const file = readFileSync(__dirname + "/wait-time.stat", "utf-8");

  const lineInterface = file.split("\n");

  lineInterface.forEach(function (str: string) {
    const separetedString: string[] = str.split("\t");

    const playerData: Player = {
      name: separetedString[0],
      vehicleType: Number(separetedString[2]),
      waitTime: Number(separetedString[1]),
    };

    switch (playerData.vehicleType) {
      case 1:
        playersByVehicleType.type1.push(playerData);
        break;
      case 2:
        playersByVehicleType.type2.push(playerData);
        break;
      case 3:
        playersByVehicleType.type3.push(playerData);
        break;
      default:
        console.log(`Player ${playerData.name} hasn't vehicle type`);
        break;
    }
  });

  for (let i = 0; i < VEHICLE_TYPES; i++) {
    playersByVehicleType[`type${i + 1}` as keyof PlayerArr].sort(
      (a, b): number => {
        return a.waitTime - b.waitTime;
      }
    );
  }
  for (let i = 0; i < VEHICLE_TYPES; i++) {
    for (let j = 0; j < VEHICLE_TYPES * 2; j++) {
      const player =
        playersByVehicleType[`type${i + 1}` as keyof PlayerArr].pop();
      if (j % 2 === 0) {
        teams.team2.push(player?.name || "");
        console.log(player);
      } else {
        teams.team1.push(player?.name || "");
        console.log(player);
      }
    }
  }
  return teams;
};
