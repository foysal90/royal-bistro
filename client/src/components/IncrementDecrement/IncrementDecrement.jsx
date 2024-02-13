import { useForm } from "react-hook-form";
const IncrementDecrement = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <input {...register("qty")} />
      
        <select {...register("qty")}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

export default IncrementDecrement;
