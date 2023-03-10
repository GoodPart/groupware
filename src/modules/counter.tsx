import {delay, put, takeEvery, takeLatest} from 'redux-saga/effects';

// 액션 타입을 선언합니다
const INCREASE = 'counter/INCREASE' as const;
const DECREASE = 'counter/DECREASE' as const;
const INCREASE_BY = 'counter/INCREASE_BY' as const;

const INCREASE_ASYNC = 'INCREASE_ASYNC' as const
const DECREASE_ASYNC = 'DECREASE_ASYNC' as const;



// 액션 생성함수를 선언합니다
export const increase = () => ({
  type: INCREASE
});

export const decrease = () => ({
  type: DECREASE
});

export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff
});

export const increaseAsync = () => ({
   type: INCREASE_ASYNC
});
export const decreaseAsync = () => ({ 
  type: DECREASE_ASYNC
});

function* increaseSaga() {
  yield delay(1000); // 1초 기다린다.
  yield put(increase()); // 특정 액션을 dispatch함
}

function* decreaseSaga() {
  yield delay(1000); // 1초를 기다립니다.
  yield put(decrease()); // put은 특정 액션을 디스패치 해줍니다.
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}

// 모든 액션 겍체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
// 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
type CounterState = {
  count: number;
};


// 초기상태를 선언합니다.
const initialState:CounterState = {
  count: 0
};

// 리듀서를 작성합니다.

// 액션에서는 우리가 방금 만든 CounterAction 을 타입으로 설정합니다.
function counter(state:CounterState = initialState,action:CounterAction) {
  switch (action.type) {
    case INCREASE: 
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case INCREASE_BY:
      return { count: state.count + action.payload };
    default:
      return state;
  }
}

export default counter;