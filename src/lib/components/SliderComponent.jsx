import React, { Fragment, useRef, useState, useLayoutEffect, useEffect, useCallback } from 'react';

// Component
import { ArrowSvgComponent } from "./ArrowComponent";

import { defaultSlider } from '../utils/constant';
import { getNavigationTileCount, navigationArrowStyle } from '../utils/common';

import LeftArrowSvg from '../../assets/left-arrow.svg';
import RightArrowSvg from '../../assets/right-arrow.svg';

import '../css/flexy.css';

const initialState = {
    'parentWidth': 0,
    'innerWidth': '100%',
    'innerElementPosition': 0,
    'passedTile': 0,
    'mainWidth': '100%',
    'overflowX': 'hidden',
    'autoSlide': false
};

const defaultDisable = { left: true, right: false };

const SliderWrapper = (props) => {
    let { children, tileToShow, responsive = {}, navMode = {}, componentWidth, componentHeight, componentMargin, tileMargin, autoSlide } = props;
    const [elementPosition, setElementPosition] = useState({ ...initialState });
    const [navDisable, setNavigationDisable] = useState({ ...defaultDisable });
    // Default Tile margin space is 10 From CSS, So (10+10 => 20) 
    let tileMarginSpace = 20;
    if (tileMargin) {
        document.documentElement.style.setProperty('--base-tile-margin', `${tileMargin}px`);
        tileMarginSpace = tileMargin + tileMargin;
    }

    const refContainer = useRef(null);
    tileToShow = tileToShow ? tileToShow : defaultSlider.tileToShow;

    const updateSize = () => {
        let widthOption = { ...elementPosition, passedTile: tileToShow, autoSlide };
        let disableObject = { ...navDisable };
        
        if (widthOption.passedTile >= children?.length) {
            setNavigationDisable({ left: true, right: true });
        }
        if (!navMode || !navMode.showArrow) {
            widthOption['overflowX'] = 'auto';
        }
        // Getting the Parent Elements Width
        const { clientWidth } = refContainer.current.parentElement;

        // Customized responsive slider options calulations
        if (clientWidth < 500) {
            widthOption['innerWidth'] = (clientWidth / (responsive && responsive.XS || defaultSlider.responsive.XS)) * children.length;
            widthOption['passedTile'] = (responsive && responsive.XS || defaultSlider.responsive.XS);
        } else if (clientWidth > 500 && clientWidth < 899) {
            widthOption['innerWidth'] = (clientWidth / (responsive && responsive.SM || defaultSlider.responsive.SM)) * children.length;
            widthOption['passedTile'] = (responsive && responsive.SM || defaultSlider.responsive.SM);
        } else if (clientWidth > 900 && clientWidth < 1200) {
            widthOption['innerWidth'] = (clientWidth / (responsive && responsive.MD || defaultSlider.responsive.MD)) * children.length;
            widthOption['passedTile'] = (responsive && responsive.MD || defaultSlider.responsive.MD);
        } else {
            widthOption['innerWidth'] = children.length ? (clientWidth / tileToShow) * children.length : clientWidth;
        }
        if (Number(widthOption['passedTile']) === children.length) {
            disableObject['right'] = true;
        }

        widthOption['parentWidth'] = clientWidth;
        widthOption['mainWidth'] = clientWidth;
        setElementPosition(widthOption);
        setNavigationDisable({ ...disableObject });
    };

    useLayoutEffect(() => {
        if (!children?.length) return;
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const handleNavigation = (dirctnValue) => {
        const disableOptions = { left: false, right: false };
        const { clientWidth } = refContainer.current.parentElement;

        // Passing DeviceWidth, actualSlideClount, (responsiveSlideCount - if possible );
        let navigationSlideCount = getNavigationTileCount(elementPosition.parentWidth, navMode.navigationSlideCount, responsive);
        if (props.autoSlide) {
            navigationSlideCount = defaultSlider.autoSlideCount;
        }
        const { innerElementPosition, passedTile } = elementPosition;
        const singleTileWidth = refContainer.current.children[0].children[0].clientWidth;

        if (navigationSlideCount) {
            navigationSlideCount = navigationSlideCount <= tileToShow ? navigationSlideCount : Math.floor(refContainer.current.clientWidth / singleTileWidth);
        } else {
            navigationSlideCount = Math.floor(refContainer.current.clientWidth / singleTileWidth);
        }

        // Calculating how many tile need to move based an input 
        // 20 is margin setted in css file [margin between each tiles]
        let pos = ((navigationSlideCount * singleTileWidth) + (navigationSlideCount * tileMarginSpace)) * dirctnValue;

        let remainpos = passedTile + (dirctnValue * - navigationSlideCount);

        if (innerElementPosition !== 0) {
            pos = parseInt(innerElementPosition) + parseInt(pos);
        }

        if (dirctnValue < 0 && (children.length - passedTile) <= tileToShow) {
            let remainingTile = children.length - passedTile;
            if (remainingTile <= navigationSlideCount) {
                pos = innerElementPosition + ((remainingTile * (singleTileWidth + tileMarginSpace)) * dirctnValue)
                disableOptions.right = true;
            }
        }

        if (dirctnValue > 0 && (pos * dirctnValue) >= 0) {
            pos = 0;
            disableOptions.left = true;
            remainpos = tileToShow;
        }

        let stateObj = { 
            ...elementPosition,
            mainWidth : clientWidth ? clientWidth : elementPosition.mainWidth,
            parentWidth : clientWidth ? clientWidth : elementPosition.parentWidth,
            passedTile  : remainpos,
            innerElementPosition : pos
        };
       
        setElementPosition(stateObj);
        setNavigationDisable(disableOptions)
    };

    useEffect(() => {
        const { autoSlideInterval } = props;

        let timer;
        if (elementPosition.autoSlide && elementPosition.passedTile > 0) {
            let intervalSeconds = autoSlideInterval || defaultSlider.autoSlideInterval;
            if (elementPosition.passedTile > children?.length) {
                let stateObj = { ...elementPosition };
                stateObj['innerElementPosition'] = 0;
                stateObj['passedTile'] = tileToShow;
                setElementPosition(stateObj);
                setNavigationDisable(defaultDisable);
            } else {
                timer = setTimeout(() => {
                    handleNavigation(-1);
                }, intervalSeconds);
            }
            return () => {
                clearInterval(timer);
            };
        }
    }, [elementPosition.passedTile, elementPosition.autoSlide]);

    const ArrowIconComponent = React.memo(({ style, disableMe, iconOption, directionMode }) => {
            const { type } = iconOption || {};
            let sytleOption = navigationArrowStyle(style);
            let arrowOptions = {
                arrowSrc: '',
                altText: '',
                clickValue: 0
            };
            if (directionMode === 'left') {
                arrowOptions['arrowSrc'] = iconOption && iconOption.left ? iconOption.left : LeftArrowSvg;
                arrowOptions['altText'] = 'Left Arrow Slider';
                arrowOptions['clickValue'] = 1
            } else {
                arrowOptions['arrowSrc'] = iconOption && iconOption.right ? iconOption.right : RightArrowSvg;
                arrowOptions['altText'] = 'Right Arrow Slider';
                arrowOptions['clickValue'] = -1
            }
            return (
                <span className={disableMe ? 'disabled' : 'enabled'} style={sytleOption} onClick={() => handleNavigation(arrowOptions['clickValue'])}>
                    {
                        type === 'IMAGE' ? (<img disabled={disableMe} src={arrowOptions['arrowSrc']} alt={arrowOptions.altText} />) : <ArrowSvgComponent svgSource={directionMode} svgColor={sytleOption.color} />
                    }
                </span>
            );
        });

    const navModeElement = useCallback(() => {
        const { icon, showArrow, arrowStyle } = navMode || {};

        if (showArrow) {
            return (
                <Fragment>
                    <div className="nav-slider left">
                        <ArrowIconComponent directionMode={`left`} style={arrowStyle} disableMe={navDisable.left} iconOption={icon} />
                    </div>
                    <div className="nav-slider right">
                        <ArrowIconComponent directionMode={`right`} style={arrowStyle} disableMe={navDisable.right} iconOption={icon} />
                    </div>
                </Fragment>
            )
        }
        return null;
    });

    const pauseSliding = (boolEnable) => {
        if (props.pauseOnHover && autoSlide) {
            setElementPosition({ ...elementPosition, autoSlide: boolEnable });
        }
    };

    return (
        <Fragment>
            {children && children.length ?
                (<div style={{ width: componentWidth ? `${componentWidth}px` : '100%', height: componentHeight ? `${componentHeight}px` : 'auto', 'margin': componentMargin ? `${componentMargin}px` : '0px' }}>
                    <div ref={refContainer} className={`slider-container`} style={{ width: elementPosition.mainWidth, overflowX: elementPosition.overflowX }}>
                        <div className={`sliderWidthBox`} onMouseEnter={() => pauseSliding(false)} onMouseLeave={() => pauseSliding(true)} style={{ width: elementPosition.innerWidth, 'transform': `translateX(${elementPosition.innerElementPosition}px)` }}>
                            {children}
                        </div>

                        {/* Navigation Element Implementations */}
                        {navModeElement()}
                    </div>
                </div>
                ) : `No data found !!`
            }
        </Fragment>
    );
};


export default SliderWrapper;