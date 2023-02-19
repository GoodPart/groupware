// 액션 타입을 선언합니다
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'
const INCREASE_BY = 'counter/INCREASE_BY'



// 액션 생성함수를 선언합니다
export const increase = () => ({
  type: INCREASE
});

export const decrease = () => ({
  type: DECREASE
});

export const increaseBy = (diff) => ({
  type: INCREASE_BY,
  payload: diff
});


// 모든 액션 겍체들에 대한 타입을 준비해줍니다.


// 초기상태를 선언합니다.
const initialState = {
  count: 0
};

// 리듀서를 작성합니다.

// 액션에서는 우리가 방금 만든 CounterAction 을 타입으로 설정합니다.
function counter(state = initialState,action) {
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