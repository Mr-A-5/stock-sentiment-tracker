import Navbar from "../../components/organism/Navbar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  return (
    <div
      className="
    flex flex-col mx-auto
    sm:w-9/10 
    md:rounded-2xl md:h-screen md:min-h-fit md:my-10 md:justify-center md:items-center md:w-3/5
    lg:w-9/10
    p-5
  "
    >
      <Navbar locale={locale} />
      {children}
    </div>
  );
}
