import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

let intervalId;

export default Game = ({ randomNumbersCount = 4, initialSeconds }) => {
  const [ selectedNumbers, setSelectedNumbers ] = useState([]);
  const [ randomNumbers, setRandomNumbers ] = useState([]);
  const [ target, setTarget ] = useState(10);
  const [ remainingSeconds, setRemainingSeconds ] = useState(initialSeconds);
  const [ gameStatus, setGameStatus ] = useState('PLAYING');

  useEffect(() => {
    const firstRandomNumbers = Array.from({ length: randomNumbersCount })
      .map(() => 1 + Math.floor(10 * Math.random()));
    const firstTarget = firstRandomNumbers.slice(0, randomNumbersCount - 2)
      .reduce((acc, cur) => acc + cur, 0);
    const shuffledRandomNumbers = shuffle(firstRandomNumbers);
    setRandomNumbers(shuffledRandomNumbers);
    setTarget(firstTarget);
    intervalId = setInterval(() => {
      setRemainingSeconds(seconds => seconds - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setGameStatus(getGameStatus());
    if (remainingSeconds === 0 || gameStatus !== 'PLAYING')
      clearInterval(intervalId);
  }, [remainingSeconds, selectedNumbers]);

  const isNumberSelected = numberIndex =>
    selectedNumbers.some(number => number === numberIndex);

  const selectNumber = number =>
    setSelectedNumbers([ ...selectedNumbers, number ]);

  const getGameStatus = () => {
    const sumSelected = selectedNumbers.reduce((acc, cur) => acc + randomNumbers[cur], 0);
    // console.warn(sumSelected);
    if (sumSelected > target || remainingSeconds === 0) {
      return 'LOST';
    } else if (sumSelected === target) {
      return 'WON';
    } else {
      return 'PLAYING';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[gameStatus]]}>{target}</Text>
      <Text>{gameStatus}</Text>
      <Text>{remainingSeconds}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) =>
          <RandomNumber
            id={index}
            key={index}
            number={randomNumber}
            disabled={isNumberSelected(index) || gameStatus !== 'PLAYING'}
            onSelected={selectNumber} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    textAlign: 'center',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  PLAYING: {
    backgroundColor: '#bbb',
  },
  WON: {
    backgroundColor: 'green',
  },
  LOST: {
    backgroundColor: 'red',
  }
});
