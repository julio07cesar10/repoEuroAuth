const DateTimewithSeconds = (seconds) => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + seconds);
  return date;
};

  export {DateTimewithSeconds};
  
// function DateTimewithSeconds(seconds) {
//     const currentDate = new Date();
//     const newDate = new Date(currentDate.getTime() + seconds * 1000);
//     return newDate;
//   }

//   export {DateTimewithSeconds};