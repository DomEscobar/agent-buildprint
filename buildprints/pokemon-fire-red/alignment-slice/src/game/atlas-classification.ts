import { ATLAS_COLUMNS, type GridPoint } from "./atlas";

export const AtlasCellKind = {
  Compound: "C",
  Character: "CH",
  Repeatable: "RT",
  Sequence: "SQ",
  WorldProp: "WP",
  Forbidden: "UF",
} as const;

export type AtlasCellKind = (typeof AtlasCellKind)[keyof typeof AtlasCellKind];

export const AtlasAuthoring = {
  StampOnly: "stamp-only",
  NonWorld: "non-world",
  Repeatable: "repeatable",
  SequenceOnly: "sequence-only",
  Single: "single",
  Forbidden: "forbidden",
} as const;

export type AtlasAuthoring =
  (typeof AtlasAuthoring)[keyof typeof AtlasAuthoring];

export type AtlasClassificationCell = {
  readonly source: GridPoint;
  readonly kind: AtlasCellKind;
  readonly authoring: AtlasAuthoring;
  readonly semantic: string;
};

const ATLAS_ROWS = 18;

const CLASSIFICATION_ROWS = [
  "ccccccccccccccccccccccchhhh",
  "crcccccccrccccccccccccchhhh",
  "ccccccwcccccccwcccccccchhhh",
  "ccccccccccccccccccccccchhhh",
  "crcccccccrccccccccccccchhhh",
  "ccccccwcccccccwcccccccchhhh",
  "ccccccccccccccccccccccchhhh",
  "ccccccccccccccccccccccchhhh",
  "ssssswwwccccccwcccccccwhhhh",
  "ssssswwwffffffffccccccwhhhh",
  "ffffffffffffffffwwccccwhhhh",
  "ffffffffffffffffccccccwhhhh",
  "ffffffffffffffffccccccwhhhh",
  "ffffffffcccfffffwwccccwhhhh",
  "ffffffffcccffffcccccccchhhh",
  "fffffffccffcfffcccccccchhhh",
  "fffffffffffcfffcccccccchhhh",
  "fffffffffffcfffcccccccchhhh",
] as const;

class AtlasClassificationDataError extends Error {
  readonly code: string | undefined;

  constructor(code: string | undefined) {
    super(`Unexpected atlas classification code: ${code ?? "<missing>"}`);
    this.name = "AtlasClassificationDataError";
    this.code = code;
  }
}

const kindForCode = (code: string | undefined): AtlasCellKind => {
  switch (code) {
    case "c":
      return AtlasCellKind.Compound;
    case "h":
      return AtlasCellKind.Character;
    case "r":
      return AtlasCellKind.Repeatable;
    case "s":
      return AtlasCellKind.Sequence;
    case "w":
      return AtlasCellKind.WorldProp;
    case "f":
      return AtlasCellKind.Forbidden;
    default:
      throw new AtlasClassificationDataError(code);
  }
};

const authoringFor = (kind: AtlasCellKind): AtlasAuthoring => {
  switch (kind) {
    case "C":
      return AtlasAuthoring.StampOnly;
    case "CH":
      return AtlasAuthoring.NonWorld;
    case "RT":
      return AtlasAuthoring.Repeatable;
    case "SQ":
      return AtlasAuthoring.SequenceOnly;
    case "WP":
      return AtlasAuthoring.Single;
    case "UF":
      return AtlasAuthoring.Forbidden;
  }
};

const semanticFor = (kind: AtlasCellKind): string => {
  switch (kind) {
    case "C":
      return "compound-only";
    case "CH":
      return "character-showcase-non-world";
    case "RT":
      return "repeatable-world-fill";
    case "SQ":
      return "ordered-sequence-member";
    case "WP":
      return "single-world-prop";
    case "UF":
      return "unknown-forbidden";
  }
};

export const ATLAS_CLASSIFICATION: readonly AtlasClassificationCell[] =
  CLASSIFICATION_ROWS.flatMap((row, y) =>
    Array.from(row, (code, x) => {
      const kind = kindForCode(code);
      return {
        source: { x, y },
        kind,
        authoring: authoringFor(kind),
        semantic: semanticFor(kind),
      };
    }),
  );

export const AtlasClassificationIssueCode = {
  InvalidCell: "invalid-cell",
  OutOfBounds: "out-of-bounds",
  Duplicate: "duplicate",
  Missing: "missing",
} as const;

export type AtlasClassificationIssueCode =
  (typeof AtlasClassificationIssueCode)[keyof typeof AtlasClassificationIssueCode];

export type AtlasClassificationIssue = {
  readonly code: AtlasClassificationIssueCode;
  readonly coordinate?: string;
};

export type AtlasClassificationResult =
  | { readonly valid: true; readonly issues: readonly [] }
  | {
      readonly valid: false;
      readonly issues: readonly AtlasClassificationIssue[];
    };

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readCoordinate = (value: unknown): GridPoint | undefined => {
  if (!isRecord(value)) return undefined;
  const source = Reflect.get(value, "source");
  if (!isRecord(source)) return undefined;
  const x = Reflect.get(source, "x");
  const y = Reflect.get(source, "y");
  return typeof x === "number" && typeof y === "number" ? { x, y } : undefined;
};

const isAtlasCellKind = (value: unknown): value is AtlasCellKind => {
  switch (value) {
    case "C":
    case "CH":
    case "RT":
    case "SQ":
    case "WP":
    case "UF":
      return true;
    default:
      return false;
  }
};

export const validateAtlasClassification = (
  candidate: readonly unknown[],
): AtlasClassificationResult => {
  const issues: AtlasClassificationIssue[] = [];
  const coordinates = new Set<string>();

  for (const value of candidate) {
    const source = readCoordinate(value);
    const kind = isRecord(value) ? Reflect.get(value, "kind") : undefined;
    const authoring = isRecord(value)
      ? Reflect.get(value, "authoring")
      : undefined;
    const semantic = isRecord(value)
      ? Reflect.get(value, "semantic")
      : undefined;
    if (
      source === undefined ||
      !isAtlasCellKind(kind) ||
      authoring !== authoringFor(kind) ||
      semantic !== semanticFor(kind)
    ) {
      issues.push({ code: AtlasClassificationIssueCode.InvalidCell });
      continue;
    }
    const key = `${source.x},${source.y}`;
    if (
      !Number.isInteger(source.x) ||
      !Number.isInteger(source.y) ||
      source.x < 0 ||
      source.x >= ATLAS_COLUMNS ||
      source.y < 0 ||
      source.y >= ATLAS_ROWS
    ) {
      issues.push({
        code: AtlasClassificationIssueCode.OutOfBounds,
        coordinate: key,
      });
      continue;
    }
    if (coordinates.has(key)) {
      issues.push({
        code: AtlasClassificationIssueCode.Duplicate,
        coordinate: key,
      });
    }
    coordinates.add(key);
  }

  for (let y = 0; y < ATLAS_ROWS; y += 1) {
    for (let x = 0; x < ATLAS_COLUMNS; x += 1) {
      const key = `${x},${y}`;
      if (!coordinates.has(key)) {
        issues.push({
          code: AtlasClassificationIssueCode.Missing,
          coordinate: key,
        });
      }
    }
  }

  return issues.length === 0
    ? { valid: true, issues: [] }
    : { valid: false, issues };
};
