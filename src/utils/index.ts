import RoleBuilder from "units/builders/RoleBuilder"
import RoleHarvester from "units/harvesters/RoleHarvester"
import RoleRepairer from "units/repairers/RoleRepairer"
import RoleUpgrader from "units/upgraders/RoleUpgrader"

export class MemoryCleaner {
  public static run(): void {
    for (const name in Memory.creeps) {
      if (!Game.creeps[name]) {
        console.log(`Clearing non-existing creep memory: ${name}`)
        delete Memory.creeps[name]
      }
    }
  }
}

export class Logger {
  public static run(timeCpuStart: number): void {
    const currentHarvesters = _.filter(Game.creeps, creep => creep.memory.role === "harvester")
    const currentBuilders = _.filter(Game.creeps, creep => creep.memory.role === "builder")
    const currentUpgraders = _.filter(Game.creeps, creep => creep.memory.role === "upgrader")
    const currentRepairers = _.filter(Game.creeps, creep => creep.memory.role === "repairer")
    const totalCreeps =
      currentBuilders.length +
      currentHarvesters.length +
      currentRepairers.length +
      currentUpgraders.length

    const exeTime = Math.floor(Game.cpu.getUsed() - timeCpuStart)
    const cpuLimit = Game.cpu.tickLimit

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

export class Notifier {
  public static run(): void {
    // get spawning creeps

    const spawningCreeps = Object.keys(Game.spawns)
      .filter(name => Game.spawns[name].spawning)
      .map(name => Game.spawns[name].spawning)

    spawningCreeps.forEach(spawningCreep => {
      if (spawningCreep !== null) {
        const msg = `Spawning: ${spawningCreep.name}`

        const spawnName = String(spawningCreep.spawn.name)

        Game.spawns[spawnName].room.visual.text(
          msg,
          Game.spawns[spawnName].pos.x,
          Game.spawns[spawnName].pos.y + 1.5,
          {
            align: "center",
            opacity: 0.8
          }
        )
      }
    })
  }
}
