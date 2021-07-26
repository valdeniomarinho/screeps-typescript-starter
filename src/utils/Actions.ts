export default class Actions {
  public static build = (creep: Creep): void => {
    const constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES)

    if (constructionSites.length) {
      if (creep.build(constructionSites[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(constructionSites[0], {
          visualizePathStyle: { stroke: "#ffffff" }
        })
      }
    }
  }

  public static mine = (creep: Creep, source: number): void => {
    const energySources = creep.room.find(FIND_SOURCES)

    // && creep.harvest(energySources[0]) !== ERR_NO_PATH ??
    if (creep.harvest(energySources[source]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(energySources[source], {
        visualizePathStyle: { stroke: "#ffffff" }
      })
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

  public static rest = (creep: Creep, flagName: string): void => {
    creep.say("💤")
    creep.moveTo(Game.flags[flagName].pos, {
      visualizePathStyle: { stroke: "#00ffff" }
    })
  }

  public static transfer = (creep: Creep, destination: Structure[]): void => {
    if (creep.transfer(destination[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(destination[0], {
        visualizePathStyle: { stroke: "#ffffff" }
      })
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
