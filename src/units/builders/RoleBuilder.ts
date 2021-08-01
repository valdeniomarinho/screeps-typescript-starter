import Actions from "utils/Actions"

export default class RoleBuilder {
  public static get role(): string {
    return "builder"
  }

  public static active = false
  public static total = 0
  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]

  public static get current(): number {
    const currentHarvesters = Object.keys(Game.creeps).filter(
      creep => Game.creeps[creep].memory.role === "builder"
    )

    return currentHarvesters.length
  }

  public static run(creep: Creep, restpoint: string): void {
    creep.memory.restpoint = restpoint

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
        Actions.mine(creep)
      }
    } else {
      Actions.rest(creep)
    }
  }
}
