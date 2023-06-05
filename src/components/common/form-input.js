const FormInput = ({ label, type, value, onChange }) => {
        return (
          <div className="">
            <label htmlFor={label} className="forum text-2xl pr-4 items-center">
              {label}
            </label>
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              name={label}
              id={label}
              className="bg-black text-white focus:outline-none box-shadow border border-white float-right"
            ></input>
          </div>
        );
      };
      
      export default FormInput
