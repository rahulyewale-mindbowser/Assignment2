// GET USER DATA
const api_data = [];
const api_url ="https://run.mocky.io/v3/010e898c-a05c-4a0a-b947-2a65b5a267c5";


(async function (){
  await fetch(api_url)
  .then(response => response.json())
  .then(function (result) {
    console.log('Result', result)
    for (var i = 0; i < result.length; i++) {
      api_data.push(result[i])
    }
    console.log('api data', api_data);
    displayData(api_data);
    default_data(api_data);  
  })
  .catch(error => console.log('error', error));
})();

 //DISPLAY THE USERS DATA IN TABLE
function displayData(user){
    var temp = "<tr><th>First Name</th><th>Last Name</th><th>Username</th><th>Employment</th><th>Country</th><th></th><th></th></tr>";
    for(let i = 0;i<user.length;i++){
    //  console.log(user[i]);
      temp += `<tr >`;
      temp += `<td>${user[i].first_name}</td>`;
      temp += `<td>${user[i].last_name }</td>`;
      temp += `<td>${user[i].username}</td>`;
      temp += `<td>${user[i].employment.title}</td>`;
      temp += `<td>${user[i].address.country}</td>`;
      temp += `<td><button onclick='showDetails(${user[i].id})' >View Details</button></td>`;
      temp += `<td><button onclick='deleteUser(${i})' >Delete Record</button></td>`;
      temp += "</tr></a>";
    };
    document.getElementById('showUserList').innerHTML = temp;
    
  }

  //DISPLAY FIRST USER DATA BYDEFAULT
  function default_data(user){
    // console.log(user[0].id);
      var user_details = " ";
      user.filter((itemData1)=>{
        if(itemData1.id == user[0].id){
            greetUser(itemData1.first_name);
           
            user_details= u_data(itemData1,user_details);
            
        }
        });
        document.getElementById("userDetails").innerHTML = user_details;
  };

// DISPLAY SPECIFIC DATA ON CLICK
  async function showDetails(mydata){
      var user_details = " ";
      api_data.filter((itemData)=>{
        if(itemData.id == mydata){
          greetUser(itemData.first_name);
          // console.log(mydata)

          user_details= u_data(itemData,user_details);
        }
      });
        document.getElementById("userDetails").innerHTML = user_details;

        if (document.documentElement.clientWidth <= 600) {
          var elem = document.getElementById("userDetails");
          let elemPos = elem.getBoundingClientRect();
          window.scrollTo(0, elemPos.top)
        }
      // }); 
  }

   //separate function for storing user details

  function u_data(itemData1,user_details){
    user_details += `<ul>`;
            user_details += `<li><img src="${itemData1.avatar}"></li>`;
            user_details += `<li> <b>ID:</b> ${itemData1.id } </li>`;
            user_details += `<li> <b>UID:</b> ${itemData1.uid}</li>`;
            user_details += `<li> <b>Name:</b> ${itemData1.first_name} ${itemData1.last_name}</li>`;
            user_details += `<li><b>Email:</b> ${itemData1.email} </li>`;
            user_details += `<li><b>Phone Number:</b> ${itemData1.phone_number} </li>`;
            user_details += `<li><b>Date of Birth:</b> ${itemData1.date_of_birth} </li>`;
            user_details += `<li><b>Age:</b> ${(new Date().getFullYear())-new Date(itemData1.date_of_birth).getFullYear()} </li>`;
            user_details += `<li><b>Gender:</b> ${itemData1.gender} </li>`;
            user_details += `<li><b>Username:</b> ${itemData1.username} </li>`;
            user_details += `<li><b>Password:</b> ${itemData1.password} </li>`;
            user_details += `<li><b>Employment:</b>${itemData1.employment.title} </li>`;
            user_details += `<li><b>City:</b> ${itemData1.address.city} </li>`;
            user_details += `<li><b> State:</b> ${itemData1.address.state} </li>`;
            user_details += `<li><b>Country:</b> ${itemData1.address.country} </li>`;
            user_details += `<li><b>Credit card:</b> ${itemData1.credit_card.cc_number} </li>`;
            user_details += `<li><b>Subscription Status</b> :${itemData1.subscription.status} </li>`;
            user_details += "</ul>";
            return user_details;

  }

  // Display greet message according Time
  const greetUser = (UserName) => {
    let greetMessage = document.getElementById('greetMsg');

    currentTime = new Date();

    (currentTime.getHours() < 12) ?
        greetMessage.innerHTML = `<b> Hello, ${UserName} Good Morning !</b>` :
        ((currentTime.getHours() < 17) ?
            greetMessage.innerHTML = `<b>Hello, ${UserName} Good Afternoon !</b>`
            : greetMessage.innerHTML = `<b>Hello, ${UserName} Good Evening !</b>`
        );
}
// Delete the user
function deleteUser(i){
  
  // console.log("function called",i);
  var result = confirm("Are you Want to delete Employee?");
    if (result) {
    //Logic to delete the record
    api_data.splice(i, 1);
    // console.log(api_data);
    displayData(api_data);
    // console.log(api_data.length);
    if(i==api_data.length)
    {
      showDetails(api_data[0].id);
    }
    else{
      showDetails(api_data[i].id);

    }
}
  // console.log(api_data[i]); 
}