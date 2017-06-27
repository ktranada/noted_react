export const signup = (user) => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: {
      user
    }
  });
}

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
