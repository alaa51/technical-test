import {Dimensions, StyleSheet} from 'react-native';
const BUTTON_WIDTH = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  swipeButtonContainer: {
    height: 59,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: BUTTON_WIDTH,
  },
  swipeButton: {
    position: 'absolute',
    left: 0,
    height: 59,
    width: 80,
    borderRadius: 10,
    zIndex: 3,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeText: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400',
    zIndex: 2,
    color: 'grey',
  },
  flexCenter: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  iconLeft: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: -1,
    height: 45,
    left: 5,
    width: 45,
  },
  iconRight: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: -1,
    right: 0,
    height: 59,
    width: 59,
  },
  fullFlex: {flex: 1},
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  button: {
    height: 59,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
