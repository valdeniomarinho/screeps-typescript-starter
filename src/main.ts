/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorMapper } from "utils/ErrorMapper"
import {
  Logger,
  Notifier,
  RoleAssigner,
  MemoryCleaner
} from "utils"
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
  // Positions
  const restpoint = "Rest1"

  // Features
  Logger.run()
  Notifier.run()
  RoleAssigner.run(restpoint)
  MemoryCleaner.run()

  // Units
  RoleHarvester.active = true
  RoleHarvester.total = 2
  RoleHarvester.model = [
    MOVE,
    MOVE,
    MOVE,
    WORK,
    WORK,
    WORK,
    CARRY
  ]
  RoleHarvester.source = 0

  RoleUpgrader.active = true
  RoleUpgrader.total = 4
  RoleUpgrader.model = [
    MOVE,
    MOVE,
    MOVE,
    WORK,
    WORK,
    WORK,
    CARRY
  ]
  RoleUpgrader.source = 1

  RoleBuilder.active = true
  RoleBuilder.total = 1
  RoleBuilder.model = [
    MOVE,
    MOVE,
    MOVE,
    WORK,
    WORK,
    WORK,
    CARRY
  ]
  RoleBuilder.source = 0

  RoleRepairer.active = true
  RoleRepairer.total = 3
  RoleRepairer.model = [
    MOVE,
    MOVE,
    MOVE,
    WORK,
    WORK,
    WORK,
    CARRY
  ]
  RoleRepairer.source = 0

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
})
// #endregion
