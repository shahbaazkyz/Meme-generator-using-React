import { useState, useEffect } from "react";
import Meme from "./componenets/meme";
// import "./App.css";

const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};
function App() {
  const [allImage, setImages] = useState([]);
  const [sImage, setImage] = useState(null);
  const [topText, setTop] = useState("");
  const [bottomText, setBottom] = useState("");
  const [generatedMeme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((data) =>
      data.json().then((respone) => setImages(respone.data.memes))
    );
    // console.log(allImage);
  }, []);

  if (generatedMeme) {
    return (
      <div style={{ textAlign: "center" }}>
        <img src={generatedMeme} alt="custom Meme" width="200px" />
      </div>
    );
  }

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {sImage && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            // Logic to create meme from ApI
            const params = {
              template_id: sImage.id,
              text0: topText,
              text1: bottomText,
              username: process.env.REACT_APP_IMGFLIP_USERNAME,
              password: process.env.REACT_APP_IMGFLIP_PASSWORD,
            };
            const response = await fetch(
              `https://api.imgflip.com/caption_image${objectToQueryParam(
                params
              )}`
            );

            const json = await response.json();
            console.log(json);
            setMeme(json.data.url);
          }}
        >
          <Meme img={sImage} />
          <input
            type="text"
            placeholder="Top Text"
            value={topText}
            onChange={(e) => setTop(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bottom Text"
            value={bottomText}
            onChange={(e) => setBottom(e.target.value)}
          />
          <button type="submit">Generate Meme</button>
        </form>
        // <Meme img={sImage}/>
      )}
      {!sImage && (
        <>
          <h1>Choose a Pic for Meme!</h1>
          <div className="row">
            <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
              {allImage.map((img, index) => {
                return (
                  <Meme
                    key={index}
                    img={img}
                    onClick={() => {
                      setImage(img);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
      {/* </header> */}
    </div>
  );
}

export default App;
