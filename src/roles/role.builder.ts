import Actions from "actions/Actions"

const roleBuilder = {
  run(creep: Creep, active: boolean, actions: Actions, source: number, restpoint: string): void {
    if (active) {
      if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.building = false
      }
      if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
        creep.memory.building = true
      }

      if (creep.memory.building) {
        actions.build(creep)
      } else {
        actions.miner(creep, source)
      }
    } else {
      actions.rest(creep, restpoint)
    }
  }
}

export default roleBuilder
