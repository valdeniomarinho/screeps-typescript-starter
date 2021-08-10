export default class Actions {
  public static build = (creep: Creep): void => {
    const constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES)

    if (constructionSites.length) {
      if (creep.build(constructionSites[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(constructionSites[0], {
          visualizePathStyle: {
            stroke: "#ffffff"
          }
        })
      }
    }
  }

  public static loadEnergy = (creep: Creep): void => {
    // const energyDropped = creep.room.find(FIND_DROPPED_RESOURCES)

    const energyTombstones = creep.room.find(FIND_TOMBSTONES, {
      filter: tombstone => {
        return tombstone.store.getUsedCapacity(RESOURCE_ENERGY) > 0
      }
    })

    const energyRuins = creep.room.find(FIND_RUINS, {
      filter: ruin => {
        return ruin.store.getUsedCapacity(RESOURCE_ENERGY) > 0
      }
    })

    const energyDepots = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          structure.structureType === STRUCTURE_CONTAINER &&
          structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
        )
      }
    })

    const energyPlaces = [...energyTombstones, ...energyRuins, ...energyDepots]

    if (energyPlaces.length) {
      if (creep.withdraw(energyPlaces[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(energyPlaces[0], {
          reusePath: 5,
          visualizePathStyle: { stroke: "#88882b" }
        })
      }
    }

    const dropped = creep.room.find(FIND_DROPPED_RESOURCES)

    if (dropped.length) {
      if (creep.pickup(dropped[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(dropped[0], {
          reusePath: 5,
          visualizePathStyle: { stroke: "#88882b" }
        })
      }
    }

    if (energyPlaces.length === 0 && dropped.length === 0) {
      Actions.rest(creep)
    }
  }

  public static mine = (creep: Creep): void => {
    const energySources = creep.room.find(FIND_SOURCES)

    energySources.forEach(src => {
      if (creep.harvest(src) !== ERR_NOT_ENOUGH_RESOURCES) {
        if (creep.moveTo(src) !== ERR_NO_PATH) creep.memory.sourceId = src.id
      }
    })

    const sourceId = Game.getObjectById(creep.memory.sourceId as Id<Source>)

    if (creep.memory.sourceId) {
      if (sourceId !== null) {
        if (creep.harvest(sourceId) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sourceId, {
            reusePath: 5,
            visualizePathStyle: { stroke: "#88882b" }
          })
        }
      }
    } else {
      console.log(creep.name, ": No sources weren't found!")
    }
  }

  public static repair = (creep: Creep): void => {
    const damagedStructures = creep.room.find(FIND_STRUCTURES, {
      filter: structure => structure.hits < structure.hitsMax
    })

    if (damagedStructures.length) {
      damagedStructures.map(structure => {
        if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure)
        }
      })
    }
  }

  public static rest = (creep: Creep): void => {
    creep.moveTo(Game.flags[creep.memory.restpoint as string].pos, {
      visualizePathStyle: { stroke: "#00ffff" }
    })
  }

  public static transfer = (creep: Creep, resource: ResourceConstant): void => {
    if (resource === RESOURCE_ENERGY) {
      const destinations = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          )
        }
      })

      if (Room.prototype.storage !== undefined) {
        destinations.push(Room.prototype.storage)
      }

      if (destinations[0]) {
        if (creep.transfer(destinations[0], resource) === ERR_NOT_IN_RANGE) {
          creep.moveTo(destinations[0], {
            visualizePathStyle: { stroke: "#ffffff" }
          })
        }
      }
    }
  }

  public static upgrade = (creep: Creep): void => {
    if (creep.room.controller && creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: { stroke: "#ffffff" }
      })
    }
  }
}
