let dateButton = document.getElementById("date");
function folderExists(url) {
  return fetch(url, { method: 'HEAD' })
    .then(res => {
      return res.status === 200;
    })
    .catch(console.error)
}


calendar = flatpickr(dateButton, {
  onChange: function (selectedDates, dateStr, instance) {
    var selectedDate = new Date(dateStr);
    var year = selectedDate.getFullYear();
    var month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
    var day = ("0" + selectedDate.getDate()).slice(-2);

    var folderName = year + "-" + month + "-" + day;

    var febFirstDate = new Date("2024-02-01");
    var currentDate = new Date();
    var currentPath = window.location.pathname;

    folderExists("../../Blogs/" + folderName).then(folderExists => {
      if (selectedDate > currentDate) {
        
        if (currentPath.includes("Blogs")){
          swal("Wala pa nga ih", "", {
            icon: "/eyebrow.gif",
          });

        } else {
          swal("Wala pa nga ih", "", {
            icon: "eyebrow.gif",
          });
        }
      } else if (selectedDate < febFirstDate) {
        if (currentPath.includes("Blogs")){
          swal("Di pa kami nag start niyan ih", "", {
            icon: "/sad.gif",
          });
        } else{
          swal("Di pa kami nag start niyan ih", "", {
            icon: "sad.gif",
          });
        }
      } else if (folderExists) {

        if (currentPath.includes("Blogs")) {
          window.location.href = "../../Blogs/" + folderName;
        } else {
          window.location.href = "Blogs/" + folderName;
        }
      } else {

        if (currentPath.includes("Blogs")){
          swal("Wala ako pasok niyan hehe", "", {
            icon: "/hehe.gif",
          });
        } else {
            swal("Wala ako pasok niyan hehe", "", {
            icon: "hehe.gif",
          });
        }
      }
    });
  },
});


document.getElementById("date").addEventListener("click", function (e) {
  e.preventDefault();
  calendar.open();
});
