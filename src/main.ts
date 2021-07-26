/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorMapper } from "utils/ErrorMapper"
import { Logger, RoleAssigner } from "utils"
import Spawner from "structures/spawners/Spawner"
import RoleHarvester from "units/harvesters/RoleHarvester"
import RoleUpgrader from "units/upgraders/RoleUpgrader"
import RoleBuilder from "units/builders/RoleBuilder"
import RoleRepairer from "units/repairers/RoleRepairer"

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

  interface UnitRole {
    role: string
    active: boolean
    total: number
    source: number
    model: BodyPartConstant[]
    run: any
    current: any
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
  Logger.run()

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
  RoleHarvester.total = 2
  RoleHarvester.model = [MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY]
  RoleHarvester.source = 0

  RoleUpgrader.active = true
  RoleUpgrader.total = 4
  RoleUpgrader.model = [MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY]
  RoleUpgrader.source = 1

  RoleBuilder.active = true
  RoleBuilder.total = 1
  RoleBuilder.model = [MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY]
  RoleBuilder.source = 0

  RoleRepairer.active = true
  RoleRepairer.total = 3
  RoleRepairer.model = [MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY]
  RoleRepairer.source = 0

  // ╔══════════╗
  // ║ Spawners ║
  // ╚══════════╝
  Spawner.run(RoleHarvester.total, RoleHarvester.current, RoleHarvester.role, RoleHarvester.model)
  Spawner.run(RoleUpgrader.total, RoleUpgrader.current, RoleUpgrader.role, RoleUpgrader.model)
  Spawner.run(RoleBuilder.total, RoleBuilder.current, RoleBuilder.role, RoleBuilder.model)
  Spawner.run(RoleRepairer.total, RoleRepairer.current, RoleRepairer.role, RoleRepairer.model)

  // ╔═══════════════╗
  // ║ Role Assigner ║
  // ╚═══════════════╝
  RoleAssigner.run(restpoint)
  // for (const name in Game.creeps) {
  //   const creep = Game.creeps[name]
  //   switch (creep.memory.role) {
  //     case "harvester":
  //       RoleHarvester.run(creep, restpoint)
  //       break
  //     case "upgrader":
  //       RoleUpgrader.run(creep, restpoint)
  //       break
  //     case "builder":
  //       RoleBuilder.run(creep, restpoint)
  //       break
  //     case "repairer":
  //       RoleRepairer.run(creep, restpoint)
  //       break
  //   }
  // }

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
