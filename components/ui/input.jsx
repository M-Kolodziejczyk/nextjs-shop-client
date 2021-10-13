function Input(props) {
  return (
    <div className="flex flex-col mt-2">
      <label className="font-medium" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className="border rounded p-2"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
      {props.error[props.name] && (
        <label className="text-red-500" forhtml="name">
          {props.error[props.name]}
        </label>
      )}
    </div>
  );
}

export default Input;
