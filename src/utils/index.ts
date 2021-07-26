import RoleBuilder from "units/builders/RoleBuilder"
import RoleHarvester from "units/harvesters/RoleHarvester"
import RoleRepairer from "units/repairers/RoleRepairer"
import RoleUpgrader from "units/upgraders/RoleUpgrader"

export class Logger {
  public static run(): void {
    const currentHarvesters = _.filter(Game.creeps, creep => creep.memory.role === "harvester")
    const currentBuilders = _.filter(Game.creeps, creep => creep.memory.role === "builder")
    const currentUpgraders = _.filter(Game.creeps, creep => creep.memory.role === "upgrader")
    const currentRepairers = _.filter(Game.creeps, creep => creep.memory.role === "repairer")

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

export class RoleAssigner {
  public static run(restpoint: string): void {
    for (const name in Game.creeps) {
      const creep = Game.creeps[name]
      switch (creep.memory.role) {
        case "harvester":
          RoleHarvester.run(creep, restpoint)
          break
        case "upgrader":
          RoleUpgrader.run(creep, restpoint)
          break
        case "builder":
          RoleBuilder.run(creep, restpoint)
          break
        case "repairer":
          RoleRepairer.run(creep, restpoint)
          break
      }
    }
  }
}

// export function roleAssigner(restpoint: string): void {
//   for (const name in Game.creeps) {
//     const creep = Game.creeps[name]
//     switch (creep.memory.role) {
//       case "harvester":
//         RoleHarvester.run(creep, restpoint)
//         break
//       case "upgrader":
//         RoleUpgrader.run(creep, restpoint)
//         break
//       case "builder":
//         RoleBuilder.run(creep, restpoint)
//         break
//       case "repairer":
//         RoleRepairer.run(creep, restpoint)
//         break
//     }
//   }
// }
