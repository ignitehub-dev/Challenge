import React, { useState, useEffect } from "react";

function App() {
  const [url, setUrl] = useState(
    "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/766172"
  );
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState("");
  const [displayedChars, setDisplayedChars] = useState<string[]>([]);

  useEffect(() => {
    if (!flag) return;

    let currentIndex = 0;
    setDisplayedChars([]);

    const intervalId = setInterval(() => {
      currentIndex += 1;
      setDisplayedChars((chars) => [...chars, flag[currentIndex - 1]]);
      if (currentIndex === flag.length) {
        clearInterval(intervalId);
      }
    }, 500); // 0.5 second delay

    return () => clearInterval(intervalId);
  }, [flag]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFlag("");
    setDisplayedChars([]);
    // Render a "Loading..." text while the request is ongoing
    setLoading(true);

    try {
      // HTTP request to URL obtained in step 2
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }
      const text = await response.text();
      setFlag(text);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1>Ramp Challenge!</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <label htmlFor="urlInput">Enter URL: </label>
        <input
          id="urlInput"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <button type="submit" style={{ marginLeft: "0.5rem" }}>
          Submit
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {!loading && displayedChars.length > 0 && (
        <ul style={{ listStyleType: "none", padding: 0, marginTop: "1rem" }}>
          {displayedChars.map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

// import { JSDOM } from "jsdom";

// const findHiddenURL = async () => {
//   const url =
//     "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";

//   try {
//     const response = await fetch(url);
//     const html = await response.text();
//     const dom = new JSDOM(html);
//     const doc = dom.window.document;

//     const bElements = doc.querySelectorAll(
//       'section[data-id^="92"] [data-class$="45"] [data-tag*="78"] b.ref[value]'
//     );

//     const urlCharacters = [...bElements].map((b) => b.getAttribute("value"));

//     const hiddenURL = urlCharacters.join("");

//     console.log("Hidden URL:", hiddenURL);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// findHiddenURL();
