import { Direction } from "../global";
import { ToyRobot } from "./ToyRobot";

export class GameController {
    private _commands: string[] = [""]
    private _toyRobot = new ToyRobot()

    constructor(commands: string[]) {
        this._commands = commands;
    }

    public start() {
        let gameStarted = false;

        this._commands.map(command => {
            if (command.toUpperCase().includes('PLACE') && !gameStarted) {
                gameStarted = true
            }

            if (gameStarted) {
                this.executeCommand(command)
            }
        })
    }

    protected executeCommand(command: string) {
        switch (command.toUpperCase()) {
            case 'MOVE':
                this._toyRobot.move()
                break;
            case 'LEFT':
                this._toyRobot.left()
                break;
            case 'RIGHT':
                this._toyRobot.right()
                break;
            case 'REPORT':
                this._toyRobot.report()
                break;
            default: {
                if (command.toUpperCase().includes('PLACE')) {
                    this.handlePlaceCommand(command)
                }
            }
        }
    }

    protected handlePlaceCommand(command: string) {
        let coordenates = command.replace('PLACE', '').trim().split(',')
        let x = parseInt(coordenates.shift() || "0");
        let y = parseInt(coordenates.shift() || "0");
        let direction = coordenates.shift() as Direction;

        this._toyRobot.place(x, y, direction)
    }

    public report() {
        return this._toyRobot.report()
    }
}