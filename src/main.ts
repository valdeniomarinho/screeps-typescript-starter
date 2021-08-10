/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorMapper } from 'services/ErrorMapper'
import Logger from 'services/Logger'
import MemoryCleaner from 'services/MemoryCleaner'
import modelFactory from 'services/ModelFactory'
import RoleAssigner from 'services/RoleAssigner'
import { getStructures } from 'services/Snippets'
import SpawnNotifier from 'services/SpawnNotifier'
import Spawner from 'structures/spawners/Spawner'
import Tower from 'structures/towers/Tower'
import RoleBuilder from 'units/builders/RoleBuilder'
import RoleHarvester from 'units/harvesters/RoleHarvester'
import RoleHauler from 'units/haulers/RoleHauler'
import RoleRepairer from 'units/repairers/RoleRepairer'
import RoleUpgrader from 'units/upgraders/RoleUpgrader'

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
  const restpoint = 'Rest1'

  // Units
  RoleHauler.active = true
  RoleHauler.total = 3
  RoleHauler.model = modelFactory({
    move: 5,
    work: 0,
    carry: 7,
    attack: 0,
    ranged_attack: 0,
    heal: 0,
    tough: 0,
    claim: 0
  })

  RoleRepairer.active = false
  RoleRepairer.total = 1
  RoleRepairer.model = modelFactory({
    move: 2,
    work: 2,
    carry: 2,
    attack: 0,
    ranged_attack: 0,
    heal: 0,
    tough: 0,
    claim: 0
  })

  RoleBuilder.active = true
  RoleBuilder.total = 1
  RoleBuilder.model = modelFactory({
    move: 5,
    work: 5,
    carry: 3,
    attack: 0,
    ranged_attack: 0,
    heal: 0,
    tough: 0,
    claim: 0
  })

  RoleUpgrader.active = true
  RoleUpgrader.total = 1
  RoleUpgrader.model = modelFactory({
    move: 7,
    work: 6,
    carry: 5,
    attack: 0,
    ranged_attack: 0,
    heal: 0,
    tough: 0,
    claim: 0
  })

  RoleHarvester.active = true
  RoleHarvester.total = 3
  RoleHarvester.model = modelFactory({
    move: 2,
    work: 11,
    carry: 0,
    attack: 0,
    ranged_attack: 0,
    heal: 0,
    tough: 0,
    claim: 0
  })

  /*
    retornaModel(move:10, work: 3, carry: 10)
  */

  // Spawners
  Spawner.runList([RoleHauler, RoleRepairer, RoleBuilder, RoleUpgrader, RoleHarvester])

  // Towers
  Tower.run()

  // Services
  RoleAssigner.run(restpoint)
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
            fill: 'transparent',
            stroke: 'red'
          }
        )
      })
    }
  })()
})
// #endregion

// console.log(JSON.stringify({ var1, var2, var3 }, null, 2))
