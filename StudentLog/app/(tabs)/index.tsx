import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import {TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


// const [assignment, setAssignment] = useState({
//   title: '',
//   description: '',
//   // Add more fields as needed
// });

export default function TabOneScreen() {
  return (
      <View style={styles.button}>
        <Ionicons name="add-circle" size={50} color="#8b0000"  />

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button : {
    padding: 20
  },
  title: {
    fontSize: 20,
    padding: 20,
    fontWeight: 'bold',

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
