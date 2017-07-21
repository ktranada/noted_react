export const requestTimeZones = () => (
  $.ajax({
    method: "GET",
    url: "/api/timezones"
  })
)

export const signup = (user) => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: {
      user
    }
  });
}

export const requestInvite = code => (
  $.ajax({
    method: 'GET',
    url: `/api/invites/${code}`
  })
)

export const destroyUser = userId => {
  return $.ajax({
    method: "DELETE",
    url: `/api/users/${userId}`,
  });
}

export const updateUser = data => {
  return $.ajax({
    method: "PUT",
    url: `/api/users/${data.id}`,
    data: {
      user: data
    }
  });
}

export const login = (user) => {
  return $.ajax({
    method: "POST",
    url: "/api/session",
    data: {
      user
    }
  });
}

export const logout = () => {
  return $.ajax({
    method: "DELETE",
    url: "/api/session"
  });
}

export const updateInvite = invite => (
  $.ajax({
    method: 'PUT',
    url: `/api/invites/${invite.id}`,
    data: {
      invite
    }
  })
)
