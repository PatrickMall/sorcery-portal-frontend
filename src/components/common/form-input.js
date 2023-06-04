const FormInput = ({ label, type, value, onChange }) => {
        return (
          <div className="">
            <label htmlFor={label} className="">
              {label}
            </label>
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              name={label}
              id={label}
              className=""
            ></input>
          </div>
        );
      };
      
      export default FormInput
