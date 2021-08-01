/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorMapper } from "utils/ErrorMapper"
import { Logger, Notifier, RoleAssigner, MemoryCleaner } from "utils"
import { getStructures } from "utils/Snippets"
import Spawner from "structures/spawners/Spawner"
import Tower from "structures/towers/Tower"
import RoleHarvester from "units/harvesters/RoleHarvester"
import RoleUpgrader from "units/upgraders/RoleUpgrader"
import RoleBuilder from "units/builders/RoleBuilder"
import RoleRepairer from "units/repairers/RoleRepairer"
import RoleHauler from "units/haulers/RoleHauler"

// INTERFACE #region[magenta]
//
declare global {
  interface Memory {
    uuid: number
    log: any
  }

  interface CreepMemory {
    [name: string]: string | number | boolean
  }

  interface UniRole {
    role: string
    active: boolean
    total: number
    model: BodyPartConstant[]
    run: any
    current: any
  }

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
  // EXE Time Tracking
  const timeCpuStart = Game.cpu.getUsed()

  // Positions
  const restpoint = "Rest1"

  // Units
  RoleHauler.active = true
  RoleHauler.total = 2
  RoleHauler.model = [
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    MOVE,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY
  ]

  RoleRepairer.active = true
  RoleRepairer.total = 1
  RoleRepairer.model = [MOVE, WORK, CARRY]

  RoleBuilder.active = true
  RoleBuilder.total = 1
  RoleBuilder.model = [MOVE, WORK, CARRY]

  RoleUpgrader.active = true
  RoleUpgrader.total = 1
  RoleUpgrader.model = [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY]

  RoleHarvester.active = true
  RoleHarvester.total = 2
  RoleHarvester.model = [
    MOVE,
    MOVE,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK
  ]

  // Spawners
  Spawner.run(RoleHauler.total, RoleHauler.current, RoleHauler.role, RoleHauler.model)
  Spawner.run(RoleRepairer.total, RoleRepairer.current, RoleRepairer.role, RoleRepairer.model)
  Spawner.run(RoleBuilder.total, RoleBuilder.current, RoleBuilder.role, RoleBuilder.model)
  Spawner.run(RoleUpgrader.total, RoleUpgrader.current, RoleUpgrader.role, RoleUpgrader.model)
  Spawner.run(RoleHarvester.total, RoleHarvester.current, RoleHarvester.role, RoleHarvester.model)

  RoleAssigner.run(restpoint)
  Tower.run()
  // Tick Functions
  MemoryCleaner.run()
  Notifier.run()
  Logger.run(timeCpuStart)

  // ⚠️ TESTING ZONE ⚠️
  ;(() => {
    const selectedStructures = getStructures(STRUCTURE_CONTROLLER)

    if (selectedStructures === undefined) return

    if (selectedStructures.length) {
      selectedStructures.forEach(structure => {
        // ROOM NAME
        // new RoomVisual(structure.room.name).text(
        //   structure.room.name,
        //   structure.pos.x,
        //   structure.pos.y - 1.5,
        //   {
        //     backgroundColor: "black",
        //     color: "red"
        //   }
        // )

        // // CIRCLE
        // new RoomVisual(structure.room.name).circle(structure.pos, {
        //   fill: "transparent",
        //   radius: TOWER_OPTIMAL_RANGE,
        //   stroke: "red"
        // })

        // RECT
        new RoomVisual(structure.room.name).rect(
          structure.pos.x - TOWER_OPTIMAL_RANGE,
          structure.pos.y - TOWER_OPTIMAL_RANGE,
          TOWER_OPTIMAL_RANGE * 2,
          TOWER_OPTIMAL_RANGE * 2,
          {
            fill: "transparent",
            stroke: "red"
          }
        )
      })
    }
  })()
})
// #endregion
