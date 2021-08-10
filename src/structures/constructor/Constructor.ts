interface BuildingOrder {
  structureType: BuildableStructureConstant
  x: number
  y: number
}
// path [[x,y],[x,y],[x,y],[x,y],[x,y],[x,y],]
export default class Builder {
  public static run(roomName: string, buildingOrder: BuildingOrder): void {
    Game.rooms[roomName].createConstructionSite(
      buildingOrder.x,
      buildingOrder.y,
      buildingOrder.structureType
    )
  }
}
