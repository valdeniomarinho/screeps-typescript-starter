export default class Logger {
  public static print(): void {
    // ╔══════════╗
    // ║ Watchers ║
    // ╚══════════╝
    const total_harvesters = _.filter(Game.creeps, creep => creep.memory.role === "harvester")
    const total_builders = _.filter(Game.creeps, creep => creep.memory.role === "builder")
    const total_upgraders = _.filter(Game.creeps, creep => creep.memory.role === "upgrader")
    const total_repairers = _.filter(Game.creeps, creep => creep.memory.role === "repairer")

    // ╔═════════╗
    // ║ Loggers ║
    // ╚═════════╝
    for (const name in Game.rooms) {
      console.log(`╔════════════════════════════════════════════════`)
      console.log(`║─┤Room "${name}" Tick ${Game.time}`)
      console.log(`║─┤Total Energy: ${Game.rooms[name].energyAvailable}`)
      console.log(`║─┤Slots per Creep: ${Math.floor(Game.rooms[name].energyAvailable / 50)}`)
      console.log(`║─┤⛏️ Harvesters: ${total_harvesters.length}`)
      console.log(`║─┤🔨 Builders: ${total_builders.length} `)
      console.log(`║─┤🔺 Upgraders: ${total_upgraders.length}`)
      console.log(`║─┤🔧 Repairers: ${total_repairers.length}`)
      console.log(`╚════════════════════════════════════════════════`)
    }
  }
}
