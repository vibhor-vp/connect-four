export class Util {
    generateRandomID(): string {
        return Math.floor(Math.random() * 1000000).toString();
    }
}