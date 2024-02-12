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

    folderExists("Blogs/" + folderName).then(folderExists => {
      if (selectedDate > currentDate) {
        swal("Wala pa nga ih", "", {
          icon: "eyebrow.gif",
        });
      } else if (selectedDate < febFirstDate) {
        swal("Di pa kami nag start niyan ih", "", {
          icon: "sad.gif",
        });
      } else if (folderExists) {
        window.location.href = "Blogs/" + folderName;
      } else {
        swal("Wala ako pasok niyan hehe", "", {
          icon: "hehe.gif",
        });
      }
    });
  },
});


document.getElementById("date").addEventListener("click", function (e) {
  e.preventDefault();
  calendar.open();
});
