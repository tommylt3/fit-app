import { StyleSheet, TextInput, Button, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/Themed';
import restaurants from './restaurants.json';

export default function TabTwoScreen() { // tab for nutrition screen
  // setting use states
  const [screen, setScreen] = useState('initialScreen');
  const[workouts, setWorkouts] = useState([]);
  const[meal, setMeal] = useState([]);
  const[mealItem, setMealItem] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    time: '',
    type: '',
    burnedCals: '',
  });
  const [newMeal, setNewMeal] = useState({
    name: ''
  });

  const [newMealItem, setNewMealItem] = useState({
    location: '',
    item: '',
    consumedCals: ''
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

  const checkWorkoutSubmission = () => { 
    if (newWorkout.time === '' || // checking for blank submission
        newWorkout.type === '' ||
        newWorkout.burnedCals === '') {
      displayFailure(); // failure
    } else {
      addWorkout(); // adding workout to list, calling func
      displaySuccess(); // success
    }
  };

  const checkMealSubmission = () => { 
    if (newMealItem.location === '' || // checking for blank submission
        newMealItem.item === '' ||
        newMealItem.consumedCals === '') {
      displayFailure(); // failure
    } else {
      inputMeal(); // adding meal to list, calling func
      displaySuccess(); // success
    }
  };

  const checkRestaurantSubmission = () => {
    if (newMeal.name === '' || // checking for blanks
        findRestaurant(newMeal.name).length === 0) { // invalid restaurant
      displayFailure(); // failure
    } else {
      inputRestaruant(); // add restaurant to list, calling func
    }
  };

  

  const workoutLog = (field:string, value:string) => { // updating newWorkout use state
    setNewWorkout({ ...newWorkout, [field]: value})
  }

  const addWorkout = () => { // adding workout to workout list 
    setWorkouts([...workouts, newWorkout]);
    setNewWorkout({
      time: '',
      type: '',
      burnedCals: '',
    });
    switchScreen('workoutListScreen'); // switching screen to display list
  }

  const inputRestaruant = () => { // adding restaurant to list
    setMeal([...meal, newMeal]);
    setNewMeal({
      name: ''
    });
    switchScreen('menuItems'); // displaying restaurant menu
  }

  const inputMeal = () => { // adding meal to list
    setMealItem([...mealItem, newMealItem]);
    setNewMealItem({
      location: '',
      item: '',
      consumedCals: ''
    });
    switchScreen('mealListScreen') // displaying meal list
  }

  const findRestaurant = (name: string) => {
    const restaurant = restaurants.restaurants.find((restaurant) => { // searching for inputted restaurant in json file
      return restaurant.name === name;
    });

    if (restaurant) { // if valid
      return restaurant.menu.map(menuItem => ({ // adding items and calories to array
        item: menuItem.item,
        calories: menuItem.calories
      }))
    } else {
      return []; // blank array if invalid
    }
  }

  const removeWorkout = (index: number) => { // removing workout from list
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(index, 1);
    setWorkouts(updatedWorkouts);
  };

  const removeMealItem = (index: number) => { // removing meal from list
    const updatedMeals = [...mealItem];
    updatedMeals.splice(index, 1);
    setMealItem(updatedMeals);
  };

  const switchScreen = (screen:string) => { // main function for switching between screens
    setScreen(screen);
  }

  const initialScreen = () => { // main nutrition screen
    return (
    // displays create entry button & takes user to entry screen
    <View style={styles.container}>
        <View style={styles.homeButton}>
          {/* switching to entry screen */}
          <TouchableOpacity onPress= {() => switchScreen('entryScreen')}> 
            <View style={styles.buttonHeader}>
              <Ionicons name="add-circle" size={50} color="#8b0000" />
              <Text style={styles.buttonText}>Create Entry</Text>
            </View>
          </TouchableOpacity>
        </View>
    
      <View>
        {/*prompting to log first meal */}
      <Text style={styles.firstMeal}>Log your first meal or workout!</Text>
      </View>

    </View>
    );
  };

  const workoutListScreen = () => {
    return(
      <View style={styles.container}>
      <View style={styles.homeButton}>
        {/*switching to entry screen */}
        <TouchableOpacity onPress= {() => switchScreen('entryScreen')}>
          <View style={styles.buttonHeader}>
            <Ionicons name="add-circle" size={50} color="#8b0000" />
            <Text style={styles.buttonText}>Create Entry</Text>
          </View>
        </TouchableOpacity>
      </View>

      {workouts.length > 0 && ( // if workouts logged, display all workouts by mapping through workout list
      <View style={styles.workoutList}>
        <Text style={styles.workoutTitle}>Workouts</Text>
        {/* mapping workouts array */}
          {workouts.map((workout, index) => (
            <View key={index} style={styles.workoutItem}>
              <View style={styles.workoutInfo}>
                {/* displaying type, time, calories */}
                <Text style={styles.workoutWord}>{workout.type}</Text>
                <Text>Time: {workout.time}</Text>
                <Text>Burned Calories: {workout.burnedCals}</Text>
              </View>
              {/* if user wants to remove workout */}
            <TouchableOpacity onPress={() => removeWorkout(index)}>
            <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
            </View>
          ))}
          {/* takes user to health profile screen */}
          <View style={styles.profileButton}>
            <TouchableOpacity onPress= {() => switchScreen('profileScreen')}>
              <View style={styles.buttonHeader}>
                <Ionicons name="fitness" size={50} color="#8b0000" />
                <Text style={styles.buttonText}>Health Profile</Text>
              </View>
            </TouchableOpacity>
          </View>                           
        </View>
      )}
            {workouts.length === 0 && ( // if no workouts
            <View>
              <Text style={styles.noWorkouts}>You have no workouts!</Text>
            </View>
        )}
      </View>    
    )
  }

  const mealListScreen = () => { // displaying all meal entries
    return(
      <View style={styles.container}>
      <View style={styles.homeButton}>
        {/* switching to entry screen */}
        <TouchableOpacity onPress= {() => switchScreen('entryScreen')}>
          <View style={styles.buttonHeader}>
            <Ionicons name="add-circle" size={50} color="#8b0000" />
            <Text style={styles.buttonText}>Create Entry</Text>
          </View>
        </TouchableOpacity>
      </View>

      {mealItem.length > 0 && ( // if meals are entered in list, map through entries and display
      <View style={styles.workoutList}>
        <Text style={styles.workoutTitle}>Meals</Text>
        {/* mapping through mealItem list */}
          {mealItem.map((mealItem, index) => (
            <View key={index} style={styles.workoutItem}>
              {/* displaying location, item, calories */}
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutWord}>{mealItem.location}</Text>
                <Text>Item: {mealItem.item}</Text>
                <Text>Consumed Calories: {mealItem.consumedCals}</Text>
              </View>
              {/* option to remove meal */}
            <TouchableOpacity onPress={() => removeMealItem(index)}>
            <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
            </View>
          ))}

          {/* takes user to health profile screen */}
          <View style={styles.profileButton}>
            <TouchableOpacity onPress= {() => switchScreen('profileScreen')}>
              <View style={styles.buttonHeader}>
                <Ionicons name="fitness" size={50} color="#8b0000" />
                <Text style={styles.buttonText}>Health Profile</Text>
              </View>
            </TouchableOpacity>
          </View>                           
        </View>
      )}
            {mealItem.length === 0 && ( // if no meals
            <View>
              <Text style={styles.noWorkouts}>You have no meals logged!</Text>
            </View>
        )}
      </View>    
    )
  }

  const selectMenuItems = () => { // shows screen to allow user to enter desired meal from meny items
    return(
    <View style={styles.container}>
      <Text style={styles.menuTitle}>Menu Items</Text>
      {meal.length > 0 && ( // when restaurants inputted
        <View>
          {/* searches for restaurant menu and displays last restaurant in array's menu */}
          {findRestaurant(meal[meal.length - 1].name).map((menuItem, index) => (
            <View key={index}>
              {/* displays items and calories accessed from json file */}
              <Text style={styles.itemsForm}>
                <Text style={styles.menuItem}>{menuItem.item}  </Text>
                <Text style={styles.menuCals}>{menuItem.calories} Calories</Text>
              </Text>
            </View>
          ))}
        </View>
      )}

      {/*prompting to log meal */}
      <View style={styles.mealForm}>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={newMealItem.location}
            onChangeText={(text) => handleMealItem('location', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Item"
            value={newMealItem.item}
            onChangeText={(text) => handleMealItem('item', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Calories"
            value={newMealItem.consumedCals}
            onChangeText={(text) => handleMealItem('consumedCals', text)}
          />
      </View>
      {/* checking if valid submission */}
      <View style={styles.submitMealButton}>
        <Button color='white' title="Submit" onPress={checkMealSubmission} />
      </View>
    </View>
    );
  }

  const entryChoiceScreen = () => { // screen allowing users to choose to enter meal or workout
    return (
      <View style={styles.container}>
        <View style={styles.workoutButton}>
          {/* takes user to workout entry screen */}
          <TouchableOpacity onPress= {() => switchScreen('submitWorkout')}>
            <View style={styles.buttonHeader}>
              <Ionicons name="barbell" size={50} color='#8b0000' />
              <Text style={styles.buttonText}> Create Workout</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.mealButton}>
          {/* takes user to meal entry screen */}
          <TouchableOpacity onPress= {() => switchScreen('mealScreen')}>
            <View style={styles.buttonHeader}>
              <Ionicons name="fast-food" size={50} color='#8b0000' />
              <Text style={styles.buttonText}> Create Meal</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const workoutForm = () => { // user inputs their workout information
    return (
      <View style={styles.container}>
        <View style={styles.workoutForm}>
              <Text style={styles.newWorkout}>New Workout</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Time"
                  value={newWorkout.time}
                  onChangeText={(text) => workoutLog('time', text)}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Type"
                  value={newWorkout.type}
                  onChangeText={(text) => workoutLog('type', text)}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Calories Burned"
                  value={newWorkout.burnedCals}
                  onChangeText={(text) => workoutLog('burnedCals', text)}
              />

              {/* checks for valid submission */}
              <View style={styles.submitButton}>
                <Button color='white' title="Submit" onPress={checkWorkoutSubmission} />
              </View>
            </View>
      </View>
    )
  }

  const healthProfileScreen = () => { // health profile screen displaying user stats
    const totalCals = workouts.reduce((total, workout) => total + parseInt(workout.burnedCals), 0); // accessing total burned cals, converting to int
    const totalWorkouts = workouts.length; // getting workout list length
    const totalCalsMeal = mealItem.reduce((total, mealItem) => total + parseInt(mealItem.consumedCals), 0); // accessing total consumed cals, converting to int
    const totalMeals = mealItem.length; // getting workout list length

    return (
    <View style={styles.container}>
      <Text style={styles.healthWord}>Health Profile</Text>
      <View style={styles.workoutReturnButton}>
        {/* taking user back to workout list */}
        <Button color='white' title="Workouts" onPress= {() => switchScreen('workoutListScreen')} />
      </View>
      {/* showing workout stats */}
      <Text style={styles.workCalStat}>Total Calories Burned: {totalCals}</Text>
      <Text style={styles.workNumStat}>Total Workouts: {totalWorkouts}</Text>
      <View style={styles.mealReturnButton}>
        {/* taking user back to meal list */}
        <Button color='white' title="Meals" onPress= {() => switchScreen('mealListScreen')} />
      </View>
      {/* showing meal stats */}
      <Text style={styles.mealCalStat}>Total Calories Consumed: {totalCalsMeal}</Text>
      <Text style={styles.mealNumStat}>Total Meals: {totalMeals}</Text>
    </View>
    )
  }

  const handleMealInput = (field:string, value:string) => { // setting newMeal use state
    setNewMeal({ ...newMeal, [field]: value})
  }
  const handleMealItem = (field:string, value: string) => { // setting newMealItem use state
    setNewMealItem({...newMealItem, [field]: value})
  }
  
 const mealForm = () => { // user enters restaurant name
    return (
        <View style={styles.container}>
          <View style={styles.workoutForm}>
                <Text style={styles.newWorkout}>Enter Restaurant</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={newMeal.name}
                    onChangeText={(text) => handleMealInput('name', text)}
                />
                {/* checks for valid submission */}
                <View style={styles.submitButton}>
                  <Button color='white' title="Submit" onPress={checkRestaurantSubmission} />
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
      {screen === 'submitWorkout' && workoutForm()}
      {screen === 'workoutListScreen' && workoutListScreen()}
      {screen === 'profileScreen' && healthProfileScreen()}
      {screen === 'mealScreen' && mealForm()}
      {screen === 'mealListScreen' && mealListScreen()}
      {screen === 'menuItems' && selectMenuItems()}

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
  firstMeal: {
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
  mealReturnButton: {
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
  mealButton: {
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
  mealForm: {
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    // marginTop: '10%',
    top: 20,
  },
  itemsForm: {
    bottom: 60
  },

  submitMealButton: {
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
  mealProfInfo: {
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
  mealCalStat: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 6,
    top: 20,
  },
  mealNumStat: {
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

