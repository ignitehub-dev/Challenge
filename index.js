const findHiddenURL = async () => {
  const url =
    "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Network response was not ok (status: ${response.status})`);
  }
  const html = await response.html();

  const bElements = html.querySelectorAll(
    'section[data-id^="92"] article[data-class$="45"] span[data-tag*="78"] b.ref'
  );

  const urlCharacters = [...bElements].map((b) => b.getAttribute("value"));

  const hiddenURL = urlCharacters.join("");

  console.log("Hidden URL:", hiddenURL);

  window.open(hiddenURL, "_blank");
};

findHiddenURL();
