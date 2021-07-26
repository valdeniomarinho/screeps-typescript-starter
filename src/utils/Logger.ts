import RoleHarvester from "units/harvesters/RoleHarvester"
import RoleUpgrader from "units/upgraders/RoleUpgrader"
import RoleBuilder from "units/builders/RoleBuilder"
import RoleRepairer from "units/repairers/RoleRepairer"

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
      console.log(`║─┤${currentHarvesters.length}/${RoleHarvester.total} ⛏️ Harvesters`)
      console.log(`║─┤${currentBuilders.length}/${RoleBuilder.total} 🔨 Builders`)
      console.log(`║─┤${currentUpgraders.length}/${RoleUpgrader.total} ➕ Upgraders`)
      console.log(`║─┤${currentRepairers.length}/${RoleRepairer.total} 🔧 Repairers`)
      console.log(`╚════════════════════════════════════════════════`)
    }
  }
}
