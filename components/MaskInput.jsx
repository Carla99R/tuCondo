import React from "react";
import InputMask from "react-input-mask";

const MaskInput = ({register, ...object}) =>{

    const propsInput ={
        id: object.id,
        type: object.type,
        name: object.name,
    };

    return(
        <>
            <InputMask
                {...propsInput}
                ref={register}

            />
        </>
    )
}

export default MaskInput