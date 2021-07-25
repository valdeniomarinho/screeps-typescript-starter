import RoleHarvester from "units/harvesters/RoleHarvester"
import RoleUpgrader from "units/upgraders/RoleUpgrader"
import RoleBuilder from "units/builders/RoleBuilder"

export default class Logger {
  public static print(): void {
    // ╔══════════╗
    // ║ Watchers ║
    // ╚══════════╝
    const currentHarvesters = _.filter(Game.creeps, creep => creep.memory.role === "harvester")
    const currentBuilders = _.filter(Game.creeps, creep => creep.memory.role === "builder")
    const currentUpgraders = _.filter(Game.creeps, creep => creep.memory.role === "upgrader")
    const currentRepairers = _.filter(Game.creeps, creep => creep.memory.role === "repairer")

    // ╔═════════╗
    // ║ Loggers ║
    // ╚═════════╝
    for (const name in Game.rooms) {
      console.log(`╔════════════════════════════════════════════════`)
      console.log(`║─┤Room "${name}" Tick ${Game.time}`)
      console.log(`║─┤Total Energy: ${Game.rooms[name].energyAvailable}`)
      console.log(`║─┤Slots per Creep: ${Math.floor(Game.rooms[name].energyAvailable / 50)}`)
      console.log(`║─┤⛏️ Harvesters: ${currentHarvesters.length}/${RoleHarvester.total}`)
      console.log(`║─┤🔨 Builders: ${currentBuilders.length}/${RoleBuilder.total}`)
      console.log(`║─┤🔺 Upgraders: ${currentUpgraders.length}/${RoleUpgrader.total}`)
      console.log(`║─┤🔧 Repairers: ${currentRepairers.length}`)
      console.log(`╚════════════════════════════════════════════════`)
    }
  }
}
