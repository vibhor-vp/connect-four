import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { CardContainerModel } from "src/models/card/card-container.model";
import { PlayerModel } from "src/models/player.model";
import { TournamentModel } from "src/models/tournament.model";
import { UserModel } from "src/models/user.model";
import { AppService } from "../app.service";
import { EntryCardComponent } from "../common/card/entry-card/entry-card.component";
import { PLAYERS_ICONS_ARR, PLAYER_START_OPTIONS_ENUM, TOURNAMET_GAMES_NUM_OPTIONS } from "../constants";
import { Util } from "../utils/common-utils";

@Component({
    selector: 'players-info',
    templateUrl: './players-info.component.html'
})

export class PlayersInfoComponent extends Util implements OnInit {
    public cardContainerDataArr: Array<CardContainerModel>;
    // public formData: TournamentModel = new TournamentModel();
    public formModel: any = {
        player1Name: '',
        player2Name: '',
        noOfGames: TOURNAMET_GAMES_NUM_OPTIONS.TWO,
        gameStartVal: PLAYER_START_OPTIONS_ENUM.ALTERNATE,
    }
    public gamesNoModalShowSubject: Subject<any> = new Subject();
    public gameTurnModalShowSubject: Subject<any> = new Subject();
    public gamesNoOptionsList = [
        { val: TOURNAMET_GAMES_NUM_OPTIONS.TWO, text: '2 games', name: 'game_num' },
        { val: TOURNAMET_GAMES_NUM_OPTIONS.THREE, text: '3 games', name: 'game_num' },
        { val: TOURNAMET_GAMES_NUM_OPTIONS.FIVE, text: '5 games', name: 'game_num' },
        { val: TOURNAMET_GAMES_NUM_OPTIONS.TEN, text: '10 games', name: 'game_num' },
    ]
    public gameTurnOptionsList = [
        { val: PLAYER_START_OPTIONS_ENUM.ALTERNATE, text: 'Alternative turn', name: 'game_turn' },
        { val: PLAYER_START_OPTIONS_ENUM.LOOSER_FIRST, text: 'Looser first', name: 'game_turn' },
        { val: PLAYER_START_OPTIONS_ENUM.WINNER_FIRST, text: 'Winner first', name: 'game_turn' },
        { val: PLAYER_START_OPTIONS_ENUM.PLAYER1_ALWAYS, text: 'Always player 01', name: 'game_turn' },
        { val: PLAYER_START_OPTIONS_ENUM.PLAYER2_ALWAYS, text: 'Always player 02', name: 'game_turn' },
    ]

    constructor(private _router: Router, private _appService: AppService) {
        super();
    }

    ngOnInit(): void {
        this.cardContainerDataArr = [
            {
                bg_color: '#DCF6E4',
                childComponentObj: {
                    childComponent: EntryCardComponent,
                    data: this.getEntryComponentData('Player 01', 'text', '', null, this.player1DetailOuputEventFn.bind(this),
                        '../../../../assets/images/avatar01.png', '#37AC5D')
                }
            },
            {
                bg_color: '#F6EFD5',
                childComponentObj: {
                    childComponent: EntryCardComponent,
                    data: this.getEntryComponentData('Player 02', 'text', '', null, this.player2DetailOuputEventFn.bind(this),
                        '../../../../assets/images/avatar02.png', '#F8D146')
                }
            },
            {
                bg_color: '#EFF3FF',
                childComponentObj: {
                    childComponent: EntryCardComponent,
                    data: this.getEntryComponentData('Number of game', 'radio', this.formModel.noOfGames + ' games', this.gameNoClicked.bind(this), null,
                        '../../../../assets/images/winner.png', '#B1C4F9')
                }
            },
            {
                bg_color: '#EFF3FF',
                childComponentObj: {
                    childComponent: EntryCardComponent,
                    data: this.getEntryComponentData('Who starts', 'radio', this.gameTurnOptionsList.find((optn => optn.val == this.formModel.gameStartVal)).text, this.playerTurnClicked.bind(this), null,
                        '../../../../assets/images/run.png', '#B1C4F9')
                }
            },
        ]
    }

    getEntryComponentData(title?, inputType?, val?, clickedFn?: Function, outputEventFn?: Function, img?: string, imgBoxColor?: string): any {
        return {
            title: title,
            type: inputType,
            val: val,
            clickedFn: clickedFn,
            outputEventFn: outputEventFn,
            img: img,
            imgBoxColor: imgBoxColor
        };
    }

    player1DetailOuputEventFn(data): void {
        this.formModel.player1Name = data.name;
    }

    player2DetailOuputEventFn(data): void {
        this.formModel.player2Name = data.name;
    }

    noOfGamesSubmitted(option): void {
        this.formModel.noOfGames = option && option.val;
        this.cardContainerDataArr[2].childComponentObj.data.val = this.formModel.noOfGames + ' games';
    }

    gameStartValSubmitted(option): void {
        this.formModel.gameStartVal = option && option.val;
        this.cardContainerDataArr[3].childComponentObj.data.val = this.gameTurnOptionsList.find((optn => optn.val == this.formModel.gameStartVal)).text;
    }

    startGame() {
        this._router.navigate(['/play']);
    }

    gameNoClicked(cardDetail: CardContainerModel): void {
        this.gamesNoModalShowSubject.next({ showModal: true, selectedVal: this.formModel.noOfGames });
    }

    playerTurnClicked(cardDetail: CardContainerModel): void {
        this.gameTurnModalShowSubject.next({ showModal: true, selectedVal: this.formModel.gameStartVal });
    }

    submitTournamentOptions(): void {
        if (this.formValid()) {
            this.storeTournamentOptions(this.formModel);
            // console.log(JSON.stringify(this._appService.tournamentOptions));
            this.startGame();
        }
    }

    formValid(): boolean {
        if (!this.formModel.player1Name || !this.formModel.player2Name
            || !this.formModel.noOfGames || !this.formModel.gameStartVal) {
            return false;
        }
        return true;
    }

    storeTournamentOptions(formModel): void {
        this._appService.tournamentOptions = new TournamentModel();
        let player1 = new PlayerModel();
        player1.info = new UserModel();
        player1.info.id = this.generateRandomID();
        player1.info.name = formModel.player1Name;
        player1.info.avatar_icon = PLAYERS_ICONS_ARR[0].avatar_icon;
        player1.info.avatar_bg_color = PLAYERS_ICONS_ARR[0].avatar_bg_color;
        this._appService.tournamentOptions.players.push(player1);
        let player2 = new PlayerModel();
        player2 = new PlayerModel();
        player2.info = new UserModel();
        player2.info.id = this.generateRandomID();
        player2.info.name = formModel.player2Name;
        player2.info.avatar_icon = PLAYERS_ICONS_ARR[1].avatar_icon;
        player2.info.avatar_bg_color = PLAYERS_ICONS_ARR[1].avatar_bg_color;
        this._appService.tournamentOptions.players.push(player2);
        this._appService.tournamentOptions.noOfGames = formModel.noOfGames;
        this._appService.tournamentOptions.gameStartTurnVal = formModel.gameStartVal;
    }
}