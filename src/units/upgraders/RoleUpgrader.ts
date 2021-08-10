import Actions from 'services/Actions'

export default class RoleUpgrader {
  public static get role(): string {
    return 'upgrader'
  }
  public static active = false
  public static total = 0

  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]

  public static get current(): number {
    return Object.keys(Game.creeps).filter(creep => Game.creeps[creep].memory.role === 'upgrader').length
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
        Actions.loadResources(creep)
      }
    } else {
      Actions.rest(creep)
    }
  }
}
