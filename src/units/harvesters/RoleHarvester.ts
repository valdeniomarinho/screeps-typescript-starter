import Actions from "utils/Actions"

export default class RoleHarvester {
  public static role = "harvester"
  public static active = false
  public static total = 0
  public static source = 0
  public static model: BodyPartConstant[] = [
    WORK,
    CARRY,
    MOVE
  ]

  public static get current(): number {
    const current_harvesters = _.filter(
      Game.creeps,
      creep => creep.memory.role === "harvester"
    )
    return current_harvesters.length
  }

  public static run(
    creep: Creep,
    restpoint: string
  ): void {
    const depots = creep.room.find(
      FIND_STRUCTURES,
      {
        filter: structure => {
          return (
            (structure.structureType ===
              STRUCTURE_EXTENSION ||
              structure.structureType ===
                STRUCTURE_SPAWN ||
              structure.structureType ===
                STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(
              RESOURCE_ENERGY
            ) > 0
          )
        }
      }
    )

    if (this.active && depots.length) {
      if (creep.store.getFreeCapacity() > 0) {
        Actions.mine(creep, this.source)
      } else {
        Actions.transfer(creep, depots)
      }
    } else {
      Actions.rest(creep, restpoint)
    }
  }
}
