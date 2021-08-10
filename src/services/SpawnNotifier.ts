export default class SpawnNotifier {
  public static run(): void {
    // get spawning creeps

    const spawningCreeps = Object.keys(Game.spawns)
      .filter(name => Game.spawns[name].spawning)
      .map(name => Game.spawns[name].spawning)

    spawningCreeps.forEach(spawningCreep => {
      if (spawningCreep !== null) {
        const msg = `Spawning: ${spawningCreep.name}`

        const spawnName = String(spawningCreep.spawn.name)

        Game.spawns[spawnName].room.visual.text(
          msg,
          Game.spawns[spawnName].pos.x,
          Game.spawns[spawnName].pos.y + 1.5,
          {
            align: 'center',
            opacity: 0.8
          }
        )
      }
    })
  }
}
