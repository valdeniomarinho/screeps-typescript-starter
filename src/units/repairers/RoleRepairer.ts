import Actions from "utils/Actions"

export default class RoleRepairer {
  public static role = "repairer"
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
      creep => creep.memory.role === this.role
    )
    return current_harvesters.length
  }

  public static run(
    creep: Creep,
    restpoint: string
  ): void {
    const hasDamagedStructures = creep.room.find(
      FIND_STRUCTURES,
      {
        filter: structure =>
          structure.hits < structure.hitsMax
      }
    )

    if (
      this.active &&
      hasDamagedStructures.length
    ) {
      if (
        creep.memory.repairer &&
        creep.store[RESOURCE_ENERGY] === 0
      ) {
        creep.memory.repairer = false
      }
      if (
        !creep.memory.repairer &&
        creep.store.getFreeCapacity() === 0
      ) {
        creep.memory.repairer = true
      }

      if (creep.memory.repairer) {
        Actions.repair(creep)
      } else {
        Actions.mine(creep, this.source)
      }
    } else {
      Actions.rest(creep, restpoint)
    }
  }
}
