import Actions from "services/Actions"

export default class RoleHauler {
  public static role = "hauler"
  public static active = false
  public static total = 0
  public static model: BodyPartConstant[] = [WORK, CARRY, MOVE]

  public static get current(): number {
    const currentHaulers = Object.keys(Game.creeps).filter(
      creep => Game.creeps[creep].memory.role === "hauler"
    )
    return currentHaulers.length
  }

  public static run(creep: Creep, restpoint: string): void {
    creep.memory.restpoint = restpoint

    if (this.active) {
      if (creep.store.getFreeCapacity() > 0) {
        Actions.loadEnergy(creep)
      } else {
        Actions.transfer(creep, RESOURCE_ENERGY)
      }
    }
  }
}
