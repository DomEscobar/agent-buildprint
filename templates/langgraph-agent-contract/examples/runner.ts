import type { AgentNode, AgentState, NodeName } from '../schemas/state'

type Nodes = Record<Exclude<NodeName, 'end'>, AgentNode>

type CheckpointStore = {
  load(threadId: string): Promise<AgentState | null>
  save(threadId: string, state: AgentState): Promise<void>
}

function nextNode(current: NodeName | 'start', state: AgentState): NodeName {
  if (current === 'start') return 'classify'
  if (current === 'classify') return 'retrieve'
  if (current === 'retrieve') return 'answer'
  if (current === 'answer') return state.done ? 'end' : 'classify'
  return 'end'
}

export async function runGraph(options: {
  initialState: AgentState
  nodes: Nodes
  threadId?: string
  checkpoint?: CheckpointStore
  maxSteps?: number
}): Promise<AgentState> {
  const maxSteps = options.maxSteps ?? 12
  let state = options.initialState
  let current: NodeName | 'start' = 'start'

  for (let i = 0; i < maxSteps; i++) {
    current = nextNode(current, state)
    if (current === 'end') return state

    const patch = await options.nodes[current](Object.freeze({ ...state }))
    state = { ...state, ...patch, stepCount: state.stepCount + 1 }

    if (options.threadId && options.checkpoint) {
      await options.checkpoint.save(options.threadId, state)
    }
  }

  return { ...state, error: `Graph exceeded maxSteps=${maxSteps}` }
}
