class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let fromOriginal = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      fromOriginal++;
      currentVampire = currentVampire.creator;
    }
    return fromOriginal;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/


  // commonAncestor(vampire) {
  //   let currentVampire = this;
  //   let vampireToCompare = vampire;
  //
  //   let currentAncestors = [];
  //   let vampireToCompareAncestors = [];
  //   let commonAncestors = [];
  //
  //   while (currentVampire.creator) {
  //     currentAncestors.push(currentVampire.creator);
  //     currentVampire = currentVampire.creator;
  //   }
  //
  //   while (vampireToCompare.creator) {
  //     vampireToCompareAncestors.push(vampireToCompare.creator);
  //     vampireToCompare = vampireToCompare.creator;
  //   }
  //   for (const ancestor of currentAncestors) {
  //     if (vampireToCompareAncestors.includes(ancestor)) {
  //       commonAncestors.push(ancestor);
  //     }
  //   }
  //
  //   return commonAncestors;
  // }
  // // Returns the closest common ancestor of two vampires.
  // // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // // For example:
  // // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  // closestCommonAncestorOriginal(vampire) {
  //   let currentVampire = this;
  //   let vampireToCompare = vampire;
  //
  //   // edge case 1: this and vampire are the same
  //   if (currentVampire === vampireToCompare) {
  //     return currentVampire;
  //   }
  //
  //   // edge case 2: one of the vampire is the root
  //   if (!currentVampire.creator) {
  //     return currentVampire;
  //   } else if (!vampireToCompare.creator) {
  //     return vampireToCompare;
  //   }
  //
  //   // if they share the same direct ancestor
  //   if (currentVampire.creator === vampireToCompare.creator) {
  //     return currentVampire.creator;
  //   }
  //
  //   // if one of them are the direct ancestor of another
  //   if (currentVampire.creator === vampireToCompare) {
  //     return vampireToCompare;
  //   } else if (currentVampire === vampireToCompare.creator){
  //     return currentVampire;
  //   }
  //
  //   if (currentVampire.isMoreSeniorThan(vampireToCompare)) {
  //     while (vampireToCompare.creator) { //if they are from the same line
  //       let ancestor = vampireToCompare.creator
  //       if (vampire === ancestor) {
  //         return vampire;
  //       }
  //       ancestor = ancestor.creator;
  //     }
  //     // they are from different line
  //     const ancestors = this.commonAncestor(currentVampire);
  //     let youngestAncestor = ancestors[0];
  //     for (const ancestor of ancestors) {
  //       if (ancestor.numberOfVampiresFromOriginal < youngestAncestor.numberOfVampiresFromOriginal) {
  //         youngestAncestor = ancestor;
  //       }
  //     }
  //     return youngestAncestor;
  //   }
  // }

  // improved version: first make this and vampire the same depth and compare their parent (since every node only have one parent)
  closestCommonAncestor(vampire) {
    let currentVampire = this;
    let vampireToCompare = vampire;
    let currentDepth = this.numberOfVampiresFromOriginal;
    let comparedDepth = vampireToCompare.numberOfVampiresFromOriginal;

    while (currentDepth > comparedDepth) {
      currentDepth--;
      currentVampire = currentVampire.creator;
    }

    while (currentDepth < comparedDepth) {
      comparedDepth--;
      vampireToCompare = vampireToCompare.creator;
    }

    if (currentVampire === vampireToCompare){
      return currentVampire;
    }

    while (currentVampire !== vampireToCompare) {
      currentVampire = currentVampire.creator;
      vampireToCompare = vampireToCompare.creator;
    }

    return currentVampire;

  }

}

module.exports = Vampire;


