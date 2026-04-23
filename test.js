require("dotenv").config();

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function test() {
  await notion.blocks.children.append({
    block_id: "34b1b9f650d2801f9f40d999749d1c15",
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: "연동 테스트 성공 🎉" },
            },
          ],
        },
      },
    ],
  });

  console.log("완료!");
}

test();
