const fs = require("fs");

const getChunksOfArray = (array, size) =>
  array.reduce((acc, _, i) => {
    if (i % size === 0) {
      acc.push(array.slice(i, i + size));
    }
    return acc;
  }, []);

const generateSitemap = async () => {
  try {
    const jsonNames = fs.readdirSync("./data").filter((jsonName) => {
      return !/CC|COMM|FOREX|IL|MONEY|ETLX|GBOND|EUFUND|BOND|INDX/g.test(
        jsonName
      );
    });
    const jsons = jsonNames.flatMap((name) => require(`../data/${name}`));

    // Sitemap must be 50k urls max
    const chunks = getChunksOfArray(jsons, 16000);

    const sitemapNumbers = chunks.map((chunk, i) => {
      const sitemapNumber = i + 1;

      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...chunk.flatMap(({ code, exchange_short_name }) => {
          return [
            `<url><loc>https://tracktak.com/discounted-cash-flow/${code}.${exchange_short_name}</loc></url>`,
            `<url><loc>https://tracktak.com/synthetic-credit-rating/${code}.${exchange_short_name}</loc></url>`,
            `<url><loc>https://tracktak.com/industry-averages/${code}.${exchange_short_name}</loc></url>`,
          ];
        }),
        "</urlset>",
      ];

      fs.writeFileSync(
        `./ui/public/sitemap${sitemapNumber}.xml`,
        xml.join("\n")
      );

      return sitemapNumber;
    });

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      "<sitemap>",
      "<loc>https://tracktak.com/sitemap.xml</loc>",
      "</sitemap>",
      ...sitemapNumbers.flatMap((number) => {
        return [
          "<sitemap>",
          `<loc>https://tracktak.com/sitemap${number}.xml</loc>`,
          "</sitemap>",
        ];
      }),
      "</sitemapindex>",
    ];
    fs.writeFileSync(`./ui/public/sitemap-index.xml`, xml.join("\n"));
  } catch (error) {
    console.error(error);
  }
};

generateSitemap();
