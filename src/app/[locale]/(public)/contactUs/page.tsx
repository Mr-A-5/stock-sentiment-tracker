import ContactForm from "../../../../components/organism/contactForm";

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <ContactForm locale={locale} />;
}
