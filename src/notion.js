const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function appendToNotion(pageId, picks) {
  const today = new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    timeZone: "Asia/Seoul",
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
      {
        object: "block",
        type: "table",
        table: {
          table_width: 4,
          has_column_header: true,
          has_row_header: false,
          children: [
            {
              object: "block",
              type: "table_row",
              table_row: {
                cells: [
                  [{ type: "text", text: { content: "상호명" } }],
                  [{ type: "text", text: { content: "주요메뉴" } }],
                  [{ type: "text", text: { content: "가격" } }],
                  [{ type: "text", text: { content: "주소" } }],
                ],
              },
            },
            ...picks.map((p) => ({
              object: "block",
              type: "table_row",
              table_row: {
                cells: [
                  [{ type: "text", text: { content: p.상호명 ?? "" } }],
                  [{ type: "text", text: { content: p.주요메뉴 ?? "" } }],
                  [{ type: "text", text: { content: p.가격 ?? "" } }],
                  [{ type: "text", text: { content: p.주소 ?? "" } }],
                ],
              },
            })),
          ],
        },
      },
      {
        object: "block",
        type: "divider",
        divider: {},
      },
    ],
  });
}

module.exports = { appendToNotion };
