export default class cfgBuilder {
  public static active = true
  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]
  public static total = 0
  public static source = 0

  public static get current(): number {
    const current_builders = _.filter(Game.creeps, creep => creep.memory.role === "builder")
    return current_builders.length
  }
}
