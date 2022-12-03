function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function handleRequest(request, setAlert, type) {
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        setAlert({
          severity: "success",
          message: capitalize(type)+" added successfully!",
        });
      } else {
        setAlert({ severity: "error", message: "Error adding "+type+"!" });
        console.log(res);
      }
    })
    .catch((error) => {
      setAlert({ severity: "error", message: "Server Error!" });
      console.log(error);
    });
}

module.exports = { handleRequest };