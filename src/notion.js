const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function appendToNotion(pageId, picks) {
  const today = new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).format(new Date());

  await notion.blocks.children.append({
    block_id: pageId,
    children: [
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [
            { type: "text", text: { content: `🍱 ${today} 점심 추천` } },
          ],
        },
      },
      ...picks.map((p) => ({
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: [
            { type: "text", text: { content: `${p.상호명} - ${p.주요메뉴}` } },
          ],
        },
      })),
      {
        object: "block",
        type: "divider",
        divider: {},
      },
    ],
  });
}

module.exports = { appendToNotion };
