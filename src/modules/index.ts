import { combineReducers } from 'redux';
import counter, {counterSaga} from './counter';
import register from './register';
import authCheckReducer from './auth';
import notificationReducer from './notification';
import chatReducer, {chatSaga} from './chat';
import favoritRecuder from './favorit';


//saga
import {all} from 'redux-saga/effects';

const rootReducer = combineReducers({
  counter,
  register,
  authCheckReducer,
  notificationReducer,
  chatReducer,
  favoritRecuder
});

export function* rootSaga() {
  // yield all([counterSaga()])
  yield all([chatSaga()])
}

// 루트 리듀서를 내보내주세요.
export default rootReducer;

// 루트 리듀서의 반환값를 유추해줍니다
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내줍니다.
export type RootState = ReturnType<typeof rootReducer>;