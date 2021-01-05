import { Injectable } from "@angular/core";
import { TournamentModel } from "../models/tournament.model";

@Injectable()
export class AppService {
    tournamentOptions: TournamentModel
    //  = {
    //     "players": [{ "info": { "id": "17298", "name": "Rashid", "avatar_icon": '../../../../assets/images/avatar01.png', "avatar_bg_color": '#37AC5D' }, "gamesWon": 0 },
    //     { "info": { "id": "94379", "name": "Danish", "avatar_icon": '../../../../assets/images/avatar02.png', "avatar_bg_color": "#F8D146" }, "gamesWon": 0 }], "noOfGames": 2, "gameStartTurnVal": 1,
    //     "gamesPlayed": 0
    // };
    constructor() { }
}