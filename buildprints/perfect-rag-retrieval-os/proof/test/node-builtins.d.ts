declare module "node:assert/strict" {
  interface Assert {
    equal(actual: unknown, expected: unknown, message?: string): void;
    match(actual: string, regexp: RegExp, message?: string): void;
  }

  const assert: Assert;
  export default assert;
}

declare module "node:test" {
  type TestFn = () => Promise<void> | void;
  export default function test(name: string, fn: TestFn): void;
}
