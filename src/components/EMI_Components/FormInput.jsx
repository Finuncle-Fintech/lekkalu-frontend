
const FormInput = ({
  handleChange,
  value,
  options,
  name,
  type,
  label,
  symbol,
  min,
  max,
  step,
  showSlider,
}) => {
  return (
    <div className="parent">
      <div className="input-container">
        {label && <h1>{label}</h1>}
        <div className="input-field">
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
          />
          <button>{symbol}</button>
        </div>
      </div>
      {showSlider && (
        <>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            list={name}
            defaultValue={value}
            name={name}
            onChange={handleChange}
          />
          <datalist id={name}>
            {options.map((value, _idx) => (
              <option key={_idx} value={value}></option>
            ))}
          </datalist>
        </>
      )}
    </div>
  );
};

export default FormInput;