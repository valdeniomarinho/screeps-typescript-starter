import Actions from 'services/Actions'

export default class RoleHarvester {
  public static get role(): string {
    return 'harvester'
  }
  public static active = false
  public static total = 0

  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]

  public static get current(): number {
    return Object.keys(Game.creeps).filter(creep => Game.creeps[creep].memory.role === 'harvester')
      .length
  }

  public static run(creep: Creep, restpoint: string): void {
    creep.memory.restpoint = restpoint

    if (this.active) {
      Actions.mine(creep)
    } else {
      Actions.rest(creep)
    }
  }
}
