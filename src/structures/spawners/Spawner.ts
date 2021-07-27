export default class Spawner {
  public static run(total: number, current: number, role: string, model: BodyPartConstant[]): void {
    const newName = `${role}${Game.time}`

    if (
      current < total &&
      Game.spawns.Spawn1.spawnCreep(model, newName, {
        memory: { role }
      }) === -6
    ) {
      console.log(`Trying to Spawn: ${newName}`)

      Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], newName, {
        memory: { role }
      })
    }
  }
}
