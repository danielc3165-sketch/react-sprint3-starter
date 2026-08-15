const { useState,useEffect } = React

export function MailFilter({filter,setFilter}){
    
    const [ filterToEdit,setFilterToEdit] = useState(filter)

    useEffect(()=>{
        setFilter(filterToEdit)
    },[filterToEdit])

    function handelFilter({target}){
         //console.log('target',target)
         var value=target.value
         setFilterToEdit(prev=>({...prev,['text']:value}))
    }

    return <section>

    <input className="search" type="text" onChange={handelFilter} placeholder="Search..." />

    </section>
}