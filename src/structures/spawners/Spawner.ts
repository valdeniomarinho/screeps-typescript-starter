export default class Spawner {
  public static run(total: number, current: number, role: string, model: BodyPartConstant[]): void {
    if (current < total) {
      const newName = `${role}${Game.time}`
      console.log(`Spawning new ${role}: ${newName}`)
      Game.spawns.Spawn1.spawnCreep(model, newName, {
        memory: { role }
      })
    }
  }
}
