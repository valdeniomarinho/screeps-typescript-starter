import Actions from "utils/Actions"

export default class RoleHauler {
  public static role = "hauler"
  public static active = false
  public static total = 0
  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]

  public static get current(): number {
    const current_haulers = _.filter(Game.creeps, creep => creep.memory.role === "hauler")
    return current_haulers.length
  }

  public static run(creep: Creep, restpoint: string): void {
    creep.memory.restpoint = restpoint
    console.log("1")

    if (this.active) {
      if (creep.store.getFreeCapacity() > 0) {
        Actions.loadEnergy(creep)
      } else {
        Actions.transfer(creep, RESOURCE_ENERGY)
      }
    }
  }
}
