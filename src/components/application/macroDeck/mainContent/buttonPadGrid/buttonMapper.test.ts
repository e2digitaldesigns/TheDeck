import "@testing-library/jest-dom";

import { padMapper } from "./buttonMapper";

describe("Pad Mapper", () => {
  it("Should return 33", () => {
    const defaultParameter = padMapper();
    expect(defaultParameter).toBe(33);
  });

  it("Should return 17", () => {
    const result = 17;
    let parameter = padMapper(6);
    expect(parameter).toBe(result);

    parameter = padMapper(8);
    expect(parameter).toBe(result);
  });

  it("Should return 25", () => {
    const result = 25;
    let parameter = padMapper(12);
    expect(parameter).toBe(result);

    parameter = padMapper(15);
    expect(parameter).toBe(result);

    parameter = padMapper(18);
    expect(parameter).toBe(result);
  });

  it("Should return 33", () => {
    const result = 33;
    let parameter = padMapper(24);
    expect(parameter).toBe(result);

    parameter = padMapper(32);
    expect(parameter).toBe(result);
  });
});
