import { StyleSheet, TextInput, Button, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/Themed';
import events from './campus_events.json';

export default function EventLogSystem() { // tab for Event screen
  // setting use states
  const [screen, setScreen] = useState('initialScreen');
  const[event, setEvent] = useState([]);
  const[eventItem, setEventItem] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: ''
  });

  const [newEventItem, setNewEventItem] = useState({
    club_name: '',
    event_description: '',
    location: ''
  });

  const displaySuccess = () => { // success notification
    Alert.alert(
        'Successfully Added',
        'Entry Added to Log',
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

  const displayFailure = () => { // failure notification
    Alert.alert(
        'Error',
        'Please enter all details',
        [{ text: 'OK', onPress: () => console.log('OK') }],
        { cancelable: false }
    );
    return;
  };

  const checkEventSubmission = () => { 
    if (newEventItem.club_name === '' || // checking for blank submission
        newEventItem.event_description === '' ||
        newEventItem.location === '') {
      displayFailure(); // failure
    } else {
      inputEvent(); // adding event to list, calling func
      displaySuccess(); // success
    }
  };

  const findevent = (name: string) => {
    const new_event = events.campus_events.find((name) => { // searching for inputted club in json file
      return new_event.club_name === name; // Returns an event if the host club is the club name
    });

    if (new_event) { // if valid
      return new_event
    } 
    else {
      return []; // blank array if invalid
    }
  }

  const checkEventSubmission = () => {
    if (newEvent.name === '' || // checking for blanks
        findevent(newEvent.name).length === 0) { // invalid event
      displayFailure(); // failure
    } else {
      displaySuccess();
    }
  };


  const inputEvent = () => { // adding event to list
    setEventItem([...eventItem, newEventItem]);
    setNewEventItem({
      club_name: '',
      event_description: '',
      location: ''
    });
    switchScreen('eventListScreen') // displaying event list
  }

  const removeEventItem = (index: number) => { // removing event from list
    const uplocationdEvents = [...eventItem];
    uplocationdEvents.splice(index, 1);
    setEventItem(uplocationdEvents);
  };

  const switchScreen = (screen:string) => { // main function for switching between screens
    setScreen(screen);
  }

  const initialScreen = () => { // main event screen
    return (
    // displays create entry button & takes user to entry screen
    <View style={styles.container}>
        <View style={styles.homeButton}>
          {/* switching to entry screen */}
          <TouchableOpacity onPress= {() => switchScreen('entryScreen')}> 
            <View style={styles.buttonHeader}>
              <Ionicons name="accessibility-outline" size={35} color="#8b0000" />
              <Text style={styles.buttonText}>Find Event</Text>
            </View>
          </TouchableOpacity>
        </View>
    
      <View>
        {/*prompting to log first event */}
      <Text style={styles.firstEvent}>Find Events To Get Active!</Text>
      </View>

    </View>
    );
  };

  const eventListScreen = () => { // displaying all event entries
    return(
      <View style={styles.container}>
      <View style={styles.homeButton}>
        {/* switching to entry screen */}
        <TouchableOpacity onPress= {() => switchScreen('entryScreen')}>
          <View style={styles.buttonHeader}>
            <Ionicons name="accessibility-outline" size={35} color="#8b0000" />
            <Text style={styles.buttonText}>Create Entry</Text>
          </View>
        </TouchableOpacity>
      </View>

      {eventItem.length > 0 && ( // if events are entered in list, map through entries and display
      <View style={styles.workoutList}>
        <Text style={styles.workoutTitle}>Events</Text>
        {/* mapping through eventItem list */}
          {eventItem.map((eventItem, index) => (
            <View key={index} style={styles.workoutItem}>
              {/* displaying club_name, item, calories */}
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutWord}>{eventItem.club_name}</Text>
                <Text>Item: {eventItem.item}</Text>
                <Text>Consumed Calories: {eventItem.consumedCals}</Text>
              </View>
              {/* option to remove event */}
            <TouchableOpacity onPress={() => removeEventItem(index)}>
            <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
            </View>
          ))}

          {/* takes user to health profile screen */}
          <View style={styles.profileButton}>
            <TouchableOpacity onPress= {() => switchScreen('profileScreen')}>
              <View style={styles.buttonHeader}>
                <Ionicons name="extension-puzzle-outline" size={50} color="#8b0000" />
                <Text style={styles.buttonText}>Health Profile</Text>
              </View>
            </TouchableOpacity>
          </View>                           
        </View>
      )}
            {eventItem.length === 0 && ( // if no events
            <View>
              <Text style={styles.noWorkouts}>You have no events logged!</Text>
            </View>
        )}
      </View>    
    )
  }


  const entryChoiceScreen = () => { // screen allowing users to choose to enter event or workout
    return (
      <View style={styles.container}>
        <View style={styles.eventButton}>
          {/* takes user to event entry screen */}
          <TouchableOpacity onPress= {() => switchScreen('eventScreen')}>
            <View style={styles.buttonHeader}>
              <Ionicons name="extension-puzzle-outline" size={50} color='#8b0000' />
              <Text style={styles.buttonText}>Get Event</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }



  const handleEventInput = (field:string, value:string) => { // setting newEvent use state
    setNewEvent({ ...newEvent, [field]: value})
  }
  const handleEventItem = (field:string, value: string) => { // setting newEventItem use state
    setNewEventItem({...newEventItem, [field]: value})
  }
  
 const eventForm = () => {
    return (
        <View style={styles.container}>
          <View style={styles.workoutForm}>
                <Text style={styles.newWorkout}>Enter club</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Club Name"
                    value={newEvent.name}
                    onChangeText={(text) => handleEventInput('name', text)} // user enters club name for event validation
                />
                {/* checks for valid submission */}
                <View style={styles.submitButton}>
                  <Button color='white' title="Submit" onPress={checkEventSubmission} />
                </View>
              </View>
        </View>
      )
}


  return (

    <View style={styles.container}>
    
    {/* switches screen based on function prompt*/}

      {screen === 'initialScreen' && initialScreen()} 
      {screen === 'entryScreen' && entryChoiceScreen()}
      {screen === 'eventScreen' && eventForm()}
      {screen === 'eventListScreen' && eventListScreen()}

    </View>
    
    );
}

// below are all of the style specs
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    top: 300
  },
  firstEvent: {
    fontSize: 40,
    textAlign: 'center',
    // marginTop: '50%'
  },
  homeButton: {
    position: 'absolute',
    top: 0, 
    // left: 0,
    // right: 0, 
    padding: 20,
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#8b0000',
    fontSize: 15,
    padding: 5,
    width: 312,
  },
  workoutReturnButton: {
    backgroundColor: '#8b0000',
    fontSize: 15,
    padding: 5,
    width: 312,
    bottom: 100,
  },
  eventReturnButton: {
    backgroundColor: '#8b0000',
    fontSize: 15,
    padding: 5,
    width: 312,
  },
  profileButton: {
    position: 'absolute',
    top: 400, 
    padding: 20,
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    width: '100%',
  },
  workoutButton: {
    position: 'absolute',
    top: 350, 
    padding: 20,
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    width: '100%',
  },
  eventButton: {
    position: 'absolute',
    top: 150, 
    padding: 20,
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    width: '100%',
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
  workoutForm: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    // marginTop: '10%',
    top: -150,
  },
  eventForm: {
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    // marginTop: '10%',
    top: 20,
  },
  itemsForm: {
    bottom: 60
  },

  submitEventButton: {
    backgroundColor: '#8b0000',
    fontSize: 15,
    padding: 5,
    width: 312,
    top: 80
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  noWorkouts: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: '50%',
  },
  newWorkout: {
    textAlign: 'center',
    // top: 30,
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },

  workoutList: {
    top: -100,
    width: '100%',
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    width: '100%',
    paddingLeft: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    width: '100%',
    paddingLeft: 20,
    bottom: 100
  },
  menuItem: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    width: '100%',
    paddingLeft: 20,
    bottom: 200,
    alignItems: 'center',
    lineHeight: 50
  },
  menuCals: {
    fontSize: 15,
    marginTop: 20,
    width: '100%',
    paddingLeft: 20,
    bottom: 200,
    alignItems: 'center',
    lineHeight: 50
  },

  workoutItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 20,
    paddingBottom: 10,
  },
  workoutProfInfo: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 20,
    paddingBottom: 10,
    bottom: 300,
  },
  eventProfInfo: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 20,
    paddingBottom: 10,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutWord: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  healthWord: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 6,
    bottom: 200,
  },
  workCalStat: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 6,
    bottom: 90,
  },
  workNumStat: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 6,
    bottom: 90,
  },
  eventCalStat: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 6,
    top: 20,
  },
  eventNumStat: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 6,
    top: 20,
  },
  removeButton: {
    color: 'red',
    paddingRight: 20,
  },
});

