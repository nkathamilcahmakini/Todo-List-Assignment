document.getElementById('form').addEventListener('submit',async function(event){
  event.preventDefault();
  let id=document.getElementById('id').value
  let toDo=document.getElementById('container').value;
  let userId=document.getElementById('user-id').value;
  let data={
  id:id,
  toDo:toDo,
  userId:userId
};
console.log({data});
let result = await fetch('https://dummyjson.com/todos/add', {
  method:'POST',
  headers:{
      'Content-Type': 'application/json'
  },
  body:JSON.stringify(data)
})
.then(response=>response.json())
.then(response=>response)
.catch(error=>error.message)
console.log({result})
let success =document.getElementById('success');
result.id? success.innerHTML='todo added successfully':success.innerHTML='todo not added '
})

// let toDoList = document.getElementById('container');
// const getToDos = () => {
//   return fetch('https://dummyjson.com/todos?limit=20')
//     .then(response => response.json())
//     .then(response => response)
//     .catch(error => error.message);
// };
// const getToDo = async () => {
//   const todos = await getToDos();
//   console.log(todos);
//   todos.todos.map(item => {
//     let div = document.createElement('div');
//     div.className = 'todo';
//     let id=document.createElement('p')
//     let toDo = document.createElement('p');
//     let completed = document.createElement('p');
//     let userId = document.createElement('p');
//     id.innerHTML=item.id;
//     toDo.innerHTML = item.title;
//     completed.innerHTML = item.completed;
//     userId.innerHTML = item.id;
//     div.appendChild(id)
//     div.appendChild(toDo);
//     div.appendChild(completed);
//     div.appendChild(userId);
//     toDoList.appendChild(div);
//   });
// };
// getToDo();