/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import {
  LOGIN_FAILED,
  SET_USER_SESSION,
  SET_USER_SESSION_FAILED,
  SET_KEYCLOAK_SESSION,
  LOGOUT
} from "../constants/actionTypes"
import { USER_SESSION_TOKEN_NAME } from "../constants/userSession";
import { getUserSession } from "../api/userSession"
import { setActiveTeam as setActiveTeamAction } from "./teams";
import {
  setActiveSeason as setActiveSeasonAction,
  fetchPreferences as fetchPreferencesAction
} from "./seasons"

export const logoutUser = () => async dispatch => {
  dispatch({
    type: LOGOUT
  })
}

export const setUserSession = (activeUserSession) => async dispatch => {
  dispatch({
    type: SET_USER_SESSION,
    payload: { activeUserSession }
  })
}

export const fetchUserSession = (postPreferences) => async dispatch => {

  try {
    const userSessionResponse = await getUserSession();
    const userSessionData = userSessionResponse.data;
    const defaultSeasonSet = userSessionData.seasons.find((item) => item.season.is_default);
    const defaultTeamSet = userSessionData.seasons.find((item) => item.team.is_default);

    const defaultSeason = defaultSeasonSet.season;
    const defaultTeam = defaultTeamSet.team;

    const activeSeasonId = userSessionData.user.active_season_id

    dispatch(setUserSession(userSessionData))

    if (postPreferences) {
      dispatch(fetchPreferencesAction(defaultSeason.id))
    }

    if (activeSeasonId) {
      const activeSeason = userSessionData.seasons.find((item) => item.season.id === activeSeasonId);
      dispatch(setActiveSeasonAction(activeSeason.season));
      dispatch(setActiveTeamAction(defaultTeam));
    }

  }
  catch(error) {
    dispatch({ type: SET_USER_SESSION_FAILED, payload: { error } });
  }
}

export const setKeycloakSession = (keycloakInstance, authenticated) => async dispatch => {

  try {

    dispatch({
      type: SET_KEYCLOAK_SESSION,
      payload: { keycloakInstance: keycloakInstance, authenticated: authenticated }
    });

    Cookies.set(USER_SESSION_TOKEN_NAME, keycloakInstance.token);
    dispatch(fetchUserSession(true))

  } catch (error) {
    dispatch({ type: LOGIN_FAILED, payload: { error } });
  }
};
