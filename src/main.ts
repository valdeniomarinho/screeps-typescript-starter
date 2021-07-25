/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorMapper } from "utils/ErrorMapper"
import Logger from "utils/Logger"
import Spawner from "structures/Spawner"
import RoleHarvester from "units/harvesters/RoleHarvester"
import RoleUpgrader from "units/upgraders/RoleUpgrader"
import RoleBuilder from "units/builders/RoleBuilder"

// INTERFACE #region[magenta]
//
declare global {
  // Memory extension samples
  interface Memory {
    uuid: number
    log: any
  }

  interface CreepMemory {
    [name: string]: string | number | boolean
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      log: any
    }
  }
}
// #endregion

// MAIN #region [blue]
export const loop = ErrorMapper.wrapLoop(() => {
  Logger.print()

  // ╔════════════════╗
  // ║ Memory Cleaner ║
  // ╚════════════════╝
  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      console.log(`Clearing non-existing creep memory: ${name}`)
      delete Memory.creeps[name]
    }
  }

  // ╔═════════════════╗
  // ║ Notify Spawning ║
  // ╚═════════════════╝
  if (Game.spawns.Spawn1.spawning) {
    const spawningCreep: Creep = Game.creeps[Game.spawns.Spawn1.spawning.name]
    const msg = `Spawning: ${spawningCreep.memory.role.toString()}`
    Game.spawns.Spawn1.room.visual.text(msg, Game.spawns.Spawn1.pos.x, Game.spawns.Spawn1.pos.y + 1.5, {
      align: "center",
      opacity: 0.8
    })
  }

  // ╔═══════╗
  // ║ Flags ║
  // ╚═══════╝
  const restpoint = "Rest1"

  // ╔═══════╗
  // ║ Units ║
  // ╚═══════╝
  RoleHarvester.active = true
  RoleHarvester.total = 1
  RoleHarvester.model = [WORK, CARRY, MOVE]
  RoleHarvester.source = 0

  RoleUpgrader.active = true
  RoleUpgrader.total = 3
  RoleUpgrader.model = [WORK, CARRY, MOVE]
  RoleUpgrader.source = 1

  RoleBuilder.active = true
  RoleBuilder.total = 2
  RoleBuilder.model = [WORK, CARRY, MOVE]
  RoleBuilder.source = 0

  // ╔══════════╗
  // ║ Spawners ║
  // ╚══════════╝
  Spawner.run(RoleHarvester.total, RoleHarvester.current, RoleHarvester.role, RoleHarvester.model)
  Spawner.run(RoleBuilder.total, RoleBuilder.current, RoleBuilder.role, RoleBuilder.model)
  Spawner.run(RoleUpgrader.total, RoleUpgrader.current, RoleUpgrader.role, RoleUpgrader.model)

  // ╔═══════════════╗
  // ║ Role Assigner ║
  // ╚═══════════════╝
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
    }
  }

  // ╔══════════════════╗
  // ║ Tower Management ║
  // ╚══════════════════╝
  // var tower = Game.getObjectById('TOWER_ID');
  // if (tower) {
  // 	var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
  // 		filter: (structure) => structure.hits < structure.hitsMax,
  // 	});
  // 	if (closestDamagedStructure) {
  // 		tower.repair(closestDamagedStructure);
  // 	}

  // 	var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  // 	if (closestHostile) {
  // 		tower.attack(closestHostile);
  // 	}
  // }

  // #endregion
})
