import Actions from "utils/Actions"

export default class RoleBuilder {
  public static active = false
  public static total = 0
  public static source = 0
  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]

  public static get current(): number {
    const current_harvesters = _.filter(Game.creeps, creep => creep.memory.role === "harvester")
    return current_harvesters.length
  }

  public static run(creep: Creep, restpoint: string): void {
    if (this.active) {
      if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.building = false
      }
      if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
        creep.memory.building = true
      }

      if (creep.memory.building) {
        Actions.build(creep)
      } else {
        Actions.miner(creep, this.source)
      }
    } else {
      Actions.rest(creep, restpoint)
    }
  }
}
