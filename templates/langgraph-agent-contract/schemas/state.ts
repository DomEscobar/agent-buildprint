export type Role = 'system' | 'user' | 'assistant' | 'tool'

export type Message = {
  role: Role
  content: string
  name?: string
  createdAt?: string
}

export type ApprovalRequest = {
  id: string
  reason: string
  action: string
  status: 'pending' | 'approved' | 'rejected'
}

export type AgentState = {
  messages: Message[]
  done: boolean
  stepCount: number
  intent?: string
  context?: string[]
  answer?: string
  error?: string
  approvals?: ApprovalRequest[]
}

export type StatePatch = Partial<AgentState>

export type NodeName = 'classify' | 'retrieve' | 'answer' | 'end'

export type AgentNode = (state: Readonly<AgentState>) => Promise<StatePatch>
