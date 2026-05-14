# CONTRACTS

Use these names and shapes unless the user explicitly confirms alternatives.

## Functions

```ts
buildRuntimeContext(userId: string): Promise<RuntimeContext>
classifyIntent(message: string, context: RuntimeContext, options?: { mockAnalyzer?: AnalyzerAdapter }): Promise<AnalyzerResult>
analyzeIntentWithLLM(message: string, context: RuntimeContext): Promise<AnalyzerResult>
validateAnalyzerResult(value: unknown): AnalyzerResult
evaluateMediaRequest(request: MediaRequest, user: UserMemory, self: SelfState): PolicyDecision
planSocialDraft(input: PlanningInput): SocialDraft
auditSystemState(input: AuditInput): AuditReport
createWavespeedImage(input: WavespeedImageInput, client?: FetchLike): Promise<WavespeedImageResult>
pollWavespeedJob(id: string, client?: FetchLike): Promise<WavespeedImageResult>
publishDraft(draftId: string, options: PublishOptions): PublishResult
checkOpenClawRuntime(): Promise<RuntimeCheck>
```

## Data shapes

```ts
type UserMemory = {
  userId: string
  trust: number
  stage: 'cold' | 'warm' | 'close'
  facts: string[]
  preferences: string[]
  openLoops: string[]
  recentMessages: { role: 'user' | 'persona'; text: string; at: string }[]
  relationshipNotes: string[]
  mediaBudget: { remaining: number; resetAt?: string }
}

type SelfState = {
  mood: string
  energy: number
  socialBattery: number
  currentArcs: string[]
  contentBacklog: string[]
  lastUpdated: string
}

type RuntimeContext = {
  private: true
  self: Pick<SelfState, 'mood' | 'energy' | 'socialBattery' | 'currentArcs'>
  relationship: Pick<UserMemory, 'trust' | 'stage' | 'facts' | 'preferences' | 'openLoops'>
  calendarSummary: string[]
  journalSummary: string[]
  socialSummary: string[]
  mediaStatus: string[]
}

type AnalyzerAdapter = (message: string, context: RuntimeContext) => Promise<AnalyzerResult> | AnalyzerResult

type AnalyzerResult = {
  intent: 'chat' | 'recall' | 'media_request' | 'social_question' | 'calendar_question'
  mediaRequest?: MediaRequest
  factsToRemember: string[]
  openLoops: string[]
  suggestedPosture: string
}

type MediaRequest = {
  id: string
  requesterUserId?: string
  visibility: 'public' | 'private'
  prompt: string
  adultIntent: boolean
  includeFace: boolean
}

type PolicyDecision =
  | { allowed: true; mode: 'real' | 'mock'; reason: string }
  | { allowed: false; code: string; reason: string }

type SocialDraft = {
  id: string
  platform: 'instagram' | 'tiktok' | 'x' | 'youtube_shorts' | 'mock'
  caption: string
  visualPrompt?: string
  groundedIn: string[]
  status: 'draft' | 'needs_qa' | 'approved' | 'blocked' | 'published'
  qaNotes: string[]
}

type FetchLike = (url: string, init?: { method?: string; headers?: Record<string, string>; body?: string }) => Promise<{ ok: boolean; status: number; json(): Promise<unknown>; text?(): Promise<string> }>

type WavespeedImageInput = {
  prompt: string
  aspectRatio?: '1:1' | '4:5' | '9:16' | '16:9'
  seed?: number
  safety?: 'public' | 'private'
  webhookUrl?: string
}

type WavespeedImageResult = {
  id: string
  provider: 'wavespeed'
  status: 'queued' | 'processing' | 'succeeded' | 'failed'
  assetUrl?: string
  raw: unknown
}

type RuntimeCheck =
  | { ok: true; command: string; version?: string }
  | { ok: false; code: 'openclaw_runtime_missing'; command: string; reason: string }

type AuditReport = {
  status: 'pass' | 'warn' | 'fail'
  findings: { id: string; severity: 'info' | 'warn' | 'fail'; message: string; file?: string }[]
}
```
