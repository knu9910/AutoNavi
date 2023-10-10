const initialState = {
  allCarsTripHistorys: [], // 모든 이력 데이터
  currentPage: 1, // 현재 페이지
  itemsPerPage: 10, // 페이지당 아이템 수
};

// 액션 타입 정의
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// 액션 생성기
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

// 리듀서 (상태 업데이트)
const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export default historyReducer;
