
# flexy-slider

A simple react component which makes your carousel/slider functionality so easy to integrate in your application. 
## Demo

will be updated soon

  
## Installation

Install my-project with npm

```bash
  npm install flexy-slider --save
```

```bash
  yarn add flexy-slider
```

```
<!-- Import CSS Module into the file -->

import 'flexy-slider/dist/index.css' 
```

```bash

*** Options are not mandatory,without options component will behave as non navigational slider ***

import React from "react";
import FlexySlider  from "flexy-slider";

import 'flexy-slider/dist/index.css'        // Mandatory

export default function App() {
    # Options are not mandatory
  var options = {
    componentWidth : 1600,          //  in pixels(eg: 1000)
    componentHeight : 300,          //  in pixels(eg: 200)
    componentMargin : 10,           //  in pixels(eg: 20)
    tileMargin : 5,                 //  in pixels(eg: 20)
    tileToShow: 4,                  //  in numbers
    responsive : {                  //  in object
      XS:1,                         //  in numbers 
      SM : 2,                       //  in numbers  
    },
    navMode : {
      showArrow : true,             //  in boolean (true / false)
      arrowStyle : {                
        ArrowBackGroundShape :'circle',         //  in string
        ArrowBackGroundColor : '#f00',          //  in string (color code / color name)
        iconColor : 'white'                     //  in string (color code / color name)
      },
      navigationSlideCount : 4,      //  in numbers  
    }
  };
  return (
    <FlexySlider {...options}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </FlexySlider>
  );
}

```
    

## Documentation

  **Basic Properties**

| Name             | Default    | Description |
| ---------------- | ---------- | ----------- |
| componentWidth   | 100%      | Slider / Carousel container width (horizantally)  |
| componentHeight  | auto   | Slider / Carousel container width (vertically)  |
| componentMargin  | 0  | Slider / Carousel container margin |
| tileMargin       | 10px | Default margin between individual tiles |
| tileToShow       | 4 | Number of tiles need to display in browser |

**Auto Slide Properties**

| Name             | Default    | Description | Options |
| ---------------- | ---------- | ----------- | ------- |
| autoSlide       | false      | (Boolean) In Default auto slide will be disabled | true, false
| autoSlideInterval  | 4000   | Interval should be in milli seconds  |
| pauseOnHover  | false   | (Boolean) On MouseOver Slider will be paused  | true, false

Auto slide properties can be applicable in both navMode.showArrow enabled / disabled options.

In autoslide mode, navigation slide count will be in default 1.
(custom slideCount for autoSlide mode will be enabled in upcoming releases..) 
```
let options = {
    tileMargin : 15,
    tileToShow: 4,
    autoSlide : true,
    autoSlideInterval: 4000,
    navMode : {
      showArrow : true
    }
}

return (
    <FlexySlider {...options}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
    </FlexySlider>
);
```

**Responsive properties**

Can customize number of tiles need to diplay based on screen size.
For example, You can set,
1)  Four images have to diplayed in desktop mode.
2)  Two images have to be displayed in tablet mode.
3)  One image only have to displayed in mobile.

```
let options = {
    tileMargin : 15,
    tileToShow: 4,                  //  Number of tiles to be displayed in default web mode ( Greater than 1200px)
    responsive : {                  //  in object
      XS:1,                         //  Number of tiles to be displayed in mobile. (XS devices)
      SM : 2,                       //  Number of tiles to be displayed in Tablet Mode. (SM devices)
      MD : 2,                       //  Number of tiles to be displayed in Tablet/Low resolution desktop Mode. (MD devices)
    },
}

return (
    <FlexySlider {...options}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
    </FlexySlider>
);
```
| Name             | Default    | Description |
| ---------------- | ---------- | ----------- |
| responsive       | { SM : 2, XS : 1, MD : 3}      | Responsiveness can be differentiate based on this screen size |

<--Screen size-->

1) **XS** < 500px  
2) 500px > **SM** < 899px 
3) 900px > **MD** <= 1200px
4) 1200px > **LG** (Default state)


**Navigational properties**

Can customize the option to turn on/off the navigation icon.

1) In default, *Wrapper* will behave like a  navigationless slider.
2) To turn on the navigation icon, 

```
let options = {
    tileMargin : 15,
    tileToShow: 3,
    navMode : {
        showArrow : true,
    }
}

return (
    <FlexySlider {...options}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
    </FlexySlider>
);
```
1) *Some useful properties to enhance navigation mode.*

| Name             | Default    | Description |
| ---------------- | ---------- | ----------- |
| showArrow   | false      | To turn on/off the navigation icon |
| navigationSlideCount  | 4  | Number of tiles to navigate on click ( showArrow must be enabled)|

2) *Can customize the navigation icons as well.To customize,*

```
import Image1 from './assets/img/image_01.png'
import Image2 from './assets/img/image_02.png'

let options = {
    tileMargin : 15,
    tileToShow: 3,
    navMode : {
        showArrow : true,
        icon: {
            type : 'IMAGE',  //  formats suppported jp(e)g/png/gif/svg
            left : Image1 ,
            right : Image2
        }  
    }
}

return (
    <FlexySlider {...options}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
    </FlexySlider>
);

```

3) *Can customize the default navigation icon style as well.To customize,*

```
let options = {
    tileMargin : 15,
    tileToShow: 3,
    navMode : {
        showArrow : true,
        arrowStyle : {
            ArrowBackGroundShape :'circle',
            ArrowBackGroundColor : '#f00',
            iconColor : '#fff' 
        }
    }
}

return (
    <FlexySlider {...options}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
    </FlexySlider>
);

```

**Properties under **arrowStyle** 
| Name             | Default    | Description |
| ---------------- | ---------- | ----------- |
| ArrowBackGroundShape   | circle      | navigation icons shapes available in circle or square |
| ArrowBackGroundColor  | dark grey (#555 in hexa code)  | Arrow background color can be color name or hexadecimal code|
| iconColor   | Yellow (#ff0 in hexa code)     | Arrow icon [ svg ] color can be color name or hexadecimal code|

 
## Screenshots
With Navigation enabled

```
  <!-- Single tiles will be navigate ( Carousel Mode ) -->
  let options = {
      tileToShow: 1,
      navMode : {
          showArrow : true,
          navigationSlideCount : 1,
      }
  }
```
[![Rtt9hF.md.png](https://iili.io/Rtt9hF.md.png)](https://freeimage.host/i/Rtt9hF)

```
  <!-- Two tiles will be navigate at a time -->
  let options = {
    tileToShow: 3,
    navMode : {
        showArrow : true,
        navigationSlideCount : 2,
    }
  }
```

[![Rtt2EJ.md.png](https://iili.io/Rtt2EJ.md.png)](https://freeimage.host/i/Rtt2EJ)


Without Navigation enabled

```
  let options = {
    tileToShow: 4,
    navMode : {
        showArrow : false,
    }
  }
```

[![RZ5kNV.md.png](https://iili.io/RZ5kNV.md.png)](https://freeimage.host/i/RZ5kNV)
  
  
## Features
- Can be used as carousel, image-gallery-slider
- Simple Installation
- Easy Configurables
- Resposive
- Cross platform

 