import { describe, it, expect, beforeEach } from '@jest/globals';
import { GameController } from '../GameController';

describe('integration tests for GameController', () => {
  let gameController = null

  beforeEach(() => {
    gameController = null
  })

  it('Single Valid Placement and Movement', () => {
    const commands = ["PLACE 0,0,NORTH", "MOVE"]
    gameController = new GameController(commands)

    gameController.start()

    expect(gameController.report()).toBe("0,1,NORTH")
  })

  it('Single Valid Placement and Rotation', () => {
    const commands = ["PLACE 1,2,EAST", "LEFT"]
    gameController = new GameController(commands)

    gameController.start()

    expect(gameController.report()).toBe("1,2,NORTH")
  })

  it('Ignoring Commands Before Placement', () => {
    const commands = ["MOVE", "LEFT", "PLACE 3,1,SOUTH"]
    gameController = new GameController(commands)

    gameController.start()

    expect(gameController.report()).toBe("3,1,SOUTH")
  })

  it('Invalid Placement - Out of Bounds', () => {
    const commands = ["PLACE 6,3,WEST"]
    gameController = new GameController(commands)

    gameController.start()

    expect(gameController.report()).toBe("4,3,WEST")
  })

  it('Multiple Movements', () => {
    const commands = ["PLACE 1,1,EAST", "MOVE", "MOVE", "MOVE"]
    gameController = new GameController(commands)

    gameController.start()

    expect(gameController.report()).toBe("4,1,EAST")
  })

  it('Combination of Movements and Rotations', () => {
    const commands = ["PLACE 0,0,NORTH", "MOVE", "RIGHT", "MOVE", "MOVE", "LEFT", "MOVE"]
    gameController = new GameController(commands)

    gameController.start()

    expect(gameController.report()).toBe("2,2,NORTH")
  })

  it('Multiple Placements', () => {
    const commands = ["PLACE 0,0,NORTH", "MOVE", "PLACE 2,2,WEST"]
    gameController = new GameController(commands)

    gameController.start()

    expect(gameController.report()).toBe("2,2,WEST")
  })

  it('Ignoring Invalid Commands Mid-Sequence', () => {
    const commands = ["PLACE 1,2,EAST", "MOVE", "LEFTS", "MOVE"]
    gameController = new GameController(commands)

    gameController.start()

    expect(gameController.report()).toBe("3,2,EAST")
  })
})