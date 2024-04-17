import { StyleSheet, TextInput, Button, TouchableOpacity, View, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/Themed';

export default function TabOneScreen() {
  const [showForm, setShowForm] = useState(false);
  const [Events, setEvents] = useState([]);
  const [newEvents, setNewEvents] = useState({
    description: '',
    name: '',
    time: '',
  });

  const inputEvents = (field: string, value: string) => {
    setNewEvents({ ...newEvents, [field]: value });
  };

  const displaySuccess = () => {
    Alert.alert(
        'Successfully Added',
        'Events Added to Log',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK') },
        ],
        { cancelable: false }
    );
  };

  const displayFailure = () => {
    Alert.alert(
        'Error',
        'Please enter all Events details',
        [{ text: 'OK', onPress: () => console.log('OK') }],
        { cancelable: false }
    );
    return;
  };

  const createEvents = () => {
    // @ts-ignore
    setEvents([...Events, newEvents]);
    setNewEvents({
      description: '',
      name: '',
      time: '',
    });
    setShowForm(false);
  };

  const removeEvents = (index: number) => {
    const updatedEvents = [...Events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const checkSubmission = () => {
    if (newEvents.description === '' ||
        newEvents.name === '' ||
        newEvents.time === '') {
      displayFailure();
    } else {
      createEvents();
      displaySuccess();
    }
  };

  return (
      <View style={styles.container}>
        {showForm ? (
            <View style={styles.form}>
              <Text style={styles.newEvents}>New Event</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={newEvents.description}
                  onChangeText={(text) => inputEvents('description', text)}
              />
              <TextInput
                  style={styles.input}
                  placeholder="name"
                  value={newEvents.name}
                  onChangeText={(text) => inputEvents('name', text)}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Time"
                  value={newEvents.time}
                  onChangeText={(text) => inputEvents('time', text)}
              />
              <View style={styles.submitButton}>
                <Button color='white' title="Submit"  onPress={() => {checkSubmission();}}/>
              </View>
            </View>
        ) : (
            <View style={styles.button}>
              <TouchableOpacity onPress={toggleFormVisibility}>
                <View style={styles.buttonHeader}>
                  <Ionicons name="add-circle" size={50} color="#8b0000" />
                  <Text style={styles.buttonText}>Create Events</Text>
                </View>
              </TouchableOpacity>
            </View>
        )}

        {Events.length > 0 && (
            <View style={styles.EventsList}>
              <Text style={styles.EventsTitle}>Upcoming Events</Text>
              {Events.map((Events, index) => (
                  <View key={index} style={styles.EventsItem}>
                    <View style={styles.EventsInfo}>
                      <Text style={styles.EventsWord}>{Events.description}</Text>
                      <Text>Name: {Events.name}</Text>
                      <Text>Time: {Events.time}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeEvents(index)}>
                      <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                  </View>
              ))}
            </View>
        )}
        {Events.length === 0 && (
            <View>
              <Text style={styles.noEvents}>You have no events logged!</Text>
            </View>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    padding: 20,
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#8b0000',
    fontSize: 15,
    padding: 2,
  },
  buttonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 20,
  },
  form: {
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  noEvents: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: '10%',
  },
  newEvents: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  EventsList: {
    marginTop: 20,
    width: '100%',
  },
  EventsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    width: '100%',
    paddingLeft: 20,
  },
  EventsItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 20,
    paddingBottom: 10,
  },
  EventsInfo: {
    flex: 1,
  },
  EventsWord: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  removeButton: {
    color: 'red',
    paddingRight: 20,
  },
});
