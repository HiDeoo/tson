import { expect, test } from "vitest";
import { t } from "../src";

test("array()", () => {
  const input = [1, 2, 3, 4, 5];
  const schema = t.array(t.number());
  expect(schema.parse(input)).toBe(input);
  expect(() => schema.parse([...input, "42"])).toThrow(
    "expected 'number' got 'string' at index '5'",
  );
});

test("array() invalid input", () => {
  // @ts-expect-error invalid input
  const schema = t.array(true);
  expect(() => schema.parse(["42"])).toThrow("type.parse is not a function");
});
