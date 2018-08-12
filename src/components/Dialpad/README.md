```jsx

initialState = {
    dialNumber: '+71234567890'
};

const handlePadButton = number => {
    setState({
        dialNumber: `${state.dialNumber}${number}`
    })
};
const handleDeleteClick = number => {
    setState({
        dialNumber: number.slice(0, number.length - 1)
    })
};
const handleCallClick = number => {
    alert(number.length > 0 ? `Call number ${number}` : 'Please enter the number');
};
const handleInputChange = inputValue => {
    setState({
        dialNumber: inputValue
    })
};

<div>
    <Dialpad 
        dialNumber={state.dialNumber} 
        handlePadButtonClick={handlePadButton} 
        handleDeleteClick={handleDeleteClick} 
        handleCallClick={handleCallClick}  
        handleInputChange={handleInputChange}
    />
</div>
```
