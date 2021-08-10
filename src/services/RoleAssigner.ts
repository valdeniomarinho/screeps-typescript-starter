import RoleBuilder from 'units/builders/RoleBuilder'
import RoleHarvester from 'units/harvesters/RoleHarvester'
import RoleHauler from 'units/haulers/RoleHauler'
import RoleRepairer from 'units/repairers/RoleRepairer'
import RoleUpgrader from 'units/upgraders/RoleUpgrader'

export default class RoleAssigner {
  public static run(restpoint: string): void {
    for (const name in Game.creeps) {
      const creep = Game.creeps[name]
      switch (creep.memory.role) {
        case 'harvester':
          RoleHarvester.run(creep, restpoint)
          break
        case 'upgrader':
          RoleUpgrader.run(creep, restpoint)
          break
        case 'builder':
          RoleBuilder.run(creep, restpoint)
          break
        case 'repairer':
          RoleRepairer.run(creep, restpoint)
          break
        case 'hauler':
          RoleHauler.run(creep, restpoint)
          break
      }
    }
  }
}
