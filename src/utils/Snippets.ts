function getStructures(type: string): AnyStructure[] | undefined {
  let myStructures

  for (const name in Game.rooms) {
    myStructures = Game.rooms[name].find(FIND_MY_STRUCTURES, {
      filter: {
        structureType: type
      }
    })
  }

  return myStructures
}

export { getStructures }
