import {
  GET_ALL_TOURNAMENTS_SUCCESS,
  GET_ALL_TOURNAMENTS_FAILED,
  SET_DEFAULT_TOURNAMENT,
  SET_ACTIVE_TOURNAMENT,
  SET_ACTIVE_TOURNAMENT_FAILED,
  SET_LEVELS_LIST,
  SET_LEVELS_LIST_FAILED,
  FETCH_PREFERENCES_SUCCESS,
  FETCH_PREFERENCES_FAILED,
  GET_ALL_TOURNAMENT_TEAMS_SUCCESS,
  GET_ALL_TOURNAMENT_TEAMS_FAILED
} from "../constants/actionTypes"
import {
  getAllTournaments,
  getLevels,
  postPreferences,
  getAllTournamentTeams
} from "../api/tournaments"

import { fetchUserSession as fetchUserSessionAction } from "./userSession";

export const fetchPreferences = (tournamentID) => async dispatch => {
  try {
    await postPreferences(tournamentID)

    dispatch({
      type: FETCH_PREFERENCES_SUCCESS
    });

    dispatch(fetchUserSessionAction(false));

  } catch(error) {
    dispatch({
      type: FETCH_PREFERENCES_FAILED,
      payload: { error }
    });
  }
}

export const setActiveTournament = (tournamentData) => async dispatch => {
  try {

      dispatch({
        type: SET_ACTIVE_TOURNAMENT,
        payload: { activeTournament: tournamentData }
      });
  }
  catch(error) {
    dispatch({ type: SET_ACTIVE_TOURNAMENT_FAILED, payload: { error }});
    alert("Set tournament active failed, please try again!")
  }
}

export const fetchAllTournamentTeams = (tournamentID) => async dispatch => {
  try {
    const response = await getAllTournamentTeams(tournamentID);
    debugger
    const allTeams = response.data;

    dispatch({
      type: GET_ALL_TOURNAMENT_TEAMS_SUCCESS,
      payload: { allTeams: allTeams }
    })
  } catch (error) {
    dispatch({ type: GET_ALL_TOURNAMENT_TEAMS_FAILED, payload: { error } });
  }
}

export const setDefaultTournament = (tournamentData) => async dispatch => {
  dispatch({
    type: SET_DEFAULT_TOURNAMENT,
    payload: { defaultTournament: tournamentData }
  });
}

export const fetchAllTournaments = () => async dispatch => {
  try {
    const response = await getAllTournaments();
    const allTournaments = response.data.items;

    dispatch({
      type: GET_ALL_TOURNAMENTS_SUCCESS,
      payload: { allTournaments: allTournaments }
    })
  } catch (error) {
    dispatch({ type: GET_ALL_TOURNAMENTS_FAILED, payload: { error } });
  }
}

export const fetchLevels = (tournamentID) => async dispatch => {
  try {
    const response = await getLevels(tournamentID);
    dispatch({
      type: SET_LEVELS_LIST,
      payload: { activeLevels: response.data.items }
    });
  } catch (error) {
    dispatch({ type: SET_LEVELS_LIST_FAILED, payload: { error } });
  }
};
