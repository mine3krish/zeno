import { slugify } from "./builderUtils";

describe("slugify()", () => {
  const cases = [
    {
      input: "my first blog post",
      expected: "my-first-blog-post",
    },
    {
      input: "HELLO WORLD IN JAVASCRIPT",
      expected: "hello-world-in-javascript",
    },
    {
      input: "Top 10 Cars of 2025",
      expected: "top-10-cars-of-2025",
    },
    {
      input: "C++ vs. Rust: Which is Better?",
      expected: "c-vs-rust-which-is-better",
    },
    {
      input: "Wait... What?! Really?!",
      expected: "wait-what-really",
    },
    {
      input: "Learning React 🚀🔥",
      expected: "learning-react",
    },
    {
      input: "   extra   spaces   here   ",
      expected: "extra-spaces-here",
    },
    {
      input: "Rock & Roll: Past & Future",
      expected: "rock-roll-past-future",
    },
    {
      input:
        "A Deep Dive into the Intricacies of Distributed Systems and Their Applications in Modern Cloud Computing",
      expected:
        "a-deep-dive-into-the-intricacies-of-distributed-systems-and-their-applications-in-modern-cloud-computing",
    },
  ];

  test.each(cases)("slugify(%p)", ({ input, expected }) => {
    expect(slugify(input)).toBe(expected);
  });
});

