import SwipeableButton from './components/SwipeableButton.tsx';
import React, {useCallback} from 'react';
import {Alert, Pressable, SafeAreaView, Text, View} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {styles} from './styles.tsx';

const App = () => {
  const flatListRef = React.useRef<FlatList>(null);
  const panRef = React.useRef(null);

  const [data, setData] = React.useState([
    {id: Math.round(Math.random() * 10000), title: 'Im first'},
    {id: Math.round(Math.random() * 10000), title: 'Im second'},
    {id: Math.round(Math.random() * 10000), title: 'Im third'},
    {id: Math.round(Math.random() * 10000), title: 'Im fourth'},
    {id: Math.round(Math.random() * 10000), title: 'Im fifth'},
    {id: Math.round(Math.random() * 10000), title: 'Im sixth'},
    {id: Math.round(Math.random() * 10000), title: 'Im seventh'},
  ]);

  const handleSwipeRight = useCallback(() => {
    Alert.alert('Swiped Right');
  }, []);

  const handleSwipeLeft = useCallback((item: number) => {
    setData(prev => prev.filter(i => i.id !== item));
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: {id: number; title: string}; index: number}) => {
      return (
        <SwipeableButton
          index={index}
          key={item.id}
          panRef={panRef}
          title={item.title}
          onSwipeRight={() => handleSwipeRight()}
          onSwipeLeft={() => handleSwipeLeft(item.id)}
        />
      );
    },
    [handleSwipeLeft, handleSwipeRight],
  );

  return (
    <SafeAreaView style={styles.fullFlex}>
      <GestureHandlerRootView style={styles.fullFlex}>
        <View style={styles.fullFlex}>
          <Text style={styles.title}>FlatList Component</Text>
          <Animated.FlatList
            layout={LinearTransition}
            ref={flatListRef}
            data={data}
            ItemSeparatorComponent={Separator}
            renderItem={renderItem}
          />
        </View>
        <Pressable
          style={styles.button}
          onPress={() =>
            setData(prev => [
              ...prev,
              {id: Math.round(Math.random() * 10000), title: 'Im new'},
            ])
          }>
          <Text style={styles.buttonTitle}>Add Item</Text>
        </Pressable>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const Separator = () => {
  return <View style={{height: 16}} />;
};

export default App;
