import { GameController } from "./src/classes/GameController"

const commands = [
  "PLACE 1,2,EAST",
  "MOVE",
  "MOVE",
  "LEFT",
  "MOVE",
  "REPORT"
]

const controller = new GameController(commands)
controller.start()