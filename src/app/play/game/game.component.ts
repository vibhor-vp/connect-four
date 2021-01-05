import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { GAME_PLAYING_MODES, PLAYER_START_OPTIONS_ENUM } from 'src/app/constants';
import { Util } from 'src/app/utils/common-utils';
import { PlayerModel } from 'src/models/player.model';
import { TournamentModel } from 'src/models/tournament.model';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent extends Util implements OnInit {
  @Input() gameWinSize = 4;
  @Input() gamePlayingMode = GAME_PLAYING_MODES.TWO_PLAYERS;
  public gameContainerArr: Array<GameSlotModel | any>;
  test = '50%';
  test1 = '30%';
  tournamentOptions: TournamentModel;
  slotClickFn: Function;
  clickTrackArr = [];
  _gameCompleted: boolean;
  @Output('gameCompleted') gameCompleted: EventEmitter<any> = new EventEmitter();
  @Output('tournamentCompleted') tournamentCompleted: EventEmitter<any> = new EventEmitter();

  constructor(private _appService: AppService) {
    super();
  }

  ngOnInit(): void {
    this._createEmptyGameContainer();
    this.tournamentOptions = this._appService.tournamentOptions;
    switch (this.gamePlayingMode) {
      case GAME_PLAYING_MODES.TWO_PLAYERS:
        this.setCurrentPlayersTurnForTwoPlayers();
        this.slotClickFn = this.handleTwoPlayerModeClick;
        break;
    }
  }

  _createEmptyGameContainer(): void {
    this.gameContainerArr = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null]
    ];
  }

  setCurrentPlayersTurnForTwoPlayers(): void {
    switch (this.tournamentOptions.gameStartTurnVal) {
      case PLAYER_START_OPTIONS_ENUM.ALTERNATE:
        if (this.tournamentOptions.lastPlayerStartTurnID) {
          if (this.tournamentOptions.players[0].info.id === this.tournamentOptions.lastPlayerStartTurnID) {
            this.tournamentOptions.players[0].currentTurn = false;
            this.tournamentOptions.players[1].currentTurn = true;
            this.alertPlayerTurnMsg(this.tournamentOptions.players[1]);
            this.tournamentOptions.lastPlayerStartTurnID = this.tournamentOptions.players[1].info.id;
          } else {
            this.tournamentOptions.players[0].currentTurn = true;
            this.tournamentOptions.players[1].currentTurn = false;
            this.alertPlayerTurnMsg(this.tournamentOptions.players[0]);
            this.tournamentOptions.lastPlayerStartTurnID = this.tournamentOptions.players[0].info.id;
          }
        } else {
          this.tournamentOptions.players[0].currentTurn = true;
          setTimeout(() => {
            this.alertPlayerTurnMsg(this.tournamentOptions.players[0]);
          })
          this.tournamentOptions.lastPlayerStartTurnID = this.tournamentOptions.players[0].info.id;
        }
        break;
      case PLAYER_START_OPTIONS_ENUM.LOOSER_FIRST:
        if (this.tournamentOptions.lastGameWinnerID) {
          if (this.tournamentOptions.players[0].info.id === this.tournamentOptions.lastGameWinnerID) {
            this.tournamentOptions.players[0].currentTurn = false;
            this.tournamentOptions.players[1].currentTurn = true;
            this.alertPlayerTurnMsg(this.tournamentOptions.players[1]);
            this.tournamentOptions.lastPlayerStartTurnID = this.tournamentOptions.players[1].info.id;
          } else {
            this.tournamentOptions.players[0].currentTurn = true;
            this.tournamentOptions.players[1].currentTurn = false;
            this.alertPlayerTurnMsg(this.tournamentOptions.players[0]);
            this.tournamentOptions.lastPlayerStartTurnID = this.tournamentOptions.players[0].info.id;
          }
        } else {
          this.tournamentOptions.players[0].currentTurn = true;
          setTimeout(() => {
            this.alertPlayerTurnMsg(this.tournamentOptions.players[0]);
          })
          this.tournamentOptions.lastPlayerStartTurnID = this.tournamentOptions.players[0].info.id;
        }
        break;
      case PLAYER_START_OPTIONS_ENUM.PLAYER1_ALWAYS:
        this.tournamentOptions.players[0].currentTurn = true;
        this.tournamentOptions.players[1].currentTurn = false;
        setTimeout(() => {
          this.alertPlayerTurnMsg(this.tournamentOptions.players[0]);
        })
        this.tournamentOptions.lastPlayerStartTurnID = this.tournamentOptions.players[0].info.id;
        break;
      case PLAYER_START_OPTIONS_ENUM.PLAYER2_ALWAYS:
        this.tournamentOptions.players[0].currentTurn = false;
        this.tournamentOptions.players[1].currentTurn = true;
        setTimeout(() => {
          this.alertPlayerTurnMsg(this.tournamentOptions.players[1]);
        })
        this.tournamentOptions.lastPlayerStartTurnID = this.tournamentOptions.players[1].info.id;
        break;
      case PLAYER_START_OPTIONS_ENUM.WINNER_FIRST:
        if (this.tournamentOptions.lastGameWinnerID) {
          if (this.tournamentOptions.players[0].info.id === this.tournamentOptions.lastGameWinnerID) {
            this.tournamentOptions.players[0].currentTurn = true;
            this.tournamentOptions.players[1].currentTurn = true;
            this.alertPlayerTurnMsg(this.tournamentOptions.players[0]);
            this.tournamentOptions.lastPlayerStartTurnID = this.tournamentOptions.players[0].info.id;
          } else {
            this.tournamentOptions.players[0].currentTurn = false;
            this.tournamentOptions.players[1].currentTurn = true;
            this.alertPlayerTurnMsg(this.tournamentOptions.players[1]);
            this.tournamentOptions.lastPlayerStartTurnID = this.tournamentOptions.players[1].info.id;
          }
        } else {
          this.tournamentOptions.players[0].currentTurn = true;
          setTimeout(() => {
            this.alertPlayerTurnMsg(this.tournamentOptions.players[0]);
          })
          this.tournamentOptions.lastPlayerStartTurnID = this.tournamentOptions.players[0].info.id;
        }
        break;
    }
  }

  slotClick(row, col): void {
    if (!this._gameCompleted) {
      this.slotClickFn(row, col);
    }
  }

  handleTwoPlayerModeClick(row, col): void {
    let index;
    for (index = this.gameContainerArr.length - 1; index >= 0; index--) {
      if (this.gameContainerArr[index][col] === null) {
        let player1 = this.tournamentOptions.players[0];
        let player2 = this.tournamentOptions.players[1];
        if (player1.currentTurn) {
          this.gameContainerArr[index][col] = this.getGameSlotObj(player1);
          player1.currentTurn = false;
          player2.currentTurn = true;
          // this.clickTrackObj.player1_click_arr.push([index, col]);

        } else {
          this.gameContainerArr[index][col] = this.getGameSlotObj(player2);
          player2.currentTurn = false;
          player1.currentTurn = true;
          // this.clickTrackObj.player2_click_arr.push([index, col]);
        }
        this.clickTrackArr.push([index, col]);
        break;
      }
      if (index === 0) {
        return;
      }
    }
    this.checkDiagonally(index, col)
    // let gameStatus = this.isGameWon(index, col);
    // if (gameStatus && gameStatus._isGameWon) {
    //   gameStatus.rowColArr && gameStatus.rowColArr.forEach((indexes) => {
    //     this.gameContainerArr[indexes[0]][indexes[1]].select = true;
    //   })
    //   this._gameCompleted = true;
    //   setTimeout(() => {
    //     // alert('GAME WON');
    //     this.gameCompleted.emit(this.gameContainerArr[index][col]);
    //   }, 200)
    // }
  }

  getGameSlotObj(player): any {
    return {
      player_id: player.info.id,
      icon: player.info.avatar_icon,
      icon_bg_color: player.info.avatar_bg_color
    };
  }

  isGameWon(row, col): gameStatusModel {
    let _horizontalStatus = this.checkHorizontally(row, col);
    let _verticalStatus = this.checkVertically(row, col);
    let _diagonalStatus = this.checkDiagonally(row, col);
    return _horizontalStatus._isGameWon ? _horizontalStatus : _verticalStatus// (_verticalStatus._isGameWon ? _verticalStatus : _diagonalStatus);
    // return this.checkHorizontally(row, col)._isGameWon?this.checkHorizontally(row, col):false
    //   ||
    //   this.checkVertically(row, col)._isGameWon?this.checkVertically(row, col):false
    //   ||
    // return this.checkDiagonally(row, col)
  }

  checkHorizontally(row, col): gameStatusModel {
    let obj = this.gameContainerArr[row][col];
    // return (val === this.gameContainerArr[row][col + 1] &&
    //   val === this.gameContainerArr[row][col + 2] &&
    //   val === this.gameContainerArr[row][col + 3]) ||
    //   (val === this.gameContainerArr[row][col - 1] &&
    //     val === this.gameContainerArr[row][col - 2] &&
    //     val === this.gameContainerArr[row][col - 3]);

    // let count;
    // for (let i = 0; i < this.gameWinSize; i++) {
    //   count = 0;
    //   for (let j = (col - i) < 0 ? col : (col - i); j <= (col + i); j++) {
    //     if (val === this.gameContainerArr[row][j]) {
    //       count++;
    //     }
    //   }
    // }
    // return count === this.gameWinSize;

    let i = col < (this.gameWinSize - 1) ? 0 : (col - (this.gameWinSize - 1)),
      j = col < (this.gameWinSize - 1) ? (this.gameWinSize - 1) : col;
    let count;
    while (i <= col) {
      count = 0;
      let _rowColArr = [];
      for (let k = i; k <= j; k++) {
        if (this.gameContainerArr[row][k] && obj.player_id === this.gameContainerArr[row][k].player_id) {
          count++;
          _rowColArr.push([row, k])
        }
      }
      if (count === this.gameWinSize) {
        return {
          _isGameWon: true,
          rowColArr: _rowColArr
        };
      }
      i++; j++;
    }
    return {
      _isGameWon: false,
      rowColArr: null
    }
  }

  checkVertically(row, col): gameStatusModel {
    let obj = this.gameContainerArr[row][col]
    if (row <= this.gameWinSize &&
      this.gameContainerArr[row + 1][col] && obj.player_id === this.gameContainerArr[row + 1][col].player_id &&
      this.gameContainerArr[row + 2][col] && obj.player_id === this.gameContainerArr[row + 2][col].player_id &&
      this.gameContainerArr[row + 3][col] && obj.player_id === this.gameContainerArr[row + 3][col].player_id) {
      return {
        _isGameWon: true,
        rowColArr: [[row, col], [row + 1, col], [row + 2, col], [row + 3, col]]
      }
    };
    return {
      _isGameWon: false,
      rowColArr: null
    }
  }

  checkDiagonally(row, col): gameStatusModel {
    let obj = this.gameContainerArr[row][col];
    let www = (Math.min(col, row)) > (this.gameWinSize - 1) ? (this.gameWinSize - 1) : Math.min(col, row);
    let i = [
      row - www,
      col - www
    ];
    let qqq = (Math.min((this.gameContainerArr.length - 1 - col), (this.gameContainerArr.length - 1 - row)))
    let ttt = qqq > (this.gameWinSize - 1) ? (this.gameWinSize - 1) : qqq;
    let j = [
      row + ttt,
      col + ttt];
    let eee = (Math.min((this.gameContainerArr.length - 1 - col), (row)) > (this.gameWinSize - 1) ?
      (this.gameWinSize - 1) : (Math.min((this.gameContainerArr.length - 1 - col), (row))));
    let aaa = (Math.min((this.gameContainerArr.length - 1 - row), (col)) > (this.gameWinSize - 1) ?
      (this.gameWinSize - 1) : (Math.min((this.gameContainerArr.length - 1 - row), (col))));
    let i1 = [row + aaa, col - aaa];
    let j1 = [row - eee, col + eee];
    // console.log('i:' + i)
    // console.log('j:' + j)
    // console.log('i1:' + i1)
    // console.log('j1:' + j1)
    let count;
    let _rowColArr = [];
    for (let k = i[0], z = i[1]; k <= row && z <= col; k++, z++) {
      count = 0; _rowColArr = [];
      for (let d = 0; d < this.gameWinSize; d++) {
        let curRow = k + d;
        let curCol = z + d;
        if (curRow <= j[0] && curCol <= j[1] && this.gameContainerArr[k + d][z + d] && obj.player_id === this.gameContainerArr[k + d][z + d].player_id) {
          count++;
          _rowColArr.push([(k + d), (z + d)])
        }
      }
      if (count === this.gameWinSize) {
        // alert('WON')
        return {
          _isGameWon: true,
          rowColArr: _rowColArr
        };
      }
    }
    for (let k = i1[0], z = i1[1]; k >= row && z <= col; k--, z++) {
      count = 0; _rowColArr = [];
      for (let d = 0; d < this.gameWinSize; d++) {

        let curRow = k - d;
        let curCol = z + d;
        if (curRow >= j1[0] && curCol <= j1[1] && this.gameContainerArr[curRow][curCol] && obj.player_id === this.gameContainerArr[curRow][curCol].player_id) {
          count++;
          _rowColArr.push([curRow, curCol])
        }
      }
      if (count === this.gameWinSize) {
        // alert('WON')
        return {
          _isGameWon: true,
          rowColArr: _rowColArr
        };
      }
    }
    return {
      _isGameWon: false,
      rowColArr: null
    };
  }

  undo(): void {
    if (this.clickTrackArr.length) {
      let lastPos = this.clickTrackArr.pop();
      let lastTurnPlayerID = this.gameContainerArr[lastPos[0]][lastPos[1]].player_id;
      this.tournamentOptions.players.forEach(player => {
        player.currentTurn = (player.info.id === lastTurnPlayerID) ? true : false;
      })
      this.gameContainerArr[lastPos[0]][lastPos[1]] = null;
    }
  }

  resetGame(): void {
    this._createEmptyGameContainer();
    this.setCurrentPlayersTurnForTwoPlayers();
    this._gameCompleted = false;
  }

  alertPlayerTurnMsg(player: PlayerModel): void {
    alert(player.info.name + ' starts');
  }

}

export class GameSlotModel {
  player_id: string;
  icon: string;
  icon_bg_color: string
}

class gameStatusModel {
  _isGameWon: boolean;
  rowColArr: Array<Array<number>>;
}
