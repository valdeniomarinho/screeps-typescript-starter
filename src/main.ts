/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorMapper } from "utils/ErrorMapper"
import Logger from "utils/Logger"
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

// ╔══════════════════╗
// ║ Global Variables ║
// ╚══════════════════╝
const restpoint = "Rest1"

RoleHarvester.active = true
RoleHarvester.total = 1
RoleHarvester.model = [WORK, CARRY, MOVE]
RoleHarvester.source = 0

RoleUpgrader.active = true
RoleUpgrader.total = 2
RoleUpgrader.model = [WORK, CARRY, MOVE]
RoleUpgrader.source = 1

RoleBuilder.active = true
RoleBuilder.total = 2
RoleBuilder.model = [WORK, CARRY, MOVE]
RoleBuilder.source = 1

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

  // ╔═══════════════════╗
  // ║ Harvester Spawner ║
  // ╚═══════════════════╝
  if (RoleHarvester.current < RoleHarvester.total) {
    const newName = `Harvester${Game.time}`
    console.log(`Spawning new harvester: ${newName}`)
    Game.spawns.Spawn1.spawnCreep(RoleHarvester.model, newName, {
      memory: { role: "harvester" }
    })
  }

  // ╔═════════════════╗
  // ║ Builder Spawner ║
  // ╚═════════════════╝
  if (RoleBuilder.current < RoleBuilder.total) {
    const newName = `Builder${Game.time}`
    console.log(`Spawning new builder: ${newName}`)
    Game.spawns.Spawn1.spawnCreep(RoleBuilder.model, newName, {
      memory: { role: "builder" }
    })
  }

  // ╔══════════════════╗
  // ║ Upgrader Spawner ║
  // ╚══════════════════╝
  if (RoleUpgrader.current < RoleUpgrader.total) {
    const newName = `Upgrader${Game.time}`
    console.log(`Spawning new upgrader: ${newName}`)
    Game.spawns.Spawn1.spawnCreep(RoleUpgrader.model, newName, {
      memory: { role: "upgrader" }
    })
  }

  // ╔══════════════════╗
  // ║ Repairer Spawner ║
  // ╚══════════════════╝
  // if (total_repairers.length < spawn_repair) {
  //   const newName = `Repairer${Game.time}`
  //   console.log(`Spawning new repairer: ${newName}`)
  //   Game.spawns.Spawn1.spawnCreep(model_repairers, newName, {
  //     memory: { role: "repairer" }
  //   })
  // }

  // ╔═════════════════╗
  // ║ Role Assignment ║
  // ╚═════════════════╝
  for (const name in Game.creeps) {
    const creep = Game.creeps[name]
    switch (creep.memory.role) {
      case "harvester":
        // roleHarvester.run(creep, cfgHarvester.active, actions, cfgHarvester.source)
        RoleHarvester.run(creep, restpoint)
        break
      // case 'harvester_external':
      // 	roleHarvesterExternal.run(creep, activated_harvesters);
      // 	break;
      // case 'harvester_mineral':
      // 	roleHarvesterMineral.run(creep, activated_harvesters);
      // 	break;
      case "upgrader":
        // roleUpgrader.run(creep, cfgUpgrader.active, actions, cfgUpgrader.source, "Rest1")
        RoleUpgrader.run(creep, restpoint)
        break
      case "builder":
        // roleBuilder.run(creep, cfgBuilder.active, actions, cfgBuilder.source, "Rest1")
        RoleBuilder.run(creep, restpoint)
        break
      // case 'repairer':
      // 	roleRepairer.run(creep, activated_repairers);
      // 	break;
      // case 'defender':
      // 	roleDefender.run(creep);
      // 	break;
      // case 'attacker':
      // 	roleAttacker.run(creep);
      // 	break;
      // case 'claimer':
      // 	roleClaimer.run(creep);
      // 	break;
      // case 'filler':
      // 	roleFiller.run(creep);
      // 	break;
      // case 'explorer':
      // 	roleExplorer.run(creep);
      // 	break;
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
