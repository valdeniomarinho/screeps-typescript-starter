export default class cfgUpgrader {
  public static active = true
  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]
  public static total = 0
  public static source = 0

  public static get current(): number {
    const current_upgraders = _.filter(Game.creeps, creep => creep.memory.role === "upgrader")
    return current_upgraders.length
  }
}
