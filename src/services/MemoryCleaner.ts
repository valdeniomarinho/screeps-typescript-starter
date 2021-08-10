export default class MemoryCleaner {
  public static run(): void {
    for (const name in Memory.creeps) {
      if (!Game.creeps[name]) {
        console.log(`Clearing non-existing creep memory: ${name}`)
        delete Memory.creeps[name]
      }
    }
  }
}
