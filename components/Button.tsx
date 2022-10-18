interface Props {
  children: string | JSX.Element;
}
export default function Button({ children }: Props) {
  return (
    <button
      type="button"
      className="bg-[#FB506A] py-2 px-6 rounded-full text-xl font-bold text-white"
    >
      {children}
    </button>
  );
}
