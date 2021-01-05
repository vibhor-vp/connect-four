import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { CardChildModel, CardContainerModel } from "../../models/card/card-container.model";
import { PlayerModel } from "../../models/player.model";
import { TournamentModel } from "../../models/tournament.model";
import { AppService } from "../app.service";
import { InfoCardComponent } from "../common/card/info-card/info-card.component";
import { GameComponent } from "./game/game.component";

@Component({
    selector: 'play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss']
})

export class PlayComponent implements OnInit {
    _gameCompleted: boolean;
    @ViewChild(GameComponent) gameCompRef: GameComponent;
    cardContainerDataArr: Array<CardContainerModel>;
    public tournamentObj: TournamentModel;
    public _last_game_winner_player: PlayerModel;
    _tournamentCompleted: boolean;
    constructor(private _appService: AppService, private _router: Router) { }

    ngOnInit(): void {
        this.tournamentObj = this._appService.tournamentOptions;
        this.cardContainerDataArr = [
            {
                bg_color: '#EFF3FF',
                childComponentObj: {
                    childComponent: InfoCardComponent,
                    data: this.getEntryComponentData(this.tournamentObj.players[0].info.id, 'Player 01', this.tournamentObj.players[0].info.name, 'Score',
                        this.tournamentObj.players[0].gamesWon,
                        this.tournamentObj.players[0].info.avatar_icon)
                }
            },
            {
                bg_color: '#F6EFD5',
                childComponentObj: {
                    childComponent: InfoCardComponent,
                    data: this.getEntryComponentData(this.tournamentObj.players[1].info.id, 'Player 02', this.tournamentObj.players[1].info.name, 'Score',
                        this.tournamentObj.players[1].gamesWon,
                        this.tournamentObj.players[1].info.avatar_icon)
                }
            }
        ]
    }

    getEntryComponentData(id: string, title, subtitle, title1, subtitle1, img): CardChildModel {
        return {
            id: id,
            title: title,
            subTitle: subtitle,
            title1: title1,
            subTitle1: subtitle1,
            img: img
        };
    }

    undo(): void {
        this.gameCompRef.undo();
    }

    gameCompleted(wonPlayerObj: any): void {
        this._gameCompleted = true;
        this.tournamentObj.gamesPlayed++;
        if (wonPlayerObj && wonPlayerObj.player_id) {
            let player = this.tournamentObj.players.find(player => player.info.id === wonPlayerObj.player_id);
            player.gamesWon++;
            this._last_game_winner_player = player;
            let childDataObj = this.cardContainerDataArr.find(card => card.childComponentObj.data.id === wonPlayerObj.player_id).childComponentObj.data
            childDataObj.subTitle1 = player.gamesWon.toString();
            this.tournamentObj.lastGameWinnerID = player.info.id;
            if (this.tournamentObj.gamesPlayed === this.tournamentObj.noOfGames) {
                // alert('CONGRATULATIONS!!!!!  Tournament won by: ' + this._last_game_winner_player.info.name);
                this._tournamentCompleted = true;
            }
        }
    }

    playNextGame(): void {
        this.gameCompRef.resetGame();
        this._gameCompleted = false;
    }

    playTournamentAgain(): void {
        this._gameCompleted = false;
        this.tournamentObj.players.forEach(player => { player.gamesWon == 0 });
        this.cardContainerDataArr.forEach(card => {card.childComponentObj.data.subTitle1 = '0'});
        this.gameCompRef.resetGame();
        this.tournamentObj.gamesPlayed = 0;
    }

    endTournament(): void {
        this._router.navigate(['']);
        this._appService.tournamentOptions = this.tournamentObj = new TournamentModel();
    }
}