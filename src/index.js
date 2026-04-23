require("dotenv").config();

const restaurants = require("./restaurants.json");
const { pickRestaurants } = require("./picker");
const { appendToNotion } = require("./notion");

async function main() {
  const pageId = process.env.NOTION_PAGE_ID;

  const picks = pickRestaurants(restaurants);

  await appendToNotion(pageId, picks);

  console.log("점심 추천 완료 🍱");
}

main();
