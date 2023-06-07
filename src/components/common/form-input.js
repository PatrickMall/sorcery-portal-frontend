const FormInput = ({ label, type, value, onChange }) => {
        return (
          <div className="">
            <label htmlFor={label} className="forum text-2xl items-center">
              {label}
            </label>
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              name={label}
              id={label}
              className="mt-1 bg-black-transparent2 focus:bg-black text-white text-xl focus:outline-none box-shadow border border-white w-96 flex flex-col-2 items-center justify-around mb-4 p-2 forum"
            ></input>
          </div>
        );
      };
      
      export default FormInput
