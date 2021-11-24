import axios from "axios";

const baseUrl = "api/place/";

// create new place
/* export const createNewPlace = async (item) => {
  let data = {
    author: JSON.stringify({
      name: item.author.name,
      email: item.author.email,
      about: item.author.about,
    }), // replace with auth user
    content: JSON.stringify({
      title: item.content.title,
      src: item.content.src,
      text: item.content.text,
    }),
  };
  let request = {
    url: "http://localhost:3000/api/blog", // should be replaced after going to production with domain url
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    data: JSON.stringify(data),
  };

  const response = await axios(request);
  return response;
}; */

// delete blog
/* export const deleteblog = async (item) => {
  let request = {
    url: "http://localhost:3000/api/blog/" + item, // should be replaced after going to production with domain url
    method: "delete",
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = await axios(request);
  return response;
}; */

// update blog
/* export const updateblog = async (item) => {
  let data = {
    author: JSON.stringify({
      name: item.author.name,
      email: item.author.email,
      about: item.author.about,
    }), // replace with auth user
    content: JSON.stringify({
      title: item.content.title,
      src: item.content.src,
      text: item.content.text,
    }),
    published: item.published,
  };
  let request = {
    url: "http://localhost:3000/api/blog/" + item._id, // should be replaced after going to production with domain url
    method: "put",
    headers: {
      "Content-type": "application/json",
    },
    data: JSON.stringify(data),
  };

  const response = await axios(request);
  return response;
}; */

// get all places
/* export const getAllPlaces = async () => {
  let request = {
    url: "http://localhost:3000/api/place", // should be replaced after going to production with domain url
    method: "get",
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = await axios(request);
  return response;
}; */

/* export const getAllPlacesInCountry = async (country) => {
  let request = {
    url: "http://localhost:3000/api/place/" + country, // should be replaced after going to production with domain url
    method: "get",
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = await axios(request);
  return response;
}; */

export const searchForCity = async (searchQuery) => {
  let request = {
    url: baseUrl + "search/" + searchQuery,
    method: "get",
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = await axios(request);
  return response;
};
