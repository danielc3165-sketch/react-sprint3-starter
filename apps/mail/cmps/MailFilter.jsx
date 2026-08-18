const { useState,useEffect } = React

export function MailFilter({filter,setFilter}){
    
    const [ filterToEdit,setFilterToEdit] = useState(filter)

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
         }

    return <section className="filter">
    
<div className="filter-div">
<input
    type="checkbox"
    name="onlyNew"
    //checked={on}
    onChange={handelFilter}
/>
<span>Show unread only</span>
</div>
    <input className="search" type="text" name="text" onChange={handelFilter} placeholder="Search..." />

    </section>
}