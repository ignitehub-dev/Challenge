import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("URL entered:", url);
    // You can add more logic here (e.g. fetch the URL, etc.)
  };

  return (
    <>
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
      </div>
    </>
  );
}

export default App;
