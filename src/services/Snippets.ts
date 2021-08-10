function getStructures<TStructure extends AnyStructure>(
  type: StructureConstant,
  roomName?: string
): TStructure[] {
  const myStructures: AnyStructure[] = []
  const rooms = roomName ? [Game.rooms[roomName]] : Object.keys(Game.rooms).map(room => Game.rooms[room])

  for (const room of rooms) {
    myStructures.push(
      ...room.find(FIND_MY_STRUCTURES, {
        filter: {
          structureType: type
        }
      })
    )
  }

  return myStructures as TStructure[]
}

export { getStructures }
