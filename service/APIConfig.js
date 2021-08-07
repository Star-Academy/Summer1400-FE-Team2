const BaseUrl = "http://130.185.120.192:5000/";

const GetData = (url) => {
  return fetch(BaseUrl + url, {
    method: "GET",
    headers: {
      Authorization:  "Bearer ?",
    },
  }).then((res) => res.json());
};

const PostData = async (url, body) => {
  const data = await fetch(BaseUrl + url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer  ?",
    },
    body: JSON.stringify(body),
  });

  const json = await data.json();

  if (data.status < 300) return json;
  throw json;
};
