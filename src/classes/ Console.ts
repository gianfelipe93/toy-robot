import { program } from 'commander';
import { ToyRobot } from './ToyRobot';
import { Direction } from '../global';
import * as readline from 'readline';
import process from 'process';

export class Console {
  private _toyRobot = new ToyRobot()
  private _active = false
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  private executeCommand(callback: () => void) {
    if (this._active) {
      callback()
    }
  }

  public start() {
    program
      .command('PLACE <x>,<y>,<direction>')
      .action((a: string) => this.handlePlaceCommand(a));

    program
      .command('MOVE')
      .action(() => this.executeCommand(() => this._toyRobot.move()));

    program
      .command('LEFT')
      .action(() => this.executeCommand(() => this._toyRobot.left()));

    program
      .command('RIGHT')
      .action(() => this.executeCommand(() => this._toyRobot.right()));

    program
      .command('REPORT')
      .action(() => this.executeCommand(() => this._toyRobot.report()));

    program
      .command('START')
      .action(() => console.log('Toy Robot simulator started'));

    program
      .command('EXIT')
      .action(() => {
        console.log('Exiting Toy Robot simulator...');
        process.exit(0);
      });

    program.on('command:*', (unknownCommand) => {
      console.error(`Invalid command: ${unknownCommand[0]}`);
      this.rl.prompt();
    });

    program.parse(process.argv)

    this.rl.prompt();

    this.rl.on('line', (input: string) => {
      const args = input.trim().split(' ');
      program.parse(['node', 'your-script-name', ...args]); // Adjust 'your-script-name' if needed
      this.rl.prompt();
    }).on('close', () => {
      console.log('Exiting Toy Robot simulator...');
      process.exit(0);
    })
  }

  private handlePlaceCommand(command: string) {
    let coordenates = command.replace('PLACE', '').trim().split(',')

    if (coordenates.length < 3) {
      console.log("PLACE COMMANDS REQUIRED X,Y,DIRECTION, FOR EXAMPLE, PLACE 1,2,NORTH");
    } else {
      this._active = true
      let x = parseInt(coordenates.shift() || "0");
      let y = parseInt(coordenates.shift() || "0");
      let direction = coordenates.shift() as Direction;

      this._toyRobot.place(x, y, direction)
    }
  }
}