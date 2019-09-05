/* eslint-disable no-unused-vars */
import { baseApi } from "./index";

export function setTournamentActive(tournamentID) {
    // return baseApi.post(`/user-tournaments`, { tournamentID });
}
export function getAllTournaments() {
    return baseApi.get(`/tournaments`);
}

export function getTeamTournaments(teamID) {
    return baseApi.get(`/team-tournaments`, { teamID });
}

export function getLevels(tournamentID) {
    return baseApi.get(`/levels`, { id: tournamentID });
}
