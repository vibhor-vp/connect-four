import { UserModel } from "./user.model";

export class PlayerModel {
    info: UserModel;
    currentTurn?: boolean;
    gamesWon?: number = 0;
}