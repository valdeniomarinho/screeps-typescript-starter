export default class cfgHarvester {
  public static active = true
  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]
  public static total = 0
  public static source = 0

  public static get current(): number {
    const current_harvesters = _.filter(Game.creeps, creep => creep.memory.role === "harvester")
    return current_harvesters.length
  }
}
