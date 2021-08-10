import RoleBuilder from 'units/builders/RoleBuilder'
import RoleHarvester from 'units/harvesters/RoleHarvester'
import RoleHauler from 'units/haulers/RoleHauler'
import RoleRepairer from 'units/repairers/RoleRepairer'
import RoleUpgrader from 'units/upgraders/RoleUpgrader'

export default class Logger {
  public static run(timeCpuStart: number): void {
    const exeTime = Math.floor(Game.cpu.getUsed() - timeCpuStart)

    const cpuLimit = Game.cpu.tickLimit

    const totalCreeps = Object.keys(Game.creeps).length

    for (const name in Game.rooms) {
      console.log(`╔════════════════════════════════════════════════`)
      console.log(`║─┤CPU ${exeTime}/${cpuLimit}`)
      console.log(`║─┤Room "${name}" Tick ${Game.time}`)
      console.log(`║─┤Total Energy: ${Game.rooms[name].energyAvailable}`)
      console.log(`║─┤Total Creeps: ${totalCreeps}`)
      console.log(`║─┤${RoleHarvester.current}/${RoleHarvester.total} ⛏️ Harvesters`)
      console.log(`║─┤${RoleBuilder.current}/${RoleBuilder.total} 🔨 Builders`)
      console.log(`║─┤${RoleUpgrader.current}/${RoleUpgrader.total} ➕ Upgraders`)
      console.log(`║─┤${RoleRepairer.current}/${RoleRepairer.total} 🔧 Repairers`)
      console.log(`║─┤${RoleHauler.current}/${RoleHauler.total} 🚛 Haulers`)
      console.log(`╚════════════════════════════════════════════════`)
    }
  }
}
