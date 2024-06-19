import { useState } from "react";
 
const InputTextField = () => {
    const [active, setActive] = useState<string>('');
    return(
        <div className="bg-white h-screen ">
            <div className="mt-5">
                <InputGroup1 label="test" name="test" value={active} setValue={setActive} disabled={false}/>
            </div>
        </div>
    )
}
 
export default InputTextField;
 
type InputGroup1Type = {
    label: string;
    name: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    type?: string;
    disabled: boolean;
}
 
 
const InputGroup1: React.FC<InputGroup1Type> = ({ label, name, value, setValue, type = "text", disabled }) => {
    return (
      <div className="relative z-0 w-full bg-white">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`peer block py-2.5 px-1 w-full text-sm text-gray-600 bg-transparent border-2 appearance-none focus:outline-none focus:ring-0 focus:z-[-10] ${
            disabled ? "border-gray-300" : "border-gray-400"
          }`}
          placeholder=" "
          disabled={disabled}
        />
        <label
          htmlFor={name}
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 translate-x-2 peer-focus:bg-white peer-focus:z-50 px-2"
        >
          {label}
        </label>
      </div>
    );
  }
 