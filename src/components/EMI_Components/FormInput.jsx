import {
  FormGroup,
  InputGroup,
  Input,
  Label,
  InputGroupText,
  Container,
} from "reactstrap";

const FormInput = ({
  handleChange,
  value,
  name,
  type,
  label,
  symbol,
  min,
  max,
  step,
  showSlider,
  tooltip,
}) => {
  return (
    <Container>
      <FormGroup>
        {label && (
          <Label
            htmlFor={name}
            style={{ whiteSpace: "nowrap", margin: "0px 15px 0px 0px" }}
          >
            {label}
          </Label>
        )}
        <InputGroup>
          <Input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            id={name}
          />
          <InputGroupText>{symbol}</InputGroupText>
        </InputGroup>
      </FormGroup>
      {showSlider && (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          list={name}
          value={value}
          name={name}
          onChange={handleChange}
        />
      )}
    </Container>
  );
};

export default FormInput;
