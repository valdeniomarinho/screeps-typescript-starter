interface BuildingOrder {
  wPos: number
  nPos: number
  structureType: BuildableStructureConstant
  x: number
  y: number
}

export default class Constructor {
  public static build(buildingOrder: BuildingOrder): void {
    const roomName = `W${buildingOrder.wPos}N${buildingOrder.nPos}`

    Game.rooms[roomName].createConstructionSite(
      buildingOrder.x,
      buildingOrder.y,
      buildingOrder.structureType
    )
  }
}
