import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [isStartedGame, setIsStartedGame] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [time, setTime] = useState(0);
  const [fetchedImages, seFetchedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const url1 = "https://dog.ceo/api/breeds/image/random";
  const url2 = "https://api.thecatapi.com/v1/images/search?limit=4";
  async function getImages() {
    try {
      const response = await Promise.all(
        [url1, url2].map((url) => fetch(url).then((res) => res.json()))
      );
      seFetchedImages([response[0], ...response[1]]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getImages();
  }, []);

  console.log(fetchedImages);
  function startGame() {
    setIsStartedGame((prev) => !prev);
  }
  useEffect(() => {
    if (isStartedGame) {
      const timer = setTimeout(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isStartedGame]);

  function handleImage(item) {
    setSelectedImage(item?.url ?? item.message);
    if (item.success) setCurrentScore((prev) => prev + 1);
  }

  // useEffect(()=>{
  //   if(isStartedGame&&selectedImage.includes("dog")){
  //     setCurrentScore((prev)=>1)
  //   }
  // })
  return (
    <div className="bg-[#26362C]  w-[100%] h-[100vh]">
      <div className="container">
        <header className="max-w-[1200px] w-[90%] py-[32px]">
          <span className="text-white">DogFinder</span>
        </header>
        {isStartedGame ? (
          <div>
            <div className="grid grid-cols-11 gap-[20px]">
              {fetchedImages.map((item, index) => (
                <img
                  key={index}
                  onClick={() => handleImage(item)}
                  className="h-[80px] blur-sm cursor-pointer"
                  src={item?.message ? item.message : item.url}
                />
              ))}
            </div>
            <div className="flex justify-between mt-[90px]">
              <div className="">
                <h3>Score: {currentScore}</h3>
                <h3>Time: {time}</h3>
              </div>
              <button
                className="bg-[#33D570]  rounded-[12px] px-[14px] py-[8px]  text-white"
                onClick={getImages}
              >
                Next Question
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="mt-[200px] ">
              <h1 className="text-white text-center">Start dog finder game</h1>
              <p className="text-white my-[25px] text-center">
                You will have to choose an image of a dog from 5 total pictures,
                try to get the highest score
              </p>
              <div className="w-[100%]">
                <button
                  onClick={startGame}
                  className="bg-[#33D570]  rounded-[12px] px-[14px] py-[8px]  text-white"
                >
                  Start Game
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
