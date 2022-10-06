import type { BaseMonster } from "./base";
interface CthulhuInterface extends BaseMonster {
  abilities: {regeneration: {desc: string,func: () => number}, rebirth: {desc: string}}
}
export const cthulhu: CthulhuInterface = {
  name: "Great Cthulhu, Master of R'lyeh",
  str: 700,
  con: 550,
  siz: 1050,
  dex: 105,
  int: 210,
  pow: 210,
  hp: 160,
  damage_bonus: "21d6",
  build: 22,
  magic_points: 42,
  move: 16,
  swim: 14,
  fly: 12,
  combat: {
    per_round: 2,
    fighting: 100,
    damage: "1d6 + 21d6",
    tactics:
      "Cthulhu is huge and will stomp, kick, and crush with his feet, clawed hands and tentacles.",
    attacks: [
      {
        name: "Scoop",
        desc: "Each round 1D3 investigators are scooped up in Cthulhu’s flabby claws to die hideously. If Cthulhu were just emerging from a vast hole or if he were to stoop over, the investigators might also be attacked by Cthulhu’s facial tentacles, which can grab four people per round and which can penetrate small openings.",
        short_desc: "1d3 investigators die",
      },
    ],
    armor: 21,
  },
  abilities: {
    regeneration: {
      desc: "Cthulhu regenerates 6 HP per round",
      func: () => {
        return cthulhu.hp + 6;
      },
    },
    rebirth: {
      desc:
        "At 0 hit points, Cthulhu bursts and dissolves into a disgusting, cloying greenish cloud, then immediately begins to reform. He needs 1D10+10 minutes to regain full solidity and, when he does, he then has a full 160 hit points again.",
    },
  },
  spells:
    "Knows hundreds of spells, but not Summon/Bind Nightgaunt and Contact Nodens; he might impart Contact Deep Ones or Contact Cthulhu via terrifying dreams.",
  sanity_loss: "1D10/1D100"
};
