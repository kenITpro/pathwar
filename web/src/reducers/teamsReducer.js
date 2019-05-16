import { 
  GET_USER_TEAMS, 
  SET_TEAMS_LIST, 
  GET_USER_TEAMS_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  teams: {
      fetchingUserTeams: null,
      userTeams: null,
      teamsList: null
  }
};

export default function teamsReducer(state = initialState.teams, action) {

  switch (action.type) {
    case GET_USER_TEAMS:
      return {
        ...state,
        fetchingUserTeams: true
      }

    case GET_USER_TEAMS_SUCCESS:
      return {
        ...state,
        fetchingUserTeams: false,
        userTeams: action.payload.userTeams
      }

    case SET_TEAMS_LIST:
      return {
        ...state,
        teamsList: action.payload.teamsList
      };

    default:
      return state;
  }
}