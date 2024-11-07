import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchTasks , addTask, deleteTask } from '../../apis/task.api'
import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
} from '../actions/task.action'

function* addTaskSaga(action) {
    try {
        const newTask = yield call(addTask, action.payload);
        yield put({ type: ADD_TASK_SUCCESS, payload: newTask.data });
    } catch(error) {
        yield put({ type: ADD_TASK_FAILURE, payload: error.message })
    }
}

function* fetchTasksSaga() {
    try {
        const tasks = yield call(fetchTasks);
        yield put({ type: FETCH_TASKS_SUCCESS, payload: tasks.data });
    } catch(error) {
        yield put({ type: FETCH_TASKS_FAILURE, payload: error.message });
    }
}

function* deleteTasksSaga(action) {
    try {
        yield call(deleteTask, action.payload);
        yield put({ type: DELETE_TASK_SUCCESS, payload: action.payload });
    } catch(error) {
        yield put({ type: DELETE_TASK_FAILURE, payload: error.message });
    }
}

export default function* rootSaga() {
    yield takeEvery(FETCH_TASKS_REQUEST, fetchTasksSaga);
    yield takeEvery(ADD_TASK_REQUEST, addTaskSaga)
    yield takeEvery(DELETE_TASK_REQUEST, deleteTasksSaga)
}


