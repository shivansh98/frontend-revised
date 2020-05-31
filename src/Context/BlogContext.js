import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "Update":
      return action.payload;
    case "Add BlogPost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 100000),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "Delete BlogPost":
      return state.filter((blogpost) => blogpost.id !== action.payload);
    case "Edit BlogPost":
      return [
        ...state,
        {
          title: action.payload.title,
          content: action.payload.content,
          id: action.payload.id,
        },
      ];
    default:
      return state;
  }
};

const updateState = (dispatch) => {
  return (data) => {
    dispatch({ type: "Update", payload: data });
  };
};

// const addBlogPost = (dispatch) => {
//   return async (title, content, callback) => {
//     await jsonserver.post("/blogposts", { title, content });

//     // dispatch({ type: "Add BlogPost", payload: { title, content } });
//     callback();
//   };
// };

// const editBlogPost = (dispatch) => {
//   return async (title, content, id, callback) => {
//     await jsonserver.put(`/blogposts/${id}`, { title, content });

//     callback();
//   };
// };

// const deleteBlogPost = (dispatch) => {
//   return async (id) => {
//     await jsonserver.delete(`/blogposts/${id}`);
//     dispatch({ type: "Delete BlogPost", payload: id });
//   };
// };

export const { Context, Provider } = createDataContext(
  blogReducer,
  { updateState },
  {}
);
