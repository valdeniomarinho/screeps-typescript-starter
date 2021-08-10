export default function transformToBodyPartList(
  data: Record<number, BodyPartConstant>
): BodyPartConstant[] {
  return Object.keys(data)
    .map(name => Number(name))
    .map(count => Array<BodyPartConstant>(count).fill(data[count]))
    .reduce((result: BodyPartConstant[], list: BodyPartConstant[]) => {
      result.push(...list)
      return result
    }, Array<BodyPartConstant>())
}
