import React from "react";


const Input = (prop) => {


    return(
        <input
            ref={prop.Ref || null}
            type={prop.type || 'text'}
            id={prop.id || 'id'}
            name={prop.name || 'name'}
            value={prop.value || ''}
            onChange={prop.onChange}
            className={ prop.className || "w-full px-4 py-2 border rounded-md"}
        />
    )
}

export default Input