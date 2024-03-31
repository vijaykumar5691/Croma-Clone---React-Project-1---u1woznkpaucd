export const fetcher = async (endpoint, option = {}, auth = true) => {
  option.headers = {
    "content-type": "application/json",
    Accept: "application/json",
    projectID: "b4j0aeyd1jd1",
  };
  if (auth) {
    option.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  const url = `https://academics.newtonschool.co/api/v1/${endpoint}`;
  const response = await fetch(url, option);
  return response.json();
};
