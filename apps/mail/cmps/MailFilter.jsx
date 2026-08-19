const { useState,useEffect,useRef } = React

export function MailFilter({filter,setFilter}){
    
    const [ filterToEdit,setFilterToEdit] = useState(filter)

    const img=useRef()

    useEffect(()=>{
        setFilter(filterToEdit)
    },[filterToEdit])

    function handelFilter({target}){
        //console.log('ev',ev)
        if(target.type==='text'){ 
            const {value,name} = target
            setFilterToEdit(prev=>({...prev,[name]:value}))
        }
        else{ 
        const {checked,name} = target
        setFilterToEdit(prev=>({...prev,[name]:checked}))  
        }
        console.log(img.current.src)
        if(img.current.src==='http://127.0.0.1:5500/assets/icons/email.png') img.current.src="assets/icons/mark.png"
        else img.current.src="assets/icons/email.png"
         }

return <section className="filter">
    
<div><img className="menu-img" src="assets/icons/menu.png"/></div>

<img className="search-img" src="assets/icons/loupe.png" />
<input className="search" type="text" name="text" onChange={handelFilter} placeholder="Search..." />

<div className="filter-div">
    <input className="checkbox" type="checkbox" id="checkbox" name="onlyNew" onChange={handelFilter}/>
    <label htmlFor="checkbox"><img ref={img} src="assets/icons/email.png"/></label>
</div>
    </section>
}