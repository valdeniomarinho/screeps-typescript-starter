export default function transformToBodyPartList<TBody extends BodyPartConstant>(
  data: Record<TBody, number>
): BodyPartConstant[] {
  return Object.keys(data)
    .map(part => Array<BodyPartConstant>(data[part as TBody]).fill(part as BodyPartConstant))
    .reduce((result: BodyPartConstant[], list: BodyPartConstant[]) => {
      result.push(...list)
      return result
    }, Array<BodyPartConstant>())
}

// transformToBodyPartList({
//   move: 0,
//   carry: 0,
//   work: 0,
//   attack: 0,
//   ranged_attack: 0,
//   heal: 0,
//   tough: 0,
//   claim: 0
// })
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
