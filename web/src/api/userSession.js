/* eslint-disable no-unused-vars */
import { baseApi } from "./index"

export function getUserSession() {
  return baseApi.get("/user/session")
}

export function deleteUserAccount(reason) {
  return baseApi.post(`/user/delete-account`, { reason: reason })
}
