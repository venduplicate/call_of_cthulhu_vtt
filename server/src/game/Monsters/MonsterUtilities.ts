// function getUniqueNumbers(amount: number, total: number) {
//   const numberArray = [];

//   for (let x = 0; x < amount; x++) {
//     numberArray.push(Math.floor(Math.random() * total));
//   }

//   const numberSet = new Set([...numberArray]);

//   if (numberSet.size < amount) {
//     this.getUniqueNumbers(amount, total);
//   }
//   return numberSet;
// }
// function getUniqueInvestigators(
//   positionSet: Set<number>,
//   investigators: InvestigatorFirestore[]
// ) {
//   const victimArray: InvestigatorFirestore[] = [];

//   positionSet.forEach((item: number, value: number) => {
//     victimArray.push(investigators[value]);
//   });
//   return victimArray;
// }
// function checkIfAttacksReached() {
//   return this.combat?.per_round == this.attacks_complete;
// }
// function incrementAttacksComplete() {
//   if (this.checkIfAttacksReached())
//     throw new MonsterError("Total Attacks Reached");
//   this.attacks_complete += 1;
// }
// function baseAttack(sessionId: string) {
//   try {
//     if (this.checkIfAttacksReached())
//       throw new MonsterError("Total Attacks Reached");
//     const diceRoll = roller.roll(
//       sessionId,
//       `${this.damage} + ${this.damage_bonus}`
//     );
//     return diceRoll;
//   } catch (error) {
//     if (error instanceof MonsterError) {
//       return error.message;
//     }
//   }
// }
// function subtractSanitySuccess(playerSanity: number) {
//   const diceRoll = roller.privateRoll(this.sanity_loss_success);
//   return playerSanity - diceRoll;
// }
// function subtractSanityFailure(playerSanity: number) {
//   const diceRoll = roller.privateRoll(this.sanity_loss_failure);
//   return playerSanity - diceRoll;
// }
