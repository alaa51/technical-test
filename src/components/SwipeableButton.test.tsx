import React from 'react';
import {render} from '@testing-library/react-native';
import SwipeableButton, {SwipeButtonPropsType} from './SwipeableButton';
import {it} from '@jest/globals';
import {
  fireGestureHandler,
  getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils';
import {LongPressGesture, PanGesture} from 'react-native-gesture-handler';

it('should render a SwipeableButton component with given props', () => {
  // import necessary dependencies

  const props = {
    panRef: null,
    index: 0,
    onSwipeRight: jest.fn(),
    onSwipeLeft: jest.fn(),
    title: 'Test Button',
  } as SwipeButtonPropsType;

  const {getByText} = render(<SwipeableButton {...props} />);

  expect(getByText('Test Button')).toBeTruthy();
});

it('sends events with additional data to handlers', () => {
  const panHandlers = mockedEventHandlers();

  const props = {
    panRef: null,
    index: 0,
    onSwipeRight: jest.fn(),
    onSwipeLeft: jest.fn(),
    title: 'Test Button',
  } as SwipeButtonPropsType;

  render(<SwipeableButton {...props} />);

  fireGestureHandler<LongPressGesture>(getByGestureTestId('long-press'), [
    {duration: 5000},
  ]);
  expect(panHandlers.start).toHaveBeenCalled();
  fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
    {x: 5},
    {x: 10},
    {x: 20},
  ]);

  expect(panHandlers.begin).toHaveBeenCalled();

  expect(panHandlers.cancel).not.toHaveBeenCalled();
  expect(panHandlers.fail).not.toHaveBeenCalled();
});

const mockedEventHandlers = () => {
  return {
    begin: jest.fn(),
    start: jest.fn(),
    active: jest.fn(),
    end: jest.fn(),
    fail: jest.fn(),
    cancel: jest.fn(),
    finish: jest.fn(),
  };
};
