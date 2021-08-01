import { getStructures } from "utils/Snippets"

export default class Tower {
  public static run(): void {
    const towers = getStructures(STRUCTURE_TOWER)

    if (towers !== undefined) {
      towers.forEach((anyStructure: AnyStructure) => {
        const tower = anyStructure as StructureTower // CAST

        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: structure => structure.hits < structure.hitsMax
        })

        if (closestDamagedStructure) {
          tower.repair(closestDamagedStructure)
        }

        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)

        if (closestHostile) {
          tower.attack(closestHostile)
        }
      })
    }
  }
}
