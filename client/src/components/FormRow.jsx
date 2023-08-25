const FormRow = ({ type, name, labelText, onChange }) => {
  return (
    <div>
      <label htmlFor={name} className="font-bold text-xl">
        {labelText || name}
      </label>
      <br />
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        required
        className="border border-gray-600 rounded w-64 py-2 px-3 mt-1"
      />
    </div>
  );
};

export default FormRow;
