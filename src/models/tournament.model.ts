import { PlayerModel } from "./player.model";

export class TournamentModel {
    players: Array<PlayerModel> = [];
    noOfGames: number;
    gameStartTurnVal: number;
    gamesPlayed?: number = 0;
    lastGameWinnerID?: string;
    lastPlayerStartTurnID?: string;
}