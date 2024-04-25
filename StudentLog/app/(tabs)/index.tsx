import { StyleSheet, TextInput, Button, TouchableOpacity, View, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/Themed';

export default function AssignmentLogSystem() {
  const [showForm, setShowForm] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    dueDate: '',
  });

  // Creates new assignment and makes the input available for user
  const inputAssignment = (field: string, value: string) => {
    setNewAssignment({ ...newAssignment, [field]: value });
  };

  // Displays success message
  const displaySuccess = () => {
    Alert.alert(
        'Successfully Added',
        'Assignment Added to Log',
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

  // Displays remove success message
  const displayRemoveSuccess = () => {
    Alert.alert(
        'Successfully Removed',
        'Assignment Removed from Log',
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

  // Displays failure message
  const displayFailure = () => {
    Alert.alert(
        'Error',
        'Please enter all assignment details',
        [{ text: 'OK', onPress: () => console.log('OK') }],
        { cancelable: false }
    );
    return;
  };

  // Allows user to input assignment
  const createAssignment = () => {
    // @ts-ignore
    setAssignments([...assignments, newAssignment]);
    setNewAssignment({
      title: '',
      subject: '',
      dueDate: '',
    });
    setShowForm(false);
  };


  // Removes assignment from log
  const completeAssignment = (index: number) => {
    const updatedAssignments = [...assignments];
    updatedAssignments.splice(index, 1);
    setAssignments(updatedAssignments);
    displayRemoveSuccess();
  };

  // Determines if log is shown or not
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  // Checks to see if there is input, adds input to log, and displays success message
  // If there is no input, displays failure message
  const addTask = () => {
    if (newAssignment.title === '' ||
        newAssignment.subject === '' ||
        newAssignment.dueDate === '') {
      displayFailure();
    } else {
      createAssignment();
      displaySuccess();
    }
  };

  return (
      // Creates input form for user
      <View style={styles.container}>
        {showForm ? (
            <View style={styles.form}>
              <Text style={styles.newAssignment}>New Assignment</Text>
              {/*Input title*/}
              <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={newAssignment.title}
                  onChangeText={(text) => inputAssignment('title', text)}
              />
              {/*Input subject*/}
              <TextInput
                  style={styles.input}
                  placeholder="Subject"
                  value={newAssignment.subject}
                  onChangeText={(text) => inputAssignment('subject', text)}
              />
              {/*Input dueDate*/}
              <TextInput
                  style={styles.input}
                  placeholder="Due Date"
                  value={newAssignment.dueDate}
                  onChangeText={(text) => inputAssignment('dueDate', text)}
              />
              {/*Submit Button*/}
              <View style={styles.submitButton}>
                <Button color='white' title="Submit"  onPress={() => {addTask();}}/>
              </View>
            </View>
        ) : (
            // Main page of assignment log
            <View style={styles.button}>
              <TouchableOpacity onPress={toggleFormVisibility}>
                <View style={styles.buttonHeader}>
                  <Ionicons name="add-circle" size={50} color="#8b0000" />
                  <Text style={styles.buttonText}>Create Assignment</Text>
                </View>
              </TouchableOpacity>
            </View>
        )}

        {assignments.length > 0 && (
            <View style={styles.assignmentList}>
              {/*Format of log and displays all of the assignments*/}
              <Text style={styles.assignmentTitle}>Upcoming Assignments</Text>
              {assignments.map((assignment, index) => (
                  <View key={index} style={styles.assignmentItem}>
                    <View style={styles.assignmentInfo}>
                      <Text style={styles.assignmentWord}>{assignment.title}</Text>
                      <Text>Subject: {assignment.subject}</Text>
                      <Text>Due Date: {assignment.dueDate}</Text>
                    </View>
                    <TouchableOpacity onPress={() => completeAssignment(index)}>
                      <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                  </View>
              ))}
            </View>
        )}
        {/*Shows user they have no assignments*/}
        {assignments.length === 0 && (
            <View>
              <Text style={styles.noAssignments}>You have no assignments!</Text>
            </View>
        )}
      </View>
  );
}

// Style of assignment log page
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
    padding: 5,
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
  noAssignments: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: '10%',
  },
  newAssignment: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  assignmentList: {
    marginTop: 20,
    width: '100%',
  },
  assignmentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    width: '100%',
    paddingLeft: 20,
  },
  assignmentItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 20,
    paddingBottom: 10,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentWord: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  removeButton: {
    color: 'red',
    paddingRight: 20,
  },
});

