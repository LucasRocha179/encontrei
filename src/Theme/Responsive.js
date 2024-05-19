import {
    Dimensions,
    StatusBar,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ImageStyle,
  } from 'react-native'
  
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  
  const { height: deviceHeight } = Dimensions.get('screen')
  
  const statusBarHeight = StatusBar.currentHeight
  
  const screenHeightIncludeNavBar = deviceHeight - statusBarHeight
  
  const guidelineBaseWidth = 414
  const guidelineBaseHeight = 896
  
  const toHeight = (percent) => {
    return screenHeight * (percent / 100)
  }
  
  const scale = (size) => (screenWidth / guidelineBaseWidth) * size
  
  const verticalScale = (size) =>
    (screenHeight / guidelineBaseHeight) * size
  
  const cachedSize = {}
  
  const moderateScale = (size, factor = 0.5) => {
    if (cachedSize[`${size}_${factor}`]) {
      return cachedSize[`${size}_${factor}`]
    }
    const newSize = size + (scale(size) - size) * factor
    cachedSize[`${size}_${factor}`] = newSize
    return newSize
  }
  
  export {
    scale,
    verticalScale,
    moderateScale,
    screenWidth,
    screenHeight,
    deviceHeight,
    screenHeightIncludeNavBar,
    toHeight,
  }
  
  export function ResponsiveFont(size, factor = 0.25) {
    return moderateScale(size, factor)
  }
  
  export function ResponsiveWidth(size, factor = 0.5) {
    return moderateScale(size, factor)
  }
  
  export function ResponsiveHeight(size, factor = 0.5) {
    return moderateScale(size, factor)
  }

  export const XStyleSheet = {
    ...StyleSheet,
    create: (
      styles,
      skipResponsive,
    ) =>
      StyleSheet.create(
        objectMap(styles, (value) => {
          if (skipResponsive || value.skipResponsive) {
            return value
          } else {
            return checkForResponsive(value)
          }
        }),
      ),
  }
  
  const objectMap = (object, mapFn) => {
    return Object.keys(object).reduce((result, key) => {
      result[key] = mapFn(object[key])
      return result
    }, {})
  }
  
  const checkForResponsive = object => {
    const heightProperties = [
      'height',
      'paddingTop',
      'paddingBottom',
      'marginTop',
      'marginBottom',
      'paddingVertical',
      'marginVertical',
      'top',
      'bottom',
      'minHeight',
      'maxHeight',
      'borderTopWidth',
      'borderBottomWidth',
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
    ]
    const widthProperties = [
      'width',
      'paddingLeft',
      'paddingRight',
      'marginLeft',
      'marginRight',
      'paddingHorizontal',
      'marginHorizontal',
      'left',
      'right',
      'minWidth',
      'maxWidth',
      'borderLeftWidth',
      'borderRightWidth',
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
    ]
    const fontProperties = ['fontSize', 'lineHeight']
    return Object.keys(object).reduce((result, key) => {
      if (typeof object[key] === 'number') {
        if (
          key.includes('flex') ||
          key.includes('opacity') ||
          key.includes('elevation') ||
          key.includes('shadowOpacity') ||
          key.includes('aspectRatio') ||
          key.includes('zIndex')
        ) {
          result[key] = object[key]
        } else {
          if (heightProperties.includes(key)) {
            result[key] = ResponsiveHeight(object[key])
          } else if (widthProperties.includes(key)) {
            result[key] = ResponsiveWidth(object[key])
          } else if (fontProperties.includes(key)) {
            result[key] = ResponsiveFont(object[key])
          } else {
            result[key] = moderateScale(object[key])
          }
        }
      } else {
        result[key] = object[key]
      }
  
      return { ...result }
    }, {})
  }
  