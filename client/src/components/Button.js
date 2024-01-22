import React from "react";

const Button = (prop) => {
    return(
        <button type={prop.type || "submit"} className={ prop.className || "w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"}>
            {prop.children}
        </button>
    )
}

export default Button