import {DiceRoll,Parser} from "@dice-roller/rpg-dice-roller";

const notation = "2d100"

const roll = new DiceRoll("2d100")


const modArray = notation.split("+")

console.log(modArray)