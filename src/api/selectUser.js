const selectUser = async (id) => {
  const response = await fetch(`https://reqres.in/api/users/${id}?delay=1`);
  const { data } = await response.json();

  return data;
};

export { selectUser };
