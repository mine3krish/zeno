export default function tocPlugin() {
  return {
    onMarkdownParse(markdown) {
      const headers = [];
      markdown = markdown.replace(/^## (.+)$/gm, (_, text) => {
        headers.push(text);
        return `### ${text} <a id="${text.toLowerCase().replace(/\s+/g, '-')}"></a>`;
      });
      if (headers.length) {
        const toc = headers.map(h => `- [${h}](#${h.toLowerCase().replace(/\s+/g, '-')})`).join('\n');
        markdown = `## Table of Contents\n${toc}\n\n` + markdown;
      }
      return markdown;
    }
  };
}