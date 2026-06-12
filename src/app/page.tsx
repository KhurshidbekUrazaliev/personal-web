import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { LanguageTree } from '@/components/sections/language-tree';
import { LanguageDNA } from '@/components/sections/language-dna';
import { Resume } from '@/components/sections/resume';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { RecruiterTerminal } from '@/components/recruiter-terminal';
import { CommandPalette } from '@/components/command-palette';
import { ScrollProgress } from '@/components/scroll-progress';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <RecruiterTerminal />
      <CommandPalette />
      <Hero />
      <About />
      <LanguageTree />
      <LanguageDNA />
      <Resume />
      <Projects />
      <Contact />
    </>
  );
}
