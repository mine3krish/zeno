import { execa } from 'execa';

describe("zeno build", () => {
  test("builds blog", async () => {
    const { stdout, exitCode } = await execa("node", ["./bin/zeno.js", "build"]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("Blog built successfully");
  });
});

