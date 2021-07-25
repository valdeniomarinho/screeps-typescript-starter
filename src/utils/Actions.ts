export default class Actions {
  public static build = (creep: Creep): void => {
    creep.say("Build ✔️")
    const constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES)

    if (constructionSites.length) {
      if (creep.build(constructionSites[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(constructionSites[0], {
          visualizePathStyle: { stroke: "#ffffff" }
        })
      }
    }
  }

  public static miner = (creep: Creep, source: number): void => {
    creep.say("Mine ✔️")
    const energySources = creep.room.find(FIND_SOURCES)

    // && creep.harvest(energySources[0]) !== ERR_NO_PATH ??
    if (creep.harvest(energySources[source]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(energySources[source], {
        visualizePathStyle: { stroke: "#ffffff" }
      })
    }
  }

  public static rest = (creep: Creep, flagName: string): void => {
    creep.moveTo(Game.flags[flagName].pos, {
      visualizePathStyle: { stroke: "#00ffff" }
    })
    creep.say("💤")
  }

  public static transfer = (creep: Creep, destination: Structure[]): void => {
    creep.say("Transfer ✔️")
    if (creep.transfer(destination[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(destination[0], {
        visualizePathStyle: { stroke: "#ffffff" }
      })
    }
  }

  public static upgrade = (creep: Creep): void => {
    creep.say("Upgrade ✔️")
    if (creep.room.controller && creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: { stroke: "#ffffff" }
      })
    }
  }
}
