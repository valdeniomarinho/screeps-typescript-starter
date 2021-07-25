import Actions from "utils/Actions"

const roleHarvester = {
  run(creep: Creep, active: boolean, actions: Actions, source: number): void {
    if (active) {
      // TARGETS TO UNLOAD ENERGY
      const depots = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          )
        }
      })

      if (creep.store.getFreeCapacity() > 0 && depots.length) {
        actions.miner(creep, source)
      } else if (!creep.store.getFreeCapacity() && depots.length) {
        actions.transfer(creep, depots)
      } else {
        actions.rest(creep, "Rest1")
      }
    } else {
      actions.rest(creep, "Rest1")
    }
  }
}

export default roleHarvester
