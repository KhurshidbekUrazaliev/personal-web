import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { About } from '@/components/sections/about';
import { LanguageTree } from '@/components/sections/language-tree';
import { LanguageDNA } from '@/components/sections/language-dna';
import { Resume } from '@/components/sections/resume';
import { Contact } from '@/components/sections/contact';
import { RecruiterTerminal } from '@/components/recruiter-terminal';
import { CommandPalette } from '@/components/command-palette';

// The work comes first: Projects sits right under the hero.
export default function Home() {
  return (
    <>
      <RecruiterTerminal />
      <CommandPalette />
      <Hero />
      <Projects />
      <About />
      <LanguageTree />
      <LanguageDNA />
      <Resume />
      <Contact />
    </>
  );
}
