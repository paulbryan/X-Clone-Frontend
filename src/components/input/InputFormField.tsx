import type {Dispatch, SetStateAction } from "react";
import TextareaAutosize from 'react-textarea-autosize';

type InputFormFieldProps = {
    inputValue: any;
    placeholderValue: string;
    setInputValue: Dispatch<SetStateAction<any>>;
    isTextArea?: boolean;
}


function InputFormField ( {setInputValue, inputValue, placeholderValue, isTextArea = false}: InputFormFieldProps) {

    if (isTextArea) {
        return (
            <>
                <TextareaAutosize className="w-full min-h-16 p-2 text-white border border-twitterBorder placeholder:text-twitterTextAlt"
                    value = {inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholderValue}
                />
            </>
        )
    } else {
        return (
            <>
                <input 
                value = {inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border focus:border-(--color-main) rounded-sm border-twitterBorder p-2" placeholder={placeholderValue}/>
            </>
        ) 
    }

}

export default InputFormField;