export default function transformToBodyPartList(data: Record<string, number>): BodyPartConstant[] {
  return Object.keys(data)
    .map(part => Array<BodyPartConstant>(data[part]).fill(part as BodyPartConstant))
    .reduce((result: BodyPartConstant[], list: BodyPartConstant[]) => {
      result.push(...list)
      return result
    }, Array<BodyPartConstant>())
}

/*
  // map
  [
    [WORK,WORK,WORK,WORK],
    [CARRY,CARRY,CARRY],
    [MOVE]
  ]

  // reduce
  [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE]
*/
