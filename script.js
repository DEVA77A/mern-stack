const fetchApi1=async()=>{
    try{
        const response=await fetch("https://jsonplaceholder.typicode.com/users");
        const data=await response.json();
        {data.map((user)=>{
            console.log(user.name);
        })}
    }catch(error){
        console.log(error);
    }
}
fetchApi1();
