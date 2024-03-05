import useSite from 'hooks/use-site';
import { WebsiteJsonLd } from 'lib/json-ld';

import Container from 'components/Container';
import Layout from 'components/Layout';
import NewContainer from 'components/NewContainer/NewContainer';
import Section from 'components/Section';
import TestimonialSection from 'scenes/TestimonialSection/TestimonialSection';

export default function Home() {
  const { metadata = {} } = useSite();
  const { title } = metadata;

  return (
    <Layout>
      <WebsiteJsonLd siteTitle={title} />

      <NewContainer>
        <TestimonialSection />
      </NewContainer>

      <Section>
        <Container>Services</Container>
      </Section>
    </Layout>
  );
}
