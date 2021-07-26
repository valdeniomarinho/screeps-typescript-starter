import Actions from "utils/Actions"

export default class RoleBuilder {
  public static role = "builder"
  public static active = false
  public static total = 0
  public static source = 0
  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]

  public static get current(): number {
    const current_harvesters = _.filter(Game.creeps, creep => creep.memory.role === "builder")
    return current_harvesters.length
  }

  public static run(creep: Creep, restpoint: string): void {
    const hasConstructionSites = creep.room.find(FIND_CONSTRUCTION_SITES)

    if (this.active && hasConstructionSites.length) {
      if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.building = false
      }
      if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
        creep.memory.building = true
      }

      if (creep.memory.building) {
        Actions.build(creep)
      } else {
        Actions.mine(creep, this.source)
      }
    } else {
      Actions.rest(creep, restpoint)
    }
  }
}
