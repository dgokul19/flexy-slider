import SliderWrapper from "./lib";
import "./App.css";

function App() {

  const sliderOption = {
    loopMode: false,
    tileMargin: 10,
    tileToShow: 4,
    responsive: {
      XS: 1,
      SM: 3,
      MD: 4
    },
    autoSlide: false,
    autoSlideInterval: 2000,
    pauseOnHover: true,
    navMode: {
      showArrow: true,
      arrowStyle: {
        ArrowBackGroundShape: 'circle',
        ArrowBackGroundColor: 'red',
        iconColor: 'blue'
      },
      navigationSlideCount: 2,
    }
  };

  return (
    <>
      <div className="carousel-container">
        <SliderWrapper {...sliderOption}>
          {Array(10).fill(null).map((data, index) => {
            return (<div key={index} className='slider-box'>
              <h1>{index + 1}</h1>
            </div>)
          })
          }
        </SliderWrapper>
      </div>

    </>
  )
}

export default App
