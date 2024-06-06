export const getSelectList = () => {
  return () => {
    const select_list: { label: string, value: string}[] = [
      { label: "Until midnight", value: "0" },
    ]
    for (let i = 1; i <= 28; i++) {
      select_list.push(
        { label: `${i} day${i === 1? "":"s"}`, value: `${i}` }
      )
    }
    return select_list
  }
}