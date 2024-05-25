  const adduserBtn = document.getElementById('adduser');
  const btnText = adduserBtn.innerText;
  const usernametextfeild = document.getElementById('username');
  const recordDisplay = document.getElementById('records');
  let userArray=[];
  let edit_id =null;

  let objstr = localStorage.getItem('users');
 
  if(objstr !=null){
  userArray =JSON.parse(objstr);
  }
  DisplyInfo()
  adduserBtn.onclick=()=>{
    const name= usernametextfeild.value;
    if(edit_id!=null){
        //edit
        userArray.splice(edit_id,1,{'name':name})
        edit_id=null;

    }else{
        //insert
        const name= usernametextfeild.value;
         userArray.push({'name':name});
    }
   
    console.log(userArray);
    SaveInfo(userArray);
    usernametextfeild.value='';
    DisplyInfo()
    adduserBtn.innerText=btnText;

  }


  function SaveInfo(userArray){
       let str = JSON.stringify(userArray);
        localStorage.setItem('users',str);
  }

  function DisplyInfo(){
    let statement='';
    userArray.forEach((user,i)=> {
        statement +=`<tr>
        <th scope="row">${i+1}</th>
        <td>${user.name}</td>
        <td>  <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="EditInfo(${i})">Edit</button>  
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="DeleteInfo(${i})">Delete</button></td>
       
      </tr> `;
    });
    recordDisplay.innerHTML=statement;


  }

  function EditInfo(id){
    edit_id=id;
    usernametextfeild.value=userArray[id].name;
    adduserBtn.innerText='Save Changes';
    

  }

  function DeleteInfo(id){

    userArray.splice(id,1);
    SaveInfo(userArray);
    DisplyInfo();
  

  }