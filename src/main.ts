/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorMapper } from "services/ErrorMapper"
import { getStructures } from "services/Snippets"
import RoleAssigner from "services/RoleAssigner"
import MemoryCleaner from "services/MemoryCleaner"
import Logger from "services/Logger"
import SpawnNotifier from "services/SpawnNotifier"
import Spawner from "structures/spawners/Spawner"
import Tower from "structures/towers/Tower"
import RoleHarvester from "units/harvesters/RoleHarvester"
import RoleUpgrader from "units/upgraders/RoleUpgrader"
import RoleBuilder from "units/builders/RoleBuilder"
import RoleRepairer from "units/repairers/RoleRepairer"
import RoleHauler from "units/haulers/RoleHauler"

// INTERFACES #region[magenta]
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
    model: BodyPartConstant[]
    current: number
    run: (creep: Creep, restpoint: string) => void
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      log: any
    }
  }
}
// #endregion

// LOOP #region [blue]
export const loop = ErrorMapper.wrapLoop(() => {
  // EXE Time Tracking
  const timeCpuStart = Game.cpu.getUsed()

  // Positions
  const restpoint = "Rest1"

  // Units
  RoleHauler.active = true
  RoleHauler.total = 3
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
  RoleBuilder.model = [
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
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY
  ]

  RoleUpgrader.active = true
  RoleUpgrader.total = 1
  RoleUpgrader.model = [
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
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    WORK,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY,
    CARRY
  ]

  RoleHarvester.active = true
  RoleHarvester.total = 3
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
  Spawner.run(RoleHauler)
  Spawner.run(RoleRepairer)
  Spawner.run(RoleBuilder)
  Spawner.run(RoleUpgrader)
  Spawner.run(RoleHarvester)

  // Towers
  Tower.run()

  RoleAssigner.run(restpoint)

  // Tick Functions
  MemoryCleaner.run()
  SpawnNotifier.run()
  Logger.run(timeCpuStart)

  // ⚠️ TESTING ZONE ⚠️
  /************************** */
  // const temp: Record<number, BodyPartConstant> = {
  //   10: MOVE,
  //   5: CARRY
  // }
  // function transformToBodyPartList(data: Record<number, BodyPartConstant>): BodyPartConstant[] {
  //   return Object.keys(data)
  //     .map(name => Number(name))
  //     .map(count => Array<BodyPartConstant>(count).fill(data[count]))
  //     .reduce((result: BodyPartConstant[], list: BodyPartConstant[]) => {
  //       result.push(...list)
  //       return result
  //     }, Array<BodyPartConstant>())
  // }
  // const list = transformToBodyPartList(temp)
  /************************** */
  ;(() => {
    const selectedStructures = getStructures<StructureController>(STRUCTURE_CONTROLLER)

    if (selectedStructures.length) {
      selectedStructures.forEach(structure => {
        // PRINT ROOM NAME
        // new RoomVisual(structure.room.name).text(
        //   structure.room.name,
        //   structure.pos.x,
        //   structure.pos.y - 1.5,
        //   {
        //     backgroundColor: "black",
        //     color: "red"
        //   }
        // )

        // CIRCLE RANGE
        // new RoomVisual(structure.room.name).circle(structure.pos, {
        //   fill: "transparent",
        //   radius: TOWER_OPTIMAL_RANGE,
        //   stroke: "red"
        // })

        // RECT RANGE
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

// console.log(JSON.stringify({ var1, var2, var3 }, null, 2))
