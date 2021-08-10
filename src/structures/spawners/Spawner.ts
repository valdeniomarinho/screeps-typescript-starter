import { getStructures } from 'services/Snippets'

export default class Spawner {
  public static runList(units: UnitRole[]): void {
    units.forEach(u => this.run(u))
  }

  public static run(unit: UnitRole): void {
    const newName = `${unit.role}${Game.time}`

    const spawn = getStructures<StructureSpawn>(STRUCTURE_SPAWN).find(s => !s.spawning?.name)

    if (!spawn) return

    if (
      unit.current < unit.total &&
      spawn.spawnCreep(unit.model, newName, {
        memory: { role: unit.role }
      }) === ERR_NOT_ENOUGH_ENERGY
    ) {
      console.log(`Trying to Spawn: ${newName}`)
      spawn.spawnCreep([WORK, CARRY, MOVE], newName, {
        memory: { role: unit.role }
      })
    }
  }
}
