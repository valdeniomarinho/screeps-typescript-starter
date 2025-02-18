import Actions from 'services/Actions'

export default class RoleRepairer {
  public static get role(): string {
    return 'repairer'
  }
  public static active = false
  public static total = 0

  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]

  public static get current(): number {
    return Object.keys(Game.creeps).filter(creep => Game.creeps[creep].memory.role === 'repairer').length
  }

  public static run(creep: Creep, restpoint: string): void {
    creep.memory.restpoint = restpoint

    const hasDamagedStructures = creep.room.find(FIND_STRUCTURES, {
      filter: structure => structure.hits < structure.hitsMax
    })

    if (this.active && hasDamagedStructures.length) {
      if (creep.memory.repairer && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.repairer = false
      }
      if (!creep.memory.repairer && creep.store.getFreeCapacity() === 0) {
        creep.memory.repairer = true
      }

      if (creep.memory.repairer) {
        Actions.repair(creep)
      } else {
        Actions.mine(creep)
      }
    } else {
      Actions.rest(creep)
    }
  }
}
