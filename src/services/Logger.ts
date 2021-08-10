import RoleBuilder from "units/builders/RoleBuilder"
import RoleHarvester from "units/harvesters/RoleHarvester"
import RoleHauler from "units/haulers/RoleHauler"
import RoleRepairer from "units/repairers/RoleRepairer"
import RoleUpgrader from "units/upgraders/RoleUpgrader"

export default class Logger {
  public static run(timeCpuStart: number): void {
    const exeTime = Math.floor(Game.cpu.getUsed() - timeCpuStart)
    const cpuLimit = Game.cpu.tickLimit

    const currentHarvesters = _.filter(Game.creeps, creep => creep.memory.role === "harvester")
    const currentBuilders = _.filter(Game.creeps, creep => creep.memory.role === "builder")
    const currentUpgraders = _.filter(Game.creeps, creep => creep.memory.role === "upgrader")
    const currentRepairers = _.filter(Game.creeps, creep => creep.memory.role === "repairer")
    const currentHaulers = _.filter(Game.creeps, creep => creep.memory.role === "hauler")
    const totalCreeps =
      currentBuilders.length +
      currentHarvesters.length +
      currentRepairers.length +
      currentUpgraders.length +
      currentHaulers.length

    for (const name in Game.rooms) {
      console.log(`╔════════════════════════════════════════════════`)
      console.log(`║─┤CPU ${exeTime}/${cpuLimit}`)
      console.log(`║─┤Room "${name}" Tick ${Game.time}`)
      console.log(`║─┤Total Energy: ${Game.rooms[name].energyAvailable}`)
      console.log(`║─┤Total Creeps: ${totalCreeps}`)
      console.log(`║─┤${currentHarvesters.length}/${RoleHarvester.total} ⛏️ Harvesters`)
      console.log(`║─┤${currentBuilders.length}/${RoleBuilder.total} 🔨 Builders`)
      console.log(`║─┤${currentUpgraders.length}/${RoleUpgrader.total} ➕ Upgraders`)
      console.log(`║─┤${currentRepairers.length}/${RoleRepairer.total} 🔧 Repairers`)
      console.log(`║─┤${currentHaulers.length}/${RoleHauler.total} 🚛 Haulers`)
      console.log(`╚════════════════════════════════════════════════`)
    }
  }
}
