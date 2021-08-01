import Actions from "utils/Actions"

export default class RoleHarvester {
  public static role = "harvester"
  public static active = false
  public static total = 0

  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]

  public static get current(): number {
    const current_harvesters = _.filter(Game.creeps, creep => creep.memory.role === "harvester")
    return current_harvesters.length
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
