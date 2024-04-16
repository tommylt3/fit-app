import { StyleSheet, TextInput, Button, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/Themed';

export default function TabOneScreen() {
  const [showForm, setShowForm] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    description: '',
    class: '',
    dueDate: '',
  });

  const handleAssignmentInput = (field, value) => {
    setNewAssignment({ ...newAssignment, [field]: value });
  };

  const addAssignment = () => {
    setAssignments([...assignments, newAssignment]);
    setNewAssignment({
      description: '',
      class: '',
      dueDate: '',
    });
    setShowForm(false);
  };

  const removeAssignment = (index) => {
    const updatedAssignments = [...assignments];
    updatedAssignments.splice(index, 1);
    setAssignments(updatedAssignments);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
      <View style={styles.container}>
        {showForm ? (
            <View style={styles.form}>
              <Text style={styles.newAssignment}>New Assignment</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={newAssignment.description}
                  onChangeText={(text) => handleAssignmentInput('description', text)}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Class"
                  value={newAssignment.class}
                  onChangeText={(text) => handleAssignmentInput('class', text)}
              />
              <TextInput
                  style={styles.input}
                  placeholder="Due Date"
                  value={newAssignment.dueDate}
                  onChangeText={(text) => handleAssignmentInput('dueDate', text)}
              />
              <View style={styles.submitButton}>
                <Button color='white' title="Submit" onPress={addAssignment} />
              </View>
            </View>
        ) : (
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
              <Text style={styles.assignmentTitle}>Upcoming Assignments</Text>
              {assignments.map((assignment, index) => (
                  <View key={index} style={styles.assignmentItem}>
                    <View style={styles.assignmentInfo}>
                      <Text style={styles.assignmentWord}>{assignment.description}</Text>
                      <Text>Class: {assignment.class}</Text>
                      <Text>Due Date: {assignment.dueDate}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeAssignment(index)}>
                      <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                  </View>
              ))}
            </View>
        )}
        {assignments.length === 0 && (
            <View>
              <Text style={styles.noAssignments}>You have no assignments! :)</Text>
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
    marginTop: '50%',
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
