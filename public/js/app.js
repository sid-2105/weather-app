// console.log('Client side javascript is loaded')



 const weatherform = document.querySelector('form')
 const search = document.querySelector('input')
 const messageone = document.querySelector('#mess1')
 const messagetwo = document.querySelector('#mess2')
 
//  const textarea = document.getElementById("message")
//  textarea.addEventListener("input", function() {
//     textarea.style.backgroundColor="white";
//  });
 //messageone.textContent = 'From js'
 weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
        const location = search.value

            messageone.textContent = "Sit back and relax while we are loading... content for you :)"
            messagetwo.textContent = ""
            //for local host to run on system
             fetch('/weather?address='+location).then((response)=>{ // this is for both heroku and localhost
            //  fetch('http://localhost:3000/weather?address='+location).then((response)=>{ 
            response.json().then((data)=>{
            if(data.error){
                // console.log(data.error)
                messageone.textContent = data.error
            }       
            else{
                 // console.log(data)
                 messageone.textContent=data.location
                 messagetwo.textContent = data.forecast
            }
               
        })
    }) 
})