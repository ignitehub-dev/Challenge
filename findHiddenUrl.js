import { JSDOM } from "jsdom";

const findHiddenURL = async () => {
  const url =
    "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";

  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const bElements = doc.querySelectorAll(
      'section[data-id^="92"] [data-class$="45"] [data-tag*="78"] b.ref[value]'
    );

    const urlCharacters = [...bElements].map((b) => b.getAttribute("value"));

    const hiddenURL = urlCharacters.join("");

    console.log("Hidden URL:", hiddenURL);
  } catch (error) {
    console.error("Error:", error);
  }
};

findHiddenURL();
