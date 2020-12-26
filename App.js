import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import Game from './src/components/Game';
import { StatusBar } from 'expo-status-bar';

export default App = () =>{
  const [ gameId, setGameId ] = useState(0);

  return (
    <View style={styles.container}>
      <Game key={gameId} randomNumbersCount={6} initialSeconds={10} />
      <StatusBar style="dark" />
      <Button title="Play Again" onPress={() => setGameId(() => gameId + 1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 60,
    paddingHorizontal: 50,
  }
});
