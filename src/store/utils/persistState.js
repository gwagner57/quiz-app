export const loadState = () => {
    try {
      const serializedState = localStorage.getItem("state");
      if (!serializedState) return {};
      else return JSON.parse(serializedState);
    } catch (err) {
        console.log(err);
      return {};
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
    } catch (err) {
      console.log(err);
    }
  };