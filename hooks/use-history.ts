import { useState, useCallback, useEffect, useRef } from "react"

interface UseHistoryOptions<T> {
    maxHistorySize?: number
    debounceMs?: number
}

interface HistoryState<T> {
    past: T[]
    present: T
    future: T[]
}

export function useHistory<T>(
    initialState: T,
    options: UseHistoryOptions<T> = {}
) {
    const { maxHistorySize = 50, debounceMs = 300 } = options

    const [state, setState] = useState<HistoryState<T>>({
        past: [],
        present: initialState,
        future: []
    })

    const debounceTimeoutRef = useRef<NodeJS.Timeout>()
    const pendingStateRef = useRef<T | null>(null)

    const canUndo = state.past.length > 0
    const canRedo = state.future.length > 0

    const addToHistory = useCallback((newState: T) => {
        setState(currentState => {
            const newPast = [...currentState.past, currentState.present]

            // Limit history size
            if (newPast.length > maxHistorySize) {
                newPast.shift()
            }

            return {
                past: newPast,
                present: newState,
                future: [] // Clear future when new state is added
            }
        })
    }, [maxHistorySize])

    const set = useCallback((newState: T | ((prevState: T) => T)) => {
        // Clear any pending debounced update
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
        }

        setState(currentState => {
            const resolvedNewState = typeof newState === 'function'
                ? (newState as (prevState: T) => T)(currentState.present)
                : newState

            // Store the new state as pending
            pendingStateRef.current = resolvedNewState

            // Update the present state immediately for UI responsiveness
            return {
                ...currentState,
                present: resolvedNewState
            }
        })

        // Debounce adding to history
        debounceTimeoutRef.current = setTimeout(() => {
            if (pendingStateRef.current !== null) {
                addToHistory(pendingStateRef.current)
                pendingStateRef.current = null
            }
        }, debounceMs)
    }, [addToHistory, debounceMs])

    const undo = useCallback(() => {
        if (!canUndo) return

        // Clear any pending debounced update
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
            pendingStateRef.current = null
        }

        setState(currentState => {
            const previous = currentState.past[currentState.past.length - 1]
            const newPast = currentState.past.slice(0, currentState.past.length - 1)

            return {
                past: newPast,
                present: previous,
                future: [currentState.present, ...currentState.future]
            }
        })
    }, [canUndo])

    const redo = useCallback(() => {
        if (!canRedo) return

        // Clear any pending debounced update
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current)
            pendingStateRef.current = null
        }

        setState(currentState => {
            const next = currentState.future[0]
            const newFuture = currentState.future.slice(1)

            return {
                past: [...currentState.past, currentState.present],
                present: next,
                future: newFuture
            }
        })
    }, [canRedo])

    const reset = useCallback((newInitialState?: T) => {
        const resetState = newInitialState ?? initialState
        setState({
            past: [],
            present: resetState,
            future: []
        })
    }, [initialState])

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current)
            }
        }
    }, [])

    return {
        state: state.present,
        set,
        undo,
        redo,
        reset,
        canUndo,
        canRedo,
        historySize: state.past.length
    }
}