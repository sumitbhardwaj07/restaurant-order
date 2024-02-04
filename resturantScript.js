const key='6a55e868184c4b14ac4c419b2ca6a835'
const url=`https://crudcrud.com/api/${key}`;

window.addEventListener('DOMContentLoaded',loadData)

function loadData(){
    axios.all([
        axios.get(`${url}/1`),
        axios.get(`${url}/2`),
        axios.get(`${url}/3`)
    ])
    .then((res)=>{
        console.log(res);

        res.forEach((table)=>{
            let data=table.data;
            data.map(item => {
                let ol=document.getElementById(`${item.tableNo}`)
                let li=document.createElement('li')
                li.classList="list-group-item d-flex justify-content-around"
                li.innerHTML=`
             <div>${item.orderItem}</div>
            <div>${item.price}</div>
            
            <button  type="button"  name="${item.tableNo}/${item._id}" class="btn btn-danger delete" >X</button>
            `

                ol.appendChild(li)
            });
        })
    })
    .then(()=>{
        let deletebuttons=document.getElementsByClassName('delete')
        deletebuttons= Array.from(deletebuttons)
        deletebuttons.map((btn)=>{
            btn.addEventListener('click',deleteOneList)
        })
    })
}
function deleteOneList(e){
    console.log(e.target.name)

    axios.delete(`${url}/${e.target.name}`)
    .then(res=>console.log('deleted'))
    .then(()=>location.reload())
    .catch((err=>console.log(err)))
}
function formhandler(e){

    e.preventDefault()

    let formData=new FormData(e.target)
    let jsonData={}
    formData.forEach((value,key)=>{
        jsonData[key]=value
    })

    if(jsonData['orderItem']=='Open this select menu' || jsonData['price']=='' || jsonData['tableNo']== 'Open this select table'){
       alert('fill all the fields correctly')
       return 
    }
    let endPoint=`${url}/${jsonData['tableNo']}`;

    axios.post(endPoint,jsonData)
    .then(res=>console.log(res.data))
    .then(()=>location.reload())
    .catch(err=>console.log(err))


}