export default class Actions {
  public static build = (creep: Creep): void => {
    const constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES)

    if (constructionSites.length) {
      if (creep.build(constructionSites[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(constructionSites[0], {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        })
      }
    }
  }

  public static loadResources = (creep: Creep): void => {
    // load from structures
    const resourcesPlaces = []

    const tombResource = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
      filter: tombstone => {
        return tombstone.store.getUsedCapacity(RESOURCE_ENERGY) > 0
      }
    })

    if (tombResource !== null) resourcesPlaces.push(tombResource)

    const ruinResource = creep.pos.findClosestByPath(FIND_RUINS, {
      filter: ruin => {
        return ruin.store.getUsedCapacity(RESOURCE_ENERGY) > 0
      }
    })

    if (ruinResource !== null) resourcesPlaces.push(ruinResource)

    const depotResource = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: structure => {
        return (
          structure.structureType === STRUCTURE_CONTAINER &&
          structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
        )
      }
    })

    if (depotResource !== null) resourcesPlaces.push(depotResource)

    if (resourcesPlaces.length) {
      if (creep.withdraw(resourcesPlaces[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(resourcesPlaces[0], {
          reusePath: 5,
          visualizePathStyle: { stroke: '#88882b' }
        })
      }
    }

    // load from dropped
    const droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)

    if (droppedResource !== null) {
      if (creep.pickup(droppedResource) === ERR_NOT_IN_RANGE) {
        creep.moveTo(droppedResource, {
          reusePath: 5,
          visualizePathStyle: { stroke: '#88882b' }
        })
      }
    }

    // load from storage
    if (
      resourcesPlaces.length === 0 &&
      droppedResource === null &&
      creep.room.storage &&
      creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0
    ) {
      if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.storage, {
          reusePath: 5,
          visualizePathStyle: { stroke: '#88882b' }
        })
      }
    }

    // no res && creep NOT empty
    if (
      resourcesPlaces.length === 0 &&
      droppedResource === null &&
      creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0
    ) {
      Actions.transfer(creep, RESOURCE_ENERGY)
    }

    // no res && creep empty
    if (
      resourcesPlaces.length === 0 &&
      droppedResource === null &&
      creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0
    ) {
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
            visualizePathStyle: { stroke: '#88882b' }
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
      visualizePathStyle: { stroke: '#00ffff' }
    })
  }

  public static transfer = (creep: Creep, resource: ResourceConstant): void => {
    if (resource === RESOURCE_ENERGY) {
      // set transfer options
      let destination = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_EXTENSION ||
              (structure.structureType === STRUCTURE_TOWER &&
                structure.store.getUsedCapacity(RESOURCE_ENERGY) < 500)) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          )
        }
      })

      // set transfer to storage
      if (destination === null && creep.room.storage !== undefined) {
        destination = creep.room.storage
      }

      // do transfer
      if (destination) {
        if (creep.transfer(destination, resource) === ERR_NOT_IN_RANGE) {
          creep.moveTo(destination, {
            visualizePathStyle: { stroke: '#ffffff' }
          })
        }
      }
    }
  }

  public static upgrade = (creep: Creep): void => {
    if (creep.room.controller && creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: { stroke: '#ffffff' }
      })
    }
  }
}
