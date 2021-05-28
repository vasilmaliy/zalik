import React from 'react';
import ListViewController from './src/components/ListViewController/ListViewController'

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const App = () => {
    return (
        <View style={styles.container}>
            <ListViewController/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });

export default App;


