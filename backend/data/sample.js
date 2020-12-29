const sample1 = `<p>Did you know? As early as 1923, in his memoir and propaganda tract "Mein Kampf" (My Struggle), Adolf Hitler had predicted a general European war that would result in "the extermination of the Jewish race in Germany."</p><p>After <a href="https://www.history.com/this-day-in-history/adolf-hitler-is-named-chancellor-of-germany">becoming Chancellor of Germany</a> in 1933, Hitler swiftly consolidated power, anointing himself Führer (supreme leader) in 1934. Obsessed with the idea of the superiority of the “pure” German race, which he called “Aryan,” Hitler believed that war was the only way to gain the necessary “Lebensraum,” or living space, for the German race to expand. In the mid-1930s, he secretly began the rearmament of Germany, a violation of the Versailles Treaty. After signing alliances with Italy and Japan against the <a href="/topics/history-of-the-soviet-union">Soviet Union</a>, Hitler sent troops to occupy Austria in 1938 and the following year annexed Czechoslovakia. Hitler’s open aggression went unchecked, as the United States and Soviet Union were concentrated on internal politics at the time, and neither France nor Britain (the two other nations most devastated by the Great War) were eager for confrontation.</p><h2 id="section_2">Outbreak of World War II (1939)</h2><p>In late August 1939, Hitler and Soviet leader <a href="/topics/joseph-stalin">Joseph Stalin</a> signed the <a href="/topics/world-war-ii/german-soviet-nonaggression-pact">German-Soviet Nonaggression Pact</a>, which incited a frenzy of worry in London and Paris. Hitler had long planned an invasion of Poland, a nation to which Great Britain and France had guaranteed military support if it were attacked by Germany. The pact with Stalin meant that Hitler would not face a war on two fronts once he invaded Poland, and would have Soviet assistance in conquering and dividing the nation itself. On September 1, 1939, Hitler invaded Poland from the west; two days later, France and Britain declared war on Germany, beginning World War II.</p>`

const sample2 = `<h2><span class="mw-headline" id="History">History</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/w/index.php?title=Natural_language_processing&amp;action=edit&amp;section=1" title="Edit section: History">edit</a><span class="mw-editsection-bracket">]</span></span></h2><div role="note" class="hatnote navigation-not-searchable">Further information: <a href="/wiki/History_of_natural_language_processing" title="History of natural language processing">History of natural language processing</a></div><p>Natural language processing has its roots in the 1950s. Already in 1950, <a href="/wiki/Alan_Turing" title="Alan Turing">Alan Turing</a> published an article titled "<a href="/wiki/Computing_Machinery_and_Intelligence" title="Computing Machinery and Intelligence">Computing Machinery and Intelligence</a>" which proposed what is now called the <a href="/wiki/Turing_test" title="Turing test">Turing test</a> as a criterion of intelligence, a task that involves the automated interpretation and generation of natural language, but at the time not articulated as a problem separate from artificial intelligence.</p><h3><span id="Symbolic_NLP_.281950s_-_early_1990s.29"></span><span class="mw-headline" id="Symbolic_NLP_(1950s_-_early_1990s)">Symbolic NLP (1950s - early 1990s)</span><span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/w/index.php?title=Natural_language_processing&amp;action=edit&amp;section=2" title="Edit section: Symbolic NLP (1950s - early 1990s)">edit</a><span class="mw-editsection-bracket">]</span></span></h3><p>The premise of symbolic NLP is well-summarized by <a href="/wiki/John_Searle" title="John Searle">John Searle</a>'s <a href="/wiki/Chinese_room" title="Chinese room">Chinese room</a> experiment: Given a collection of rules (e.g., a Chinese phrasebook, with questions and matching answers), the computer emulates natural language understanding (or other NLP tasks) by applying those rules to the data it is confronted with.
</p><ul><li><b>1950s</b>: The <a href="/wiki/Georgetown-IBM_experiment" class="mw-redirect" title="Georgetown-IBM experiment">Georgetown experiment</a> in 1954 involved fully <a href="/wiki/Automatic_translation" class="mw-redirect" title="Automatic translation">automatic translation</a> of more than sixty Russian sentences into English. The authors claimed that within three or five years, machine translation would be a solved problem.<sup id="cite_ref-2" class="reference"><a href="#cite_note-2">[2]</a></sup>  However, real progress was much slower, and after the <a href="/wiki/ALPAC" title="ALPAC">ALPAC report</a> in 1966, which found that ten-year-long research had failed to fulfill the expectations, funding for machine translation was dramatically reduced.  Little further research in machine translation was conducted until the late 1980s when the first <a href="/wiki/Statistical_machine_translation" title="Statistical machine translation">statistical machine translation</a> systems were developed.</li>
<li><b>1960s</b>: Some notably successful natural language processing systems developed in the 1960s were <a href="/wiki/SHRDLU" title="SHRDLU">SHRDLU</a>, a natural language system working in restricted "<a href="/wiki/Blocks_world" title="Blocks world">blocks worlds</a>" with restricted vocabularies, and <a href="/wiki/ELIZA" title="ELIZA">ELIZA</a>, a simulation of a <a href="/wiki/Rogerian_psychotherapy" class="mw-redirect" title="Rogerian psychotherapy">Rogerian psychotherapist</a>, written by <a href="/wiki/Joseph_Weizenbaum" title="Joseph Weizenbaum">Joseph Weizenbaum</a> between 1964 and 1966.  Using almost no information about human thought or emotion, ELIZA sometimes provided a startlingly human-like interaction. When the "patient" exceeded the very small knowledge base, ELIZA might provide a generic response, for example, responding to "My head hurts" with "Why do you say your head hurts?".</li>
<li><b>1970s</b>: During the 1970s, many programmers began to write "conceptual <a href="/wiki/Ontology_(information_science)" title="Ontology (information science)">ontologies</a>", which structured real-world information into computer-understandable data.  Examples are MARGIE (Schank, 1975), SAM (Cullingford, 1978), PAM (Wilensky, 1978), TaleSpin (Meehan, 1976), QUALM (Lehnert, 1977), Politics (Carbonell, 1979), and Plot Units (Lehnert 1981).  During this time, the first many <a href="/wiki/Chatterbots" class="mw-redirect" title="Chatterbots">chatterbots</a> were written (e.g., <a href="/wiki/PARRY" title="PARRY">PARRY</a>).</li>
<li><b>1980s</b>: The 1980s and early 1990s mark the hey-day of symbolic methods in NLP. Focus areas of the time included research on rule-based parsing (e.g., the development of <a href="/wiki/Head-driven_phrase_structure_grammar" title="Head-driven phrase structure grammar">HPSG</a> as a computational operationalization of <a href="/wiki/Generative_grammar" title="Generative grammar">generative grammar</a>), morphology (e.g., two-level morphology<sup id="cite_ref-3" class="reference"><a href="#cite_note-3">[3]</a></sup>), semantics (e.g., <a href="/wiki/Lesk_algorithm" title="Lesk algorithm">Lesk algorithm</a>), reference (e.g., within Centering Theory<sup id="cite_ref-4" class="reference"><a href="#cite_note-4">[4]</a></sup>) and other areas of natural language understanding (e.g., in the <a href="/wiki/Rhetorical_structure_theory" title="Rhetorical structure theory">Rhetorical Structure Theory</a>). Other lines of research were continued, e.g., the development of chatterbots with <a href="/wiki/Racter" title="Racter">Racter</a> and <a href="/wiki/Jabberwacky" title="Jabberwacky">Jabberwacky</a>. An important development (that eventually led to the statistical turn in the 1990s) was the rising importance of quantitative evaluation in this period.<sup id="cite_ref-5" class="reference"><a href="#cite_note-5">[5]</a></sup></li></ul>`

const sample3 = ``

export default [
    {
        id: '7659696971',
        text: sample1
    },
    {
        id: '6881546416',
        text: sample2
    },
    {
        id: '8838511996',
        text: sample3
    }
]
