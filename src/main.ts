/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorMapper } from "utils/ErrorMapper"
import {
  Logger,
  Notifier,
  RoleAssigner,
  MemoryCleaner
} from "utils"
import { getStructure } from "utils/Snippets"
import Spawner from "structures/spawners/Spawner"
import RoleHarvester from "units/harvesters/RoleHarvester"
import RoleUpgrader from "units/upgraders/RoleUpgrader"
import RoleBuilder from "units/builders/RoleBuilder"
import RoleRepairer from "units/repairers/RoleRepairer"

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

  interface UnitRole {
    role: string
    active: boolean
    total: number
    source: number
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
  RoleHarvester.active = true
  RoleHarvester.total = 2
  RoleHarvester.source = 0
  RoleHarvester.model = [
    MOVE,
    MOVE,
    MOVE,
    WORK,
    WORK,
    WORK,
    CARRY,
    CARRY
  ]

  RoleUpgrader.active = true
  RoleUpgrader.total = 4
  RoleUpgrader.source = 1
  RoleUpgrader.model = [
    MOVE,
    MOVE,
    MOVE,
    WORK,
    WORK,
    WORK,
    CARRY,
    CARRY
  ]

  RoleBuilder.active = true
  RoleBuilder.total = 3
  RoleBuilder.source = 0
  RoleBuilder.model = [
    MOVE,
    MOVE,
    MOVE,
    WORK,
    WORK,
    WORK,
    CARRY,
    CARRY
  ]

  RoleRepairer.active = true
  RoleRepairer.total = 1
  RoleRepairer.source = 0
  RoleRepairer.model = [
    MOVE,
    MOVE,
    MOVE,
    WORK,
    WORK,
    WORK,
    CARRY,
    CARRY
  ]

  // Spawners
  Spawner.run(
    RoleHarvester.total,
    RoleHarvester.current,
    RoleHarvester.role,
    RoleHarvester.model
  )
  Spawner.run(
    RoleUpgrader.total,
    RoleUpgrader.current,
    RoleUpgrader.role,
    RoleUpgrader.model
  )
  Spawner.run(
    RoleBuilder.total,
    RoleBuilder.current,
    RoleBuilder.role,
    RoleBuilder.model
  )
  Spawner.run(
    RoleRepairer.total,
    RoleRepairer.current,
    RoleRepairer.role,
    RoleRepairer.model
  )

  RoleAssigner.run(restpoint)

  // Tick Functions
  Logger.run(timeCpuStart)
  Notifier.run()
  MemoryCleaner.run()

  // ⚠️ TESTING ZONE ⚠️
  ;(() => {
    const selected = getStructure(STRUCTURE_TOWER)

    if (selected === undefined) return

    if (selected.length) {
      selected.forEach(structure => {
        // Game.rooms[structure.room].getPositionAt(
        //   structure.pos
        // )

        new RoomVisual(
          structure.room.name
        ).circle(structure.pos, {
          fill: "transparent",
          radius: TOWER_OPTIMAL_RANGE,
          stroke: "red"
        })

        // Game.map.visual.circle(structure.pos, {
        //   fill: "transparent",
        //   radius: 10,
        //   stroke: "#FF00FF"
        // })
      })
    }
  })()
})
// #endregion
