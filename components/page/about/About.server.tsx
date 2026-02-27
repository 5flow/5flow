import Hero from './Hero';
import Vision from './Vision';
import Mission from './Mission';
import Propelis from './Propelis';
import Workflow from './Workflow';
import Apart from './Apart';
import Performance from './Performance';
import Results from './Results';

export default async function AboutServerSections() {
  // CMS disabled for About page - using only static content
  return (
    <>
      <Hero />
      <Vision />
      <Mission />
      <Propelis />
      <Apart />
      <Workflow />
      <Performance />
      <Results />
    </>
  );
}
