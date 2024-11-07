import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddTask from '../views/addTask';
import { fetchTasksRequest, deleteTaskRequest } from '../redux/actions/task.action';

export default function TodoHomepage() {
  const { tasks, loading, error } = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  function handleDelete(id) {
    dispatch(deleteTaskRequest(id))
  }

  return (
    <View style={styles.view}>
      <AddTask />
      {loading ? (
        <Text>Loading tasks...</Text>
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <Text style={styles.taskText}>
                {item.title || 'Unnamed task'}
              </Text>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    color: 'red',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  view: {
    flexDirection: 'column',
    marginBottom: 12,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  taskContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
