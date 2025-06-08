type Slice = {
  reducerPath: string
  reducer: (
    state: any,
    action: {
      [extraProps: string]: unknown
      type: string
    },
  ) => any
}

export function createPersistSlice<T extends Slice>(slice: T) {
  const storageKey = "rtk-persist/" + slice.reducerPath

  const persistenReducer: T["reducer"] = (state, action) => {
    const isInit = action.type === "@@INIT"

    if (isInit) {
      const stateFromLS = localStorage.getItem(storageKey)

      if (stateFromLS) return JSON.parse(stateFromLS)
    }
    const newState = slice.reducer(state, action)

    if (action.type.startsWith(slice.reducerPath) || isInit) {
      localStorage.setItem(storageKey, JSON.stringify(newState))
    }

    return newState
  }

  return { ...slice, reducer: persistenReducer }
}
