import { defaultSlider } from "./constant";
                            //    Tile Count need to be slide on navigationClick
export const getNavigationTileCount = ( deviceWidth, sliderTileCount, responsiveOptions) => {
    let tileToSlide = sliderTileCount;
    const { XS, SM, MD } = responsiveOptions;
    const { responsive, tileToShow } = defaultSlider;
    if (deviceWidth < 500) {
        tileToSlide = XS ? (tileToSlide < XS ? tileToSlide : XS) : (tileToSlide < responsive.XS ? tileToSlide : responsive.XS);
    } else if (deviceWidth > 500 && deviceWidth < 899) {
        tileToSlide = SM ? (tileToSlide < SM ? tileToSlide : SM) : (tileToSlide < responsive.SM ? tileToSlide : responsive.SM);
    } else if (deviceWidth > 900 && deviceWidth < 1200) {
        tileToSlide = MD ? (tileToSlide < MD ? tileToSlide : MD) : (tileToSlide < responsive.MD ? tileToSlide : responsive.MD);
    } else {
        tileToSlide = sliderTileCount ? sliderTileCount : defaultSlider.navMode.navigationSlideCount;
    }

    return tileToSlide;
};

const arrowBackGroundShape = (radiusOption) =>  {
    if(radiusOption === 'circle'){
        return `30px`;
    }
    return `5px`;
}

                        // NavigationArrowStyle Option Customization 

export const navigationArrowStyle = (styleProperties) => {
    let style = {};
    if(styleProperties) {
        const { ArrowBackGroundShape, ArrowBackGroundColor, iconColor } = styleProperties; 
        if(ArrowBackGroundShape){
            style['borderRadius'] = arrowBackGroundShape(ArrowBackGroundShape);
        }

        if (ArrowBackGroundColor) {
            style['backgroundColor'] = ArrowBackGroundColor;
        }

        if(iconColor) {
            style['color'] = iconColor;
        }
    }
    return style;
};
