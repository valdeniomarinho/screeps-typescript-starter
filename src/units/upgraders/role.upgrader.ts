import Actions from "utils/Actions"

const roleUpgrader = {
  run(creep: Creep, active: boolean, actions: Actions, source: number, restpoint: string): void {
    if (active) {
      if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.upgrading = false
      }
      if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
        creep.memory.upgrading = true
      }

      if (creep.memory.upgrading) {
        actions.upgrade(creep)
      } else {
        actions.miner(creep, source)
      }
    } else {
      actions.rest(creep, restpoint)
    }
  }
}

export default roleUpgrader
