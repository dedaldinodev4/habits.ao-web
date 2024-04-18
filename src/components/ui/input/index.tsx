
import { InputProps } from "@/types/input-form";

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="mt-2 text-sm font-bold text-red peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">{error.message}</span>}
  </>
);
export default Input;
