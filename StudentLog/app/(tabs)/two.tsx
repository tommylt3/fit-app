import { StyleSheet, TextInput, Button, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/Themed';

export default function TabTwoScreen() {
  const [screen, setScreen] = useState('initialScreen');
  const[workouts, setWorkouts] = useState([]);
  const[meal, setMeal] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    time: '',
    type: '',
    burnedCal: '',
  });
  const [newMeal, setNewMeal] = useState({
    location: '',
    item: '',
    consumedCal: '',
  });

  const handleWorkoutInput = (field:string, value:string) => {
    setNewWorkout({ ...newWorkout, [field]: value})
  }

  const addWorkout = () => {
    setWorkouts([...workouts, newWorkout]);
    setNewWorkout({
      time: '',
      type: '',
      burnedCal: '',
    });
    switchScreen('workoutListScreen');
  }

  const addMeal = () => {
    setMeal([...meal, newMeal]);
    setNewMeal({
      location: '',
      item: '',
      consumedCal: '',
    });
    switchScreen('mealListScreen');
  }

  const removeWorkout = (index: number) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(index, 1);
    setWorkouts(updatedWorkouts);
  };

  const removeMeal = (index: number) => {
    const updatedMeals = [...meal];
    updatedMeals.splice(index, 1);
    setMeal(updatedMeals);
  };

  const switchScreen = (screen:string) => {
    setScreen(screen);
  }

  const initialScreen = () => {
    return (
    <View style={styles.container}>
        <View style={styles.homeButton}>
          <TouchableOpacity onPress= {() => switchScreen('entryScreen')}>
            <View style={styles.buttonHeader}>
              <Ionicons name="add-circle" size={50} color="#8b0000" />
              <Text style={styles.buttonText}>Create Entry</Text>
            </View>
          </TouchableOpacity>
        </View>
    
      <View>
      <Text style={styles.firstMeal}>Log your first meal or workout!</Text>
      </View>

    </View>
    );
  };

  const workoutListScreen = () => {
    return(
      <View style={styles.container}>
      <View style={styles.homeButton}>
        <TouchableOpacity onPress= {() => switchScreen('entryScreen')}>
          <View style={styles.buttonHeader}>
            <Ionicons name="add-circle" size={50} color="#8b0000" />
            <Text style={styles.buttonText}>Create Entry</Text>
          </View>
        </TouchableOpacity>
      </View>

      {workouts.length > 0 && (
      <View style={styles.workoutList}>
        <Text style={styles.workoutTitle}>Workouts</Text>
          {workouts.map((workout, index) => (
            <View key={index} style={styles.workoutItem}>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutWord}>{workout.type}</Text>
                <Text>Time: {workout.time}</Text>
                <Text>Burned Calories: {workout.burnedCal}</Text>
              </View>
            <TouchableOpacity onPress={() => removeWorkout(index)}>
            <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
            </View>
          ))}
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
            {workouts.length === 0 && (
            <View>
              <Text style={styles.noWorkouts}>You have no workouts!</Text>
            </View>
        )}
      </View>    
    )
  }

  const mealListScreen = () => {
    return(
      <View style={styles.container}>
      <View style={styles.homeButton}>
        <TouchableOpacity onPress= {() => switchScreen('entryScreen')}>
          <View style={styles.buttonHeader}>
            <Ionicons name="add-circle" size={50} color="#8b0000" />
            <Text style={styles.buttonText}>Create Entry</Text>
          </View>
        </TouchableOpacity>
      </View>

      {meal.length > 0 && (
      <View style={styles.workoutList}>
        <Text style={styles.workoutTitle}>Meals</Text>
          {meal.map((meal, index) => (
            <View key={index} style={styles.workoutItem}>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutWord}>{meal.item}</Text>
                <Text>Location: {meal.location}</Text>
                <Text>Consumed Calories: {meal.consumedCal}</Text>
              </View>
            <TouchableOpacity onPress={() => removeMeal(index)}>
            <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
            </View>
          ))}
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
            {meal.length === 0 && (
            <View>
              <Text style={styles.noWorkouts}>You have no meals logged!</Text>
            </View>
        )}
      </View>    
    )
  }

  const entryChoiceScreen = () => {
    return (
      <View style={styles.container}>
        <View style={styles.workoutButton}>
          <TouchableOpacity onPress= {() => switchScreen('workoutScreen')}>
            <View style={styles.buttonHeader}>
              <Ionicons name="barbell" size={50} color='#8b0000' />
              <Text style={styles.buttonText}> Create Workout</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.mealButton}>
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

  const workoutFormScreen = () => {
    return (
      <View style={styles.container}>
        <View style={styles.workoutForm}>
              <Text style={styles.newWorkout}>New Workout</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Time"
                  value={newWorkout.time}
                  onChangeText={(text) => handleWorkoutInput('time', text)}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Type"
                  value={newWorkout.type}
                  onChangeText={(text) => handleWorkoutInput('type', text)}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Calories Burned"
                  value={newWorkout.burnedCal}
                  onChangeText={(text) => handleWorkoutInput('burnedCal', text)}
              />
              <View style={styles.submitButton}>
                <Button color='white' title="Submit" onPress={addWorkout} />
              </View>
            </View>
      </View>
    )
  }

  const healthProfileScreen = () => {
    const totalCals = workouts.reduce((total, workout) => total + parseInt(workout.burnedCal), 0);
    const totalWorkouts = workouts.length;

    return (
    <View style={styles.container}>
      <Text style={styles.healthWord}>Health Profile</Text>
      <View style={styles.workoutReturnButton}>
        <Button color='white' title="Workouts" onPress= {() => switchScreen('workoutListScreen')} />
      </View>
      <Text style={styles.workCalStat}>Total Calories Burned: {totalCals}</Text>
      <Text style={styles.workNumStat}>Total Workouts: {totalWorkouts}</Text>
      <View style={styles.mealReturnButton}>
        <Button color='white' title="Meals" onPress= {() => switchScreen('mealScreen')} />
      </View>
      <Text style={styles.mealCalStat}>Total Calories Consumed: </Text>
      <Text style={styles.mealNumStat}>Total Meals: </Text>
    </View>
    )
  }

  const handleMealInput = (field:string, value:string) => {
    setNewMeal({ ...newMeal, [field]: value})
  }
  
 const mealFormScreen = () => {
    return (
        <View style={styles.container}>
          <View style={styles.workoutForm}>
                <Text style={styles.newWorkout}>Log Meal</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={newMeal.location}
                    onChangeText={(text) => handleMealInput('Location', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Menu Item"
                    value={newMeal.item}
                    onChangeText={(text) => handleMealInput('Menu Item', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Consumed Calories"
                    value={newMeal.consumedCal}
                    onChangeText={(text) => handleMealInput('Consumed Calories', text)}
                />
                <View style={styles.submitButton}>
                  <Button color='white' title="Submit" onPress={addMeal} />
                </View>
              </View>
        </View>
      )
}

  return (

    <View style={styles.container}>
      {screen === 'initialScreen' && initialScreen()}
      {screen === 'entryScreen' && entryChoiceScreen()}
      {screen === 'workoutScreen' && workoutFormScreen()}
      {screen === 'workoutListScreen' && workoutListScreen()}
      {screen === 'profileScreen' && healthProfileScreen()}
      {screen === 'mealScreen' && mealFormScreen()}
      {screen === 'mealListScreen' && mealListScreen()}

    </View>
    
    );
}

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
    marginVertical: 30,
    height: 1,
    width: '80%',
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
