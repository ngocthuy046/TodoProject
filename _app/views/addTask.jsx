import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextInput,
  StyleSheet,
  Button,
  View,
  Text,
} from 'react-native';
import { ADD_TASK_REQUEST } from '../redux/actions/task.action';

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const { loading, error } = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    const task = {
      title: taskTitle,
      completed: false,
    };
      dispatch({ type: ADD_TASK_REQUEST, payload: task });
      setTaskTitle('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a todo"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <Button
        style={styles.button}
        title="Save task"
        onPress={handleAddTask}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    marginBlockEnd: 12,
  },
  input: {
    minWidth: `${100}%`,
    display: 'flex',
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default AddTask;
