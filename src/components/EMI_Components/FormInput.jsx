import { useContext, useState } from "react";
import {
  FormGroup,
  InputGroup,
  Input,
  Label,
  InputGroupText,
  Container,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Context } from "provider/Provider";

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
  visible
  
}) => {

  const [isOpen, setIsOpen] = useState(false);  
  const units = ['Months', 'Years']
const {unit, handleUnitChange} = useContext(Context)
  const toggle = () => {
    setIsOpen(prevState => !prevState)
  }


  
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
          {!visible && <InputGroupText>{symbol}</InputGroupText> }
          { visible &&
          
          <ButtonDropdown isOpen={isOpen} toggle={toggle}>                  
          <DropdownToggle caret>
              {unit}
            </DropdownToggle>
            <DropdownMenu>
             {units.map((val) => {
              return <DropdownItem key={val} onClick={() => handleUnitChange(val)}>{val}</DropdownItem>
             })}
            </DropdownMenu>
          </ButtonDropdown>
          }
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
