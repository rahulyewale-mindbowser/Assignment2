// GET USER DATA
const api_url ="https://run.mocky.io/v3/010e898c-a05c-4a0a-b947-2a65b5a267c5";
async function getuserData(){
    const res = await fetch(api_url);
    return res.json();

}
//Stores the data in result
var result = getuserData();
result.then(user =>{
    console.log(user);
    displayData(user);
    default_data(user);     
    
})
 //DISPLAY THE USERS DATA IN TABLE
function displayData(user){
    var temp = "<tr><th>First Name</th><th>Last Name</th><th>Username</th><th>Employment</th><th>Country</th></tr>";
    for(let i = 0;i<user.length;i++){
    //  console.log(user[i]);
      temp += `<tr onclick='showDetails(${user[i].id})'>`;
      temp += "<td>" + user[i].first_name + "</td>";
      temp += "<td>" + user[i].last_name + "</td>";
      temp += "<td>" + user[i].username+ "</td>";
      temp += "<td>" + user[i].employment.title + "</td>";
      temp += "<td>" + user[i].address.country+ "</td>";
      // temp += `<td><button onclick="showDetails(${user[i].id})">Show Details</button></td>`;
      temp += "</tr>";
    };
    document.getElementById('showUserList').innerHTML = temp;
    
  }

  //DISPLAY FIRST USER DATA BYDEFAULT
  function default_data(user){
      var user_details = " ";
      user.filter((itemData1)=>{
        if(itemData1.id == "1"){
            greetUser(itemData1.first_name);
           
            user_details= u_data(itemData1,user_details);
            
        }
        });
        document.getElementById("userDetails").innerHTML = user_details;
  };

// DISPLAY SPECIFIC DATA ON CLICK
  async function showDetails(mydata){
    result.then(user=>{
      var user_details = " ";
      user.filter((itemData)=>{
        if(itemData.id == mydata){
          greetUser(itemData.first_name);
          // console.log(mydata)

          user_details= u_data(itemData,user_details);
        }
      });
        document.getElementById("userDetails").innerHTML = user_details;
      }); 
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