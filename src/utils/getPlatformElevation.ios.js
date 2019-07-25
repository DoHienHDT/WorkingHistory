/* eslint-enable import/no-unresolved, import/extensions */

const getPlatformElevation = elevation => {
    if (elevation === 0) {
      return {
        backgroundColor: '#90caf9',
        shadowColor: 'transparent',
        zIndex: 0,
      };
    }
  
    return {
      
      shadowColor: 'gray',
      shadowOpacity: 1.3,
      shadowRadius: elevation / 2,
      shadowOffset: {
        height: 1,
        width: 0,
      },
      // we need to have zIndex on iOS, otherwise the shadow is under components that
      // are rendered later
      zIndex: 1,
    };
  };
  
  export default getPlatformElevation;
  