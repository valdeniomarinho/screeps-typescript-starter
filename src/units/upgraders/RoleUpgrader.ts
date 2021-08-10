import Actions from "services/Actions"

export default class RoleUpgrader {
  public static role = "upgrader"
  public static active = false
  public static total = 0

  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]

  public static get current(): number {
    const current_harvesters = _.filter(Game.creeps, creep => creep.memory.role === "upgrader")
    return current_harvesters.length
  }

  public static run(creep: Creep, restpoint: string): void {
    creep.memory.restpoint = restpoint
    if (this.active) {
      if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.upgrading = false
      }
      if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
        creep.memory.upgrading = true
      }

      if (creep.memory.upgrading) {
        Actions.upgrade(creep)
      } else {
        Actions.loadEnergy(creep)
      }
    } else {
      Actions.rest(creep)
    }
  }
}
