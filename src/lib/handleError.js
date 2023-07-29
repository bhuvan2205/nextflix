export const consoleErrors = (response) => {
    if (response?.errors) {
        console.log(response.errors);
      }
}